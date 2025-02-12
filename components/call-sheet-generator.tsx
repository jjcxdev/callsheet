"use client";

import { useState } from "react";
import InputForm from "@/components/input-form";
import CallSheetPreview from "@/components/call-sheet-preview";
import { format } from "date-fns";
import { WeatherData } from "@/types";

interface CallSheetData {
  productionName: string;
  date: Date | undefined;
  dayofdays: Array<{ dayOf: number; days: number }>;
  callTime: string;
  syncMOS: string;
  jobName: string;
  camera: string;
  setCellContact: string;
  setCellNumber: string;
  setCellPosition: string;
  crewCallTime: string;
  prodcoName: string;
  prodcoAddress: string;
  department: Array<{ department: string }>;
  clientLogo: string | null;
  agencyLogo: string | null;
  productionLogo: string | null;
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
}
export default function CallSheetGenerator() {
  const [callSheetData, setCallSheetData] = useState<CallSheetData>({
    productionName: "",
    date: undefined as Date | undefined,
    dayofdays: [{ dayOf: 0, days: 0 }],
    callTime: "",
    syncMOS: "",
    jobName: "",
    camera: "",
    crewCallTime: "",
    department: [{ department: "" }],
    prodcoName: "",
    prodcoAddress: "",
    clientLogo: null,
    agencyLogo: null,
    productionLogo: null,
    setCellContact: "",
    setCellNumber: "",
    setCellPosition: "",
    location: [
      { name: "", address: "", phoneNumber: "", coordinates: undefined },
    ],
    hospital: [{ name: "", address: "", phoneNumber: "" }],
    director: "",
    executiveProducer: "",
    lineProducer: "",
    cast: [{ name: "", character: "", callTime: "" }],
    crew: [
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
    weather: undefined,
  });

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
        { department: `Department ${newDepartmentNumber}` },
      ],
    });
  };

  return (
    <div className="h-full flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/3 p-4 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">Call Sheet Generator</h1>
        <InputForm data={callSheetData} onChange={handleInputChange} />
      </div>
      <div className="w-full lg:w-2/3 bg-gray-100 overflow-y-auto">
        <CallSheetPreview data={callSheetData} />
      </div>
    </div>
  );
}
