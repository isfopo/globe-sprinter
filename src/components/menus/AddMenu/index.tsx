import styles from "./index.module.scss";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import { ReactComponent as Add } from "../../../assets/icons/add.svg";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

export interface AddMenuProps {
  location: string;
}

export const AddMenu: React.FC<AddMenuProps> = () => {
  return (
    <div className={styles["container"]}>
      <Menu
        menuButton={<MenuButton>{<Add />}</MenuButton>}
        arrow
        direction="left"
      >
        <MenuItem>Add Directory</MenuItem>
        <MenuItem>Add Command</MenuItem>
      </Menu>
    </div>
  );
};