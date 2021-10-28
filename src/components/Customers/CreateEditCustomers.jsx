import React, { useState } from "react";
import { Button, Form, Modal } from "semantic-ui-react";

const CreateEditCustomer = (props) => {
  const {
    open,
    toggleModal,
    header,
    customerName,
    customerAddress,
    updateCustomer,
  } = props;
  const [name, setName] = useState(customerName);
  const [address, setAddress] = useState(customerAddress);
  
  const addCustomer = () => {
    updateCustomer(
      name ,
      address
    );
  };

  return (
    <Modal open={open}>
      <Modal.Header>{header}</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>Customer Name</label>
            <input
              value={name }
              placeholder="Customer Name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Customer Address</label>
            <input
              value={address }
              placeholder="Customer Address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={toggleModal}>
          Cancel
        </Button>
        <Button
          disabled={name.length < 1 && address.length < 1}
          color="green"
          onClick={addCustomer}
        >
          Save
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default CreateEditCustomer;
