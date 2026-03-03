"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { Map, Coffee, Sparkles, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/client";

export default function SetupGeneratorPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const supabase = createClient();
    const [step, setStep] = useState(0);

    const steps = [
        { icon: Map, label: "Scanning Maps & Boundaries..." },
        { icon: Coffee, label: "Finding Top Rated Cafés & Dining..." },
        { icon: Sparkles, label: "Curating Activities (Winter Profile)..." },
        { icon: CheckCircle2, label: "Drafting Region Pack..." }
    ];

    useEffect(() => {
        let isMounted = true;
        let propertyId = id; // Could be a slug or timestamp from UI creation

        async function setupProperty() {
            // First delay for visual effect
            await new Promise(r => setTimeout(r, 1500));
            if (!isMounted) return;
            setStep(1);

            // Step 2: Ensure Property exists in Database.
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                // Upsert property (using the temporal id as name/slug for now until real form)
                const { data: newProp } = await supabase.from('properties').insert({
                    host_id: user.id,
                    name: 'New Property',
                    slug: `prop-${id}`,
                }).select().single();

                if (newProp) {
                    propertyId = newProp.id;
                }
            }

            await new Promise(r => setTimeout(r, 1500));
            if (!isMounted) return;
            setStep(2);

            await new Promise(r => setTimeout(r, 1500));
            if (!isMounted) return;
            setStep(3);

            // Final transition
            await new Promise(r => setTimeout(r, 1000));
            if (!isMounted) return;
            router.push(`/host/properties/${propertyId}/region-pack`);
        }

        setupProperty();

        return () => {
            isMounted = false;
        };
    }, [router, id, supabase]);

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
