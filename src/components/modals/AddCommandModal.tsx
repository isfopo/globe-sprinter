import { useCallback, useEffect, useState } from "react";
import { useConfig } from "../../hooks/useConfig";
import { useModalListener } from "../../hooks/useModalListener";
import { ModalBase } from "./ModalBase";
import styles from "./index.module.scss";

export interface AddCommandArgs {
  location: string;
}

export const AddCommandModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [key, setKey] = useState<string>("");
  const [command, setCommand] = useState<string>("");

  const {
    close,
    args: { location },
  } = useModalListener<AddCommandArgs>(
    "AddCommandModal",
    () => setIsOpen(true),
    () => setIsOpen(false)
  );

  const { loading, insert } = useConfig();

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    async (event) => {
      event.preventDefault();
      if (loading) return;

      insert(location, key, command);
      handleRequestClose();
    },
    [key, loading, location, command, close]
  );

  const handleRequestClose = useCallback(() => {
    setKey("");
    setCommand("");
    close();
  }, [setKey, close]);

  return (
    <ModalBase isOpen={isOpen} onRequestClose={handleRequestClose}>
      <form className={styles["container"]}>
        <label htmlFor="key">Enter the key for the new command:</label>
        <input
          type="text"
          id="key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
        <label htmlFor="command">Enter the new command:</label>
        <input
          type="text"
          id="command"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
        />
        <button type="submit" value="Submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </ModalBase>
  );
};
