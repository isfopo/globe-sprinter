export interface SettingInputProps {
  name: string;
  value: any;
}

export const SettingInput: React.FC<SettingInputProps> = ({ name, value }) => {
  return (
    <span>
      <p>{name}</p>
      <p>{value}</p>
    </span>
  );
};
