"use client";

import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { loadGoogleMapsApi } from "@/utils/google-maps";

interface AddressAutocompleteProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onAddressSelect: (data: {
    name?: string;
    address: string;
    phoneNumber?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  }) => void;
}

export function AddressAutocomplete({
  className,
  onAddressSelect,
  value,
  ...props
}: AddressAutocompleteProps) {
  const [inputValue, setInputValue] = useState(value || "");
  const [suggestions, setSuggestions] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const autocompleteService =
    useRef<google.maps.places.AutocompleteService | null>(null);
  const placesService = useRef<google.maps.places.PlacesService | null>(null);
  const sessionToken =
    useRef<google.maps.places.AutocompleteSessionToken | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    loadGoogleMapsApi().then(() => {
      autocompleteService.current =
        new google.maps.places.AutocompleteService();
      const dummyElement = document.createElement("div");
      placesService.current = new google.maps.places.PlacesService(
        dummyElement,
      );
      sessionToken.current = new google.maps.places.AutocompleteSessionToken();
    });
  }, []);

  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (!value) {
      setSuggestions([]);
      setShowSuggestions(false);
      onAddressSelect({ name: undefined, address: "" });
      return;
    }

    if (autocompleteService.current && sessionToken.current) {
      autocompleteService.current.getPlacePredictions(
        {
          input: value,
          sessionToken: sessionToken.current,
          types: ["establishment", "geocode"],
          componentRestrictions: { country: ["us", "ca"] },
        },
        (predictions, status) => {
          if (
            status === google.maps.places.PlacesServiceStatus.OK &&
            predictions
          ) {
            setSuggestions(predictions);
            setShowSuggestions(true);
          }
        },
      );
    }
  };

  const handleSuggestionSelect = (placeId: string) => {
    // Clear suggestions and hide dropdown immediately
    setSuggestions([]);
    setShowSuggestions(false);

    if (placesService.current) {
      placesService.current.getDetails(
        {
          placeId: placeId,
          fields: [
            "formatted_address",
            "name",
            "address_components",
            "geometry",
            "formatted_phone_number",
          ],
        },
        (place, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && place) {
            const addressParts = place.formatted_address?.split(",") || [];
            const addressWithoutCountry = addressParts
              .slice(0, -1)
              .join(",")
              .trim();

            const coordinates = place.geometry?.location
              ? {
                  lat: place.geometry.location.lat(),
                  lng: place.geometry.location.lng(),
                }
              : undefined;

            setInputValue(
              place.name
                ? `${place.name}, ${addressWithoutCountry}`
                : addressWithoutCountry,
            );
            onAddressSelect({
              name: place.name || undefined,
              address: addressWithoutCountry,
              phoneNumber: place.formatted_phone_number || undefined,
              coordinates,
            });
          }
        },
      );
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev,
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > -1 ? prev - 1 : prev));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSuggestionSelect(suggestions[selectedIndex].place_id);
        }
        break;
      case "Escape":
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  useEffect(() => {
    setSelectedIndex(-1);
  }, [suggestions]);

  return (
    <div className="relative w-full">
      <Input
        {...props}
        value={inputValue}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        className={cn("w-full", className)}
        autoComplete="off"
      />
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 mt-1 w-full rounded-md border border-gray-200 bg-white text-sm text-black shadow-lg">
          {suggestions.map((suggestion, index) => (
            <div
              key={suggestion.place_id}
              className={cn(
                "cursor-pointer px-4 py-2",
                selectedIndex === index ? "bg-neutral-200" : "hover:bg-gray-50",
              )}
              onClick={() => handleSuggestionSelect(suggestion.place_id)}
            >
              {suggestion.description}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
