import { Navigation, ChevronRight } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

// AI-generated contextual catchphrases per category
const categoryCatchphrases: Record<string, { tagline: string; icon: string }> = {
    food: { tagline: "The go-to spots for a delicious morning ☀️", icon: "🍽️" },
    essentials: { tagline: "Everything you might need, right around the corner", icon: "🛒" },
    health: { tagline: "Feeling under the weather? We've got you covered", icon: "💊" },
    nature: { tagline: "Step outside and breathe in the mountain air", icon: "🌲" },
    ski: { tagline: "Hit the slopes — perfect conditions today!", icon: "⛷️" },
    wellness: { tagline: "Rainy day? Treat yourself to a relaxing moment", icon: "🧖" },
    restaurant: { tagline: "From cozy local gems to fine alpine dining", icon: "🍷" },
    drink: { tagline: "Catch sunset with a glass of something special", icon: "🥂" },
    activity: { tagline: "Make the most of your stay — adventure awaits", icon: "🏔️" },
    shopping: { tagline: "Bring a little piece of the mountains home", icon: "🛍️" },
    culture: { tagline: "Discover the story behind this place", icon: "🏛️" },
    nightlife: { tagline: "The night is young — let us show you around", icon: "🌙" },
};

function getCatchphrase(category: string) {
    const lower = category.toLowerCase();
    return categoryCatchphrases[lower] || { tagline: "Hand-picked for you", icon: "📍" };
}

export default async function AroundYouPage({
    params,
}: {
    params: Promise<{ propertySlug: string }>;
}) {
    const { propertySlug } = await params;
    const supabase = await createClient();

    const { data: property } = await supabase
        .from('properties')
        .select('id, address')
        .eq('slug', propertySlug)
        .single();

    let places: any[] = [];
    if (property) {
        const { data } = await supabase
            .from('places')
            .select('*')
            .eq('property_id', property.id)
            .in('status', ['approve', 'pin']);
        places = data || [];
    }

    // Group places by category
    const grouped: Record<string, any[]> = {};
    places.forEach(p => {
        const cat = p.category || 'Other';
        if (!grouped[cat]) grouped[cat] = [];
        grouped[cat].push(p);
    });

    const categoryOrder = Object.keys(grouped);

    return (
        <div className="max-w-md mx-auto bg-white min-h-screen pb-28">
            {/* Header */}
            <div className="px-6 pt-6 pb-4 bg-white sticky top-0 z-40">
                <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">Around you</h1>
            </div>

            {/* Interactive Map */}
            <div className="px-6">
                <div className="w-full h-52 rounded-3xl overflow-hidden shadow-sm border border-neutral-100">
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
                {property?.address && (
                    <div className="mt-4 relative group">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                            <span className="text-xl">✨</span>
                        </div>
                        <input
                            type="text"
                            placeholder="I am your guide... ask for recommendations!"
                            className="w-full bg-neutral-100 border-none text-sm rounded-2xl py-3.5 pl-12 pr-12 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all placeholder:text-neutral-500 font-medium"
                        />
                        <div className="absolute inset-y-0 right-4 flex items-center">
                            <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center shadow-sm cursor-pointer hover:scale-105 transition-transform">
                                <ChevronRight className="w-3 h-3 text-white" />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Category Carousels */}
            <div className="mt-8 space-y-10">
                {categoryOrder.map(cat => {
                    const meta = getCatchphrase(cat);
                    const items = grouped[cat];
                    return (
                        <section key={cat}>
                            <div className="px-6 mb-4">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg font-bold text-neutral-900 capitalize">{meta.icon} {cat}</h2>
                                    <span className="text-[11px] font-medium text-neutral-400">
                                        {items.length} {items.length === 1 ? 'place' : 'places'}
                                    </span>
                                </div>
                                {/* AI catchphrase */}
                                <p className="text-[13px] text-neutral-500 mt-1 italic">{meta.tagline}</p>
                            </div>

                            {/* Horizontal scroll carousel */}
                            <div className="flex overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] gap-4 pb-2 px-6 snap-x">
                                {items.map((place: any) => (
                                    <Link
                                        href={`/g/${propertySlug}/around/${place.id}`}
                                        key={place.id}
                                        className="shrink-0 w-64 snap-start group block"
                                    >
                                        <div className="rounded-2xl overflow-hidden bg-white border border-neutral-100 shadow-sm hover:shadow-md transition-all">
                                            {/* Emoji hero area */}
                                            <div className="h-32 w-full bg-neutral-50 flex items-center justify-center text-5xl relative group-hover:bg-neutral-100 transition-colors">
                                                <span className="group-hover:scale-110 transition-transform duration-300">
                                                    {place.emoji || '📍'}
                                                </span>
                                            </div>
                                            <div className="p-4">
                                                <h3 className="font-bold text-neutral-900 text-[15px] truncate group-hover:text-blue-600 transition-colors">{place.title}</h3>
                                                <p className="text-xs text-neutral-500 mt-1 line-clamp-2 leading-relaxed">{place.description}</p>

                                                {/* Transport mock pills */}
                                                <div className="flex items-center gap-2 mt-3">
                                                    <span className="inline-flex items-center gap-1 bg-neutral-100 text-neutral-600 text-[10px] font-bold px-2 py-1 rounded-full">
                                                        🚗 5 min
                                                    </span>
                                                    <span className="inline-flex items-center gap-1 bg-neutral-100 text-neutral-600 text-[10px] font-bold px-2 py-1 rounded-full">
                                                        🚌 10 min
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    );
                })}
            </div>

            {/* Empty state */}
            {places.length === 0 && (
                <div className="px-6 mt-16 text-center text-neutral-400 text-sm">
                    No places listed yet. Check back soon!
                </div>
            )}
        </div>
    );
}
