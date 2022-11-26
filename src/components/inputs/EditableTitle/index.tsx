import { useCallback, useRef, useState } from "react";
import { useClickOutside } from "../../../hooks/useClickOutside";
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
  const { updateKey } = useConfig();
  const outsideRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [value, setValue] = useState<string>(title);

  const onSubmit = useCallback(() => {
    updateKey(title, value);
    setIsEditing(false);
  }, [title, value, setIsEditing]);

  useClickOutside(outsideRef, onSubmit);

  if (isEditing) {
    return (
      <div className={styles["input"]}>
        <input
          ref={outsideRef}
          type="text"
          aria-label="title"
          value={value}
          onChange={({ target }) => setValue(target.value)}
          onKeyDown={(event) => event.key === "Enter" && onSubmit()}
        />
      </div>
    );
  }

  return (
    <div className={styles["title"]}>
      <p>{title}</p>
      <EditButton location={location} onClick={() => setIsEditing(true)} />
    </div>
  );
};
