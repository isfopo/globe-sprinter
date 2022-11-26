import { invoke } from "@tauri-apps/api";
import { listen } from "@tauri-apps/api/event";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { settingsState } from "../state/settingsState";

export interface Settings {
  shellPath: string;
}

export const useSettings = (): {
  settings: Settings | undefined;
  loading: boolean;
} => {
  const [settings, setSettings] = useRecoilState(settingsState);

  useEffect(() => {
    const get = async () => {
      if (!settings) {
        setSettings(JSON.parse(await invoke<string>("get_settings_json")));
        await listen("reload", async () => {
          setSettings(JSON.parse(await invoke<string>("get_settings_json")));
        });
      }
    };
    get();
  }, []);

  return { settings, loading: !settings };
};
