import { RemoveButton } from "../../buttons/RemoveButton";
import { EditableCommand } from "../../inputs/EditableCommand";
import { EditableTitle } from "../../inputs/EditableTitle";
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
    <EditableTitle location={location} title={title} />
    <span>
      <span>
        <RemoveButton location={location} title={title} isCommand />
      </span>
      <EditableCommand location={location} title={title} command={command} />
    </span>
  </div>
);
