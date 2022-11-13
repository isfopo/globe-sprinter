import { invoke } from "@tauri-apps/api/tauri";
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
} => {
  const [config, setConfig] = useRecoilState<Config>(configState);

  useEffect(() => {
    const get = async () => {
      setConfig(JSON.parse(await invoke<string>("get_config_json")));
    };
    get();
  }, []);

  const insert = useCallback(
    (location: string, key: string, command?: string) => {
      const branch = location?.split("/").filter((step) => step) ?? [];

      setConfig((config) => {
        let place = config;
        for (const step of branch) {
          place = place[step] as Config;
        }
        place[key] = command ?? ({} as Config);
        return config;
      });
    },
    [setConfig]
  );

  useEffect(() => {
    console.log(config);
  }, [config]);

  return { config, loading: Object.keys(config).length === 0, insert };
};
