import { invoke } from "@tauri-apps/api";
import { selector } from "recoil";
import { Config } from "../hooks/useConfig";

export const configState = selector<Config | undefined>({
  key: "Config",
  dangerouslyAllowMutability: true,
  get: async () => {
    return JSON.parse(await invoke<string>("get_config_json"));
  },
  set: ({ set }, config) => {
    console.log(config);
    invoke("write_config", { json: JSON.stringify(config) });
  },
});
