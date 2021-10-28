import * as React from "react";
import { Table,Pagination } from "semantic-ui-react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import CreateEditStores from "./CreateEditStores";
import DeleteStore from "./DeleteStore";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import { green } from "@material-ui/core/colors";

const pagesize = 5;

const GetStores = () => {
  // pagination 
  const [activePage,setactivePage]=React.useState(0)

  const [stores, setStores] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [storeName, setStoreName] = React.useState("");
  const [storeAddress, setStoreAddress] = React.useState("");
  const [header, setHeader] = React.useState("");
  const [storeId, setStoreId] = React.useState();

  // pagination 
  const handlePaginationChange = (e, { activePage }) => setactivePage(activePage-1 )

  const fetchData = React.useCallback(() => {
    axios
        .get("https://pro-test1.azurewebsites.net:443/store/GetStoreList")
      .then(({ data }) => {
        setStores(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  
  

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  const createStore = () => {
    setOpen((open) => !open);
    setStoreName("");
    setStoreId();
    setStoreAddress("");
    setHeader("Create Store");
  };

  const editStore = (id, name, address) => {
    setOpen((open) => !open);
    setStoreName(name);
    setStoreAddress(address);
    setHeader("Edit Store");
    setStoreId(id);
  };

  const deleteStore = (id, name) => {
    setDeleteOpen((open) => !open);
    setStoreName(name);
    setStoreId(id);
  };

  const toggleModal = React.useCallback(() => {
    setOpen((open) => !open);
  }, []);

  const updateData = React.useCallback(
    (name, address) => {
      setOpen((open) => !open);
      if (!storeId) {
        debugger;
        axios
            .post("https://pro-test1.azurewebsites.net:443/Store/Addstore", {
            id: storeId,
            name: name,
            address: address,
          })
          .then(() => {
            console.log();
            fetchData();
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        debugger;
        axios
            .put(`https://pro-test1.azurewebsites.net:443/store/UpdateStore?Id=${storeId}`, {
            name: name,
            address: address,
          })
          .then(() => {
            fetchData();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    [storeId, fetchData]
  );

  const deleteData = React.useCallback(() => {
    setDeleteOpen((open) => !open);
    axios
        .delete(`https://pro-test1.azurewebsites.net:443/Store/DeleteStore?storeID=${storeId}`)
      .then(() => {
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [storeId, fetchData]);

  return (
    <>
    {
      open && 
      <CreateEditStores
        toggleModal={toggleModal}
        open={open}
        header={header}
        updateStore={updateData}
        storeName={storeName}
        storeAddress={storeAddress}
      />
    }

      <DeleteStore
        toggleModal={() => setDeleteOpen((open) => !open)}
        open={deleteOpen}
        deleteStore={deleteData}
        storeName={storeName}
      />

      <Button
        variant="outlined"
        color="primary"
        endIcon={<AddIcon />}
        onClick={createStore}
      >
        Create Store
      </Button>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Store Name</Table.HeaderCell>
            <Table.HeaderCell>Store Address</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {stores.slice(activePage*pagesize,activePage*pagesize+pagesize).map((store) => (
            <Table.Row key={store.id}>
              <Table.Cell>{store.name}</Table.Cell>
              <Table.Cell>{store.address}</Table.Cell>

              <Table.Cell>
                <Button
                  onClick={() => editStore(store.id, store.name, store.address)}
                  variant="outlined"
                  style={{ color: green[500] }}
                  endIcon={<EditIcon />}
                >
                  Edit
                </Button>
              </Table.Cell>
              <Table.Cell>
                <Button
                  onClick={() => deleteStore(store.id, store.name)}
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
              <Pagination style={{float:'right'}}
            activePage={activePage+1}
            onPageChange={handlePaginationChange}
            totalPages={Math.ceil(stores.length/pagesize)}
          />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </>
  );
};

export default GetStores;
