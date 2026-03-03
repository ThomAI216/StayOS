import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Map, Navigation } from "lucide-react";

export default function AroundYouPage() {
    const places = [
        { title: "L'Atelier Café", type: "Food", dist: "3 min", emoji: "☕" },
        { title: "Alpine Skis & Co", type: "Ski", dist: "10 min", emoji: "🎿" },
        { title: "Super U Mini", type: "Essentials", dist: "5 min", emoji: "🛒" },
        { title: "Mont Blanc Pharmacy", type: "Health", dist: "8 min", emoji: "⚕️" },
        { title: "River Walk Trail", type: "Nature", dist: "12 min", emoji: "🌲" },
    ];

    return (
        <div className="flex flex-col h-screen max-w-md mx-auto bg-gray-50 pb-20">
            {/* Header */}
            <div className="pt-12 pb-4 px-6 bg-white border-b border-gray-100 shrink-0">
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">Around You</h1>

                {/* Mock Map Placeholder */}
                <div className="w-full h-40 bg-neutral-200 rounded-xl relative overflow-hidden flex items-center justify-center border border-neutral-300">
                    <Map className="w-8 h-8 text-neutral-400 absolute" />
                    <div className="absolute inset-0 bg-blue-500/5 mix-blend-multiply" />
                    <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-md -translate-x-1/2 -translate-y-1/2" />
                </div>
            </div>

            {/* Tabs Layout */}
            <div className="flex-1 overflow-hidden flex flex-col px-6 pt-4">
                <Tabs defaultValue="recommended" className="w-full h-full flex flex-col">
                    <ScrollArea className="w-full whitespace-nowrap shrink-0 mb-4 h-10">
                        <TabsList className="w-max h-9 inline-flex p-1 bg-neutral-100 rounded-full">
                            <TabsTrigger value="recommended" className="rounded-full text-xs">Recommended</TabsTrigger>
                            <TabsTrigger value="food" className="rounded-full text-xs">Food</TabsTrigger>
                            <TabsTrigger value="nature" className="rounded-full text-xs">Nature</TabsTrigger>
                            <TabsTrigger value="ski" className="rounded-full text-xs">Ski</TabsTrigger>
                            <TabsTrigger value="essentials" className="rounded-full text-xs">Essentials</TabsTrigger>
                        </TabsList>
                    </ScrollArea>

                    <TabsContent value="recommended" className="flex-1 overflow-y-auto outline-none pb-4 m-0">
                        <div className="space-y-4">
                            {places.map((place, i) => (
                                <div key={i} className="flex gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm items-center">
                                    <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-xl shrink-0">
                                        {place.emoji}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-gray-900 truncate">{place.title}</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Badge variant="secondary" className="text-[10px] px-1.5 py-0 font-medium bg-gray-100 text-gray-600 border-none shadow-none">{place.type}</Badge>
                                            <span className="text-xs text-gray-500 flex items-center gap-1">
                                                <Navigation className="w-3 h-3" /> {place.dist}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="food" className="flex-1 overflow-y-auto">
                        {/* Same as above but filtered */}
                        <div className="text-center text-sm text-gray-500 pt-8">Showing Food...</div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
