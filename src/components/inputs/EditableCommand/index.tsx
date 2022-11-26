import { useCallback, useRef, useState } from "react";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { useConfig } from "../../../hooks/useConfig";
import { EditButton } from "../../buttons/EditButton";
import styles from "./index.module.scss";

export interface EditableCommandProps {
  command: string;
  title: string;
  location: string;
}

export const EditableCommand: React.FC<EditableCommandProps> = ({
  command,
  title,
  location,
}) => {
  const { updateCommand } = useConfig();
  const outsideRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [value, setValue] = useState<string>(command);

  const onSubmit = useCallback(() => {
    updateCommand(location, title, value);
    setIsEditing(false);
  }, [command, value, setIsEditing]);

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
    <div className={styles["command"]}>
      <p>{command}</p>
      <EditButton location={location} onClick={() => setIsEditing(true)} />
    </div>
  );
};
