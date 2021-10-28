import * as React from "react";
import { Button, Modal } from "semantic-ui-react";

const DeleteProduct = (props) => {
  const { open, toggleModal, deleteProduct, productName } = props;
  return (
    <>
      <Modal size={"tiny"} open={open}>
        <Modal.Header>Delete Product</Modal.Header>
        <Modal.Content>
          <p>
            Are you sure you want to delete <b>{productName}</b> product
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={toggleModal}>
            No
          </Button>
          <Button positive onClick={deleteProduct}>
            Yes
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default DeleteProduct;
