"use client";

import { useRouter, usePathname } from "next/navigation";
import { LinkButton } from "./buttons/LinkButton";
import { PrimaryButton } from "./buttons/PrimaryButton";

export const Appbar = () => {
    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/");
    };

    const showLogoutButton = ["/dashboard", "/zap/create"].some(route => pathname.startsWith(route)) || pathname.startsWith("/zap/");
    
    const hideSignupButton = ["/dashboard", "/zap/create"].some(route => pathname.startsWith(route)) || pathname.startsWith("/zap/");

    return (
        <div className="flex border-b justify-between p-4">
            <div className="flex flex-col justify-center text-2xl font-extrabold">Zapier</div>
            <div className="flex">
                <div className="pr-4">
                    <LinkButton onClick={() => {}}>Contact Sales</LinkButton>
                </div>
                <div className="pr-4">
                    {showLogoutButton ? (
                        <LinkButton onClick={handleLogout}>Logout</LinkButton>
                    ) : (
                        <LinkButton
                            onClick={() => {
                                router.push("/login");
                            }}
                        >
                            Login
                        </LinkButton>
                    )}
                </div>
                {!hideSignupButton && (
                    <PrimaryButton
                        onClick={() => {
                            router.push("/signup");
                        }}
                    >
                        Signup
                    </PrimaryButton>
                )}
            </div>
        </div>
    );
};
