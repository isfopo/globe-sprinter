import { useState } from "react";
import { useModalListener } from "../../hooks/useModalListener";
import { ModalBase } from "./ModalBase";
import styles from "./index.module.scss";
import { useSettings } from "../../hooks/useSettings";

export const SettingsModal = () => {
  const { settings, loading } = useSettings();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { close } = useModalListener(
    "settingsModal",
    () => setIsOpen(true),
    () => setIsOpen(false)
  );

  if (loading) {
    return <></>;
  }

  return (
    <ModalBase isOpen={isOpen} onRequestClose={close}>
      <p>{settings?.shellPath}</p>
    </ModalBase>
  );
};
