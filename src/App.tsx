import styles from "./App.module.scss";
import { ConfigList } from "./components/lists/ConfigList";
import { AddMenu } from "./components/menus/AddMenu";
import { AddDirectoryModal } from "./components/modals/AddDirectoryModal";
import { useConfig } from "./hooks/useConfig";

export default () => {
  const { config, loading } = useConfig();

  if (loading) {
    return <></>;
  }

  return (
    <div className={styles["container"]}>
      <div>
        <AddDirectoryModal />
      </div>
      <div className={styles["menu"]}>
        <AddMenu location="/" />
      </div>
      <div className={styles["row"]}>
        <ConfigList config={config} />
      </div>
    </div>
  );
};
