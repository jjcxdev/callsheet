export interface WeatherData {
  forecast: string;
  weatherCode: number;
  high: string;
  low: string;
  feelsLikeHigh: string;
  feelsLikeLow: string;
  pop: string;
  sunrise: string;
  sunset: string;
}

export interface InputFormProps {
  data: {
    productionName: string;
    date: Date | undefined;
    dayofdays: Array<{ dayOf: number; days: number }>;
    callTime: string;
    syncMOS: string;
    crewCallTime: string;
    prodcoName: string;
    prodcoAddress: string;
    productionEmail: string;
    setCellContact: string;
    setCellNumber: string;
    setCellPosition: string;
    docketNumber: string;
    openWalkies: number;
    department: Array<{ department: string; walkies: number }>;
    showWalkies: boolean;
    clientLogo: string | null;
    agencyLogo: string | null;
    productionLogo: string | null;
    jobName: string;
    camera: string;
    showInvoice: boolean;
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
    notes: Array<{ note: string }>;
    executiveProducer: string;
    lineProducer: string;
    vendor: Array<{ dept: string; name: string; contact: string }>;
    talent: Array<{ name: string; role: string; callTime: string }>;
    crew: Array<{
      department: string;
      name: string;
      position: string;
      cell: string;
      email: string;
      loc: string;
      callTime: string;
    }>;
    weather?: WeatherData;
  };
  onChange: (newData: Partial<InputFormProps["data"]>) => void;
}

export interface UtilityProps {
  data: InputFormProps["data"];
  onChange: InputFormProps["onChange"];
}
