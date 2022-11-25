import { ReactComponent as Arrow } from "../../../assets/icons/arrow.svg";
import { AddButton } from "../../buttons/AddButton";
import { EditButton } from "../../buttons/EditButton";
import { RemoveButton } from "../../buttons/RemoveButton";
import styles from "../index.module.scss";

export interface DirectoryCellProps {
  title: string;
  isExpanded: boolean;
  location: string;
  hide?: boolean;
  expand: () => void;
}

export const DirectoryCell: React.FC<DirectoryCellProps> = ({
  title,
  isExpanded,
  location,
  hide,
  expand,
}) => (
  <div
    className={`${styles["container"]}  ${
      isExpanded ? styles["expanded"] : ""
    } ${hide ? styles["hide"] : ""}`}
  >
    <span>
      <p>{title}</p>
      <EditButton location={location} title={title} />
    </span>
    <span>
      <span>
        <AddButton location={location} />
        <RemoveButton location={location} title={title} />
      </span>
      <Arrow onClick={expand} />
    </span>
  </div>
);
