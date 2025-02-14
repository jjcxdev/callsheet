import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { AddressAutocomplete } from "@/components/address-autocomplete";
import { ImageUpload } from "@/components/image-upload";
import { InputFormProps } from "@/types";
import { handleChange, handleDayOfDaysChange } from "@/constants/ui";
import { Switch } from "../ui/switch";

export function Production({ data, onChange }: InputFormProps) {
  return (
    <>
      <h3 className="mb-4 text-lg font-semibold">Production Details</h3>
      <div className="flex flex-col gap-6">
        <div className="flex w-full gap-2">
          {/* Production Name */}

          <div className="flex w-1/3 flex-col gap-2">
            <Label className="block truncate" htmlFor="productionName">
              Production Name
            </Label>
            <Input
              id="productionName"
              name="productionName"
              value={data.productionName}
              onChange={handleChange}
            />
          </div>

          {/* Job Name */}
          <div className="flex w-1/3 flex-col gap-2">
            <Label htmlFor="jobName">Job Name</Label>
            <Input
              id="jobName"
              name="jobName"
              value={data.jobName}
              onChange={handleChange}
            />
          </div>

          {/* Docket Number */}

          <div className="flex w-1/3 flex-col gap-2">
            <Label className="block truncate" htmlFor="docketNumber">
              Docket Number
            </Label>
            <Input
              id="docketNumber"
              name="docketNumber"
              value={data.docketNumber}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Production Company, Director, Executive Producer, Line Producer */}

        <div className="flex gap-2">
          {/* Production Company */}

          <div className="flex w-6/12 flex-col gap-2">
            <Label htmlFor="prodcoName">Production Company</Label>
            <div className="w-full">
              <AddressAutocomplete
                id="prodcoAddress"
                placeholder="Search for company or enter address"
                name="prodcoAddress"
                value={data.prodcoAddress}
                onAddressSelect={(addressData) => {
                  if (addressData.name) {
                    onChange({
                      prodcoName: addressData.name,
                      prodcoAddress: addressData.address,
                    });
                  } else {
                    onChange({
                      prodcoName: "",
                      prodcoAddress: addressData.address,
                    });
                  }
                }}
              />
            </div>
          </div>

          {/* Director */}

          <div className="flex w-2/12 flex-col gap-2">
            <div className="w-full">
              <Label className="block truncate" htmlFor="director">
                Director
              </Label>
            </div>
            <Input
              id="director"
              name="director"
              value={data.director}
              onChange={handleChange}
            />
          </div>

          {/* Executive Producer */}

          <div className="flex w-2/12 flex-col gap-2">
            <div className="w-full">
              <Label className="block truncate" htmlFor="executiveProducer">
                Executive Producer
              </Label>
            </div>
            <Input
              id="executiveProducer"
              name="executiveProducer"
              value={data.executiveProducer}
              onChange={handleChange}
            />
          </div>

          {/* Line Producer */}

          <div className="flex w-2/12 flex-col gap-2">
            <div className="w-full">
              <Label className="block truncate" htmlFor="lineProducer">
                Line Producer
              </Label>
            </div>
            <Input
              id="lineProducer"
              name="lineProducer"
              value={data.lineProducer}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex gap-2">
          {/* Camera */}

          <div className="flex w-4/12 flex-col gap-2">
            <Label htmlFor="camera">Camera</Label>
            <Input
              id="camera"
              name="camera"
              value={data.camera}
              onChange={handleChange}
            />
          </div>

          {/* Sync/MOS */}

          <div className="flex w-3/12 flex-col gap-2">
            <Label htmlFor="syncMOS">Sync/MOS</Label>
            <Select
              name="syncMOS"
              value={data.syncMOS}
              onValueChange={(value) => onChange({ syncMOS: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sync/MOS" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Sync">Sync</SelectItem>
                <SelectItem value="MOS">MOS</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Day of Days */}

          <div className="flex w-3/12 flex-col gap-2">
            <Label className="block truncate" htmlFor="dayOfDays">
              Day of Days
            </Label>
            <div className="flex gap-1">
              <Input
                className="w-full px-1 text-center [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden"
                id="dayOf"
                placeholder="Day"
                type="number"
                value={data.dayofdays[0]?.dayOf || ""}
                onChange={(e) => handleDayOfDaysChange("dayOf", e.target.value)}
                disabled={!data.dayofdays[0]?.days}
              />
              <Input
                className="w-full px-1 text-center [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden"
                id="days"
                placeholder="Total"
                type="number"
                value={data.dayofdays[0]?.days ?? ""}
                onChange={(e) => handleDayOfDaysChange("days", e.target.value)}
              />
            </div>
          </div>

          {/* Invoice Email */}

          <div className="flex w-full flex-col gap-2">
            <Label className="block truncate" htmlFor="productionEmail">
              Invoice Email
            </Label>
            <Input
              id="productionEmail"
              name="productionEmail"
              value={data.productionEmail}
              onChange={handleChange}
            />
          </div>

          {/* Invoice Section Toggle */}
          <div className="mb-1 flex w-fit items-end gap-2 whitespace-nowrap">
            <Switch
              id="showInvoice"
              name="showInvoice"
              checked={data.showInvoice}
              onCheckedChange={(checked) => onChange({ showInvoice: checked })}
            />
            <Label htmlFor="showInvoice">Invoice Info</Label>
          </div>
        </div>

        {/* Client, Agency, Production Logo */}

        <div className="flex gap-2">
          {/* Client Logo */}

          <div className="w-1/3">
            <ImageUpload
              id="clientLogo"
              label="Client Logo"
              value={data.clientLogo}
              onChange={(value) => onChange({ clientLogo: value })}
            />
          </div>

          {/* Agency Logo */}

          <div className="w-1/3">
            <ImageUpload
              id="agencyLogo"
              label="Agency Logo"
              value={data.agencyLogo}
              onChange={(value) => onChange({ agencyLogo: value })}
            />
          </div>

          {/* Production Logo */}

          <div className="w-1/3">
            <ImageUpload
              id="productionLogo"
              label="Production Logo"
              value={data.productionLogo}
              onChange={(value) => onChange({ productionLogo: value })}
            />
          </div>
        </div>
      </div>
    </>
  );
}
