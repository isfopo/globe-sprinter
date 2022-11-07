import { ReactComponent as Arrow } from "../../../assets/icons/arrow.svg";
import { ReactComponent as Add } from "../../../assets/icons/add.svg";
import styles from "./index.module.scss";

export interface DirectoryCellProps {
  title: string;
  isExpanded: boolean;
  expand: () => void;
}

export const DirectoryCell: React.FC<DirectoryCellProps> = ({
  title,
  isExpanded,
  expand,
}) => (
  <div
    className={`${styles["container"]}  ${
      isExpanded ? styles["expanded"] : ""
    }`}
  >
    <p>{title}</p>
    <span>
      <Add />
      <Arrow onClick={expand} />
    </span>
  </div>
);
