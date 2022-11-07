import styles from "./index.module.scss";

export interface CommandCellProps {
  title: string;
  command: string;
}

export const CommandCell: React.FC<CommandCellProps> = ({ title, command }) => (
  <div className={styles["container"]}>
    <p>{title}</p>
    <p>{command}</p>
  </div>
);
