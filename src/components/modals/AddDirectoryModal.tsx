import { useCallback, useState } from "react";
import { useModalListener } from "../../hooks/useModalListener";
import { ModalBase } from "./ModalBase";

export interface AddDirectoryArgs {
  location: string;
}

export const AddDirectoryModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [name, setName] = useState("");
  const {
    remove,
    args: { location },
  } = useModalListener<AddDirectoryArgs>(
    "AddDirectoryModal",
    () => setIsOpen(true),
    () => setIsOpen(false)
  );

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
    (event) => {
      event.preventDefault();
      alert(`The name you entered was: ${name}`);
    },
    [name]
  );

  const handleRequestClose = useCallback(() => {
    setName("");
    remove();
  }, [setName, remove]);

  return (
    <ModalBase isOpen={isOpen} onRequestClose={handleRequestClose}>
      <form onSubmit={handleSubmit}>
        <label>
          Enter your name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input type="submit" />
        </label>
      </form>
    </ModalBase>
  );
};
