import React, { useState } from "react";
import { Button, Form, Modal } from "semantic-ui-react";
import axios from "axios";
const CreateEditSales = (props) => {
  const [custName, setCustName] = useState("");
  const [prodName, setProdName] = useState("");
  const [stName, setStName] = useState("");
  const [pdSold, setPDSold] = useState("");
  const {
    open,
    toggleModal,
    header,
    customerName,
    productName,
    storeName,
    proSold,
    updateProduct,
  } = props;


  const addSale = () => {
    updateProduct(
      custName !== "" ? custName : customerName,
      prodName !== "" ? prodName : productName,
      stName !== "" ? stName : storeName,
      pdSold !== "" ? pdSold : proSold
    );
    setCustName("");
    setProdName("");
    setStName("");
    setPDSold("");
  };
  
  
  const [customers, setCustomers] = React.useState([]); 

  const fetchData = React.useCallback(() => {
    axios
      .get("https://localhost:44362/customer/GetCustomers")
      .then(({ data }) => {
        setCustomers(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  const [products, setProducts] = React.useState([]);
  
  const fetchData1 = React.useCallback(() => {
    axios
      .get("https://localhost:44362/product/GetProductList")
      .then(({ data }) => {
        setProducts(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    fetchData1();
  }, [fetchData1]);

  const [stores, setStores] = React.useState([]);
  
  const fetchData3 = React.useCallback(() => {
    axios
      .get("https://localhost:44362/store/GetStoreList")
      .then(({ data }) => {
        setStores(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  
  

  React.useEffect(() => {
    fetchData3();
  }, [fetchData3]);
  
  return (
    <Modal open={open}>
      <Modal.Header>{header}</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>Customer Name</label>
			        <select value={custName !== "" ? custName : customerName} onChange={(e) => setCustName(e.target.value)}>
              <option>
              
                </option>
              {customers.map((customer) => 
              <option key ={customer.id} value={customer.id} >
                {customer.name}
                </option>
              )}
			        </select>
          </Form.Field>
          <Form.Field>
            <label>Product Name</label>
            <select value={prodName !== "" ? prodName : productName}  onChange={(e) => setProdName(e.target.value)}>
              <option>
              
                </option>
              {products.map((product) => 
              <option key ={product.id} value={product.id} >
                {product.name}
                </option>
              )}
			        </select>
          </Form.Field>
          <Form.Field>
            <label>Store Name</label>
			
            <select value={stName !== "" ? stName : storeName} onChange={(e) => setStName(e.target.value)}>
			<option>
              
                </option>
              {stores.map((store) => 
              <option key ={store.id} value={store.id} >
                {store.name}
                </option>
              )}
			        </select>
          </Form.Field>
          <Form.Field>
            <label>Product Sold</label>
            <input type="date" 
              value={pdSold !== "" ? pdSold : proSold.split('T')[0]}
              placeholder="Product Sold"
              onChange={(e) => setPDSold(e.target.value)}
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={toggleModal}>
          Cancel
        </Button>
        <Button
          disabled={
            custName.length < 1 &&
            prodName.length < 1 &&
            stName.length < 1 &&
            pdSold.length < 1
          }
          color="green"
          onClick={addSale}
        >
          Save
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default CreateEditSales;
