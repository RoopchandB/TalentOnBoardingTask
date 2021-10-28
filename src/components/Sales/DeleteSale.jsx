import * as React from "react";
import { Button, Modal } from "semantic-ui-react";

const DeleteSale = (props) => {
  const { open, toggleModal, deleteSale, customerName } = props;
  return (
    <>
      <Modal size={"tiny"} open={open}>
        <Modal.Header>Delete Sales</Modal.Header>
        <Modal.Content>
          <p>
            Are you sure you want to delete <b>{customerName}</b> product
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={toggleModal}>
            No
          </Button>
          <Button positive onClick={deleteSale}>
            Yes
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default DeleteSale;
