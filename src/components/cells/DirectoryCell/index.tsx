import { ReactComponent as Arrow } from "../../../assets/icons/arrow.svg";
import styles from "./index.module.scss";

export interface DirectoryCellProps {
  title: string;
  isExpanded: boolean;
  onClick: () => void;
}

export const DirectoryCell: React.FC<DirectoryCellProps> = ({
  title,
  isExpanded,
  onClick,
}) => (
  <div
    className={`${styles["container"]}  ${
      isExpanded ? styles["expanded"] : ""
    }`}
  >
    <p>{title}</p>
    <span onClick={onClick}>
    <span>
      <Add />
    </span>
  </div>
);
