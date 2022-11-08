import { ReactComponent as Arrow } from "../../../assets/icons/arrow.svg";
import { AddMenu } from "../../menus/AddMenu";
import styles from "./index.module.scss";

export interface DirectoryCellProps {
  title: string;
  isExpanded: boolean;
  location: string;
  expand: () => void;
}

export const DirectoryCell: React.FC<DirectoryCellProps> = ({
  title,
  isExpanded,
  location,
  expand,
}) => (
  <div
    className={`${styles["container"]}  ${
      isExpanded ? styles["expanded"] : ""
    }`}
  >
    <p>{title}</p>
    <span>
      <AddMenu location={location} />
      <Arrow onClick={expand} />
    </span>
  </div>
);
