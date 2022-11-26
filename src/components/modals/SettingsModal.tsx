import { useState } from "react";
import { useModalListener } from "../../hooks/useModalListener";
import { ModalBase } from "./ModalBase";
import styles from "./index.module.scss";

export const SettingsModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { close } = useModalListener(
    "settingsModal",
    () => setIsOpen(true),
    () => setIsOpen(false)
  );

  return (
    <ModalBase isOpen={isOpen} onRequestClose={close}>
      <p>settings</p>
    </ModalBase>
  );
};
