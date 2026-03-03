import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wifi, LogOut, FileText, MessageSquare, MapPin } from "lucide-react";
import Image from "next/image";
import { createClient } from "@/utils/supabase/server";

export default async function GuestWelcomePage({
    params,
}: {
    params: Promise<{ propertySlug: string }>;
}) {
    const { propertySlug } = await params;
    const supabase = await createClient();

    const { data: property } = await supabase
        .from('properties')
        .select('*')
        .eq('slug', propertySlug)
        .single();

    const { data: places } = await supabase
        .from('places')
        .select('*')
        .eq('property_id', property?.id)
        .eq('status', 'approve')
        .limit(3);

    if (!property) return <div className="p-8 text-center mt-20">Property not found.</div>;

    return (
        <div className="max-w-md mx-auto relative pb-8">
            {/* Hero Header */}
            <div className="relative h-64 w-full bg-neutral-200">
                <div className="absolute inset-0 bg-black/40 z-10" />
                {/* Placeholder for real property image */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10" />
                <div className="absolute bottom-4 left-6 z-20 text-white">
                    <h1 className="text-3xl font-bold tracking-tight">{property.name}</h1>
                    <p className="text-sm font-medium opacity-90 flex items-center gap-1 mt-1">
                        <MapPin className="w-4 h-4" /> {property.address}
                    </p>
                </div>
            </div>

            <div className="px-6 -mt-4 relative z-20 space-y-6">
                {/* Quick Actions */}
                <div className="grid grid-cols-4 gap-3">
                    <div className="flex flex-col items-center gap-2">
                        <Button variant="outline" size="icon" className="h-14 w-14 rounded-2xl bg-white shadow-sm border-neutral-100 text-neutral-700">
                            <Wifi className="w-6 h-6" />
                        </Button>
                        <span className="text-[11px] font-medium text-neutral-600">Wi-Fi</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <Button variant="outline" size="icon" className="h-14 w-14 rounded-2xl bg-white shadow-sm border-neutral-100 text-neutral-700">
                            <LogOut className="w-6 h-6" />
                        </Button>
                        <span className="text-[11px] font-medium text-neutral-600">Check-out</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <Button variant="outline" size="icon" className="h-14 w-14 rounded-2xl bg-white shadow-sm border-neutral-100 text-neutral-700">
                            <FileText className="w-6 h-6" />
                        </Button>
                        <span className="text-[11px] font-medium text-neutral-600">Rules</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <Button variant="outline" size="icon" className="h-14 w-14 rounded-2xl bg-white shadow-sm border-neutral-100 text-neutral-700">
                            <MessageSquare className="w-6 h-6" />
                        </Button>
                        <span className="text-[11px] font-medium text-neutral-600">Concierge</span>
                    </div>
                </div>

                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-neutral-900">Today's Picks</h2>
                        <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Morning</span>
                    </div>

                    <div className="space-y-3">
                        {places && places.map((pick) => (
                            <Card key={pick.id} className="rounded-2xl border-none shadow-sm overflow-hidden">
                                <CardContent className="p-4 flex gap-4 items-center bg-white">
                                    <div className="h-12 w-12 rounded-full bg-neutral-100 flex items-center justify-center text-2xl shrink-0">
                                        {pick.emoji || '📍'}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-neutral-900 leading-tight">{pick.title}</h3>
                                        <p className="text-sm text-neutral-500 leading-snug mt-1 line-clamp-1">{pick.description}</p>
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
