import Modal from "react-modal";

Modal.setAppElement("#root");

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, .1)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    color: "#000",
    backgroundColor: "#f6f6f6",
    boxShadow: "0 0 100px rgba(0, 0, 0, 1)",
  },
};

export interface ModalBaseProps {
  children: any;
  isOpen: boolean;
  onRequestClose: () => void;
}

export const ModalBase: React.FC<ModalBaseProps> = ({
  children,
  isOpen,
  onRequestClose,
}) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      {children}
    </Modal>
  );
};
