import { useCallback, useRef, useState } from "react";
import { sentenceCase } from "change-case";
import { toast } from "react-toastify";
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
  const [value, setValue] = useState(initialValue ?? "");

  const handleSubmit = useCallback(() => {
    try {
      if (value === initialValue) return;

      onSubmit(name, value);
      toast(`${sentenceCase(name)} was updated to "${value}"`);
    } catch (e) {
      toast.error("Setting could not be updated");
    }
  }, [onSubmit, initialValue, value, name]);

  useClickOutside(outsideRef, handleSubmit);

  return (
    <span className={styles["container"]}>
      <p>{sentenceCase(name)}</p>
      <input
        ref={outsideRef}
        type="text"
        aria-label="title"
        value={value}
        onChange={({ target }) => setValue(target.value)}
        onKeyDown={(event) => event.key === "Enter" && handleSubmit()}
      />
    </span>
  );
};
