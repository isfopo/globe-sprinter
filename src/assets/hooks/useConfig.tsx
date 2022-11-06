import { invoke } from "@tauri-apps/api/tauri";
import { useEffect, useState } from "react";

export interface Config {
  [key: string]: string | Config;
}

export const useConfig = (): {
  config: Config | undefined;
  loading: boolean;
} => {
  const [config, setConfig] = useState<Config>();

  useEffect(() => {
    const get = async () => {
      setConfig(JSON.parse(await invoke<string>("get_config")));
    };
    get();
  }, []);

  console.log(config);

  return { config, loading: !config };
};
