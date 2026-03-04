"use client";

import { Wifi, LogOut, FileText, MessageSquare, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function QuickActions({ property, propertySlug }: { property: any, propertySlug: string }) {
    const [openSheet, setOpenSheet] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const router = useRouter();

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <>
            <div className="grid grid-cols-4 gap-3">
                <div className="flex flex-col items-center gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setOpenSheet('wifi')}
                        className="h-14 w-14 rounded-2xl bg-white shadow-sm border-neutral-100 text-neutral-700 hover:text-black hover:bg-neutral-50 transition-all"
                    >
                        <Wifi className="w-6 h-6" />
                    </Button>
                    <span className="text-[11px] font-medium text-neutral-600">Wi-Fi</span>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setOpenSheet('checkout')}
                        className="h-14 w-14 rounded-2xl bg-white shadow-sm border-neutral-100 text-neutral-700 hover:text-black hover:bg-neutral-50 transition-all"
                    >
                        <LogOut className="w-6 h-6" />
                    </Button>
                    <span className="text-[11px] font-medium text-neutral-600">Check-out</span>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setOpenSheet('rules')}
                        className="h-14 w-14 rounded-2xl bg-white shadow-sm border-neutral-100 text-neutral-700 hover:text-black hover:bg-neutral-50 transition-all"
                    >
                        <FileText className="w-6 h-6" />
                    </Button>
                    <span className="text-[11px] font-medium text-neutral-600">Rules</span>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => router.push(`/g/${propertySlug}/help`)}
                        className="h-14 w-14 rounded-2xl bg-white shadow-sm border-neutral-100 text-neutral-700 hover:text-black hover:bg-neutral-50 transition-all"
                    >
                        <MessageSquare className="w-6 h-6" />
                    </Button>
                    <span className="text-[11px] font-medium text-neutral-600">Concierge</span>
                </div>
            </div>

            <Sheet open={!!openSheet} onOpenChange={(open) => !open && setOpenSheet(null)}>
                <SheetContent side="bottom" className="rounded-t-3xl min-h-[40vh] p-6 pb-12">
                    {openSheet === 'wifi' && (
                        <>
                            <SheetHeader className="mb-6">
                                <SheetTitle className="flex items-center gap-2 text-2xl font-bold">
                                    <Wifi className="w-6 h-6" /> Wi-Fi Connection
                                </SheetTitle>
                                <SheetDescription>Connect to the property's high-speed internet.</SheetDescription>
                            </SheetHeader>
                            <div className="space-y-4">
                                <div className="bg-neutral-50 p-4 rounded-2xl">
                                    <p className="text-sm font-medium text-neutral-500 mb-1">Network Name</p>
                                    <p className="text-lg font-bold text-neutral-900">{property.wifi_network}</p>
                                </div>
                                <div className="bg-neutral-50 p-4 rounded-2xl">
                                    <p className="text-sm font-medium text-neutral-500 mb-1">Password</p>
                                    <div className="flex items-center justify-between">
                                        <p className="text-lg font-bold text-neutral-900">{property.wifi_password}</p>
                                        <Button size="icon" variant="ghost" onClick={() => handleCopy(property.wifi_password)}>
                                            {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {openSheet === 'checkout' && (
                        <>
                            <SheetHeader className="mb-6">
                                <SheetTitle className="flex items-center gap-2 text-2xl font-bold">
                                    <LogOut className="w-6 h-6" /> Check-out
                                </SheetTitle>
                                <SheetDescription>Information for your departure.</SheetDescription>
                            </SheetHeader>
                            <div className="space-y-4">
                                <div className="bg-neutral-50 p-4 rounded-2xl">
                                    <p className="text-sm font-medium text-neutral-500 mb-1">Check-out Time</p>
                                    <p className="text-xl font-bold text-neutral-900">{property.check_out_time}</p>
                                </div>
                                <div className="p-2">
                                    <h4 className="font-bold mb-2">Before you leave:</h4>
                                    <ul className="list-disc pl-5 space-y-1 text-neutral-700">
                                        <li>Please leave the keys in the lockbox.</li>
                                        <li>Turn off all lights and AC/Heating.</li>
                                        <li>Lock the door behind you.</li>
                                    </ul>
                                </div>
                            </div>
                        </>
                    )}

                    {openSheet === 'rules' && (
                        <>
                            <SheetHeader className="mb-6">
                                <SheetTitle className="flex items-center gap-2 text-2xl font-bold">
                                    <FileText className="w-6 h-6" /> House Rules
                                </SheetTitle>
                                <SheetDescription>Please respect the property and neighbors.</SheetDescription>
                            </SheetHeader>
                            <div className="bg-neutral-50 p-4 rounded-2xl">
                                <p className="text-neutral-800 whitespace-pre-wrap leading-relaxed">
                                    {property.house_rules || "No specific rules provided. Please be respectful of the property."}
                                </p>
                            </div>
                        </>
                    )}
                </SheetContent>
            </Sheet>
        </>
    );
}
