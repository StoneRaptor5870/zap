import { ReactNode } from "react";

export const DarkButoon = ({
  children,
  onClick,
  size = "small",
}: {
  children: ReactNode;
  onClick: () => void;
  size?: "big" | "small";
}) => {
  return (
    <div
      onClick={onClick}
      className={`${size === "small" ? "text-sm" : "text-xl"} ${
        size === "small" ? "px-8 pt-2" : "px-10 py-4"
      } flex flex-col justify-center cursor-pointer hover:shadow-md bg-purple-800 text-white rounded text-center`}
    >
      {children}
    </div>
  );
};
