import { useCallback, useEffect } from "react";
import { useRecoilState } from "recoil";
import { modalsState } from "../state/modalsState";

export const useModalListener = (
  id: string,
  onOpen: () => void,
  onRemove: () => void
) => {
  const [modals, setModals] = useRecoilState(modalsState);

  useEffect(() => {
    if (modals.map((m) => m.id).includes(id)) {
      onOpen();
    } else {
      onRemove();
    }
  }, [modals, onOpen, id]);

  const remove = useCallback(() => {
    setModals((m) => m.filter((n) => n.id !== id));
  }, [setModals]);

  return remove;
};
