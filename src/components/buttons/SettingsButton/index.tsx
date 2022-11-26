import { ReactComponent as Settings } from "../../../assets/icons/settings.svg";
import { useModalDispatch } from "../../../hooks/useModalDispatch";
import { ButtonProps } from "../types";
import styles from "./index.module.scss";

export const SettingsButton: React.FC = () => {
  const openModal = useModalDispatch();

  return (
    <button
      title="Open settings"
      type="button"
      className={styles["button"]}
      onClick={() => openModal("settingsModal")}
    >
      <Settings />
    </button>
  );
};
