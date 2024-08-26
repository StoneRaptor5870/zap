"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { PrimaryButton } from "./buttons/PrimaryButton";
import { SecondaryButton } from "./buttons/SecondaryButton";

export const ZapSection = ({ sentinelRef }: any) => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust breakpoint as needed
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="px-4 md:px-8 lg:px-16">
      <div className="flex justify-center pb-8">
        <div className="text-3xl md:text-5xl font-semibold text-center pt-8 max-w-lg md:max-w-xl">
          Start a workflow as fast as you can type
        </div>
      </div>
      <div className="flex justify-center pt-2">
        <div className="text-base md:text-xl font-normal text-center pt-8 max-w-xs md:max-w-2xl">
          Do not see a template for what you need? You can start your next Zap just by describing what you want to automate in plain English. We will draft a Zap for you to customize to your exact needs.
        </div>
      </div>

      <div className="flex justify-center pt-12 w-full">
        <video
          src="https://res.cloudinary.com/zapier-media/video/upload/q_auto/f_auto/v1706047906/Homepage%20ZAP%20Jan%2024/140506_in85_zapguessermotion_PersonalizedEmails_ndwgtv.mp4"
          className="w-full max-w-5xl h-auto"
          controls={false}
          muted
          autoPlay
          loop
        />
      </div>

      <div className="flex flex-col items-center pt-6 gap-4">
        <PrimaryButton onClick={() => {}} size={isMobile ? "small" : "big"}>
          I want to send personalized emails to customers
        </PrimaryButton>
        <SecondaryButton onClick={() => { router.push("/signup"); }} size={isMobile ? "small" : "big"}>
          Try it out
        </SecondaryButton>
      </div>
    </div>
  );
};
