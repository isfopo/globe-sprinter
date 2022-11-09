import styles from "./index.module.scss";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import { ReactComponent as Add } from "../../../assets/icons/add.svg";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { useModalDispatch } from "../../../hooks/useModalDispatch";

export interface AddMenuProps {
  location: string;
}

export const AddMenu: React.FC<AddMenuProps> = ({ location }) => {
  const openModal = useModalDispatch();

  return (
    <div className={styles["container"]}>
      <Menu
        menuButton={<MenuButton>{<Add />}</MenuButton>}
        arrow
        direction="left"
      >
        <MenuItem onClick={() => openModal("AddDirectoryModal", { location })}>
          Add Directory
        </MenuItem>
        <MenuItem onClick={() => openModal("AddCommandModal", { location })}>
          Add Command
        </MenuItem>
      </Menu>
    </div>
  );
};
