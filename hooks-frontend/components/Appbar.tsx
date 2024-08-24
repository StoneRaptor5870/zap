"use client";

import { LinkButton } from "./buttons/LinkButton";

export const Appbar = () => {
    return (
        <div className="flex border-b justify-between p-4">
            <div className="flex flex-col justify-center text-2xl font-extrabold">Zap Hooks</div>
            <div className="flex">
                <div className="pr-4">
                    <LinkButton onClick={() => {}}>Contact Sales</LinkButton>
                </div>
            </div>
        </div>
    );
};
