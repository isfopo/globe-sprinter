import { useCallback, useState } from "react";
import { ModalBase } from "./ModalBase";

export const AddDirectoryModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const toggle = useCallback(() => setIsOpen((o) => !o), []);

  return (
    <ModalBase isOpen={isOpen} onRequestClose={toggle}>
      <p>Heellllooooo</p>
    </ModalBase>
  );
};
