import { format } from "date-fns";
import Image from "next/image";
import { weatherCodeToSymbol } from "@/utils/weather-codes";
import React from "react";
import { InputFormProps } from "@/types";
import { initializeUtils } from "@/constants/ui";
import { Separator } from "./ui/separator";

function formatDate(dateString: string): string {
  return dateString;
}

function formatTime(timeString: string): string {
  return timeString;
}

export default function CallSheetPreview({ data, onChange }: InputFormProps) {
  initializeUtils({ data, onChange });
  const defaultDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="light flex h-full items-center justify-center p-4 font-oswald uppercase">
      <div
        className="mx-auto bg-white shadow-lg"
        style={{
          aspectRatio: "8.5 / 11",
          width: "min(calc(100vw - 2rem), calc((100vh - 2rem) * 8.5/11))",
          maxWidth: "8.5in",
          fontSize: "clamp(8px, calc(0.7vw + 0.3vh), 12px)",
          padding: "calc(0.10in)",
          boxSizing: "border-box",
          overflow: "hidden",
          color: "black",
        }}
      >
        <div className="text-callsheet h-full w-full border border-black">
          {/* Date Block */}
          <div className="h-2 w-full border-b border-black bg-neutral-200"></div>
          <div className="flex w-full">
            <p className="flex w-1/3 items-center pl-1">Call Sheet</p>
            <div className="flex w-1/3 items-center justify-center text-center align-middle">
              <p>day</p>
              <span
                className={`${
                  data.dayofdays[0]?.dayOf ? "" : "bg-red-200 text-red-600"
                } px-1 py-1 text-3xl leading-none`}
              >
                {data.dayofdays[0]?.dayOf || "0"}
              </span>
              <p>of</p>
              <span
                className={`${
                  data.dayofdays[0]?.days ? "" : "bg-red-200 text-red-600"
                } px-1 py-1 text-3xl leading-none`}
              >
                {data.dayofdays[0]?.days || "0"}
              </span>
            </div>
            <div
              className={`${
                data.date ? "" : "bg-red-200 text-red-600"
              } flex w-1/3 items-center justify-end pr-1`}
            >
              {data.date ? format(data.date, "MMMM dd, yyyy") : defaultDate}
            </div>
          </div>

          {/* Client, Agency, Prodco Block */}
          <div className="flex w-full border-t border-black">
            <div className="flex w-2/3">
              <div className="relative w-1/3">
                {data.clientLogo ? (
                  <Image
                    src={data.clientLogo}
                    alt="Client Logo"
                    fill
                    className="object-contain p-2"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-gray-400">
                    Client Logo
                  </div>
                )}
              </div>
              <div className="relative w-1/3">
                {data.agencyLogo ? (
                  <Image
                    src={data.agencyLogo}
                    alt="Agency Logo"
                    fill
                    className="object-contain p-2"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-gray-400">
                    Agency Logo
                  </div>
                )}
              </div>
              <div className="relative w-1/3">
                {data.productionLogo ? (
                  <Image
                    src={data.productionLogo}
                    alt="Production Logo"
                    fill
                    className="object-contain p-2"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-gray-400">
                    Production Logo
                  </div>
                )}
              </div>
            </div>
            <div className="flex w-1/3 flex-col">
              <div
                className={`${
                  data.prodcoName ? "" : "bg-red-200 text-red-600"
                } w-full pl-1`}
              >
                {data.prodcoName || "production company name"}
              </div>
              <div
                className={`${
                  data.prodcoAddress ? "" : "bg-red-200 text-red-600"
                } w-full pl-1`}
              >
                {data.prodcoAddress || "production company address"}
              </div>
              <div
                className={`${
                  data.director ? "" : "bg-red-200 text-red-600"
                } w-full pl-1 font-thin`}
              >
                <span className="pr-1 font-normal">Director</span>
                {data.director || "name"}
              </div>
              <div
                className={`${
                  data.executiveProducer ? "" : "bg-red-200 text-red-600"
                } w-full pl-1 font-thin`}
              >
                <span className="pr-1 font-normal">EP</span>
                {data.executiveProducer || "name"}
              </div>
              <div
                className={`${
                  data.lineProducer ? "" : "bg-red-200 text-red-600"
                } w-full pl-1 font-thin`}
              >
                <span className="pr-1 font-normal">Line Producer</span>
                {data.lineProducer || "name"}
              </div>
            </div>
          </div>

          {/* Production Block */}
          <div className="flex h-[60px] w-full">
            {/* Left Production Block */}
            <div className="flex h-full w-1/3 flex-col bg-neutral-200">
              <div className="flex h-[15px]">
                <div className="flex w-1/3 items-center border-y border-r border-black pl-1">
                  Product
                </div>
                <div
                  className={`${
                    data.productionName
                      ? "bg-white text-black"
                      : "bg-red-200 text-red-600"
                  } flex w-2/3 items-center border-y border-black px-1`}
                >
                  {data.productionName || "production name"}
                </div>
              </div>
              <div className="flex h-[15px]">
                <div className="flex w-1/3 items-center border-b border-r border-black pl-1">
                  Job Name
                </div>
                <div
                  className={`${
                    data.jobName
                      ? "bg-white text-black"
                      : "bg-red-200 text-red-600"
                  } flex w-2/3 items-center border-b border-black px-1`}
                >
                  {data.jobName || "job name"}
                </div>
              </div>
              <div className="flex h-[15px]">
                <div className="flex w-1/3 items-center border-b border-r border-black pl-1">
                  Camera
                </div>
                <div
                  className={`${
                    data.camera
                      ? "bg-white text-black"
                      : "bg-red-200 text-red-600"
                  } flex w-2/3 items-center border-b border-black px-1`}
                >
                  {data.camera || "camera"}
                </div>
              </div>
              <div className="flex h-[15px]">
                <div className="flex w-1/3 items-center border-r border-black pl-1">
                  Sync/MOS
                </div>
                <div
                  className={`${
                    data.syncMOS
                      ? "bg-white text-black"
                      : "bg-red-200 text-red-600"
                  } flex w-2/3 items-center px-1`}
                >
                  {data.syncMOS || "sync/mos"}
                </div>
              </div>
            </div>

            {/* Center Call Time Block */}
            <div className="flex h-full w-1/3 flex-col border-x border-black text-center">
              <div className="flex h-3 items-center justify-center border-y border-black bg-neutral-200">
                Production Call Time
              </div>
              <div
                className={`${data.callTime ? "" : "bg-red-200 text-red-600"} flex h-[calc(50%-0.75rem)] items-center justify-center text-lg leading-none`}
              >
                {data.callTime || "call time"}
              </div>
              <div className="flex h-3 items-center justify-center border-y border-black bg-neutral-200">
                Crew Call Time
              </div>
              <div
                className={`${data.crewCallTime ? "" : "bg-red-200 text-red-600"} flex h-[calc(50%-0.75rem)] items-center justify-center text-lg leading-none`}
              >
                {data.crewCallTime || "crew call time"}
              </div>
            </div>

            {/* Right Weather Block */}
            <div className="flex h-full w-1/3">
              <div className="flex w-2/3 flex-col">
                <div className="flex h-3 items-center justify-center border-y border-black bg-neutral-200">
                  Weather
                </div>
                <div className="flex h-[calc(100%-0.75rem)]">
                  <div className="flex w-1/2 items-center justify-center p-1 text-2xl">
                    {data.weather?.weatherCode
                      ? weatherCodeToSymbol[data.weather.weatherCode] || "❓"
                      : "❓"}
                  </div>
                  <div className="flex h-full w-1/2 flex-col justify-between py-1 text-[8px] leading-none">
                    <div
                      className={`${data.weather?.forecast ? "" : "bg-red-200 text-red-600"} w-full pl-1`}
                    >
                      {data.weather?.forecast || "forecast"}
                    </div>
                    <div
                      className={`${data.weather?.high ? "" : "bg-red-200 text-red-600"} w-full pl-1`}
                    >
                      <span className="pr-1 font-bold">H</span>
                      {data.weather?.high || "high"}
                    </div>
                    <div
                      className={`${data.weather?.low ? "" : "bg-red-200 text-red-600"} w-full pl-1`}
                    >
                      <span className="pr-1 font-bold">L</span>
                      {data.weather?.low || "low"}
                    </div>
                    <div
                      className={`${data.weather?.pop ? "" : "bg-red-200 text-red-600"} w-full pl-1`}
                    >
                      <span className="pr-1 font-bold">POP</span>
                      {data.weather?.pop || "0%"}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex w-1/3 flex-col border-l border-black text-center">
                <div className="flex h-3 items-center justify-center border-y border-black bg-neutral-200">
                  Sunrise
                </div>
                <div
                  className={`${data.weather?.sunrise ? "" : "bg-red-200 text-red-600"} flex h-[calc(50%-0.75rem)] items-center justify-center text-lg leading-none`}
                >
                  {data.weather?.sunrise || "time"}
                </div>
                <div className="flex h-3 items-center justify-center border-y border-black bg-neutral-200">
                  Sunset
                </div>
                <div
                  className={`${data.weather?.sunset ? "" : "bg-red-200 text-red-600"} flex h-[calc(50%-0.75rem)] items-center justify-center text-lg leading-none`}
                >
                  {data.weather?.sunset || "time"}
                </div>
              </div>
            </div>
          </div>
          {/* Location Block */}
          <div className="flex w-full border-y border-black bg-neutral-200">
            <div className="w-1/3 text-center">Production Numbers</div>
            <div className="w-1/3 border-x border-black text-center">
              Location
            </div>
            <div className="w-1/3 text-center">Hospital</div>
          </div>
          <div className="flex w-full">
            <div className="flex w-1/3 flex-col items-center justify-center px-1">
              <div className="flex">
                <div
                  className={`${data.setCellContact ? "" : "bg-red-200 text-red-600"}`}
                >
                  {data.setCellContact || "Set Cell Contact"}
                </div>
                <Separator orientation="vertical" className="mx-1 h-full" />
                <div
                  className={`${data.setCellPosition ? "" : "bg-red-200 text-red-600"}`}
                >
                  {data.setCellPosition || "Set Cell Position"}
                </div>
              </div>
              <div
                className={`${data.setCellNumber ? "" : "bg-red-200 text-red-600"}`}
              >
                {data.setCellNumber || "Set Cell Number"}
              </div>
            </div>
            <div className="flex w-1/3 flex-col items-center justify-center border-x border-black px-1">
              {data.location.map((loc, index) => (
                <div key={index} className="w-full text-center">
                  <div className="font-bold">Location #{index + 1}</div>
                  <div
                    className={`${loc.name ? "" : "bg-red-200 text-red-600"}`}
                  >
                    {loc.name || "location name"}
                  </div>
                  <div
                    className={`${loc.address ? "" : "bg-red-200 text-red-600"}`}
                  >
                    {loc.address || "location address"}
                  </div>
                  {index < data.location.length - 1 && (
                    <div className="my-1 border-b border-border" />
                  )}
                </div>
              ))}
            </div>
            <div className="flex w-1/3 flex-col items-center justify-center px-1">
              {data.hospital.map((hosp, index) => (
                <div key={index} className="w-full text-center">
                  <div className="font-bold">Hospital #{index + 1}</div>
                  <div
                    className={`${hosp.name ? "" : "bg-red-200 text-red-600"}`}
                  >
                    {hosp.name || "hospital name"}
                  </div>
                  <div
                    className={`${hosp.address ? "" : "bg-red-200 text-red-600"}`}
                  >
                    {hosp.address || "hospital address"}
                  </div>
                  <div
                    className={`${hosp.phoneNumber ? "" : "bg-red-200 text-red-600"}`}
                  >
                    {hosp.phoneNumber || "hospital phone number"}
                  </div>
                  {index < data.hospital.length - 1 && (
                    <div className="my-1 border-b border-border" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Main Block */}
          <div className="flex w-full border-y border-black bg-neutral-200">
            {/* Production Crew Block */}
            <div className="w-2/3 border-r border-black text-center">
              <div className="border-b border-black bg-neutral-200 px-1 text-center">
                Production
              </div>

              <div className="grid w-full justify-between bg-white text-black [grid-template-columns:20%_20%_15%_30%_5%_10%]">
                <div className="px-1">Position</div>
                <div className="px-1">Name</div>
                <div className="px-1">Cell</div>
                <div className="px-1">Email</div>
                <div className="px-1">LOC</div>
                <div className="px-1">Call</div>
              </div>
              {data.department.map((dept, index) => (
                <React.Fragment key={index}>
                  <div className="w-full border-y border-black bg-neutral-200 pl-1 text-left text-black">
                    {dept.department}
                  </div>
                  {data.crew
                    .filter((member) => member.department === dept.department)
                    .map((member, memberIndex) => (
                      <div
                        key={memberIndex}
                        className={`grid w-full justify-between ${
                          memberIndex ===
                          data.crew.filter(
                            (m) => m.department === dept.department,
                          ).length -
                            1
                            ? ""
                            : "border-b border-black"
                        } bg-white font-extralight normal-case text-black [grid-template-columns:20%_20%_15%_30%_5%_10%]`}
                      >
                        <div className="w-full whitespace-nowrap border-r border-black px-1 text-start">
                          {member.position}
                        </div>
                        <div className="w-full whitespace-nowrap border-r border-black px-1 text-start">
                          {member.name}
                        </div>
                        <div className="w-full whitespace-nowrap border-r border-black px-1">
                          {member.cell}
                        </div>
                        <div className="w-full whitespace-nowrap border-r border-black px-1 text-start">
                          {member.email}
                        </div>
                        <div className="w-full border-r border-black px-1">
                          {member.loc}
                        </div>
                        <div className="w-full px-1">{member.callTime}</div>
                      </div>
                    ))}
                </React.Fragment>
              ))}
            </div>

            <div className="w-1/3 text-center">
              {/* Talent / Client / Agency / Vendors Block */}
              <div className="border-b border-black bg-neutral-200 px-1 text-center">
                Talent / Client / Agency / Vendors
              </div>

              <div className="grid w-full justify-between bg-white text-black [grid-template-columns:30%_50%_20%]">
                <div className="px-1">Role</div>
                <div className="px-1">Name</div>
                <div className="px-1">Call</div>
              </div>
              <div className="w-full border-y border-black bg-neutral-200 pl-1 text-left text-black">
                Talent
              </div>
              {data.talent.map((member, memberIndex) => (
                <div
                  key={memberIndex}
                  className={`grid w-full justify-between ${
                    memberIndex === data.talent.length - 1
                      ? ""
                      : "border-b border-black"
                  } border-black bg-white font-extralight normal-case text-black [grid-template-columns:30%_50%_20%]`}
                >
                  <div className="w-full whitespace-nowrap border-r border-black px-1 text-start">
                    {member.role}
                  </div>
                  <div className="w-full whitespace-nowrap border-r border-black px-1 text-start">
                    {member.name}
                  </div>
                  <div className="w-full whitespace-nowrap border-black px-1">
                    {member.callTime}
                  </div>
                </div>
              ))}
              {/* Vendors Block */}
              <div className="w-full border-y border-black bg-neutral-200 pl-1 text-left text-black">
                Vendors
              </div>
              {data.vendor.map((vendor, vendorIndex) => (
                <div
                  key={vendorIndex}
                  className={`grid w-full justify-between ${
                    vendorIndex === data.vendor.length - 1 ? "" : "border-b"
                  } border-black bg-white font-extralight normal-case text-black [grid-template-columns:30%_50%_20%]`}
                >
                  <div className="w-full whitespace-nowrap border-r border-black px-1 text-start">
                    {vendor.dept}
                  </div>
                  <div className="w-full truncate whitespace-nowrap border-r border-black px-1 text-start">
                    {vendor.name}
                  </div>
                  <div className="w-full whitespace-nowrap px-1">
                    {vendor.contact}
                  </div>
                </div>
              ))}
              {/* Notes Block */}
              <div className="w-full border-y border-black bg-neutral-200 pl-1 text-left text-black">
                Notes
              </div>
              {data.notes.map((note, noteIndex) => (
                <div
                  key={noteIndex}
                  className={`grid w-full justify-between ${
                    noteIndex === data.notes.length - 1 ? "" : "border-b"
                  } border-black bg-white font-extralight normal-case text-black [grid-template-columns:100%]`}
                >
                  <div className="w-full truncate whitespace-nowrap border-black px-1 text-start">
                    {note.note}
                  </div>
                </div>
              ))}
              {/* Invoicing Block - Only show if showInvoice is true */}
              {data.showInvoice && (
                <>
                  <div className="flex w-full border-y border-black bg-neutral-200 px-1">
                    Invoicing Info
                  </div>
                  <div className="flex h-fit w-full whitespace-nowrap bg-white font-extralight normal-case text-black">
                    <div className="flex-col">
                      <div className="border-b border-r border-black bg-neutral-200 px-1 text-left">
                        Job Name:
                      </div>
                      <div className="border-b border-r border-black bg-neutral-200 px-1 text-left">
                        Docket Number:
                      </div>
                      <div className="border-b border-r border-black bg-neutral-200 px-1 text-left">
                        Bill To:
                      </div>
                      <div className="border-r border-black bg-neutral-200 px-1 text-left">
                        Email invoices to:
                      </div>
                    </div>
                    <div className="w-full flex-col">
                      <div
                        className={`${
                          data.productionName ? "" : "bg-red-200 text-red-600"
                        } border-b border-black px-1 text-left`}
                      >
                        {data.productionName || "Production Name"}
                      </div>
                      <div
                        className={`${
                          data.docketNumber ? "" : "bg-red-200 text-red-600"
                        } border-b border-black px-1 text-left`}
                      >
                        {data.docketNumber || "Docket Number"}
                      </div>
                      <div
                        className={`${
                          data.prodcoName ? "" : "bg-red-200 text-red-600"
                        } border-b border-black px-1 text-left`}
                      >
                        {data.prodcoName}
                        {data.prodcoAddress || "Production Company"}
                      </div>
                      <div
                        className={`${
                          data.productionEmail ? "" : "bg-red-200 text-red-600"
                        } px-1 text-left`}
                      >
                        {data.productionEmail || "Production Email"}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          {/* Walkies Block */}
          {data.showWalkies && (
            <div className="flex w-full justify-between border-b border-black bg-neutral-200 px-1 text-black">
              <div className="flex w-full gap-4">
                <span className="pr-1">WALKIES:</span>
                {[
                  { department: "OPEN", walkies: data.openWalkies },
                  ...data.department,
                ]
                  .filter(
                    (dept) =>
                      typeof dept.walkies === "number" && dept.walkies > 0,
                  )
                  .sort((a, b) => a.walkies - b.walkies)
                  .map((dept, index) => (
                    <span key={index} className="pr-2">
                      {dept.department}: {dept.walkies}
                    </span>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
