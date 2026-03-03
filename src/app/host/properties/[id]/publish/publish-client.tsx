"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, QrCode, CheckCircle2, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function PublishClient({ propertySlug }: { propertySlug: string }) {
    const [copiedLink, setCopiedLink] = useState(false);
    const [copiedMsg, setCopiedMsg] = useState(false);

    // Provide a full origin string, falling back to window.location during client render
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://stayos.app';
    const fullLink = `${origin}/g/${propertySlug}`;
    const displayLink = fullLink.replace('https://', '').replace('http://', '');

    const messageTemplate = `Welcome! We're excited to host you. 

Here is your digital guest guide & concierge for the stay:
${fullLink}

It has the Wi-Fi password, checkout instructions, and our favorite local recommendations. You can also chat with our AI Butler if you need anything!`;

    const copyToClipboard = (text: string, setter: (val: boolean) => void) => {
        navigator.clipboard.writeText(text);
        setter(true);
        setTimeout(() => setter(false), 2000);
    };

    return (
        <div className="flex-1 flex items-center justify-center p-8 bg-slate-50 overflow-y-auto">
            <div className="max-w-2xl w-full">

                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Your Guest App is Live!</h1>
                    <p className="text-slate-500 mt-2 text-lg">Send this to your upcoming guests.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Quick Link Card */}
                    <Card className="border-slate-200 shadow-sm border-2">
                        <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                            <div className="p-4 bg-slate-100 rounded-2xl mb-2">
                                <QrCode className="w-24 h-24 text-slate-800" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-900">Direct Link</h3>
                                <p className="text-sm font-mono text-blue-600 mt-1 bg-blue-50 py-1 px-3 rounded-md break-all">{displayLink}</p>
                            </div>
                            <div className="flex gap-2 w-full pt-2">
                                <Button
                                    variant="outline"
                                    className="flex-1 gap-2"
                                    onClick={() => copyToClipboard(fullLink, setCopiedLink)}
                                >
                                    {copiedLink ? <CheckCircle2 className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                                    {copiedLink ? "Copied!" : "Copy Link"}
                                </Button>
                                <Link href={`/g/${propertySlug}`} target="_blank" className="flex-1">
                                    <Button className="w-full gap-2 text-white bg-slate-900">
                                        Open <ExternalLink className="w-4 h-4" />
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Welcome Message Card */}
                    <Card className="border-slate-200 shadow-sm flex flex-col">
                        <CardContent className="p-6 flex-1 flex flex-col">
                            <h3 className="font-semibold text-slate-900 mb-3">Message to Guests</h3>
                            <div className="bg-slate-100 p-4 rounded-xl text-sm text-slate-700 font-medium leading-relaxed whitespace-pre-wrap flex-1 border border-slate-200">
                                {messageTemplate}
                            </div>
                            <Button
                                variant="outline"
                                className="w-full mt-4 gap-2 border-slate-300"
                                onClick={() => copyToClipboard(messageTemplate, setCopiedMsg)}
                            >
                                {copiedMsg ? <CheckCircle2 className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                                {copiedMsg ? "Message Copied!" : "Copy Message"}
                            </Button>
                        </CardContent>
                    </Card>

                </div>

                <div className="mt-10 text-center">
                    <Link href="/host/properties">
                        <Button variant="ghost" className="text-slate-500 hover:text-slate-900">
                            Return to Dashboard
                        </Button>
                    </Link>
                </div>

            </div>
        </div>
    );
}
