import { useState } from "react";
import { useModalListener } from "../../hooks/useModalListener";
import { ModalBase } from "./ModalBase";
import styles from "./index.module.scss";
import { useSettings } from "../../hooks/useSettings";
import { SettingInput } from "../inputs/SettingInput";

export const SettingsModal = () => {
  const { settings } = useSettings();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { close } = useModalListener(
    "settingsModal",
    () => setIsOpen(true),
    () => setIsOpen(false)
  );

  if (!settings) {
    return <></>;
  }

  return (
    <ModalBase isOpen={isOpen} onRequestClose={close}>
      <form className={styles["container"]}>
        {Object.entries(settings).map(([name, value], key) => (
          <SettingInput name={name} value={value} key={key} />
        ))}
      </form>
    </ModalBase>
  );
};
