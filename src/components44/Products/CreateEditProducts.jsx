import React, { useState } from "react";
import { Button, Form, Modal } from "semantic-ui-react";

const CreateEditProducts = (props) => {
  const {
    open,
    toggleModal,
    header,
    productName,
    productPrice,
    updateProduct,
  } = props;
  const [name, setName] = useState(productName);
  const [price, setPrice] = useState(productPrice);

  const addProduct = () => {
    updateProduct(
      name,
      price
    );
  };

  return (
    <Modal open={open}>
      <Modal.Header>{header}</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>Product Name</label>
            <input
              value={name}
              placeholder="Product Name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Product Price</label>
            <input
              value={price}
              placeholder="Product Price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={toggleModal}>
          Cancel
        </Button>
        <Button
          disabled={name.length < 1 || price.length < 1}
          color="green"
          onClick={addProduct}
        >
          Save
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default CreateEditProducts;
