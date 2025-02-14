import { InputFormProps } from "@/types";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import {
  handleTimeChange,
  addTalentMember,
  updateTalentMember,
  deleteTalentMember,
} from "@/constants/ui";

export function Talent({ data, onChange }: InputFormProps) {
  return (
    <div>
      <h3 className="mb-2 text-lg font-semibold">Cast</h3>
      {data.talent.map((member, index) => (
        <div key={index} className="mb-2 flex gap-2">
          <Input
            placeholder="Role"
            value={member.role}
            onChange={(e) => updateTalentMember(index, "role", e.target.value)}
          />
          <Input
            placeholder="Name"
            value={member.name}
            onChange={(e) => updateTalentMember(index, "name", e.target.value)}
          />
          <Input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="Call Time"
            value={member.callTime}
            onChange={(e) => handleTimeChange(e, "talent", index)}
          />
          <Button
            type="button"
            variant="destructive"
            onClick={() => deleteTalentMember(index)}
          >
            X
          </Button>
        </div>
      ))}
      <Button type="button" onClick={addTalentMember}>
        Add Cast Member
      </Button>
    </div>
  );
}
