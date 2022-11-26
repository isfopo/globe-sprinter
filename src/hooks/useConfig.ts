import { invoke } from "@tauri-apps/api";
import { listen } from "@tauri-apps/api/event";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { renameKey } from "../helpers/objects";
import { configState } from "../state/configState";

export interface Config {
  [key: string]: string | Config;
}

export const useConfig = (): {
  config: Config;
  loading: boolean;
  insert: (location: string, key: string, command?: string) => void;
  update: (location: string, value: string, isCommand?: boolean) => void;
  remove: (location: string) => void;
} => {
  const [config, setConfig] = useRecoilState(configState);

  useEffect(() => {
    const get = async () => {
      if (!config) {
        setConfig(JSON.parse(await invoke<string>("get_config_json")));
        await listen("reload", async () => {
          setConfig(JSON.parse(await invoke<string>("get_config_json")));
        });
      }
    };
    get();
  }, []);

  const sync = useCallback(
    async (config: Config) => {
      setConfig(
        JSON.parse(
          await invoke("write_config", { json: JSON.stringify(config) })
        )
      );
    },
    [setConfig]
  );

  const insert = useCallback(
    async (location: string, key: string, command?: string) => {
      if (!config) return;

      if (JSON.stringify(config).includes(`"${key}":`)) {
        toast.error("Duplicate keys not allowed");
        return;
      }

      const branch = location?.split("/").filter((step) => step) ?? [];
      let place = config;
      for (const step of branch) {
        place = place[step] as Config;
      }
      place[key] = command ?? ({} as Config);

      sync(config);
    },
    [setConfig, config]
  );

  const update = useCallback(
    async (title: string, value: string, isCommand?: boolean) => {
      if (!config) return;

      if (isCommand) {
      } else {
        if (title === value) {
          return;
        }
        if (JSON.stringify(config).includes(`"${value}":`)) {
          toast.error("Duplicate keys not allowed");
          return;
        }
        setConfig(
          JSON.parse(
            await invoke("write_config", {
              json: JSON.stringify(config).replace(
                `"${title}":`,
                `"${value}":`
              ),
            })
          )
        );
      }
    },
    [config, setConfig]
  );

  const remove = useCallback(
    async (location: string) => {
      if (!config) return;
      const branch = location?.split("/").filter((step) => step) ?? [];
      const key = branch.pop();

      let place = config;
      for (const step of branch) {
        place = place[step] as Config;
      }
      if (key) {
        delete place[key];
      }
      sync(config);
    },
    [setConfig, config]
  );

  return { config: config ?? {}, loading: !config, insert, remove, update };
};
