import { useCallback, useState } from "react";
import { useConfig } from "../../hooks/useConfig";
import { useModalListener } from "../../hooks/useModalListener";
import { ModalBase } from "./ModalBase";
import styles from "./index.module.scss";

export interface AddDirectoryArgs {
  location: string;
}

export const AddDirectoryModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [key, setKey] = useState("");
  const {
    close,
    args: { location },
  } = useModalListener<AddDirectoryArgs>(
    "AddDirectoryModal",
    () => setIsOpen(true),
    () => setIsOpen(false)
  );

  const { loading, insert } = useConfig();

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    async (event) => {
      event.preventDefault();
      if (loading) return;

      insert(location, key);
      handleRequestClose();
    },
    [key, loading, location, close]
  );

  const handleRequestClose = useCallback(() => {
    setKey("");
    close();
  }, [setKey, close]);

  return (
    <ModalBase isOpen={isOpen} onRequestClose={handleRequestClose}>
      <form className={styles["container"]}>
        <label htmlFor="name">Enter the key for the new directory:</label>
        <input
          type="text"
          id="name"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
        <button
          type="submit"
          value="Submit"
          onClick={handleSubmit}
          disabled={key.length === 0}
        >
          Submit
        </button>
      </form>
    </ModalBase>
  );
};
