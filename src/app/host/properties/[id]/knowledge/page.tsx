"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Sparkles, Wifi, Key, Clock, Car } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function PropertyKnowledgePage({ params }: { params: { id: string } }) {
    const [isFilling, setIsFilling] = useState(false);
    const [content, setContent] = useState("");

    const [formData, setFormData] = useState({
        wifiNetwork: "",
        wifiPassword: "",
        checkIn: "",
        checkOut: "",
        entry: "",
        parking: ""
    });

    const handleAiAutoFill = () => {
        setIsFilling(true);
        setTimeout(() => {
            setFormData({
                wifiNetwork: "Alpine_Guest_5G",
                wifiPassword: "mountainsarecalling",
                checkIn: "15:00",
                checkOut: "10:00",
                entry: "Keybox code is 4921. It's located on the wooden beam left of the front door.",
                parking: "Spot #4 in the underground garage."
            });
            setIsFilling(false);
            setContent("");
        }, 1500);
    };

    return (
        <div className="flex-1 overflow-y-auto p-8 max-w-4xl mx-auto w-full">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Property Manual</h1>
                    <p className="text-slate-500 mt-1">The essentials your guests will need.</p>
                </div>
                <Link href={`/host/properties/${params.id}/publish`}>
                    <Button className="h-12 px-8 bg-blue-600 hover:bg-blue-700">
                        Publish Guest App
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Column - AI Auto fill */}
                <div className="md:col-span-1 space-y-4">
                    <div className="bg-gradient-to-b from-blue-50 to-indigo-50 border border-blue-100 p-5 rounded-2xl">
                        <h3 className="font-semibold text-blue-900 flex items-center gap-2 mb-2">
                            <Sparkles className="w-4 h-4" /> AI Autofill
                        </h3>
                        <p className="text-xs text-blue-700 mb-4">Paste your existing house manual or Airbnb listing description here and we'll extract the details.</p>
                        <Textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="h-40 bg-white/60 border-blue-200 resize-none text-sm mb-3"
                            placeholder="Paste text here..."
                        />
                        <Button
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                            onClick={handleAiAutoFill}
                            disabled={isFilling || !content}
                        >
                            {isFilling ? "Extracting..." : "Extract Details"}
                        </Button>
                    </div>
                </div>

                {/* Right Column - Form */}
                <div className="md:col-span-2 space-y-6">
                    <Card className="border-slate-200 shadow-sm">
                        <CardContent className="p-6 space-y-6">

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                                        <Wifi className="w-4 h-4 text-slate-400" /> Wi-Fi Network
                                    </label>
                                    <Input
                                        value={formData.wifiNetwork}
                                        onChange={e => setFormData({ ...formData, wifiNetwork: e.target.value })}
                                        placeholder="e.g. Guest Network"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                                        <Key className="w-4 h-4 text-slate-400" /> Wi-Fi Password
                                    </label>
                                    <Input
                                        value={formData.wifiPassword}
                                        onChange={e => setFormData({ ...formData, wifiPassword: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-slate-400" /> Check-in Time
                                    </label>
                                    <Input
                                        value={formData.checkIn}
                                        onChange={e => setFormData({ ...formData, checkIn: e.target.value })}
                                        placeholder="e.g. 15:00"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Check-out Time</label>
                                    <Input
                                        value={formData.checkOut}
                                        onChange={e => setFormData({ ...formData, checkOut: e.target.value })}
                                        placeholder="e.g. 11:00"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                                    <Key className="w-4 h-4 text-slate-400" /> Entry Instructions
                                </label>
                                <Textarea
                                    value={formData.entry}
                                    onChange={e => setFormData({ ...formData, entry: e.target.value })}
                                    className="resize-none h-24"
                                    placeholder="Where is the key? What's the code?"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                                    <Car className="w-4 h-4 text-slate-400" /> Parking Info
                                </label>
                                <Textarea
                                    value={formData.parking}
                                    onChange={e => setFormData({ ...formData, parking: e.target.value })}
                                    className="resize-none h-20"
                                    placeholder="Where should guests park?"
                                />
                            </div>

                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
