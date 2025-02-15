import { Mail } from "lucide-react";
import Github from "@/public/images/socials/github.svg";
import XLogo from "@/public/images/socials/x-logo.svg";
import Image from "next/image";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

export function Footer() {
  return (
    <div className="flex h-fit w-full items-center justify-center bg-accent p-2">
      <p className="text-[0.6rem] font-light leading-none text-white">
        jjcx &copy; 2025
      </p>
      <Separator orientation="vertical" className="mx-2 bg-muted-foreground" />
      <div className="flex items-center gap-2">
        <Button
          className="h-fit p-0"
          variant="ghost"
          onClick={() => window.open("mailto:j@jjcx.dev")}
        >
          <Mail className="h-4 w-4 text-white" />
        </Button>
        <Button
          className="h-fit p-0"
          variant="ghost"
          onClick={() => window.open("https://github.com/jjcxdev/callsheet")}
        >
          <Image src={Github} alt="Github" className="h-4 w-4" />
        </Button>
        <Button
          className="h-fit p-0"
          variant="ghost"
          onClick={() => window.open("https://x.com/jjcx___")}
        >
          <Image src={XLogo} alt="X" className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
