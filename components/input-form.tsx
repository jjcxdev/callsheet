"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { ImageUpload } from "./image-upload";
import { AddressAutocomplete } from "./address-autocomplete";
import { WeatherData } from "@/types";

interface InputFormProps {
  data: {
    productionName: string;
    date: Date | undefined;
    dayofdays: Array<{ dayOf: number; days: number }>;
    callTime: string;
    syncMOS: string;
    crewCallTime: string;
    prodcoName: string;
    prodcoAddress: string;
    setCellContact: string;
    setCellNumber: string;
    setCellPosition: string;
    department: Array<{ department: string }>;
    clientLogo: string | null;
    agencyLogo: string | null;
    productionLogo: string | null;
    jobName: string;
    camera: string;
    location: Array<{
      name: string;
      address: string;
      phoneNumber: string;
      coordinates?: {
        lat: number;
        lng: number;
      };
    }>;
    hospital: Array<{ name: string; address: string; phoneNumber: string }>;
    director: string;
    executiveProducer: string;
    lineProducer: string;
    cast: Array<{ name: string; character: string; callTime: string }>;
    crew: Array<{
      department: string;
      name: string;
      position: string;
      contact: string;
      email: string;
      loc: string;
      callTime: string;
    }>;
    weather?: WeatherData;
  };
  onChange: (newData: Partial<InputFormProps["data"]>) => void;
}

