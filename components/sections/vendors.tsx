import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { InputFormProps } from "@/types";
import { addVendor, updateVendor, deleteVendor } from "@/constants/ui";

export function Vendors({ data, onChange }: InputFormProps) {
  return (
    <div>
      <h3 className="mb-2 text-lg font-semibold">Vendors</h3>
      {data.vendor.map((vendor, index) => (
        <div key={index} className="mb-2 flex gap-2">
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
          <Button
            type="button"
            variant="destructive"
            onClick={() => deleteVendor(index)}
          >
            X
          </Button>
        </div>
      ))}
      <Button type="button" onClick={addVendor}>
        Add Vendor
      </Button>
    </div>
  );
}
