import { useCallback, useState } from "react";
import { useConfig } from "../../../hooks/useConfig";
import { EditButton } from "../../buttons/EditButton";
import styles from "./index.module.scss";

export interface EditableTitleProps {
  title: string;
  location: string;
}

export const EditableTitle: React.FC<EditableTitleProps> = ({
  title,
  location,
}) => {
  const { update } = useConfig();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [value, setValue] = useState<string>(title);

  const onSubmit = useCallback(() => {
    console.log("submit");
    setIsEditing(false);
  }, []);

  if (isEditing) {
    return (
      <span className={styles["input"]}>
        <input
          type="text"
          aria-label="title"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(event) => event.key === "Enter" && onSubmit()}
        />
      </span>
    );
  }

  return (
    <span className={styles["title"]}>
      <p>{title}</p>
      <EditButton location={location} onClick={() => setIsEditing(true)} />
    </span>
  );
};
