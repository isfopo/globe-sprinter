import { ReactComponent as Remove } from "../../../assets/icons/remove.svg";
import { useModalDispatch } from "../../../hooks/useModalDispatch";
import { ButtonProps } from "../types";
import styles from "./index.module.scss";

export const RemoveButton: React.FC<ButtonProps> = ({ location }) => {
  const openModal = useModalDispatch();

  return (
    <button title="remove" type="button" className={styles["button"]}>
      <Remove />
    </button>
  );
};
