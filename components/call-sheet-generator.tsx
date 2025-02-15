"use client";

import { useEffect, useState, useRef } from "react";
import InputForm from "@/components/input-form";
import CallSheetPreview from "@/components/call-sheet-preview";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Moon, RotateCcw, Save, Sun } from "lucide-react";
import { InputFormProps } from "@/types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { useReactToPrint } from "react-to-print";
import { handleThemeChange, handleInputChange } from "@/constants/ui";
import { Separator } from "@/components/ui/separator";
import { Footer } from "@/components/footer";

const STORAGE_KEY = "callsheet_data";

const defaultState: InputFormProps["data"] = {
  productionName: "",
  date: undefined,
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
};

export default function CallSheetGenerator() {
  const [theme, setTheme] = useState("light");
  const [isClient, setIsClient] = useState(false);
  const [callSheetData, setCallSheetData] =
    useState<InputFormProps["data"]>(defaultState);

  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "call-sheet",
    pageStyle: `
      @page { 
        size: 8.5in 11in;
        margin: 0.2in;
      }
      @media print { 
        body { 
          -webkit-print-color-adjust: exact;
        }
        .call-sheet-preview {
          width: 8.1in !important;
          height: 10.6in !important;
          margin: 0 !important;
          padding: 0.2in !important;
        }
        .call-sheet-preview .text-callsheet {
          font-size: 0.50rem !important;
        }
        .call-sheet-preview .text-3xl {
          font-size: 1.875rem !important;
        }
      }
    `,
  });

  const handleReset = () => {
    // Clear the localStorage item
    localStorage.removeItem(STORAGE_KEY);
    // Reset the call sheet data to the default state
    setCallSheetData(defaultState);
  };

  // Handle initial load from localStorage
  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Convert the date string back to a Date object if it exists
        if (parsed.date) {
          parsed.date = new Date(parsed.date);
        }
        setCallSheetData(parsed);
      } catch (e) {
        console.error("Failed to parse saved data:", e);
      }
    }
  }, []);

  const handleThemeUpdate = (value: string) => {
    handleThemeChange(value, setTheme);
  };

  useEffect(() => {
    const htmlElement = document.documentElement;
    htmlElement.classList.remove("light", "dark");
    htmlElement.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    const updateScale = () => {
      if (componentRef.current) {
        const container = componentRef.current.parentElement;
        if (container) {
          const containerWidth = container.clientWidth - 32;
          const containerHeight = container.clientHeight - 32;
          const scaleX = containerWidth / (8.5 * 96);
          const scaleY = containerHeight / (11 * 96);
          const scale = Math.min(scaleX, scaleY, 1);
          document.documentElement.style.setProperty(
            "--preview-scale",
            scale.toString(),
          );
        }
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  // Only render the full component after client-side hydration
  if (!isClient) {
    return <div className="h-full">Loading...</div>; // Or any loading state you prefer
  }

  return (
    <div className="flex h-screen flex-col">
      <div className="flex flex-1 flex-col overflow-hidden p-4 dark:bg-secondary lg:flex-row">
        <div className="flex h-full w-full flex-col overflow-hidden rounded-lg bg-secondary p-8 dark:bg-background lg:w-1/2">
          <div className="mb-8 flex w-full justify-between">
            <h1 className="text-2xl font-bold">Call Sheet Generator</h1>
            <div className="flex items-center gap-2">
              {/* Save, Reset and Print */}
              <TooltipProvider>
                <ToggleGroup type="single" value="" onValueChange={() => {}}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <ToggleGroupItem
                        aria-label="Save"
                        value="save"
                        onClick={(e) => {
                          e.preventDefault();
                          handlePrint();
                        }}
                      >
                        <Save className="h-4 w-4" />
                      </ToggleGroupItem>
                    </TooltipTrigger>
                    <TooltipContent>Save</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <ToggleGroupItem
                        aria-label="Reset"
                        value="reset"
                        onClick={handleReset}
                      >
                        <RotateCcw className="h-4 w-4" />
                      </ToggleGroupItem>
                    </TooltipTrigger>
                    <TooltipContent>Reset</TooltipContent>
                  </Tooltip>
                </ToggleGroup>
              </TooltipProvider>
              <Separator orientation="vertical" className="mx-2" />
              {/* Theme Toggle */}
              <ToggleGroup
                type="single"
                value={theme}
                onValueChange={handleThemeUpdate}
              >
                <ToggleGroupItem aria-label="Light" value="light">
                  <Sun className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem aria-label="Dark" value="dark">
                  <Moon className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>

          {/* Input Form */}
          <div className="h-full overflow-y-auto">
            <InputForm
              data={callSheetData}
              onChange={(newData) =>
                handleInputChange(newData, setCallSheetData, STORAGE_KEY)
              }
            />
          </div>
        </div>

        {/* Preview */}
        <div className="h-full w-full overflow-y-auto dark:bg-secondary lg:w-1/2">
          <CallSheetPreview
            ref={componentRef}
            data={callSheetData}
            onChange={(newData) =>
              handleInputChange(newData, setCallSheetData, STORAGE_KEY)
            }
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
