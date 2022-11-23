import { ReactComponent as Remove } from "../../../assets/icons/remove.svg";
import { useModalDispatch } from "../../../hooks/useModalDispatch";
import { ButtonProps } from "../types";
import styles from "./index.module.scss";

export interface RemoveButtonProps extends ButtonProps {
  title: string;
  isCommand: boolean;
}

export const RemoveButton: React.FC<RemoveButtonProps> = ({
  location,
  title,
  isCommand = false,
}) => {
  const openModal = useModalDispatch();

  return (
    <button
      title="remove"
      type="button"
      className={styles["button"]}
      onClick={() => openModal("removeModal", { location, title, isCommand })}
    >
      <Remove />
    </button>
  );
};
