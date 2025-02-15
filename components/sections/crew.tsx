import { InputFormProps } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  addCrewMember,
  updateCrewMember,
  deleteCrewMember,
  handleTimeChange,
} from "@/constants/ui";

export function Crew({ data }: InputFormProps) {
  return (
    <div>
      <h3 className="mb-2 text-lg font-semibold">Crew</h3>
      {data.crew.map((member, index) => (
        <div key={index} className="group relative mb-2 flex gap-2">
          <Select
            value={member.department}
            onValueChange={(value) =>
              updateCrewMember(index, "department", value)
            }
          >
            <SelectTrigger className="w-2/12">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              {data.department
                .filter((dept) => dept.department.trim() !== "")
                .map((dept, index) => (
                  <SelectItem key={index} value={dept.department}>
                    {dept.department}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>

          <Input
            className="w-2/12"
            placeholder="Position"
            value={member.position}
            onChange={(e) =>
              updateCrewMember(index, "position", e.target.value)
            }
          />
          <Input
            className="w-2/12"
            placeholder="Name"
            value={member.name}
            onChange={(e) => updateCrewMember(index, "name", e.target.value)}
          />
          <Input
            className="w-2/12"
            placeholder="Cell"
            type="tel"
            value={member.cell}
            onChange={(e) => updateCrewMember(index, "cell", e.target.value)}
          />
          <Input
            className="w-3/12"
            placeholder="Email"
            type="email"
            value={member.email}
            onChange={(e) => updateCrewMember(index, "email", e.target.value)}
          />
          <Input
            className="w-[10%]"
            placeholder="LOC"
            value={member.loc}
            onChange={(e) => updateCrewMember(index, "loc", e.target.value)}
          />
          <Input
            className="w-[10%]"
            type="text"
            placeholder="Call"
            value={member.callTime}
            onChange={(e) => handleTimeChange(e, "crew", index)}
          />
          {index > 0 && (
            <div className="absolute -right-2 -top-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
              <Button
                type="button"
                className="h-fit w-fit rounded-full p-0.5"
                variant="destructive"
                onClick={() => deleteCrewMember(index)}
              >
                <X className="h-1 w-1" />
              </Button>
            </div>
          )}
        </div>
      ))}
      <Button type="button" onClick={addCrewMember}>
        Add Crew Member
      </Button>
    </div>
  );
}
