import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, ChefHat, Sparkles, Plane, Anchor } from "lucide-react";

export default function ExtrasPage() {
    const extras = [
        { title: "Late Checkout", desc: "Stay until 2 PM. Subject to availability.", price: "€50", icon: Clock },
        { title: "Airport Transfer", desc: "Private luxury van to/from GVA.", price: "€180", icon: Plane },
        { title: "Private Chef", desc: "3-course local dinner cooked in your kitchen.", price: "From €120/pp", icon: ChefHat },
        { title: "In-house Massage", desc: "60min deep tissue or relaxation.", price: "€100", icon: Sparkles },
        { title: "Ski Rental Delivery", desc: "Premium gear fitted in your living room.", price: "Partner Rates", icon: Anchor },
    ];

    return (
        <div className="flex flex-col min-h-screen max-w-md mx-auto bg-gray-50 pb-24">
            {/* Header */}
            <div className="pt-12 pb-6 px-6 bg-neutral-900 text-white shrink-0 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Sparkles className="w-32 h-32" />
                </div>
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Elevate your stay</h1>
                    <p className="text-neutral-400 text-sm max-w-[80%]">Curated services directly provided by your host and local partners.</p>
                </div>
            </div>

            <div className="p-6 space-y-4 -mt-4 relative z-20">
                {extras.map((extra, i) => (
                    <Card key={i} className="rounded-2xl border-none shadow-md bg-white overflow-hidden group">
                        <CardContent className="p-5 flex flex-col gap-4">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center shrink-0">
                                    <extra.icon className="w-6 h-6 text-neutral-700" />
                                </div>
                                <div className="flex-1 min-w-0 pt-1">
                                    <h3 className="font-semibold text-gray-900">{extra.title}</h3>
                                    <p className="text-sm text-gray-500 mt-1 leading-snug">{extra.desc}</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-1">
                                <span className="font-medium text-sm text-gray-900">{extra.price}</span>
                                <Button size="sm" variant="ghost" className="h-8 rounded-full font-semibold text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-4">
                                    Request
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
