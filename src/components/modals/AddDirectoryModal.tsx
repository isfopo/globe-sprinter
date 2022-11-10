import { useState } from "react";
import { useModalListener } from "../../hooks/useModalListener";
import { ModalBase } from "./ModalBase";

export interface AddDirectoryArgs {
  location: string;
}

export const AddDirectoryModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {
    remove,
    args: { location },
  } = useModalListener<AddDirectoryArgs>(
    "AddDirectoryModal",
    () => setIsOpen(true),
    () => setIsOpen(false)
  );

  console.log(location);

  return (
    <ModalBase isOpen={isOpen} onRequestClose={remove}>
      <p>Add Directory</p>
    </ModalBase>
  );
};
