import { ReactComponent as Remove } from "../../../assets/icons/remove.svg";
import { useModalDispatch } from "../../../hooks/useModalDispatch";
import { ButtonProps } from "../types";

export const RemoveButton: React.FC<ButtonProps> = ({ location }) => {
  const openModal = useModalDispatch();

  return <Remove />;
};
