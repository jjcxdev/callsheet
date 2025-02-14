"use client";

import { useEffect, useState } from "react";
import InputForm from "@/components/input-form";
import CallSheetPreview from "@/components/call-sheet-preview";
import { WeatherData } from "@/types";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { Moon, Sun } from "lucide-react";
import { InputFormProps } from "@/types";

export default function CallSheetGenerator() {
  const [theme, setTheme] = useState("light");
  const [callSheetData, setCallSheetData] = useState<InputFormProps["data"]>({
    productionName: "",
    date: undefined as Date | undefined,
    dayofdays: [],
    callTime: "",
    docketNumber: "",
    syncMOS: "",
    jobName: "",
    notes: [{ note: "" }],
    camera: "",
    vendor: [{ dept: "", name: "", contact: "" }],
    crewCallTime: "",
    department: [{ department: "", walkies: 0 }],
    prodcoName: "",
    prodcoAddress: "",
    productionEmail: "",
    clientLogo: null,
    openWalkies: 0,
    agencyLogo: null,
    productionLogo: null,
    setCellContact: "",
    showWalkies: false,
    showInvoice: false,
    setCellNumber: "",
    setCellPosition: "",
    location: [
      { name: "", address: "", phoneNumber: "", coordinates: undefined },
    ],
    hospital: [{ name: "", address: "", phoneNumber: "" }],
    director: "",
    executiveProducer: "",
    lineProducer: "",
    talent: [{ name: "", role: "", callTime: "" }],
    crew: [
      {
        department: "",
        name: "",
        position: "",
        cell: "",
        email: "",
        loc: "",
        callTime: "",
      },
    ],
    weather: undefined,
  });

  const handleThemeChange = (value: string) => {
    setTheme(value || "light");

    const htmlElement = document.documentElement;
    htmlElement.classList.remove("light", "dark");
    htmlElement.classList.add(value || "light");
  };

  const handleInputChange = (newData: Partial<typeof callSheetData>) => {
    console.log("CallSheetGenerator - Received new data:", newData);
    setCallSheetData((prevData) => {
      const updatedData = { ...prevData, ...newData };
      console.log("CallSheetGenerator - Updated state:", updatedData);
      return updatedData;
    });
  };

  const addDepartment = () => {
    const newDepartmentNumber = callSheetData.department.length + 1;
    handleInputChange({
      department: [
        ...callSheetData.department,
        { department: `Department ${newDepartmentNumber}`, walkies: 0 },
      ],
    });
  };

  useEffect(() => {
    const htmlElement = document.documentElement;
    htmlElement.classList.remove("light", "dark");
    htmlElement.classList.add(theme);
  }, [theme]);

  return (
    <div className="flex h-full flex-col lg:flex-row">
      <div className="w-full overflow-y-auto p-4 lg:w-1/2">
        <div className="flex w-full justify-between">
          <h1 className="mb-4 text-2xl font-bold">Call Sheet Generator</h1>
          <ToggleGroup
            type="single"
            value={theme}
            onValueChange={handleThemeChange}
          >
            <ToggleGroupItem aria-label="Light" value="light">
              <Sun className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem aria-label="Dark" value="dark">
              <Moon className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <InputForm data={callSheetData} onChange={handleInputChange} />
      </div>
      <div className="w-full overflow-y-auto bg-neutral-200 dark:bg-neutral-900 lg:w-1/2">
        <CallSheetPreview data={callSheetData} onChange={handleInputChange} />
      </div>
    </div>
  );
}
