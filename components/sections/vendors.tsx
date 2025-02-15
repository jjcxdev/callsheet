import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { InputFormProps } from "@/types";
import { addVendor, updateVendor, deleteVendor } from "@/constants/ui";
import { X } from "lucide-react";

export function Vendors({ data }: InputFormProps) {
  return (
    <div>
      <h3 className="mb-2 text-lg font-semibold">Vendors</h3>
      {data.vendor.map((vendor, index) => (
        <div key={index} className="group relative mb-2 flex gap-2">
          <Input
            placeholder="Department"
            value={vendor.dept}
            onChange={(e) => updateVendor(index, "dept", e.target.value)}
          />
          <Input
            placeholder="Vendor Name"
            value={vendor.name}
            onChange={(e) => updateVendor(index, "name", e.target.value)}
          />
          <Input
            type="tel"
            inputMode="numeric"
            placeholder="Tel"
            value={vendor.contact}
            onChange={(e) => updateVendor(index, "contact", e.target.value)}
          />
          {index > 0 && (
            <div className="absolute -right-2 -top-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
              <Button
                type="button"
                className="h-fit w-fit rounded-full p-0.5"
                variant="destructive"
                onClick={() => deleteVendor(index)}
              >
                <X className="h-1 w-1" />
              </Button>
            </div>
          )}
        </div>
      ))}
      <Button type="button" onClick={addVendor}>
        Add Vendor
      </Button>
    </div>
  );
}
