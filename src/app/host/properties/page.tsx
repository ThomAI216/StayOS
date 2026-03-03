import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Plus, ExternalLink, Settings } from "lucide-react";
import Link from "next/link";

export default function HostPropertiesList() {
    // Mock Data
    const properties = [
        { id: "alpine-retreat", name: "Alpine Retreat", location: "Chamonix Valley", status: "Live" }
    ];

    return (
        <div className="flex-1 overflow-y-auto p-8 max-w-5xl mx-auto w-full">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Your Properties</h1>
                    <p className="text-slate-500 mt-1">Manage guest experiences and region packs.</p>
                </div>
            </div>

            {/* Add New Property Section (Screen 1 Equivalent) */}
            <section className="mb-12 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-900 mb-2 flex items-center gap-2">
                    <Plus className="w-5 h-5 text-blue-600" /> Add New Property
                </h2>
                <p className="text-sm text-slate-500 mb-6">
                    Paste the address. We'll build the guest app automatically.
                </p>
                <div className="flex gap-4">
                    <div className="relative flex-1">
                        <MapPin className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                        <Input
                            placeholder="e.g. 123 Rue du Mont Blanc, Chamonix"
                            className="pl-10 h-12 bg-slate-50 border-slate-200"
                        />
                    </div>
                    <Link href="/host/properties/new-draft/setup">
                        <Button className="h-12 px-8 bg-blue-600 hover:bg-blue-700">Generate Setup</Button>
                    </Link>
                </div>
            </section>

            {/* Existing Properties */}
            <section>
                <h2 className="text-lg font-semibold text-slate-900 mb-4">Active Deployments</h2>
                <div className="grid grid-cols-1 gap-4">
                    {properties.map(p => (
                        <Card key={p.id} className="border-slate-200 shadow-none hover:shadow-sm transition-shadow">
                            <CardContent className="p-6 flex items-center justify-between">
                                <div className="flex gap-6 items-center">
                                    <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center border border-slate-200">
                                        <MapPin className="w-6 h-6 text-slate-400" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <h3 className="font-bold text-lg text-slate-900">{p.name}</h3>
                                            <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-semibold uppercase tracking-wide">
                                                {p.status}
                                            </span>
                                        </div>
                                        <p className="text-sm text-slate-500 mt-1">{p.location}</p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <Link href={`/host/properties/${p.id}/region-pack`}>
                                        <Button variant="outline" className="gap-2">
                                            <Settings className="w-4 h-4" /> Edit Pack
                                        </Button>
                                    </Link>
                                    <Link href={`/g/${p.id}`} target="_blank">
                                        <Button variant="secondary" className="gap-2 bg-slate-100 hover:bg-slate-200 text-slate-900">
                                            <ExternalLink className="w-4 h-4" /> View Guest App
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    );
}
