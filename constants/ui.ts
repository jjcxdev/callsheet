import { InputFormProps } from "@/types";
import { format } from "date-fns";
import { UtilityProps } from "@/types";

let utilityContext: UtilityProps;

export const initializeUtils = (props: UtilityProps) => {
  utilityContext = props;
};

export const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  utilityContext.onChange({ [name]: value });
};

export const handleDateChange = (date: Date | undefined) => {
  utilityContext.onChange({ date });
};

export const filterAllowedCharacters = (value: string) => {
  return value.replace(/[^0-9OC/]/gi, "");
};

export const updateLocation = (index: number, field: string, value: any) => {
  console.log("InputForm - updateLocation:", { index, field, value });
  const newLocation = [...utilityContext.data.location];
  newLocation[index] = { ...newLocation[index], [field]: value };
  console.log("InputForm - newLocation:", newLocation);
  utilityContext.onChange({ location: newLocation });
};

export const handleDayOfDaysChange = (
  field: "dayOf" | "days",
  value: string,
) => {
  let newDayofdays = [...utilityContext.data.dayofdays];
  const numValue = parseInt(value) || 0;

  if (newDayofdays.length === 0) {
    newDayofdays = [{ dayOf: 0, days: 0 }];
  }

  if (field === "dayOf") {
    if (newDayofdays[0].days > 0) {
      newDayofdays[0] = {
        ...newDayofdays[0],
        dayOf: Math.min(numValue, newDayofdays[0].days),
      };
    }
  } else if (field === "days") {
    newDayofdays[0] = {
      ...newDayofdays[0],
      days: numValue,
      dayOf: numValue > 0 ? 1 : 0,
    };
  }

  utilityContext.onChange({ dayofdays: newDayofdays });
};

