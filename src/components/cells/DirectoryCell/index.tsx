import Arrow from "../../../assets/icons/arrow.svg";
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
    <span onClick={onClick}>
      <img src={Arrow} alt="expand" />
    </span>
  </div>
);
