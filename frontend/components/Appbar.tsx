"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { LinkButton } from "./buttons/LinkButton";
import { PrimaryButton } from "./buttons/PrimaryButton";

export const Appbar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/");
    };

    const showLogoutButton = ["/dashboard", "/zap/create"].some(route => pathname.startsWith(route)) || pathname.startsWith("/zap/");
    
    const hideSignupButton = ["/dashboard", "/zap/create"].some(route => pathname.startsWith(route)) || pathname.startsWith("/zap/");

    return (
        <div className="flex justify-between items-center border-b p-4">
            <div className="text-2xl font-extrabold">Zapier</div>

            {/* Desktop View Buttons */}
            <div className="hidden md:flex gap-4 items-center">
                <LinkButton onClick={() => {}}>Contact Sales</LinkButton>
                {showLogoutButton ? (
                    <LinkButton onClick={handleLogout}>Logout</LinkButton>
                ) : (
                    <LinkButton onClick={() => { router.push("/login"); }}>
                        Login
                    </LinkButton>
                )}
                {!hideSignupButton && (
                    <PrimaryButton onClick={() => { router.push("/signup"); }}>
                        Signup
                    </PrimaryButton>
                )}
            </div>

            {/* Mobile View Dropdown */}
            <div className="md:hidden relative">
                <button 
                    className="focus:outline-none text-sm px-4 py-2 bg-amber-700 text-white rounded-md"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                    Menu
                </button>
                {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                        <div className="flex flex-col">
                            <button 
                                className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                                onClick={() => { setDropdownOpen(false); }}
                            >
                                Contact Sales
                            </button>
                            {showLogoutButton ? (
                                <button 
                                    className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                                    onClick={() => { handleLogout(); setDropdownOpen(false); }}
                                >
                                    Logout
                                </button>
                            ) : (
                                <button 
                                    className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                                    onClick={() => { router.push("/login"); setDropdownOpen(false); }}
                                >
                                    Login
                                </button>
                            )}
                            {!hideSignupButton && (
                                <button 
                                    className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                                    onClick={() => { router.push("/signup"); setDropdownOpen(false); }}
                                >
                                    Signup
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
