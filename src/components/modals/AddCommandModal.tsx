import { useCallback, useEffect, useState } from "react";
import { useConfig } from "../../hooks/useConfig";
import { useModalListener } from "../../hooks/useModalListener";
import { ModalBase } from "./ModalBase";

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

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
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
      <form onSubmit={handleSubmit}>
        <label>
          Enter the key for the new command:
          <input
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
        </label>
        <label>
          Enter the new command:
          <input
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
          />
          <input type="submit" />
        </label>
      </form>
    </ModalBase>
  );
};
