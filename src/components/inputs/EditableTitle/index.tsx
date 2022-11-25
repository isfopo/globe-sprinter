import { EditButton } from "../../buttons/EditButton";
import styles from "./index.module.scss";

export interface EditableTitleProps {
  title: string;
  location: string;
}

export const EditableTitle: React.FC<EditableTitleProps> = ({
  title,
  location,
}) => (
  <span className={styles["title"]}>
    <p>{title}</p>
    <EditButton location={location} title={title} />
  </span>
);
