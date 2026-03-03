"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, Wind, Droplets, Key, Sparkles, Send, Clock, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function HelpPage() {
    const [issue, setIssue] = useState("");

    const quickRequests = [
        { icon: Droplets, label: "Need Towels" },
        { icon: Sparkles, label: "Cleaning" },
        { icon: Wind, label: "Heating Issue" },
        { icon: Key, label: "Check-in Help" },
    ];

    const tickets = [
        { title: "Need more towels", status: "In progress", time: "ETA: 30 mins", icon: Clock, color: "text-amber-500", bg: "bg-amber-50" },
        { title: "Wi-Fi password not working", status: "Resolved", time: "1 day ago", icon: CheckCircle2, color: "text-green-500", bg: "bg-green-50" },
    ];

    return (
        <div className="flex flex-col h-screen max-w-md mx-auto bg-gray-50 pb-20">
            {/* Header */}
            <div className="pt-12 pb-6 px-6 bg-white border-b border-gray-100 shrink-0">
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">Get Help</h1>
                <p className="text-sm text-gray-500">Fast assistance from your host.</p>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">

                {/* Quick requests */}
                <section>
                    <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Quick Requests</h2>
                    <div className="grid grid-cols-2 gap-3">
                        {quickRequests.map((req, i) => (
                            <Button key={i} variant="outline" className="h-auto py-4 flex flex-col gap-2 items-center justify-center bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50 rounded-xl">
                                <req.icon className="w-6 h-6 text-gray-600" />
                                <span className="text-xs font-medium text-gray-800">{req.label}</span>
                            </Button>
                        ))}
                    </div>
                </section>

                {/* Custom request */}
                <section>
                    <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Other Issues</h2>
                    <div className="bg-white p-1 rounded-2xl border border-gray-200 shadow-sm focus-within:ring-1 focus-within:ring-black focus-within:border-black transition-all">
                        <Textarea
                            placeholder="Describe what you need..."
                            value={issue}
                            onChange={(e) => setIssue(e.target.value)}
                            className="resize-none border-none shadow-none focus-visible:ring-0 min-h-[100px] text-base"
                        />
                        <div className="p-2 flex justify-end">
                            <Button size="sm" className="rounded-full gap-2 px-4 shadow-none font-medium">
                                <Send className="w-3.5 h-3.5" /> Submit Request
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Active Tickets */}
                <section>
                    <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Your Requests</h2>
                    <div className="space-y-3">
                        {tickets.map((ticket, i) => (
                            <Card key={i} className="rounded-xl border border-gray-200 shadow-sm overflow-hidden bg-white hover:border-gray-300 transition-colors cursor-pointer">
                                <CardContent className="p-4 flex gap-4 items-center">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${ticket.bg}`}>
                                        <ticket.icon className={`w-5 h-5 ${ticket.color}`} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-medium text-sm text-gray-900 truncate">{ticket.title}</h3>
                                        <div className="flex items-center justify-between mt-1">
                                            <span className="text-xs text-gray-500">{ticket.time}</span>
                                            <Badge variant="outline" className={`text-[10px] uppercase font-bold border-none ${ticket.bg} ${ticket.color}`}>
                                                {ticket.status}
                                            </Badge>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
}