export const handleWeatherUpdate = async () => {
  const locationData = utilityContext.data.location[0];
  console.log("Location data:", locationData);
  console.log("Date:", utilityContext.data.date);

  if (!locationData?.coordinates || !utilityContext.data.date) {
    console.error("Missing location coordinates or date");
    console.log("Coordinates:", locationData?.coordinates);
    console.log("Date:", utilityContext.data.date);
    return;
  }

  try {
    const formattedDate = format(utilityContext.data.date, "yyyy-MM-dd");
    const response = await fetch(
      `https://api.tomorrow.io/v4/weather/forecast?` +
        `location=${locationData.coordinates.lat},${locationData.coordinates.lng}&` +
        `timesteps=1d&` +
        `startTime=${formattedDate}&` +
        `endTime=${formattedDate}&` +
        `units=metric&` +
        `apikey=${process.env.NEXT_PUBLIC_TOMORROW_API_KEY}`,
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

    utilityContext.onChange({
      weather: {
        forecast:
          weatherConditions[dailyData.values.weatherCodeMax] || "Unknown",
        weatherCode: dailyData.values.weatherCodeMax,
        high: `${Math.round(dailyData.values.temperatureMax)}°C`,
        low: `${Math.round(dailyData.values.temperatureMin)}°C`,
        feelsLikeHigh: `${Math.round(
          dailyData.values.temperatureApparentMax,
        )}°C`,
        feelsLikeLow: `${Math.round(
          dailyData.values.temperatureApparentMin,
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

export const handleTimeChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  field: string,
  index?: number,
) => {
  const { value } = e.target;
  const filteredValue = filterAllowedCharacters(value);

  if (index !== undefined) {
    if (field === "cast") {
      const newCast = [...utilityContext.data.talent];
      newCast[index] = { ...newCast[index], callTime: filteredValue };
      utilityContext.onChange({ talent: newCast });
    } else if (field === "crew") {
      const newCrew = [...utilityContext.data.crew];
      newCrew[index] = { ...newCrew[index], callTime: filteredValue };
      utilityContext.onChange({ crew: newCrew });
    }
  } else {
    utilityContext.onChange({ [field]: filteredValue });
  }
};

// --------
// Departments
// --------

export const addDepartment = () => {
  utilityContext.onChange({
    department: [
      ...utilityContext.data.department,
      { department: "", walkies: 0 },
    ],
  });
};

export const updateDepartment = (index: number, value: string) => {
  const newDepartment = [...utilityContext.data.department];
  newDepartment[index] = { department: value, walkies: 0 };
  utilityContext.onChange({ department: newDepartment });
};

export const deleteDepartment = (index: number) => {
  const newDepartment = [...utilityContext.data.department];
  newDepartment.splice(index, 1);
  utilityContext.onChange({ department: newDepartment });
};

export const updateWalkies = (index: number, value: string) => {
  const newDepartment = [...utilityContext.data.department];
  newDepartment[index] = { ...newDepartment[index], walkies: parseInt(value) };
  utilityContext.onChange({ department: newDepartment });
};

// --------
// Location
// --------

export const addLocation = () => {
  utilityContext.onChange({
    location: [
      ...utilityContext.data.location,
      {
        name: "",
        address: "",
        phoneNumber: "",
        coordinates: { lat: 0, lng: 0 },
      },
    ],
  });
};

export const deleteLocation = (index: number) => {
  const newLocation = [...utilityContext.data.location];
  newLocation.splice(index, 1);
  utilityContext.onChange({ location: newLocation });
};

export const addHospital = () => {
  utilityContext.onChange({
    hospital: [
      ...utilityContext.data.hospital,
      { name: "", address: "", phoneNumber: "" },
    ],
  });
};

export const deleteHospital = (index: number) => {
  const newHospital = [...utilityContext.data.hospital];
  newHospital.splice(index, 1);
  utilityContext.onChange({ hospital: newHospital });
};

// --------
// Crew
// --------

export const addCrewMember = () => {
  utilityContext.onChange({
    crew: [
      ...utilityContext.data.crew,
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

export const updateCrewMember = (
  index: number,
  field: string,
  value: string,
) => {
  const newCrew = [...utilityContext.data.crew];
  // Only filter loc and callTime fields
  if (field === "loc" || field === "callTime") {
    const filteredValue = filterAllowedCharacters(value);
    newCrew[index] = { ...newCrew[index], [field]: filteredValue };
  } else {
    newCrew[index] = { ...newCrew[index], [field]: value };
  }
  utilityContext.onChange({ crew: newCrew });
};

export const deleteCrewMember = (index: number) => {
  const newCrew = [...utilityContext.data.crew];
  newCrew.splice(index, 1);
  utilityContext.onChange({ crew: newCrew });
};

// --------
// Talent
// --------

export const addTalentMember = () => {
  utilityContext.onChange({
    talent: [
      ...utilityContext.data.talent,
      { name: "", role: "", callTime: "" },
    ],
  });
};

export const updateTalentMember = (
  index: number,
  field: string,
  value: string,
) => {
  const newTalent = [...utilityContext.data.talent];
  newTalent[index] = { ...newTalent[index], [field]: value };
  utilityContext.onChange({ talent: newTalent });
};

export const deleteTalentMember = (index: number) => {
  const newTalent = [...utilityContext.data.talent];
  newTalent.splice(index, 1);
  utilityContext.onChange({ talent: newTalent });
};

// --------
// Vendors
// --------

export const addVendor = () => {
  utilityContext.onChange({
    vendor: [
      ...utilityContext.data.vendor,
      { dept: "", name: "", contact: "" },
    ],
  });
};

export const updateVendor = (index: number, field: string, value: string) => {
  if (field === "contact") {
    // Only allow numbers, spaces, dashes, parentheses, and plus sign
    const sanitizedValue = value.replace(/[^\d\s\-()+-]/g, "");
    const newVendor = [...utilityContext.data.vendor];
    newVendor[index] = { ...newVendor[index], [field]: sanitizedValue };
    utilityContext.onChange({ vendor: newVendor });
  } else {
    const newVendor = [...utilityContext.data.vendor];
    newVendor[index] = { ...newVendor[index], [field]: value };
    utilityContext.onChange({ vendor: newVendor });
  }
};

export const deleteVendor = (index: number) => {
  const newVendor = [...utilityContext.data.vendor];
  newVendor.splice(index, 1);
  utilityContext.onChange({ vendor: newVendor });
};

// --------
// Notes
// --------

export const addNote = () => {
  utilityContext.onChange({
    notes: [...utilityContext.data.notes, { note: "" }],
  });
};

export const updateNote = (index: number, field: string, value: string) => {
  const newNotes = [...utilityContext.data.notes];
  newNotes[index] = { ...newNotes[index], [field]: value };
  utilityContext.onChange({ notes: newNotes });
};

export const deleteNote = (index: number) => {
  const newNotes = [...utilityContext.data.notes];
  newNotes.splice(index, 1);
  utilityContext.onChange({ notes: newNotes });
};
