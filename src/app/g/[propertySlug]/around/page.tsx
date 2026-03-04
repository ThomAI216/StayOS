import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Map, Navigation } from "lucide-react";
import { createClient } from "@/utils/supabase/server";

export default async function AroundYouPage({
    params,
}: {
    params: Promise<{ propertySlug: string }>;
}) {
    const { propertySlug } = await params;
    const supabase = await createClient();

    // Fetch property to get its ID
    const { data: property } = await supabase
        .from('properties')
        .select('id, address')
        .eq('slug', propertySlug)
        .single();

    // Fetch grouped approved places
    let places: any[] = [];
    if (property) {
        const { data } = await supabase
            .from('places')
            .select('*')
            .eq('property_id', property.id)
            .in('status', ['approve', 'pin']);
        places = data || [];
    }

    // Extract unique categories for tabs
    const categories = Array.from(new Set(places.map(p => p.category)));
    const allTabs = ['recommended', ...categories];

    return (
        <div className="flex flex-col h-screen max-w-md mx-auto bg-gray-50 pb-20">
            {/* Header */}
            <div className="pt-12 pb-4 px-6 bg-white border-b border-gray-100 shrink-0">
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">Around You</h1>

                {/* Map */}
                <div className="w-full h-48 bg-neutral-200 rounded-xl relative overflow-hidden border border-neutral-300 shadow-sm mt-3">
                    <iframe
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                        src={property ? `https://maps.google.com/maps?q=${encodeURIComponent(property.address)}&t=&z=14&ie=UTF8&iwloc=&output=embed` : ''}
                    ></iframe>
                </div>
            </div>

            {/* Tabs Layout */}
            <div className="flex-1 overflow-hidden flex flex-col px-6 pt-4">
                <Tabs defaultValue="recommended" className="w-full h-full flex flex-col">
                    <ScrollArea className="w-full whitespace-nowrap shrink-0 mb-4 h-10">
                        <TabsList className="w-max h-9 inline-flex p-1 bg-neutral-100 rounded-full">
                            <TabsTrigger value="recommended" className="rounded-full text-xs capitalize">All</TabsTrigger>
                            {categories.map(cat => (
                                <TabsTrigger key={cat} value={cat} className="rounded-full text-xs capitalize">{cat}</TabsTrigger>
                            ))}
                        </TabsList>
                        <ScrollBar orientation="horizontal" className="hidden" />
                    </ScrollArea>

                    <TabsContent value="recommended" className="flex-1 overflow-y-auto outline-none pb-24 m-0">
                        <div className="space-y-3">
                            {places.map((place, i) => (
                                <div key={i} className="flex gap-4 p-4 bg-white rounded-2xl border border-transparent hover:border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer items-center group">
                                    <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-xl shrink-0 group-hover:bg-blue-50 group-hover:scale-105 transition-all">
                                        {place.emoji || '📍'}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">{place.title}</h3>
                                        <div className="flex items-center justify-between mt-1">
                                            <p className="text-xs text-gray-500 truncate pr-2 max-w-[70%]">{place.description}</p>
                                            <span className="text-[10px] text-gray-400 flex items-center gap-1 font-medium bg-gray-100 px-2 py-0.5 rounded-full whitespace-nowrap shrink-0">
                                                <Navigation className="w-3 h-3" /> {place.distance_text || 'Nearby'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TabsContent>

                    {categories.map(cat => (
                        <TabsContent key={cat} value={cat} className="flex-1 overflow-y-auto outline-none pb-24 m-0">
                            <div className="space-y-3">
                                {places.filter(p => p.category === cat).map((place, i) => (
                                    <div key={i} className="flex gap-4 p-4 bg-white rounded-2xl border border-transparent hover:border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer items-center group">
                                        <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-xl shrink-0 group-hover:bg-blue-50 group-hover:scale-105 transition-all">
                                            {place.emoji || '📍'}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">{place.title}</h3>
                                            <div className="flex items-center justify-between mt-1">
                                                <p className="text-xs text-gray-500 truncate pr-2 max-w-[70%]">{place.description}</p>
                                                <span className="text-[10px] text-gray-400 flex items-center gap-1 font-medium bg-gray-100 px-2 py-0.5 rounded-full whitespace-nowrap shrink-0">
                                                    <Navigation className="w-3 h-3" /> {place.distance_text || 'Nearby'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </div>
    );
}
