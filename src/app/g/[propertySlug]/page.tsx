import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";
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
        .limit(3);

    if (!property) return <div className="p-8 text-center mt-20">Property not found.</div>;

    // Use specific image for demo or a placeholder
    const heroImage = property.slug === 'alpine-retreat' ? '/images/alpine_retreat_hero.png' : 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop';

    return (
        <div className="max-w-md mx-auto relative pb-24">
            {/* Hero Header */}
            <div className="relative h-72 w-full bg-neutral-200">
                <Image
                    src={heroImage}
                    alt={property.name}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/20 z-10" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 z-10" />

                <div className="absolute bottom-6 left-6 z-20 text-white">
                    <h1 className="text-4xl font-bold tracking-tight drop-shadow-md">{property.name}</h1>
                    <p className="text-sm font-medium opacity-90 flex items-center gap-1.5 mt-2 drop-shadow-md">
                        <MapPin className="w-4 h-4" /> {property.address}
                    </p>
                </div>
            </div>

            <div className="px-6 -mt-6 relative z-20 space-y-8">
                {/* Interactive Quick Actions */}
                <QuickActions property={property} propertySlug={propertySlug} />

                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-neutral-900 tracking-tight">Today's Picks</h2>
                        <Link href={`/g/${propertySlug}/around`} className="text-xs font-bold text-blue-600 uppercase tracking-wider hover:opacity-80 transition-opacity">
                            View All
                        </Link>
                    </div>

                    <div className="space-y-3">
                        {places && places.map((pick) => (
                            <Link key={pick.id} href={`/g/${propertySlug}/around`} className="block group">
                                <Card className="rounded-2xl border border-transparent shadow-sm hover:shadow-md hover:border-neutral-100 transition-all overflow-hidden bg-white/80 backdrop-blur-xl">
                                    <CardContent className="p-4 flex gap-4 items-center">
                                        <div className="h-14 w-14 rounded-2xl bg-neutral-100 flex items-center justify-center text-3xl shrink-0 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                                            {pick.emoji || '📍'}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-neutral-900 leading-tight group-hover:text-blue-600 transition-colors">{pick.title}</h3>
                                            <p className="text-sm text-neutral-500 leading-snug mt-1 line-clamp-1">{pick.description}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
