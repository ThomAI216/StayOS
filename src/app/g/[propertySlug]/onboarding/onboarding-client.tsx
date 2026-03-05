"use client";

import { useState } from "react";
import { Mic, ArrowRight, Sparkles, Send, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function GuestOnboardingClient({ propertySlug }: { propertySlug: string }) {
    const router = useRouter();
    const [step, setStep] = useState(1);

    // Form state
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(0);
    const [vibe, setVibe] = useState<string[]>([]);
    const [message, setMessage] = useState("");
    const [isRecording, setIsRecording] = useState(false);

    const toggleVibe = (v: string) => {
        setVibe(prev => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v]);
    };

    const handleComplete = () => {
        // Here we would typically save to the database
        // and trigger the AI agent to start tailoring the experience
        router.push(`/g/${propertySlug}`);
    };

    if (step === 1) {
        return (
            <div className="max-w-md mx-auto bg-white min-h-screen flex flex-col justify-between px-6 py-12 relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-60"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-indigo-100 rounded-full blur-3xl opacity-60"></div>

                <div className="relative z-10 space-y-8 mt-12">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                        <Sparkles className="w-8 h-8 text-white" />
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 leading-tight">
                            Hi Alex,<br />
                            Let's tailor your experience.
                        </h1>
                        <p className="text-[15px] text-neutral-500 leading-relaxed">
                            I am your AI Butler. Tell me a bit about your upcoming trip to Alpine Retreat so I can curate the perfect recommendations for you.
                        </p>
                    </div>

                    <div className="space-y-6 pt-6">
                        <div className="bg-white rounded-3xl p-5 shadow-sm border border-neutral-100 space-y-4">
                            <h3 className="font-bold text-neutral-900 text-sm">Who is coming?</h3>

                            <div className="flex items-center justify-between">
                                <span className="text-[15px] font-medium text-neutral-700">Adults</span>
                                <div className="flex items-center gap-4 bg-neutral-50 rounded-full px-2 py-1">
                                    <button onClick={() => setAdults(Math.max(1, adults - 1))} className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-500 hover:bg-white hover:shadow-sm font-bold text-lg transition-all">-</button>
                                    <span className="w-4 text-center font-bold text-neutral-900">{adults}</span>
                                    <button onClick={() => setAdults(adults + 1)} className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-500 hover:bg-white hover:shadow-sm font-bold text-lg transition-all">+</button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-[15px] font-medium text-neutral-700">Children</span>
                                <div className="flex items-center gap-4 bg-neutral-50 rounded-full px-2 py-1">
                                    <button onClick={() => setChildren(Math.max(0, children - 1))} className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-500 hover:bg-white hover:shadow-sm font-bold text-lg transition-all">-</button>
                                    <span className="w-4 text-center font-bold text-neutral-900">{children}</span>
                                    <button onClick={() => setChildren(children + 1)} className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-500 hover:bg-white hover:shadow-sm font-bold text-lg transition-all">+</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 w-full pt-8">
                    <Button
                        onClick={() => setStep(2)}
                        className="w-full h-14 rounded-2xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-[15px]"
                    >
                        Next <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto bg-white min-h-screen flex flex-col px-6 py-12 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-60"></div>

            <div className="relative z-10 mt-12 mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-neutral-900 leading-tight">
                    What are you looking forward to?
                </h1>
                <p className="text-[15px] text-neutral-500 leading-relaxed mt-4">
                    Send me a voice note about your perfect stay, or click a few options below. I'll make sure everything is ready.
                </p>
            </div>

            <div className="relative z-10 flex-1 flex flex-col">
                <div className="space-y-3 mb-8">
                    <div className="flex flex-wrap gap-2">
                        {['Relaxation', 'Adventure', 'Food & Wine', 'Nature Trails', 'Skiing', 'Family Time', 'Local Culture'].map((v) => (
                            <button
                                key={v}
                                onClick={() => toggleVibe(v)}
                                className={`px-4 py-2.5 rounded-full text-[13px] font-semibold border transition-all ${vibe.includes(v)
                                        ? 'bg-neutral-900 border-neutral-900 text-white'
                                        : 'bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300'
                                    }`}
                            >
                                {v}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Voice / Text input area */}
                <div className="mt-auto pt-6 space-y-4 pb-4">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-4 flex items-center">
                            <button
                                onClick={() => setIsRecording(!isRecording)}
                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isRecording ? 'bg-red-100 text-red-500 animate-pulse' : 'bg-neutral-100 text-neutral-500'}`}
                            >
                                <Mic className="w-5 h-5" />
                            </button>
                        </div>
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder={isRecording ? "Listening..." : "Or type what you have in mind..."}
                            className="w-full bg-white border border-neutral-200 text-sm rounded-2xl py-4 pl-16 pr-14 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                        />
                        <div className="absolute inset-y-0 right-3 flex items-center">
                            <button
                                onClick={handleComplete}
                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${message || vibe.length > 0 ? 'bg-blue-600 text-white shadow-sm' : 'bg-neutral-100 text-neutral-400'}`}
                            >
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-2 pt-2">
                        <Button
                            variant="ghost"
                            className="text-neutral-400 text-xs font-semibold hover:text-neutral-600"
                            onClick={handleComplete}
                        >
                            Skip for now
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
