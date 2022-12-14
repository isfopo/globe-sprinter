import React from "react";
import Modal from "react-modal";
import {
  lightblack as lightBlack,
  white as white,
} from "../../../styles/_colors.module.scss";

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
    color: white,
    backgroundColor: lightBlack,
    border: "none",
    boxShadow: "0 0 100px rgba(0, 0, 0, 1)",
    width: "50%",
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
}) => (
  <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
    {children}
  </Modal>
);
