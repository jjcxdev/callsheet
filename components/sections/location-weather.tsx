import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  handleDateChange,
  handleTimeChange,
  addLocation,
  addHospital,
  deleteHospital,
  deleteLocation,
} from "@/constants/ui";
import { InputFormProps } from "@/types";
import { initializeUtils } from "@/constants/ui";
import { AddressAutocomplete } from "@/components/address-autocomplete";

import { handleChange } from "@/constants/ui";
import { handleWeatherUpdate } from "@/constants/ui";
import { CalendarIcon, X } from "lucide-react";

export function LocationWeather({ data, onChange }: InputFormProps) {
  initializeUtils({ data, onChange });
  return (
    <>
      <h3 className="mb-4 text-lg font-semibold">Location & Weather</h3>
      <div className="flex flex-col gap-6">
        <div className="flex w-full gap-2">
          <div className="flex w-2/3 flex-col gap-2">
            {/* Date */}

            <Label className="block truncate" htmlFor="date">
              Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start rounded-sm py-2 text-left font-normal",
                    !data.date && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-1 w-1" />
                  {data.date ? (
                    format(data.date, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={data.date}
                  onSelect={handleDateChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Call Time */}

          <div className="flex w-2/12 flex-col gap-2">
            <Label className="block truncate" htmlFor="callTime">
              Call Time
            </Label>
            <Input
              id="callTime"
              name="callTime"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="HHMM"
              value={data.callTime}
              onChange={(e) => handleTimeChange(e, "callTime")}
            />
          </div>

          {/* Crew Call Time */}

          <div className="flex w-2/12 flex-col gap-2">
            <Label className="block truncate" htmlFor="crewCallTime">
              Crew Call
            </Label>
            <Input
              id="crewCallTime"
              name="crewCallTime"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="HHMM"
              value={data.crewCallTime}
              onChange={(e) => handleTimeChange(e, "crewCallTime")}
            />
          </div>
          <div className="flex items-end">
            <Button
              type="button"
              onClick={handleWeatherUpdate}
              disabled={!data.location[0]?.coordinates || !data.date}
            >
              Update Weather
            </Button>
          </div>
        </div>

        {/* Set Cell Contact */}
        <div className="flex gap-2">
          {/* Set Cell Contact */}

          <div className="flex w-1/3 flex-col gap-2">
            <Label className="block truncate" htmlFor="setCellContact">
              Set Cell Contact
            </Label>
            <Input
              id="setCellContact"
              name="setCellContact"
              value={data.setCellContact}
              onChange={handleChange}
            />
          </div>

          {/* Set Cell Position */}

          <div className="flex w-1/3 flex-col gap-2">
            <Label className="block truncate" htmlFor="setCellPosition">
              Set Cell Position
            </Label>
            <Input
              id="setCellPosition"
              name="setCellPosition"
              value={data.setCellPosition}
              onChange={handleChange}
            />
          </div>

          {/* Set Cell Number */}

          <div className="flex w-1/3 flex-col gap-2">
            <Label className="block truncate" htmlFor="setCellNumber">
              Set Cell Number
            </Label>
            <Input
              id="setCellNumber"
              name="setCellNumber"
              value={data.setCellNumber}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Location */}

        <div className="flex w-full gap-2">
          {/* Location */}

          <div className="flex w-full flex-col gap-2">
            <Label htmlFor="location">Location</Label>
            {data.location.map((location, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="flex-1">
                  <AddressAutocomplete
                    id={`location-${index}-address`}
                    placeholder="Address"
                    value={location.address}
                    onAddressSelect={(addressData) => {
                      console.log(
                        "Location AddressAutocomplete callback:",
                        addressData,
                      );
                      const newLocation = [...data.location];
                      newLocation[index] = {
                        ...newLocation[index],
                        name: addressData.name || "",
                        address: addressData.address,
                        coordinates: addressData.coordinates,
                      };
                      console.log("Updated location array:", newLocation);
                      onChange({ location: newLocation });
                    }}
                  />
                </div>
                {index > 0 && (
                  <Button
                    className="w-fit"
                    type="button"
                    onClick={() => deleteLocation(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button className="w-fit" type="button" onClick={addLocation}>
              Add Location
            </Button>
          </div>

          {/* Hospital */}
          <div className="flex w-full flex-col gap-2">
            <Label htmlFor="location">Hospital</Label>
            {data.hospital.map((hospital, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="flex-1">
                  <AddressAutocomplete
                    id={`hospital-${index}-address`}
                    placeholder="Address"
                    value={hospital.address}
                    onAddressSelect={(addressData) => {
                      console.log(
                        "Location AddressAutocomplete callback:",
                        addressData,
                      );
                      const newHospital = [...data.hospital];
                      newHospital[index] = {
                        ...newHospital[index],
                        name: addressData.name || "",
                        address: addressData.address || "",
                        phoneNumber: addressData.phoneNumber || "",
                      };
                      console.log("Updated hospital array:", newHospital);
                      onChange({ hospital: newHospital });
                    }}
                  />
                </div>
                {index > 0 && (
                  <Button
                    className="w-fit"
                    type="button"
                    onClick={() => deleteHospital(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button className="w-fit" type="button" onClick={addHospital}>
              Add Hospital
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
