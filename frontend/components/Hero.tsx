"use client";

import { useRouter } from "next/navigation";
import { Feature } from "./Feature";
import { PrimaryButton } from "./buttons/PrimaryButton";
import { SecondaryButton } from "./buttons/SecondaryButton";

export const Hero = () => {
  const router = useRouter();

  return (
    <div className="px-4">
      <div className="flex justify-center">
        <div className="text-3xl sm:text-4xl md:text-5xl font-semibold text-center pt-8 max-w-full md:max-w-xl">
          Automate as fast as you can type
        </div>
      </div>
      <div className="flex justify-center pt-2">
        <div className="text-lg sm:text-xl font-normal text-center pt-4 sm:pt-8 max-w-full md:max-w-2xl">
          AI gives you automation superpowers, and Zapier puts them to work.
          Pairing AI and Zapier helps you turn ideas into workflows and bots
          that work for you.
        </div>
      </div>

      <div className="flex justify-center pt-4 flex-wrap gap-4">
        <PrimaryButton
          onClick={() => {
            router.push("/signup");
          }}
          size="big"
        >
          Get Started Free
        </PrimaryButton>
        <SecondaryButton onClick={() => {}} size="big">
          Contact Sales
        </SecondaryButton>
      </div>

      <div className="flex justify-center flex-wrap pt-8 gap-6">
        <div className="flex flex-col gap-2">
        <Feature title={"Free Forever"} subtitle={"for core features"} />
        <Feature title={"More apps"} subtitle={"than any other platforms"} />
        <Feature title={"Cutting Edge"} subtitle={"AI Features"} />
        </div>
      </div>
    </div>
  );
};
