import * as React from "react";
import { Table, Pagination } from "semantic-ui-react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import CreateEditSales from "./CreateEditSales";
import DeleteSale from "./DeleteSale";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import { green } from "@material-ui/core/colors";

const pagesize = 5;

const GetSales = () => {

  // pagination 
  const [activePage, setactivePage] = React.useState(0)

  const [products, setProducts] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [customers, setCustomers] = React.useState("");
  const [sales, setSales] = React.useState([]);
  const [stores, setStores] = React.useState("");
  const [productSold, setProductSold] = React.useState("");
  const [header, setHeader] = React.useState("");
  const [saleId, setSaleId] = React.useState();

  // pagination 
  const handlePaginationChange = (e, { activePage }) => setactivePage(activePage - 1)

  const fetchData = React.useCallback(() => {
    axios
        .get("https://pro-test1.azurewebsites.net:443/Sales/GetSalesList")
      .then(({ data }) => {
        setSales(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  const createSale = () => {
    setOpen((open) => !open);
    setCustomers("");
    setProducts();
    setStores();
    setProductSold("");
    setHeader("Create Sale");
  };

  const editSale = (id, customerName, productName, storeName, proSold) => {
    console.log(id, customerName, productName, storeName, proSold)
    setOpen((open) => !open);
    setCustomers(customerName);
    setProducts(productName);
    setStores(storeName);
    setProductSold(proSold);
    setHeader("Edit Sale");
    setSaleId(id);
  };

  const deleteSale = (id) => {
    setDeleteOpen((open) => !open);
    // setProductName(name);
    setSaleId(id);
  };

  const toggleModal = React.useCallback(() => {
    setOpen((open) => !open);
  }, []);

  const updateData = React.useCallback(
    (customerName, productName, storeName, proSold) => {
      setOpen((open) => !open);
      if (!saleId) {
        axios
            .post("https://pro-test1.azurewebsites.net:443/Sales/AddSales", {
            id: saleId,
            CustomerId: customerName,
            ProductId: productName,
            StoreId: storeName,
            DateSold: proSold,
          })
          .then((e) => {
            console.log(e);
            fetchData();
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        axios
            .put(`https://pro-test1.azurewebsites.net:443/Sales/UpdateSales?Id=${saleId}`, {
            CustomerId: customerName,
            ProductId: productName,
            StoreId: storeName,
            DateSold: proSold,
          })
          .then(() => {
            fetchData();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    [saleId, fetchData]
  );

  const deleteData = React.useCallback(() => {
    setDeleteOpen((open) => !open);
    axios
        .delete(`https://pro-test1.azurewebsites.net:443/Sales/DeleteSales?salesID=${saleId}`)
      .then(() => {
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [saleId, fetchData]);
  return (
    <>
      <CreateEditSales
        toggleModal={toggleModal}
        open={open}
        header={header}
        updateProduct={updateData}
        customerName={customers}
        productName={products}
        storeName={stores}
        proSold={productSold}
      />

      <DeleteSale
        toggleModal={() => setDeleteOpen((open) => !open)}
        open={deleteOpen}
        deleteSale={deleteData}
      />

      <Button
        onClick={createSale}
        variant="outlined"
        color="primary"
        endIcon={<AddIcon />}
      >
        Create
      </Button>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Customer Name</Table.HeaderCell>
            <Table.HeaderCell>Product Name</Table.HeaderCell>
            <Table.HeaderCell>Store Name</Table.HeaderCell>
            <Table.HeaderCell>Product Date Sold</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {sales.slice(activePage * pagesize, activePage * pagesize + pagesize).map((sale, index) => (
            <Table.Row key={index}>
              <Table.Cell>{sale.customerNavigation.name}</Table.Cell>
              <Table.Cell>{sale.productNavigation.name}</Table.Cell>
              <Table.Cell>{sale.storeNavigation.name}</Table.Cell>
              <Table.Cell>{sale.dateSold.split('T')[0]}</Table.Cell>
              <Table.Cell>
                <Button
                  onClick={() =>
                    editSale(
                      sale.id,
                      sale.customerNavigation.id,
                      sale.productNavigation.id,
                      sale.storeNavigation.id,
                      sale.dateSold
                    )
                  }
                  variant="outlined"
                  style={{ color: green[500] }}
                  endIcon={<EditIcon />}
                >
                  Edit
                </Button>
              </Table.Cell>
              <Table.Cell>
                <Button
                  onClick={() =>
                    deleteSale(sale.id, sale.customerNavigation.customerName)
                  }
                  variant="outlined"
                  color="secondary"
                  endIcon={<DeleteIcon />}
                >
                  Delete
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="6">
              <Pagination style={{ float: 'right' }}
                activePage={activePage + 1}
                onPageChange={handlePaginationChange}
                totalPages={Math.ceil(sales.length / pagesize)}
              />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </>
  );
};

export default GetSales;
