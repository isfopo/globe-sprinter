import { useCallback, useEffect, useState } from "react";
import { useModalListener } from "../../hooks/useModalListener";
import { ModalBase } from "./ModalBase";

export const AddDirectoryModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { remove, args } = useModalListener(
    "AddDirectoryModal",
    () => setIsOpen(true),
    () => setIsOpen(false)
  );

  console.log(args);

  return (
    <ModalBase isOpen={isOpen} onRequestClose={remove}>
      <p>Add Directory</p>
    </ModalBase>
  );
};
