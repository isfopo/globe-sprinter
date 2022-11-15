import { useCallback, useMemo, useState } from "react";
import { readConfig } from "../../helpers/file";
import { Config, useConfig } from "../../hooks/useConfig";
import { useModalListener } from "../../hooks/useModalListener";
import { ModalBase } from "./ModalBase";

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

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      event.preventDefault();
      if (loading) return;

      insert(location, key);
      close();
    },
    [key, loading, location, close]
  );

  const handleRequestClose = useCallback(() => {
    setKey("");
    close();
  }, [setKey, close]);

  return (
    <ModalBase isOpen={isOpen} onRequestClose={handleRequestClose}>
      <form onSubmit={handleSubmit}>
        <label>
          Enter your name:
          <input
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
          <input type="submit" />
        </label>
      </form>
    </ModalBase>
  );
};
