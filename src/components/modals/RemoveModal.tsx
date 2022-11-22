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
  const [key, setKey] = useState("");
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
    [key, location, close]
  );

  const handleRequestClose = useCallback(() => {
    setKey("");
    close();
  }, [setKey, close]);

  return (
    <ModalBase isOpen={isOpen} onRequestClose={handleRequestClose}>
      <p>Are you sure?</p>
      <button title="No" type="button" />
      <button title="Yes" type="button" />
    </ModalBase>
  );
};
