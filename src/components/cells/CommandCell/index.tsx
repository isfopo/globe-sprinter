import styles from "./index.module.scss";

export interface CommandCellProps {
  title: string;
  command: string;
  hide?: boolean;
}

export const CommandCell: React.FC<CommandCellProps> = ({
  title,
  command,
  hide,
}) => (
  <div className={`${styles["container"]} ${hide ? styles["hide"] : ""}`}>
    <p>{title}</p>
    <p>{command}</p>
  </div>
);
