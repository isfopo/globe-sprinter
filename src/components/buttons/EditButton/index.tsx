import { ReactComponent as Edit } from "../../../assets/icons/edit.svg";
import { useModalDispatch } from "../../../hooks/useModalDispatch";
import { ButtonProps } from "../types";
import styles from "./index.module.scss";

export interface EditButtonProps extends ButtonProps {
  onClick: () => void;
  isCommand?: boolean;
}

export const EditButton: React.FC<EditButtonProps> = ({
  onClick,
  isCommand = false,
}) => {
  return (
    <button
      title="edit"
      type="button"
      className={styles["button"]}
      onClick={onClick}
    >
      <Edit />
    </button>
  );
};
