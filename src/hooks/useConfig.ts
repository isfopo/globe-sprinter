import { invoke } from "@tauri-apps/api";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { configState } from "../state/configState";

export interface Config {
  [key: string]: string | Config;
}

export const useConfig = (): {
  config: Config;
  loading: boolean;
  insert: (location: string, key: string, command?: string) => void;
  remove: (location: string) => void;
} => {
  const [config, setConfig] = useRecoilState(configState);

  useEffect(() => {
    const sync = async () => {
      if (!config) {
        setConfig(JSON.parse(await invoke<string>("get_config_json")));
      }
    };
    sync();
  }, []);

  const insert = useCallback(
    async (location: string, key: string, command?: string) => {
      const branch = location?.split("/").filter((step) => step) ?? [];
      if (!config) return;
      let place = config;
      for (const step of branch) {
        place = place[step] as Config;
      }
      place[key] = command ?? ({} as Config);

      invoke("write_config", { json: JSON.stringify(config) });

      setConfig(JSON.parse(await invoke<string>("get_config_json")));
    },
    [setConfig]
  );

  const remove = useCallback(
    async (location: string) => {
      const branch = location?.split("/").filter((step) => step) ?? [];
      const key = branch.pop();

      setConfig((config) => {
        if (!config) return;
        let place = config;
        for (const step of branch) {
          place = place[step] as Config;
        }
        if (key) {
          delete place[key];
        }
        return config;
      });
    },
    [setConfig]
  );

  return { config: config ?? {}, loading: !config, insert, remove };
};
