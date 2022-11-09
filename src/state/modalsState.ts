import { atom } from "recoil";

export interface ModalDispatch {
  id: string;
  args: { [key: string]: any };
}

export const modalsState = atom<ModalDispatch[]>({
  key: "Modals",
  default: [],
});
