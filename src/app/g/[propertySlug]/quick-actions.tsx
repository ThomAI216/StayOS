"use client";

import { Wifi, LogOut, MessageSquare, Copy, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function QuickActions({ property, propertySlug }: { property: any, propertySlug: string }) {
    const [openPopup, setOpenPopup] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const router = useRouter();

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full">
            <div className="flex overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] gap-3 pb-2 -mx-6 px-6">
                <Button
                    variant="outline"
                    onClick={() => setOpenPopup('wifi')}
                    className="rounded-xl bg-white shadow-sm border-neutral-100 text-neutral-800 font-semibold shrink-0 h-11 px-4 gap-2 hover:bg-neutral-50 transition-all"
                >
                    <Wifi className="w-4 h-4 text-neutral-500" /> Wifi
                </Button>
                <Button
                    variant="outline"
                    onClick={() => setOpenPopup('checkout')}
                    className="rounded-xl bg-white shadow-sm border-neutral-100 text-neutral-800 font-semibold shrink-0 h-11 px-4 gap-2 hover:bg-neutral-50 transition-all"
                >
                    <LogOut className="w-4 h-4 text-neutral-500" /> Check-out
                </Button>
                <Button
                    variant="outline"
                    onClick={() => router.push(`/g/${propertySlug}/help`)}
                    className="rounded-xl bg-white shadow-sm border-neutral-100 text-neutral-800 font-semibold shrink-0 h-11 px-4 gap-2 hover:bg-neutral-50 transition-all"
                >
                    <MessageSquare className="w-4 h-4 text-neutral-500" /> Concierge
                </Button>
            </div>

            {/* Centered popup overlay */}
            {openPopup && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center px-6"
                    onClick={() => setOpenPopup(null)}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

                    {/* Card */}
                    <div
                        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6 animate-in fade-in zoom-in-95 duration-200"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Close */}
                        <button
                            onClick={() => setOpenPopup(null)}
                            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center hover:bg-neutral-200 transition-colors"
                        >
                            <X className="w-4 h-4 text-neutral-600" />
                        </button>

                        {openPopup === 'wifi' && (
                            <div>
                                <div className="flex items-center gap-2.5 mb-5">
                                    <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center">
                                        <Wifi className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <h3 className="text-lg font-bold text-neutral-900">Wi-Fi</h3>
                                </div>
                                <div className="space-y-3">
                                    <div className="bg-neutral-50 p-4 rounded-2xl">
                                        <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-1">Network</p>
                                        <p className="text-base font-bold text-neutral-900">{property.wifi_network}</p>
                                    </div>
                                    <div className="bg-neutral-50 p-4 rounded-2xl">
                                        <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-1">Password</p>
                                        <div className="flex items-center justify-between">
                                            <p className="text-base font-bold text-neutral-900 font-mono tracking-wide">{property.wifi_password}</p>
                                            <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => handleCopy(property.wifi_password)}>
                                                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-neutral-400" />}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {openPopup === 'checkout' && (
                            <div>
                                <div className="flex items-center gap-2.5 mb-5">
                                    <div className="w-10 h-10 rounded-2xl bg-orange-50 flex items-center justify-center">
                                        <LogOut className="w-5 h-5 text-orange-600" />
                                    </div>
                                    <h3 className="text-lg font-bold text-neutral-900">Check-out</h3>
                                </div>
                                <div className="space-y-3">
                                    <div className="bg-neutral-50 p-4 rounded-2xl text-center">
                                        <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-1">Check-out by</p>
                                        <p className="text-2xl font-black text-neutral-900">{property.check_out_time}</p>
                                    </div>
                                    <div className="space-y-2.5 pt-1">
                                        <p className="text-xs font-bold text-neutral-700">Before you leave:</p>
                                        <ul className="space-y-2 text-[13px] text-neutral-600">
                                            <li className="flex gap-2 items-start"><span className="mt-0.5 text-neutral-300">•</span> Leave the keys in the lockbox</li>
                                            <li className="flex gap-2 items-start"><span className="mt-0.5 text-neutral-300">•</span> Turn off all lights and AC/Heating</li>
                                            <li className="flex gap-2 items-start"><span className="mt-0.5 text-neutral-300">•</span> Lock the door behind you</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
