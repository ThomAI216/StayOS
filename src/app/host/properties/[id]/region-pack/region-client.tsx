"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, ArrowRight, Check, X, Pin, Coffee, Map as MapIcon, Snowflake, ShoppingBag, Waves } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export function RegionPackClient({ propertyId, initialPlaces = [] }: { propertyId: string, initialPlaces: any[] }) {
    const router = useRouter();
    const supabase = createClient();
    const [activeTab, setActiveTab] = useState("food");
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [places, setPlaces] = useState(initialPlaces.length > 0 ? initialPlaces : []);

    const categories = [
        { id: "food", label: "Food & Drinks", icon: Coffee },
        { id: "essentials", label: "Essentials", icon: ShoppingBag },
        { id: "ski", label: "Ski & Winter", icon: Snowflake },
        { id: "activities", label: "Activities", icon: MapIcon },
        { id: "wellness", label: "Health & Spa", icon: Waves },
    ];

    const toggleListening = () => {
        if (!isListening) {
            setIsListening(true);
            setTranscript("Listening... Try saying 'Pin the bakery' or 'Hide Tourist Trap'");
            // Mocking voice command processing
            setTimeout(() => {
                setTranscript("Pin the first bakery");
                setTimeout(async () => {
                    const foodPlaces = places.filter(p => p.category === 'food' || p.category === 'Food');
                    if (foodPlaces.length > 0) {
                        const targetId = foodPlaces[0].id;
                        await handleStatus(targetId, "pin");
                    }
                    setIsListening(false);
                }, 1500);
            }, 2500);
        } else {
            setIsListening(false);
            setTranscript("");
        }
    };

    const handleStatus = async (placeId: string, status: string) => {
        // Optimistic update
        setPlaces(p => p.map(pl => pl.id === placeId ? { ...pl, status } : pl));

        const { error } = await supabase
            .from('places')
            .update({ status })
            .eq('id', placeId);

        if (error) {
            console.error("Error updating place:", error);
            // In a real app we'd revert the optimistic update here
        } else {
            router.refresh();
        }
    };

    return (
        <div className="flex flex-col h-full bg-slate-50">
            {/* Top Banner - Voice / Actions */}
            <div className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between shrink-0">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Review Region Pack</h1>
                    <p className="text-sm text-slate-500">Approve, hide, or pin locations for your guests.</p>
                </div>

                <div className="flex items-center gap-4">
                    <Button
                        onClick={toggleListening}
                        variant={isListening ? "default" : "outline"}
                        className={`gap-2 h-12 px-6 rounded-full transition-all ${isListening ? "bg-red-500 hover:bg-red-600 shadow-md shadow-red-500/20" : ""
                            }`}
                    >
                        <Mic className={`w-5 h-5 ${isListening ? "animate-pulse" : ""}`} />
                        {isListening ? "Stop Voice Mode" : "Voice Editor Mode"}
                    </Button>

                    <Link href={`/host/properties/${propertyId}/knowledge`}>
                        <Button className="h-12 px-8 bg-black hover:bg-slate-800 text-white rounded-full">
                            Next: Property Manual <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Voice Transcript Overlay */}
            <AnimatePresence>
                {isListening && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-slate-900 text-white p-4 flex justify-center items-center shadow-lg z-10 relative"
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex gap-1">
                                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce delay-75" />
                                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce delay-150" />
                                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce delay-300" />
                            </div>
                            <p className="text-lg font-medium tracking-wide">{transcript}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex flex-1 overflow-hidden">
                {/* Left Sidebar Tabs */}
                <div className="w-64 bg-white border-r border-slate-200 overflow-y-auto py-6">
                    <nav className="space-y-1 px-4">
                        {categories.map(c => (
                            <button
                                key={c.id}
                                onClick={() => setActiveTab(c.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === c.id
                                    ? "bg-slate-100 text-slate-900"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                    }`}
                            >
                                <c.icon className={`w-5 h-5 ${activeTab === c.id ? "text-blue-600" : "text-slate-400"}`} />
                                {c.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Right Content Area */}
                <div className="flex-1 p-8 overflow-y-auto relative">
                    <div className="max-w-4xl mx-auto space-y-4">
                        {places.filter(p => p.category.toLowerCase() === activeTab).map(p => (
                            <Card key={p.id} className={`border transition-all duration-300 ${p.status === 'hide' ? 'opacity-50 border-slate-200 bg-slate-50' :
                                p.status === 'pin' ? 'border-amber-400 shadow-sm bg-amber-50/10' :
                                    'border-slate-200 shadow-sm bg-white'
                                }`}>
                                <CardContent className="p-6 flex items-center justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-lg font-bold text-slate-900">{p.title}</h3>
                                            {p.status === 'pin' && <Pin className="w-4 h-4 text-amber-500 fill-amber-500" />}
                                        </div>
                                        <p className="text-sm text-slate-500 mt-1">{p.distance_text || 'Nearby'} — {p.description}</p>
                                    </div>

                                    <div className="flex gap-2">
                                        <Button
                                            variant={p.status === 'approve' ? 'default' : 'outline'}
                                            size="icon"
                                            onClick={() => handleStatus(p.id, 'approve')}
                                            className={`h-10 w-10 shrink-0 rounded-full ${p.status === 'approve' ? 'bg-green-600 hover:bg-green-700' : ''}`}
                                        >
                                            <Check className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant={p.status === 'pin' ? 'default' : 'outline'}
                                            size="icon"
                                            onClick={() => handleStatus(p.id, 'pin')}
                                            className={`h-10 w-10 shrink-0 rounded-full ${p.status === 'pin' ? 'bg-amber-500 hover:bg-amber-600' : ''}`}
                                        >
                                            <Pin className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant={p.status === 'hide' ? 'default' : 'outline'}
                                            size="icon"
                                            onClick={() => handleStatus(p.id, 'hide')}
                                            className={`h-10 w-10 shrink-0 rounded-full ${p.status === 'hide' ? 'bg-slate-800 hover:bg-slate-900' : ''}`}
                                        >
                                            <X className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}

                        {places.filter(p => p.category.toLowerCase() === activeTab).length === 0 && (
                            <div className="text-center py-20">
                                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                                    <MapIcon className="w-8 h-8" />
                                </div>
                                <p className="text-slate-500">No items available in this category.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
