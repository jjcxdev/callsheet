import { InputFormProps } from "@/types";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import {
  handleTimeChange,
  addTalentMember,
  updateTalentMember,
  deleteTalentMember,
} from "@/constants/ui";
import { X } from "lucide-react";

export function Talent({ data }: InputFormProps) {
  return (
    <div>
      <h3 className="mb-2 text-lg font-semibold">Talent</h3>
      {data.talent.map((member, index) => (
        <div key={index} className="group relative mb-2 flex gap-2">
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
          {index > 0 && (
            <div className="absolute -right-2 -top-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
              <Button
                type="button"
                className="h-fit w-fit rounded-full p-0.5"
                variant="destructive"
                onClick={() => deleteTalentMember(index)}
              >
                <X className="h-1 w-1" />
              </Button>
            </div>
          )}
        </div>
      ))}
      <Button type="button" onClick={addTalentMember}>
        Add Cast Member
      </Button>
    </div>
  );
}