export default function InputForm({ data, onChange }: InputFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  const handleDateChange = (date: Date | undefined) => {
    onChange({ date });
  };

  const handleTimeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string,
    index?: number
  ) => {
    const { value } = e.target;
    const numericValue = value.replace(/\D/g, "");

    let formattedValue = numericValue;
    if (numericValue.length > 4) {
      formattedValue = numericValue.slice(0, 4);
    }
    if (
      /^([01]\d|2[0-3])([0-5]\d)?$|^2400$/.test(formattedValue) ||
      formattedValue === "" ||
      formattedValue.length < 4
    ) {
      if (index !== undefined) {
        if (field === "cast") {
          const newCast = [...data.cast];
          newCast[index] = { ...newCast[index], callTime: formattedValue };
          onChange({ cast: newCast });
        } else if (field === "crew") {
          const newCrew = [...data.crew];
          newCrew[index] = { ...newCrew[index], callTime: formattedValue };
          onChange({ crew: newCrew });
        }
      } else {
        onChange({ [field]: formattedValue });
      }
    }
  };

  const updateLocation = (index: number, field: string, value: any) => {
    console.log("InputForm - updateLocation:", { index, field, value });
    const newLocation = [...data.location];
    newLocation[index] = { ...newLocation[index], [field]: value };
    console.log("InputForm - newLocation:", newLocation);
    onChange({ location: newLocation });
  };

  const addCastMember = () => {
    onChange({
      cast: [...data.cast, { name: "", character: "", callTime: "" }],
    });
  };

  const updateCastMember = (index: number, field: string, value: string) => {
    const newCast = [...data.cast];
    newCast[index] = { ...newCast[index], [field]: value };
    onChange({ cast: newCast });
  };

  const addCrewMember = () => {
    onChange({
      crew: [
        ...data.crew,
        {
          department: "",
          name: "",
          position: "",
          contact: "",
          email: "",
          loc: "",
          callTime: "",
        },
      ],
    });
  };

  const addDepartment = () => {
    onChange({
      department: [...data.department, { department: "" }],
    });
  };

  const updateCrewMember = (index: number, field: string, value: string) => {
    const newCrew = [...data.crew];
    newCrew[index] = { ...newCrew[index], [field]: value };
    onChange({ crew: newCrew });
  };

  const updateDepartment = (index: number, value: string) => {
    const newDepartment = [...data.department];
    newDepartment[index] = { department: value };
    onChange({ department: newDepartment });
  };

  const handleDayOfDaysChange = (field: "dayOf" | "days", value: string) => {
    const newDayofdays = [...data.dayofdays];
    const numValue = parseInt(value) || 0;

    if (field === "dayOf") {
      // Ensure dayOf doesn't exceed current days value
      newDayofdays[0] = {
        ...newDayofdays[0],
        dayOf: Math.min(numValue, newDayofdays[0].days),
      };
    } else if (field === "days") {
      // If days is reduced below current dayOf, adjust dayOf accordingly
      newDayofdays[0] = {
        ...newDayofdays[0],
        days: numValue,
        dayOf: Math.min(newDayofdays[0].dayOf, numValue),
      };
    }

    onChange({ dayofdays: newDayofdays });
  };

  const handleWeatherUpdate = async () => {
    const locationData = data.location[0];
    console.log("Location data:", locationData);
    console.log("Date:", data.date);

    if (!locationData?.coordinates || !data.date) {
      console.error("Missing location coordinates or date");
      console.log("Coordinates:", locationData?.coordinates);
      console.log("Date:", data.date);
      return;
    }

    try {
      const formattedDate = format(data.date, "yyyy-MM-dd");
      const response = await fetch(
        `https://api.tomorrow.io/v4/weather/forecast?` +
          `location=${locationData.coordinates.lat},${locationData.coordinates.lng}&` +
          `timesteps=1d&` +
          `startTime=${formattedDate}&` +
          `endTime=${formattedDate}&` +
          `units=metric&` +
          `apikey=${process.env.NEXT_PUBLIC_TOMORROW_API_KEY}`
      );

      if (!response.ok) {
        throw new Error("Weather API request failed");
      }

      const weatherData = await response.json();
      const dailyData = weatherData.timelines.daily[0];

      // Create a mapping of weather codes to conditions
      const weatherConditions: { [key: number]: string } = {
        0: "Unknown",
        1000: "Clear",
        1001: "Cloudy",
        1100: "Mostly Clear",
        1101: "Partly Cloudy",
        1102: "Mostly Cloudy",
        2000: "Fog",
        2100: "Light Fog",
        3000: "Light Wind",
        3001: "Wind",
        3002: "Strong Wind",
        4000: "Drizzle",
        4001: "Rain",
        4200: "Light Rain",
        4201: "Heavy Rain",
        5000: "Snow",
        5001: "Flurries",
        5100: "Light Snow",
        5101: "Heavy Snow",
        6000: "Freezing Drizzle",
        6001: "Freezing Rain",
        6200: "Light Freezing Rain",
        6201: "Heavy Freezing Rain",
        7000: "Ice Pellets",
        7101: "Heavy Ice Pellets",
        7102: "Light Ice Pellets",
        8000: "Thunderstorm",
      };

      onChange({
        weather: {
          forecast:
            weatherConditions[dailyData.values.weatherCodeMax] || "Unknown",
          weatherCode: dailyData.values.weatherCodeMax,
          high: `${Math.round(dailyData.values.temperatureMax)}°C`,
          low: `${Math.round(dailyData.values.temperatureMin)}°C`,
          feelsLikeHigh: `${Math.round(
            dailyData.values.temperatureApparentMax
          )}°C`,
          feelsLikeLow: `${Math.round(
            dailyData.values.temperatureApparentMin
          )}°C`,
          pop: `${dailyData.values.precipitationProbabilityAvg}%`,
          sunrise: format(new Date(dailyData.values.sunriseTime), "HHmm"),
          sunset: format(new Date(dailyData.values.sunsetTime), "HHmm"),
        },
      });
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  return (
    <div className="space-y-4">
      {/* Production Details */}
      <h3 className="text-lg font-semibold mb-2">Production Details</h3>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <div className="w-10/12">
            <Label className="truncate block" htmlFor="productionName">
              Production Name
            </Label>
            <Input
              id="productionName"
              name="productionName"
              value={data.productionName}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label className="truncate block" htmlFor="dayOfDays">
              Day of Days
            </Label>
            <div className="flex gap-2">
              <Input
                className="max-w-[100px]"
                id="dayOf"
                placeholder="Day"
                type="number"
                min="0"
                value={data.dayofdays[0].dayOf}
                onChange={(e) => handleDayOfDaysChange("dayOf", e.target.value)}
              />
              <Input
                id="days"
                className="max-w-[100px]"
                placeholder="Total Days"
                type="number"
                min="0"
                value={data.dayofdays[0].days}
                onChange={(e) => handleDayOfDaysChange("days", e.target.value)}
              />
            </div>
          </div>
        </div>
        <Label htmlFor="prodcoName">Production Company</Label>
        <div className="w-full">
          <AddressAutocomplete
            id="prodcoAddress"
            placeholder="Search for company or enter address"
            name="prodcoAddress"
            value={`${data.prodcoName ? data.prodcoName + "\n" : ""}${
              data.prodcoAddress
            }`}
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

        <div className="flex gap-2">
          <div className="w-1/3">
            <Label htmlFor="jobName">Job Name</Label>
            <Input
              id="jobName"
              name="jobName"
              value={data.jobName}
              onChange={handleChange}
            />
          </div>
          <div className="w-1/3">
            <Label htmlFor="camera">Camera</Label>
            <Input
              id="camera"
              name="camera"
              value={data.camera}
              onChange={handleChange}
            />
          </div>
          <div className="w-1/3">
            <Label htmlFor="syncMOS">Sync/MOS</Label>
            <Select
              name="syncMOS"
              value={data.syncMOS}
              onValueChange={(value) => onChange({ syncMOS: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Sync">Sync</SelectItem>
                <SelectItem value="MOS">MOS</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="w-1/3">
            <ImageUpload
              id="clientLogo"
              label="Client Logo"
              value={data.clientLogo}
              onChange={(value) => onChange({ clientLogo: value })}
            />
          </div>
          <div className="w-1/3">
            <ImageUpload
              id="agencyLogo"
              label="Agency Logo"
              value={data.agencyLogo}
              onChange={(value) => onChange({ agencyLogo: value })}
            />
          </div>
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

      {/* Date */}
      <h3 className="text-lg font-semibold mb-2">Shoot Date Details</h3>
      <div className="flex w-full gap-2">
        <div className="w-10/12">
          <Label className="truncate block" htmlFor="date">
            Date
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !data.date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
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
        <div className="w-full">
          <Label className="truncate block" htmlFor="callTime">
            Call Time
          </Label>
          <Input
            id="callTime"
            name="callTime"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="0000"
            value={data.callTime}
            onChange={(e) => handleTimeChange(e, "callTime")}
          />
        </div>
        <div className="w-full">
          <Label className="truncate block" htmlFor="crewCallTime">
            Crew Call
          </Label>
          <Input
            id="crewCallTime"
            name="crewCallTime"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="0000"
            value={data.crewCallTime}
            onChange={(e) => handleTimeChange(e, "crewCallTime")}
          />
        </div>
        <div className="flex mb-[2px] items-end">
          <Button
            type="button"
            onClick={handleWeatherUpdate}
            disabled={!data.location[0]?.coordinates || !data.date}
            size="sm"
          >
            Update Weather
          </Button>
        </div>
      </div>
      <div className="flex gap-2 w-full">
        <div className="flex w-full flex-col">
          <Label htmlFor="location">Location</Label>
          {data.location.map((location, index) => (
            <div key={index} className="flex gap-2 items-center">
              <div className="flex-1">
                <AddressAutocomplete
                  id={`location-${index}-address`}
                  placeholder="Address"
                  value={location.address}
                  onAddressSelect={(addressData) => {
                    console.log(
                      "Location AddressAutocomplete callback:",
                      addressData
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
            </div>
          ))}
        </div>
        <div className="flex w-full flex-col">
          <Label htmlFor="location">Hospital</Label>
          {data.hospital.map((hospital, index) => (
            <div key={index} className="flex gap-2 items-center">
              <div className="flex-1">
                <AddressAutocomplete
                  id={`hospital-${index}-address`}
                  placeholder="Address"
                  value={hospital.address}
                  onAddressSelect={(addressData) => {
                    console.log(
                      "Location AddressAutocomplete callback:",
                      addressData
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
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-2">
        <div className="w-full">
          <Label className="truncate block" htmlFor="setCellContact">
            Set Cell Contact
          </Label>
          <Input
            id="setCellContact"
            name="setCellContact"
            value={data.setCellContact}
            onChange={handleChange}
          />
        </div>
        <div className="w-full">
          <Label className="truncate block" htmlFor="setCellPosition">
            Set Cell Position
          </Label>
          <Input
            id="setCellPosition"
            name="setCellPosition"
            value={data.setCellPosition}
            onChange={handleChange}
          />
        </div>
        <div className="w-full">
          <Label className="truncate block" htmlFor="setCellNumber">
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
      <div></div>

      {/* Above the Line */}
      <h3 className="text-lg font-semibold mb-2">Above the Line</h3>

      <div className="flex gap-2">
        <div className="w-1/3">
          <div className="w-full">
            <Label className="truncate block" htmlFor="director">
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
        <div className="w-1/3">
          <div className="w-full">
            <Label className="truncate block" htmlFor="executiveProducer">
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
        <div className="w-1/3">
          <div className="w-full">
            <Label className="truncate block" htmlFor="lineProducer">
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

      {/* Departments */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Departments</h3>
        <div className="flex flex-wrap gap-2 mb-2">
          {data.department.map((dept, index) => (
            <div key={index}>
              <Input
                className="w-fit"
                placeholder="Department Name"
                value={dept.department}
                onChange={(e) => updateDepartment(index, e.target.value)}
              />
            </div>
          ))}
        </div>
        <Button type="button" onClick={addDepartment}>
          Add Department
        </Button>
      </div>

      {/* Crew */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Crew</h3>
        {data.crew.map((member, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <Select
              value={member.department}
              onValueChange={(value) =>
                updateCrewMember(index, "department", value)
              }
            >
              <SelectTrigger>
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
              placeholder="Position"
              value={member.position}
              onChange={(e) =>
                updateCrewMember(index, "position", e.target.value)
              }
            />
            <Input
              placeholder="Name"
              value={member.name}
              onChange={(e) => updateCrewMember(index, "name", e.target.value)}
            />
            <Input
              placeholder="Contact"
              type="tel"
              value={member.contact}
              onChange={(e) =>
                updateCrewMember(index, "contact", e.target.value)
              }
            />
            <Input
              placeholder="Email"
              type="email"
              value={member.email}
              onChange={(e) => updateCrewMember(index, "email", e.target.value)}
            />
            <Input
              placeholder="LOC"
              type="number"
              value={member.loc}
              onChange={(e) => updateCrewMember(index, "loc", e.target.value)}
            />
            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="0000"
              value={member.callTime}
              onChange={(e) => handleTimeChange(e, "crew", index)}
            />
          </div>
        ))}
        <Button type="button" onClick={addCrewMember}>
          Add Crew Member
        </Button>
      </div>

      {/* Cast */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Cast</h3>
        {data.cast.map((member, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <Input
              placeholder="Name"
              value={member.name}
              onChange={(e) => updateCastMember(index, "name", e.target.value)}
            />
            <Input
              placeholder="Character"
              value={member.character}
              onChange={(e) =>
                updateCastMember(index, "character", e.target.value)
              }
            />
            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="0000"
              value={member.callTime}
              onChange={(e) => handleTimeChange(e, "cast", index)}
            />
          </div>
        ))}
        <Button type="button" onClick={addCastMember}>
          Add Cast Member
        </Button>
      </div>
    </div>
  );
}
