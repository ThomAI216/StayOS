"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, ChefHat, Sparkles, Plane, Anchor, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

// Client component wrapper for Upsells
export function ExtrasClient({ propertyId, upsells = [] }: { propertyId?: string, upsells: any[] }) {
    const supabase = createClient();
    const router = useRouter();
    const [requesting, setRequesting] = useState<string | null>(null);
    const [requested, setRequested] = useState<Set<string>>(new Set());

    const handleRequest = async (upsellId: string) => {
        if (!propertyId || requesting) return;
        setRequesting(upsellId);

        const { error } = await supabase.from('upsell_requests').insert({
            property_id: propertyId,
            upsell_id: upsellId,
            status: 'pending'
        });

        if (!error) {
            setRequested(prev => new Set(prev).add(upsellId));
        }

        setRequesting(null);
    };

    const getIcon = (iconName: string | null) => {
        const props = { className: "w-6 h-6 text-neutral-700" };
        switch (iconName?.toLowerCase()) {
            case 'clock': return <Clock {...props} />;
            case 'plane': return <Plane {...props} />;
            case 'chefhat': return <ChefHat {...props} />;
            case 'anchor': return <Anchor {...props} />;
            default: return <Sparkles {...props} />;
        }
    };

    return (
        <div className="flex flex-col max-w-md mx-auto pt-6 px-6">
            {/* Header */}
            <div className="pt-8 pb-6 px-6 bg-neutral-900 text-white rounded-3xl shadow-sm relative overflow-hidden mb-6">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Sparkles className="w-32 h-32" />
                </div>
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Elevate your stay</h1>
                    <p className="text-neutral-400 text-sm max-w-[80%]">Curated services directly provided by your host and local partners.</p>
                </div>
            </div>

            <div className="space-y-4 relative z-20 pb-8">
                {upsells.length === 0 ? (
                    <div className="p-8 text-center text-sm text-gray-500 border border-gray-200 rounded-xl bg-white/50 border-dashed">
                        No extras currently available.
                    </div>
                ) : upsells.map((extra, i) => {
                    const isRequested = requested.has(extra.id);
                    const isRequestingLocal = requesting === extra.id;

                    return (
                        <Card key={i} className="rounded-2xl border-none shadow-md bg-white overflow-hidden group">
                            <CardContent className="p-5 flex flex-col gap-4">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                        {getIcon(extra.icon)}
                                    </div>
                                    <div className="flex-1 min-w-0 pt-1">
                                        <h3 className="font-semibold text-gray-900">{extra.title}</h3>
                                        <p className="text-sm text-gray-500 mt-1 leading-snug">{extra.description}</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-1">
                                    <span className="font-medium text-sm text-gray-900">{extra.price_text}</span>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        disabled={isRequested || isRequestingLocal}
                                        onClick={() => handleRequest(extra.id)}
                                        className={`h-8 rounded-full font-semibold px-4 transition-colors ${isRequested ? 'text-green-600 bg-green-50' : 'text-blue-600 hover:text-blue-700 hover:bg-blue-50'}`}>
                                        {isRequested ? (
                                            <><CheckCircle2 className="w-4 h-4 mr-2" /> Requested</>
                                        ) : isRequestingLocal ? (
                                            "Working..."
                                        ) : (
                                            "Request"
                                        )}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
