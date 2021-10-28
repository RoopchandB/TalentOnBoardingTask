import React, { useState } from "react";
import { Button, Form, Modal } from "semantic-ui-react";

const CreateEditStores = (props) => {
  const { open, toggleModal, header, storeName, storeAddress, updateStore } = props;
  const [name, setName] = useState(storeName);
  const [address, setAddress] = useState(storeAddress);
  
  const addStore = () => {
    updateStore(name , address);
  };

  return (
    <Modal open={open}>
      <Modal.Header>{header}</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>Store Name</label>
            <input
              value={name}
              placeholder="Customer Name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Store Address</label>
            <input
              value={address}
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
          onClick={addStore}
        >
          Save
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default CreateEditStores;