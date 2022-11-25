import styles from "./App.module.scss";
import { ConfigList } from "./components/lists/ConfigList";
import { AddButton } from "./components/buttons/AddButton";
import { Modals } from "./components/modals/Modals";
import { useConfig } from "./hooks/useConfig";

export default () => {
  const { config, loading } = useConfig();

  if (loading) {
    return <></>;
  }

  return (
    <div className={styles["container"]}>
      <Modals />
      <div className={styles["menu"]}>
        <AddButton location="/" />
      </div>
      <div className={styles["row"]}>
        <ConfigList config={config} />
      </div>
    </div>
  );
};
