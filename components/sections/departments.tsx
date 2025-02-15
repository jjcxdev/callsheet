import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputFormProps } from "@/types";
import {
  addDepartment,
  updateDepartment,
  deleteDepartment,
  updateWalkies,
} from "@/constants/ui";
import { Separator } from "@/components/ui/separator";
import { Switch } from "../ui/switch";
import { Label } from "@radix-ui/react-label";
import { X } from "lucide-react";

export function Departments({ data, onChange }: InputFormProps) {
  return (
    <div>
      <h3 className="mb-2 text-lg font-semibold">Departments</h3>
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-2">
          {data.department.map((dept, index) => (
            <div key={index} className="group relative">
              <Input
                className="w-fit"
                placeholder="Department Name"
                value={dept.department}
                onChange={(e) => updateDepartment(index, e.target.value)}
              />
              {index > 0 && (
                <div className="absolute -right-2 -top-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <Button
                    type="button"
                    className="h-fit w-fit rounded-full p-0.5"
                    variant="destructive"
                    onClick={() => deleteDepartment(index)}
                  >
                    <X className="h-1 w-1" />
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>

        <Button type="button" className="w-fit" onClick={addDepartment}>
          Add Department
        </Button>

        <Separator className="my-2" orientation="horizontal" />

        <div className="flex items-center gap-2">
          <Switch
            id="enableWalkies"
            checked={data.showWalkies}
            onCheckedChange={(checked) => onChange({ showWalkies: checked })}
          />
          <Label htmlFor="enableWalkies">Enable Walkies</Label>
        </div>
        {data.showWalkies && (
          <div className="mb-2 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="w-44">Open</div>
              <Input
                type="number"
                placeholder="Channel"
                id="open-walkies"
                className="w-32"
                value={data.openWalkies || ""}
                onChange={(e) =>
                  onChange({ openWalkies: parseInt(e.target.value) || 0 })
                }
              />
            </div>
            {data.department.map((dept, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-44">{dept.department}</div>
                <Input
                  type="number"
                  placeholder="Channel"
                  id={`${dept.department}-walkies`}
                  className="w-32"
                  value={dept.walkies || ""}
                  onChange={(e) => updateWalkies(index, e.target.value)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
