import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { QuickActions } from "./quick-actions";

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
        .limit(5);

    const { data: upsells } = await supabase
        .from('upsells')
        .select('*')
        .eq('property_id', property?.id)
        .eq('is_active', true)
        .limit(5);

    if (!property) return <div className="p-8 text-center mt-20">Property not found.</div>;

    const heroImage = property.slug === 'alpine-retreat' ? '/images/alpine_retreat_hero.png' : 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop';

    // Mock realistic stay dates for the demo
    const today = new Date();
    const checkout = new Date(today);
    checkout.setDate(today.getDate() + 4);
    const dateStr = `${today.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${checkout.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;

    return (
        <div className="max-w-md mx-auto relative pb-28 bg-white min-h-screen">
            {/* Header */}
            <div className="flex items-center justify-center px-6 pt-6 pb-4 bg-white sticky top-0 z-40">
                <div className="font-serif font-black text-xl tracking-tighter uppercase text-center w-full">{property.name}</div>
            </div>

            {/* Hero Image */}
            <div className="px-6">
                <div className="relative h-60 w-full rounded-3xl overflow-hidden shadow-sm">
                    <Image
                        src={heroImage}
                        alt={property.name}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            </div>

            <div className="px-6 mt-8 space-y-10">
                {/* Welcome Context */}
                <div className="space-y-1">
                    <h1 className="text-[28px] font-bold tracking-tight text-neutral-900">Welcome Alex!</h1>
                    <p className="text-[13px] font-medium text-neutral-600">{dateStr} • 2 Adults, 2 Children</p>
                    <Link href={`/g/${propertySlug}/guide`} className="text-[13px] text-blue-600 font-semibold inline-block hover:underline pt-0.5">
                        See reservation
                    </Link>
                </div>

                {/* Horizontal Quick Actions */}
                <QuickActions property={property} propertySlug={propertySlug} />

                {/* Top picks for you (Attractions / Places) */}
                {places && places.length > 0 && (
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-neutral-900 tracking-tight">Top picks for you</h2>
                            <Link href={`/g/${propertySlug}/around`} className="text-xs font-semibold text-neutral-500 hover:text-black">
                                See all
                            </Link>
                        </div>
                        <div className="flex overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] gap-4 pb-4 -mx-6 px-6 snap-x">
                            {places.map((pick) => (
                                <Link key={pick.id} href={`/g/${propertySlug}/around`} className="block shrink-0 w-56 snap-start group">
                                    <div className="rounded-2xl overflow-hidden bg-white border border-neutral-100 shadow-sm hover:shadow-md transition-all">
                                        <div className="h-32 w-full bg-neutral-100 relative flex items-center justify-center text-4xl group-hover:scale-105 transition-transform duration-500">
                                            {pick.emoji}
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-bold text-neutral-900 truncate text-[15px]">{pick.title}</h3>
                                            <p className="text-xs text-neutral-500 truncate mt-1">{pick.description}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* Upgrade your stay (Upsells) */}
                {upsells && upsells.length > 0 && (
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-neutral-900 tracking-tight">Upgrade your stay</h2>
                            <Link href={`/g/${propertySlug}/extras`} className="text-xs font-semibold text-neutral-500 hover:text-black">
                                See all
                            </Link>
                        </div>
                        <div className="flex overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] gap-4 pb-4 -mx-6 px-6 snap-x">
                            {upsells.map((extra) => (
                                <Link key={extra.id} href={`/g/${propertySlug}/extras`} className="block shrink-0 w-60 snap-start group">
                                    <div className="rounded-2xl overflow-hidden bg-white border border-neutral-100 shadow-sm hover:shadow-md transition-all">
                                        <div className="h-36 w-full bg-neutral-100 flex items-center justify-center relative overflow-hidden">
                                            {/* Subtle gradient pattern to make it look premium since we don't have images for upsells yet */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-50"></div>
                                            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-indigo-600 shadow-sm relative z-10 font-bold text-xl group-hover:scale-110 transition-transform">
                                                +
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-bold text-neutral-900 truncate text-[15px]">{extra.title}</h3>
                                            <div className="flex items-center justify-between mt-1">
                                                <p className="text-xs font-medium text-neutral-500">{extra.price_text}</p>
                                                <div className="text-[11px] font-bold text-indigo-600 flex items-center opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                                                    Request <ChevronRight className="w-3 h-3 ml-0.5" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
