import styles from "./App.module.scss";
import { ConfigList } from "./components/lists/ConfigList";
import { AddButton } from "./components/buttons/AddButton";
import { Modals } from "./components/modals/Modals";
import { useConfig } from "./hooks/useConfig";
import { NotificationContainer } from "./components/NotificationContainer";
import { SettingsButton } from "./components/buttons/SettingsButton";

export default () => {
  const { config, loading } = useConfig();

  if (loading) {
    return <></>;
  }

  return (
    <div className={styles["container"]}>
      <Modals />
      <NotificationContainer />
      <div className={styles["menu"]}>
        <AddButton location="/" />
        <SettingsButton />
      </div>
      <div className={styles["row"]}>
        <ConfigList config={config} />
      </div>
    </div>
  );
};
