import styles from "./index.module.scss";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { ReactComponent as Add } from "../../../assets/icons/add.svg";

export interface AddMenuProps {}

export const AddMenu: React.FC<AddMenuProps> = () => {
  return (
    <div className={styles["container"]}>
      <Menu menuButton={<MenuButton>{<Add />}</MenuButton>}>
        <MenuItem>New Directory</MenuItem>
        <MenuItem>New Command</MenuItem>
      </Menu>
    </div>
  );
};
