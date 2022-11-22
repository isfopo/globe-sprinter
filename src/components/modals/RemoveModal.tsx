import { useCallback, useState } from "react";
import { useConfig } from "../../hooks/useConfig";
import { useModalListener } from "../../hooks/useModalListener";
import { ModalBase } from "./ModalBase";
import styles from "./index.module.scss";

export interface RemoveArgs {
  location: string;
}

export const RemoveModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {
    close,
    args: { location },
  } = useModalListener<RemoveArgs>(
    "removeModal",
    () => setIsOpen(true),
    () => setIsOpen(false)
  );

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    async (event) => {
      event.preventDefault();
    },
    [location, close]
  );

  return (
    <ModalBase isOpen={isOpen} onRequestClose={close}>
      <form className={styles["container"]}>
        <label>Are you sure?</label>
        <button type="button" title="Confirm" onClick={handleSubmit}>
          Confirm
        </button>
        <button type="button" title="Cancel" onClick={close}>
          Cancel
        </button>
      </form>
    </ModalBase>
  );
};
