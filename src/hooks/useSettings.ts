import { invoke } from "@tauri-apps/api";
import { listen } from "@tauri-apps/api/event";
import { useCallback, useEffect } from "react";
import { useRecoilState } from "recoil";
import { settingsState } from "../state/settingsState";

export interface Settings {
  shell_path: string;
}

export const useSettings = (): {
  settings: Settings | undefined;
  loading: boolean;
  update: (name: string, value: string) => void;
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

  const update = useCallback(
    async (name: string, value: string) => {
      if (!settings) return;

      settings[name as keyof Settings] = value;

      const updatedSettings = JSON.parse(
        await invoke("write_settings", { json: JSON.stringify(settings) })
      );

      setSettings(updatedSettings);
    },
    [settings]
  );

  return { settings, loading: !settings, update };
};
