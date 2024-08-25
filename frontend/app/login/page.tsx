"use client";

import { Appbar } from "@/components/Appbar";
import { CheckFeature } from "@/components/CheckFeature";
import { Input } from "@/components/Input";
import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../config";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="h-screen flex flex-col">
      <Appbar />
      <div className="flex flex-col lg:flex-row flex-1 justify-center lg:gap-12 py-8 px-4 lg:px-8">
        <div className="flex-1 lg:pr-8 flex flex-col justify-center">
          <div className="font-semibold text-3xl pb-4 text-center lg:text-left">
            Join millions worldwide who automate their work using Zapier.
          </div>
          <div className="pb-6 pt-4">
            <CheckFeature label={"Easy setup, no coding required"} />
          </div>
          <div className="pb-6">
            <CheckFeature label={"Free forever for core features"} />
          </div>
          <CheckFeature label={"14-day trial of premium features & apps"} />
        </div>
        <div className="flex-1 mt-6 lg:mt-0 border rounded">
          <div className="flex flex-col gap-4 p-6">
            <Input
              onChange={(e) => setEmail(e.target.value)}
              label={"Email"}
              type="text"
              placeholder="Your Email"
            />
            <Input
              onChange={(e) => setPassword(e.target.value)}
              label={"Password"}
              type="password"
              placeholder="Password"
            />
            <div className="pt-4">
              <PrimaryButton
                onClick={async () => {
                  const res = await axios.post(
                    `${BACKEND_URL}/api/v1/user/signin`,
                    {
                      email,
                      password,
                    }
                  );
                  localStorage.setItem("token", res.data.token);
                  router.push("/dashboard");
                }}
                size="big"
              >
                Login
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
