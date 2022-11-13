import { atom } from "recoil";
import { Config } from "../hooks/useConfig";

export const configState = atom<Config>({
  key: "Config",
  default: {},
  dangerouslyAllowMutability: true,
});
