import { ReactComponent as Edit } from "../../../assets/icons/edit.svg";
import { useModalDispatch } from "../../../hooks/useModalDispatch";
import { ButtonProps } from "../types";
import styles from "./index.module.scss";

export interface EditButtonProps extends ButtonProps {
  title: string;
  isCommand?: boolean;
}

export const EditButton: React.FC<EditButtonProps> = ({
  location,
  title,
  isCommand = false,
}) => {
  return (
    <button
      title="Edit"
      type="button"
      className={styles["button"]}
      onClick={() => {}}
    >
      <Edit />
    </button>
  );
};
