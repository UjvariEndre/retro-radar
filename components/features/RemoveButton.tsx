import { LucideMinusCircle } from "lucide-react";
import RRButton from "./RRButton";

interface RemoveButtonProps {
  onChange: () => void;
}

const RemoveButton = ({ onChange }: RemoveButtonProps) => {
  return (
    <RRButton type="button" variant="destructive" onClick={() => onChange()}>
      <LucideMinusCircle style={{ width: "1.5rem", height: "1.5rem" }} />
    </RRButton>
  );
};
export default RemoveButton;
