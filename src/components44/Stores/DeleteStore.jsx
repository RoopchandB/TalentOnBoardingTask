import * as React from "react";
import { Button, Modal } from "semantic-ui-react";

const DeleteStore = (props) => {
    const { open, toggleModal, deleteStore, storeName } = props;
    return (
        <>
            <Modal size={"tiny"} open={open}>
                <Modal.Header>Delete Store</Modal.Header>
                <Modal.Content>
                    <p>Are you sure you want to delete <b>{storeName}</b> store</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={toggleModal}>
                        No
                    </Button>
                    <Button positive onClick={deleteStore}>
                        Yes
                    </Button>
                </Modal.Actions>
            </Modal>
        </>
    );
};

export default DeleteStore;
