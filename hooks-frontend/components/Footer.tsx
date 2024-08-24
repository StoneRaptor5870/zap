"use client";

import { LinkButton } from "./buttons/LinkButton";

export const Footer = () => {
  return (
    <div className="flex justify-end p-4">
      <div className="flex items-center space-x-4 gap-2">
        <div className="font-light">© 2024 Zapier Inc.</div>
        <LinkButton onClick={() => {}}>Legal</LinkButton>
        <LinkButton onClick={() => {}}>Privacy</LinkButton>
      </div>
    </div>
  );
};
