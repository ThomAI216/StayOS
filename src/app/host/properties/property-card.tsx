"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, ExternalLink } from "lucide-react";
import Link from "next/link";

export function PropertyCard({ p }: { p: any }) {
    return (
        <Link href={`/host/properties/${p.id}`} className="block">
            <Card className="border-slate-200 shadow-none hover:shadow-md transition-all hover:border-slate-300 cursor-pointer">
                <CardContent className="p-6 flex items-center justify-between">
                    <div className="flex gap-6 items-center">
                        <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center border border-slate-200">
                            <MapPin className="w-6 h-6 text-slate-400" />
                        </div>
                        <div>
                            <div className="flex items-center gap-3">
                                <h3 className="font-bold text-lg text-slate-900">{p.name}</h3>
                                <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-semibold uppercase tracking-wide">
                                    Live
                                </span>
                            </div>
                            <p className="text-sm text-slate-500 mt-1">{p.address}</p>
                        </div>
                    </div>

                    {/* Stop propagation so clicking this button doesn't navigate to the dashboard */}
                    <div onClick={e => e.preventDefault()}>
                        <Link href={`/g/${p.slug}`} target="_blank">
                            <Button variant="secondary" className="gap-2 bg-slate-100 hover:bg-slate-200 text-slate-900">
                                <ExternalLink className="w-4 h-4" /> View Guest App
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
