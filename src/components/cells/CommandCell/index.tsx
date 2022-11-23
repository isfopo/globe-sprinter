import { RemoveButton } from "../../buttons/RemoveButton";
import styles from "../index.module.scss";

export interface CommandCellProps {
  title: string;
  command: string;
  location: string;
  hide?: boolean;
}

export const CommandCell: React.FC<CommandCellProps> = ({
  title,
  command,
  location,
  hide,
}) => (
  <div className={`${styles["container"]} ${hide ? styles["hide"] : ""}`}>
    <p>{title}</p>
    <span>
      <span>
        <RemoveButton location={location} title={title} isCommand />
      </span>
      <p>{command}</p>
    </span>
  </div>
);
