import styles from "./index.module.scss";

export interface DirectoryCellProps {
  title: string;
  onClick: () => void;
}

export const DirectoryCell: React.FC<DirectoryCellProps> = ({
  title,
  onClick,
}) => (
  <div className={styles["container"]}>
    <p>{title}</p>
    <p onClick={onClick}>v</p>
  </div>
);
