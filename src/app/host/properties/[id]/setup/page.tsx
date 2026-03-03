"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Map, Coffee, Sparkles, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function SetupGeneratorPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [step, setStep] = useState(0);

    const steps = [
        { icon: Map, label: "Scanning Maps & Boundaries..." },
        { icon: Coffee, label: "Finding Top Rated Cafés & Dining..." },
        { icon: Sparkles, label: "Curating Activities (Winter Profile)..." },
        { icon: CheckCircle2, label: "Drafting Region Pack..." }
    ];

    useEffect(() => {
        const intervals = [
            setTimeout(() => setStep(1), 1500),
            setTimeout(() => setStep(2), 3000),
            setTimeout(() => setStep(3), 4500),
            setTimeout(() => {
                router.push(`/host/properties/${params.id}/region-pack`);
            }, 5500),
        ];
        return () => intervals.forEach(clearTimeout);
    }, [router, params.id]);

    return (
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-50">
            <div className="max-w-md w-full space-y-8 text-center">
                <div>
                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse">
                        <Sparkles className="w-8 h-8" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900">Building Guest Experience</h1>
                    <p className="text-slate-500 mt-2">Our AI is scanning the area to find the absolute best spots for your guests.</p>
                </div>

                <div className="space-y-3 pt-6 text-left">
                    {steps.map((s, i) => {
                        const isPast = step > i;
                        const isCurrent = step === i;

                        return (
                            <Card key={i} className={`border-none shadow-sm transition-all duration-500 ${isPast ? 'opacity-50 grayscale' : ''} ${isCurrent ? 'ring-2 ring-blue-500 ring-offset-2 scale-105' : ''} ${step < i ? 'opacity-30' : ''}`}>
                                <CardContent className="p-4 flex items-center gap-4">
                                    <s.icon className={`w-5 h-5 ${isCurrent ? 'text-blue-600 animate-bounce' : 'text-slate-400'}`} />
                                    <span className="font-medium text-slate-700">{s.label}</span>
                                    {isPast && <CheckCircle2 className="w-4 h-4 ml-auto text-green-500" />}
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}
