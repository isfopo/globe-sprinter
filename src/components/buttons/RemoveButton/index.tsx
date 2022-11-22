import { ReactComponent as Remove } from "../../../assets/icons/remove.svg";
import { useModalDispatch } from "../../../hooks/useModalDispatch";
import { ButtonProps } from "../types";
import styles from "./index.module.scss";

export interface RemoveButtonProps extends ButtonProps {
  title: string;
}

export const RemoveButton: React.FC<RemoveButtonProps> = ({
  location,
  title,
}) => {
  const openModal = useModalDispatch();

  console.log(title);
  return (
    <button
      title="remove"
      type="button"
      className={styles["button"]}
      onClick={() => openModal("removeModal", { location, title })}
    >
      <Remove />
    </button>
  );
};
