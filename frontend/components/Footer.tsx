"use client";

import { LinkButton } from "./buttons/LinkButton";

export const Footer = () => {
  return (
    <div className="pr-4 pl-4 pb-4 pt-8">
      <div className="flex flex-wrap items-center justify-between">
        <div className="text-center font-light">
          © 2024 Zapier Inc.
        </div>
        <div className="flex items-center space-x-4">
          <LinkButton onClick={() => {}}>
            Legal
          </LinkButton>
          <LinkButton onClick={() => {}}>
            Privacy
          </LinkButton>
        </div>
      </div>
    </div>
  );
};
