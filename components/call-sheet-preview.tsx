import { format } from "date-fns";
import Image from "next/image";
import { weatherCodeToSymbol } from "@/utils/weather-codes";
import React from "react";

interface CallSheetPreviewProps {
  data: {
    productionName: string;
    date: Date | undefined;
    dayofdays: Array<{ dayOf: number; days: number }>;
    callTime: string;
    crewCallTime: string;
    syncMOS: string;
    setCellContact: string;
    setCellNumber: string;
    setCellPosition: string;
    jobName: string;
    clientLogo: string | null;
    agencyLogo: string | null;
    productionLogo: string | null;
    camera: string;
    prodcoName: string;
    prodcoAddress: string;
    location: Array<{ name: string; address: string; phoneNumber: string }>;
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
    weather?: {
      forecast: string;
      weatherCode: number;
      high: string;
      low: string;
      feelsLikeHigh: string;
      feelsLikeLow: string;
      pop: string;
      sunrise: string;
      sunset: string;
    };
    department: Array<{ department: string }>;
  };
}

function formatDate(dateString: string): string {
  return dateString;
}

function formatTime(timeString: string): string {
  return timeString;
}

export default function CallSheetPreview({ data }: CallSheetPreviewProps) {
  const defaultDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="h-full flex font-oswald uppercase justify-center items-center p-4">
      <div
        className="bg-white shadow-lg mx-auto"
        style={{
          aspectRatio: "8.5 / 11",
          width: "min(calc(100vw - 2rem), calc((100vh - 2rem) * 8.5/11))",
          maxWidth: "8.5in",
          fontSize: "clamp(8px, calc(0.7vw + 0.3vh), 12px)",
          padding: "calc(0.25in)",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        <div className="border border-black w-full h-full">
          {/* Date Block */}
          <div className="w-full h-2 bg-black"></div>
          <div className="w-full flex">
            <p className="w-1/3 flex items-center pl-1">Call Sheet</p>
            <div className="w-1/3 flex justify-center items-center align-middle text-center">
              <p>day</p>
              <span
                className={`${
                  data.dayofdays[0].dayOf ? "" : "bg-red-200 text-red-600"
                } text-3xl leading-none px-1`}
              >
                {data.dayofdays[0].dayOf}
              </span>
              <p>of</p>
              <span
                className={`${
                  data.dayofdays[0].days ? "" : "bg-red-200 text-red-600"
                } text-3xl leading-none px-1`}
              >
                {data.dayofdays[0].days}
              </span>
            </div>
            <div
              className={`${
                data.date ? "" : "bg-red-200 text-red-600"
              } w-1/3 flex items-center justify-end pr-1`}
            >
              {data.date ? format(data.date, "MMMM dd, yyyy") : defaultDate}
            </div>
          </div>

          {/* Client, Agency, Prodco Block */}
          <div className="w-full border-t border-black flex">
            <div className="w-2/3 flex">
              <div className="w-1/3 relative">
                {data.clientLogo ? (
                  <Image
                    src={data.clientLogo}
                    alt="Client Logo"
                    fill
                    className="object-contain p-2"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    Client Logo
                  </div>
                )}
              </div>
              <div className="w-1/3 relative">
                {data.agencyLogo ? (
                  <Image
                    src={data.agencyLogo}
                    alt="Agency Logo"
                    fill
                    className="object-contain p-2"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    Agency Logo
                  </div>
                )}
              </div>
              <div className="w-1/3 relative">
                {data.productionLogo ? (
                  <Image
                    src={data.productionLogo}
                    alt="Production Logo"
                    fill
                    className="object-contain p-2"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    Production Logo
                  </div>
                )}
              </div>
            </div>
            <div className="w-1/3 flex flex-col">
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
                } font-thin w-full pl-1`}
              >
                <span className="font-normal pr-1">Director</span>
                {data.director || "name"}
              </div>
              <div
                className={`${
                  data.executiveProducer ? "" : "bg-red-200 text-red-600"
                } font-thin w-full pl-1`}
              >
                <span className="font-normal pr-1">EP</span>
                {data.executiveProducer || "name"}
              </div>
              <div
                className={`${
                  data.lineProducer ? "" : "bg-red-200 text-red-600"
                } font-thin w-full pl-1`}
              >
                <span className="font-normal pr-1">Line Producer</span>
                {data.lineProducer || "name"}
              </div>
            </div>
          </div>

          {/* Production Block */}
          <div className="w-full border-y border-black flex">
            <div className="w-1/3 bg-black text-white flex-col">
              <div className="flex">
                <div className=" w-1/3 pl-1">Product</div>
                <div
                  className={` ${
                    data.productionName
                      ? "bg-white text-black"
                      : "bg-red-200 text-red-600"
                  } w-2/3 px-1`}
                >
                  {data.productionName || "production name"}
                </div>
              </div>
              <div className="flex">
                <div className=" w-1/3 pl-1">Job Name</div>
                <div
                  className={` ${
                    data.jobName
                      ? "bg-white text-black"
                      : "bg-red-200 text-red-600"
                  } w-2/3 px-1`}
                >
                  {data.jobName || "job name"}
                </div>
              </div>
              <div className="flex">
                <div className="w-1/3 pl-1">Camera</div>
                <div
                  className={` ${
                    data.camera
                      ? "bg-white text-black"
                      : "bg-red-200 text-red-600"
                  } w-2/3 px-1`}
                >
                  {data.camera || "camera"}
                </div>
              </div>
              <div className="flex ">
                <div className=" w-1/3 pl-1">Sync/MOS</div>
                <div
                  className={` ${
                    data.syncMOS
                      ? "bg-white text-black"
                      : "bg-red-200 text-red-600"
                  } w-2/3 px-1`}
                >
                  {data.syncMOS || "sync/mos"}
                </div>
              </div>
            </div>
            <div className="w-1/3 border-x border-black text-center">
              <div className="bg-black text-white">Production Call Time</div>
              <div
                className={`${
                  data.callTime ? "" : "bg-red-200 text-red-600"
                } text-2xl leading-none`}
              >
                {data.callTime || "call time"}
              </div>
              <div className="bg-black text-white">Crew Call Time</div>
              <div
                className={`${
                  data.crewCallTime ? "" : "bg-red-200 text-red-600"
                } text-2xl leading-none`}
              >
                {data.crewCallTime || "crew call time"}
              </div>
            </div>
            <div className="w-1/3 flex text-right">
              <div className="w-2/3 flex-col">
                <div className="bg-black text-white text-center">Weather</div>
                <div className="flex w-full h-[46px]  ">
                  <div className="w-1/2 p-1 flex justify-center items-center text-3xl">
                    {data.weather?.weatherCode
                      ? weatherCodeToSymbol[data.weather.weatherCode] || "❓"
                      : "❓"}
                  </div>
                  <div className="w-1/2 flex-col">
                    <div
                      className={`${
                        data.weather?.forecast ? "" : "bg-red-200 text-red-600"
                      } pl-1 w-full  h-1/4 flex`}
                    >
                      {data.weather?.forecast || "forecast"}
                    </div>
                    <div
                      className={`${
                        data.weather?.high ? "" : "bg-red-200 text-red-600"
                      } pl-1 w-full  h-1/4 flex`}
                    >
                      <span className="font-bold pr-1">H</span>
                      {data.weather?.high || "high"}
                    </div>
                    <div
                      className={`${
                        data.weather?.low ? "" : "bg-red-200 text-red-600"
                      } pl-1 w-full  h-1/4 flex`}
                    >
                      <span className="font-bold pr-1">L</span>
                      {data.weather?.low || "low"}
                    </div>
                    <div
                      className={`${
                        data.weather?.pop ? "" : "bg-red-200 text-red-600"
                      } pl-1 w-full  h-1/4 flex`}
                    >
                      <span className="font-bold pr-1">POP</span>
                      {data.weather?.pop || "0%"}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-col border-l border-black w-1/3 text-center">
                <div className="bg-black text-white">Sunrise</div>
                <div
                  className={`${
                    data.weather?.sunrise ? "" : "bg-red-200 text-red-600"
                  } w-full leading-none text-2xl flex justify-center items-center`}
                >
                  {data.weather?.sunrise || "time"}
                </div>
                <div className="bg-black text-white">Sunset</div>
                <div
                  className={`${
                    data.weather?.sunset ? "" : "bg-red-200 text-red-600"
                  } w-full leading-none text-2xl flex justify-center items-center`}
                >
                  {data.weather?.sunset || "time"}
                </div>
              </div>
            </div>
          </div>
          {/* Location Block */}

          <div className="w-full border-y border-black bg-black text-white flex">
            <div className="w-1/3 text-center">Production Numbers</div>
            <div className="w-1/3 text-center">Location</div>
            <div className="w-1/3 text-center">Hospital</div>
          </div>
          <div className="w-full border-y border-black flex">
            <div className="w-1/3 flex px-1 justify-center items-center flex-col">
              <div className="flex">
                <div
                  className={`${
                    data.setCellContact ? "" : "bg-red-200 text-red-600"
                  }`}
                >
                  {data.setCellContact || "Set Cell Contact"}
                </div>
                <div
                  className={`${
                    data.setCellPosition ? "" : "bg-red-200 text-red-600"
                  }`}
                >
                  {data.setCellPosition || "Set Cell Position"}
                </div>
              </div>

              <div
                className={`${
                  data.setCellNumber ? "" : "bg-red-200 text-red-600"
                }`}
              >
                {data.setCellNumber || "Set Cell Number"}
              </div>
            </div>
            <div className="w-1/3 flex px-1 flex-col justify-center border-x border-black items-center">
              <div
                className={`${
                  data.location[0].name ? "" : "bg-red-200 text-red-600"
                }`}
              >
                {data.location[0].name || "location name"}
              </div>
              <div
                className={`${
                  data.location[0].address ? "" : "bg-red-200 text-red-600"
                }`}
              >
                {data.location[0].address || "location address"}
              </div>
            </div>
            <div className="w-1/3 px-1 text-center">
              <div
                className={`${
                  data.hospital[0].name ? "" : "bg-red-200 text-red-600"
                }`}
              >
                {data.hospital[0].name || "hospital name"}
              </div>
              <div
                className={`${
                  data.hospital[0].address ? "" : "bg-red-200 text-red-600"
                }`}
              >
                {data.hospital[0].address || "hospital address"}
              </div>
              <div
                className={`${
                  data.hospital[0].phoneNumber ? "" : "bg-red-200 text-red-600"
                }`}
              >
                {data.hospital[0].phoneNumber || "hospital phone number"}
              </div>
            </div>
          </div>

          {/* Main Block */}
          <div className="w-full border-y border-black bg-black text-white flex">
            {/* Production Crew Block */}
            <div className="w-2/3 text-center">
              Production
              <div className="w-full grid [grid-template-columns:20%_20%_15%_30%_5%_10%] justify-between text-xs bg-white text-black">
                <div className="px-1">Position</div>
                <div className="px-1">Name</div>
                <div className="px-1">Contact</div>
                <div className="px-1">Email</div>
                <div className="px-1">LOC</div>
                <div className="px-1">Call</div>
              </div>
              {data.department.map((dept, index) => (
                <React.Fragment key={index}>
                  <div className="bg-gray-300 w-full text-black pl-1 border-b border-black">
                    {dept.department}
                  </div>
                  {data.crew
                    .filter((member) => member.department === dept.department)
                    .map((member, memberIndex) => (
                      <div
                        key={memberIndex}
                        className="w-full grid [grid-template-columns:20%_20%_15%_30%_5%_10%] font-extralight justify-between normal-case border-b border-black text-xs bg-white text-black"
                      >
                        <div className="px-1 whitespace-nowrap border-r w-full text-start border-black">
                          {member.position}
                        </div>
                        <div className="px-1 whitespace-nowrap border-r w-full text-start border-black">
                          {member.name}
                        </div>
                        <div className="px-1 whitespace-nowrap border-r w-full border-black">
                          {member.contact}
                        </div>
                        <div className="px-1 whitespace-nowrap border-r w-full text-start border-black">
                          {member.email}
                        </div>
                        <div className="px-1 border-r w-full border-black">
                          {member.loc}
                        </div>
                        <div className="px-1 w-full">{member.callTime}</div>
                      </div>
                    ))}
                </React.Fragment>
              ))}
            </div>

            {/* Talent / Client / Agency / Vendors Block */}
            <div className="w-1/3 text-center">
              Talent / Client / Agency / Vendors
            </div>
          </div>

          <div></div>

          {/* Vendors Block */}

          {/* Notes Block */}
        </div>
      </div>
    </div>
  );
}
