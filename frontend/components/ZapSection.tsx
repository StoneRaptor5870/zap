"use client";

import { useRouter } from "next/navigation";
import { PrimaryButton } from "./buttons/PrimaryButton";
import { SecondaryButton } from "./buttons/SecondaryButton";

export const ZapSection = ({sentinelRef}: any) => {
    const router = useRouter();

  return (
    <div>
      <div className="flex justify-center pb-8">
        <div className="text-5xl font-semibold text-center pt-8 max-w-xl">
        Start a workflow as fast as you can type
        </div>
      </div>
      <div className="flex justify-center pt-2">
        <div className="text-xl font-normal text-center pt-8 max-w-2xl">
        Don’t see a template for what you need? You can start your next Zap just by describing what you want to automate in plain English. We'll draft a Zap for you to customize to your exact needs.
        </div>
      </div>

      <div className="flex justify-center pt-12">
        <video
          src="https://res.cloudinary.com/zapier-media/video/upload/q_auto/f_auto/v1706047906/Homepage%20ZAP%20Jan%2024/140506_in85_zapguessermotion_PersonalizedEmails_ndwgtv.mp4"
          className="max-w-5xl"
          controls={false}
          muted
          autoPlay
          loop
        />
      </div>

      <div className="flex justify-center items-center pt-6">
            <div className="flex flex-col gap-4 justify-center items-center">
                <PrimaryButton onClick={() => {}} size="big">I want to sent personalised emails to customers</PrimaryButton>
                <div className="pl-4 max-w-56 text-center mr-6">
                    <SecondaryButton  onClick={() => {router.push("/signup")}} size="big">Try it out</SecondaryButton>
                </div>
            </div>
        </div>
    </div>
  );
};
  