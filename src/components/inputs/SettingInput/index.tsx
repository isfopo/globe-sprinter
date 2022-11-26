import { useRef, useState } from "react";
import { useClickOutside } from "../../../hooks/useClickOutside";
import styles from "./index.module.scss";

export interface SettingInputProps {
  name: string;
  value: any;
  onSubmit: (name: string, value: string) => void;
}

export const SettingInput: React.FC<SettingInputProps> = ({
  name,
  value: initialValue,
  onSubmit,
}) => {
  const outsideRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(initialValue);
  useClickOutside(outsideRef, () => onSubmit(name, value));

  return (
    <span className={styles["container"]}>
      <p>{name}</p>
      <input
        ref={outsideRef}
        type="text"
        aria-label="title"
        value={value}
        onChange={({ target }) => setValue(target.value)}
        onKeyDown={(event) => event.key === "Enter" && onSubmit(name, value)}
      />
    </span>
  );
};
