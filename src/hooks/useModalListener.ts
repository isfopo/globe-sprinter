import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { modalsState } from "../state/modalsState";

export const useModalListener = (
  id: string,
  onOpen: () => void,
  onRemove: () => void
) => {
  const [modals, setModals] = useRecoilState(modalsState);
  const [args, setArgs] = useState<{ [key: string]: any }>();

  useEffect(() => {
    if (modals.map((m) => m.id).includes(id)) {
      onOpen();
      setArgs(modals.filter((m) => m.id === id)[0].args);
    } else {
      onRemove();
    }
  }, [modals, onOpen, id]);

  const remove = useCallback(() => {
    setModals((m) => m.filter((n) => n.id !== id));
  }, [setModals]);

  return { remove, args };
};
