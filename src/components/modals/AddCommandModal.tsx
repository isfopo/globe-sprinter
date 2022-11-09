import { useCallback, useEffect, useState } from "react";
import { useModalListener } from "../../hooks/useModalListener";
import { ModalBase } from "./ModalBase";

export const AddCommandModal = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const remove = useModalListener(
    "AddCommandModal",
    () => setIsOpen(true),
    () => setIsOpen(false)
  );

  return (
    <ModalBase isOpen={isOpen} onRequestClose={remove}>
      <p>Add Command</p>
    </ModalBase>
  );
};
