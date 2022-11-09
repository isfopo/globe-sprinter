import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { modalsState } from "../state/atoms/ModalsState";

export const useModalDispatch = () => {
  const setModals = useSetRecoilState(modalsState);

  const openModal = useCallback(
    (modal: string) => {
      setModals((m) => [...m, modal]);
    },
    [setModals]
  );

  return openModal;
};
