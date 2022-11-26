import { invoke } from "@tauri-apps/api";
import { listen } from "@tauri-apps/api/event";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { settingsState } from "../state/settingsState";

export class Settings {
  shellPath: string;

  constructor(json: string) {
    const { shell_path } = JSON.parse(json);
    this.shellPath = shell_path;
  }
}

export const useSettings = (): {
  settings: Settings | undefined;
  loading: boolean;
} => {
  const [settings, setSettings] = useRecoilState(settingsState);

  useEffect(() => {
    const get = async () => {
      if (!settings) {
        setSettings(new Settings(await invoke<string>("get_settings_json")));
        await listen("reload", async () => {
          setSettings(new Settings(await invoke<string>("get_settings_json")));
        });
      }
    };
    get();
  }, []);

  return { settings, loading: !settings };
};
