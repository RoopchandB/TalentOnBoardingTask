import * as React from "react";
import { Button, Modal } from "semantic-ui-react";

const DeleteCustomer = (props) => {
    const { open, toggleModal, deleteCustomer, customerName } = props;
    return (
        <>
            <Modal size={"tiny"} open={open}>
                <Modal.Header>Delete Customer</Modal.Header>
                <Modal.Content>
                    <p>Are you sure you want to delete <b>{customerName}</b> customer</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={toggleModal}>
                        No
                    </Button>
                    <Button positive onClick={deleteCustomer}>
                        Yes
                    </Button>
                </Modal.Actions>
            </Modal>
        </>
    );
};

export default DeleteCustomer;
