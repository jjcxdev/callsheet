"use client";

import type React from "react";
import { InputFormProps } from "@/types";
import { Departments } from "@/components/sections/departments";
import { Crew } from "@/components/sections/crew";
import { Talent } from "@/components/sections/talent";
import { Vendors } from "@/components/sections/vendors";
import { Notes } from "@/components/sections/notes";
import { initializeUtils } from "@/constants/ui";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Production } from "@/components/sections/production";
import { LocationWeather } from "@/components/sections/location-weather";

export default function InputForm({ data, onChange }: InputFormProps) {
  initializeUtils({ data, onChange });

  return (
    <div className="space-y-4 pb-8">
      <Tabs className="w-full" defaultValue="production">
        <TabsList className="w-full">
          <TabsTrigger value="production">Production</TabsTrigger>
          <TabsTrigger value="location-weather">Location & Weather</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="crew">Crew</TabsTrigger>
          <TabsTrigger value="talent">Talent</TabsTrigger>
          <TabsTrigger value="vendors">Vendors</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>
        <TabsContent value="production">
          <Production data={data} onChange={onChange} />
        </TabsContent>
        <TabsContent value="location-weather">
          <LocationWeather data={data} onChange={onChange} />
        </TabsContent>
        <TabsContent value="departments">
          <Departments data={data} onChange={onChange} />
        </TabsContent>
        <TabsContent value="crew">
          <Crew data={data} onChange={onChange} />
        </TabsContent>
        <TabsContent value="talent">
          <Talent data={data} onChange={onChange} />
        </TabsContent>
        <TabsContent value="vendors">
          <Vendors data={data} onChange={onChange} />
        </TabsContent>
        <TabsContent value="notes">
          <Notes data={data} onChange={onChange} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// invoice email, docket, job name together
