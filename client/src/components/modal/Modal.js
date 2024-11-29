import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalPopup = ({ children, onHide, btnstyle = "btn-primary", show }) => {
  return (
    <Modal
      onHide={onHide}
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide} className={btnstyle}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalPopup;
