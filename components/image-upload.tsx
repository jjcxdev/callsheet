"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef, useState } from "react";
import Image from "next/image";

interface ImageUploadProps {
  id: string;
  label: string;
  value: string | null;
  onChange: (value: string | null) => void;
}

export function ImageUpload({ id, label, value, onChange }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(value);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        onChange(base64String);
        setPreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleRemove = () => {
    onChange(null);
    setPreview(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <div className="w-full overflow-hidden">
        <Label htmlFor={id} className="block truncate">
          {label}
        </Label>
      </div>
      <div className="flex flex-col gap-2">
        <Input
          ref={inputRef}
          type="file"
          accept="image/*"
          id={id}
          className="hidden"
          onChange={handleFileChange}
        />
        {preview ? (
          <div className="relative h-40 w-full">
            <Image src={preview} alt={label} fill className="object-contain" />
            <div className="absolute right-2 top-2 max-w-[120px]">
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={handleRemove}
                className="w-full truncate"
              >
                Remove
              </Button>
            </div>
          </div>
        ) : (
          <Button
            type="button"
            onClick={handleClick}
            className="w-full truncate"
          >
            Upload Image
          </Button>
        )}
      </div>
    </div>
  );
}
