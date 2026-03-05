import { createClient } from "@/utils/supabase/server";
import { ArrowLeft, MapPin, ExternalLink, Clock, Navigation } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default async function PlaceDetailPage({
    params,
}: {
    params: Promise<{ propertySlug: string, placeId: string }>;
}) {
    const { propertySlug, placeId } = await params;
    const supabase = await createClient();

    // Fetch the place details
    const { data: place } = await supabase
        .from('places')
        .select('*')
        .eq('id', placeId)
        .single();

    // Fallback UI or proper UI depending on `place`
    if (!place) {
        return (
            <div className="max-w-md mx-auto pt-20 text-center">
                <p>Place not found.</p>
                <Link href={`/g/${propertySlug}/around`} className="text-blue-500 mt-4 inline-block">Go back</Link>
            </div>
        );
    }

    // Generate a placeholder image if none exists
    const placeholderImage = `https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop`;
    const imageUrl = place.image_url || placeholderImage;

    return (
        <div className="max-w-md mx-auto bg-white min-h-screen pb-28 relative">
            {/* Fixed Header with Back Button */}
            <div className="absolute top-0 w-full z-50 p-6 flex justify-between items-center">
                <Link href={`/g/${propertySlug}/around`}>
                    <div className="bg-white/80 backdrop-blur-md w-10 h-10 rounded-full flex items-center justify-center shadow-sm text-neutral-900 hover:bg-white transition-all border border-black/5">
                        <ArrowLeft className="w-5 h-5" />
                    </div>
                </Link>
            </div>

            {/* Hero Image */}
            <div className="relative h-80 w-full bg-neutral-100">
                <Image
                    src={imageUrl}
                    alt={place.title}
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                    <span className="text-3xl mb-3 block drop-shadow-sm">{place.emoji}</span>
                    <h1 className="text-3xl font-bold text-white tracking-tight leading-tight">{place.title}</h1>
                </div>
            </div>

            {/* Content Content Info */}
            <div className="px-6 mt-8 space-y-8">
                {/* AI Summary / Description */}
                <div>
                    <h2 className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest mb-3">Why we recommend it</h2>
                    <p className="text-[15px] leading-relaxed text-neutral-700">
                        {place.description || "A wonderful spot not to be missed during your stay. We highly recommend visiting this place to make the most of your time here."}
                    </p>
                </div>

                {/* Practical Information */}
                <div>
                    <h2 className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest mb-4">Good to know</h2>
                    <div className="space-y-5">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50/80 flex items-center justify-center shrink-0">
                                <Clock className="w-5 h-5 text-blue-600" />
                            </div>
                            <div className="pt-1">
                                <h3 className="text-[14px] font-bold text-neutral-900">Getting there</h3>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="inline-flex items-center gap-1.5 bg-neutral-100 text-neutral-700 text-[12px] font-semibold px-2.5 py-1 rounded-full">
                                        🚗 5 min
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 bg-neutral-100 text-neutral-700 text-[12px] font-semibold px-2.5 py-1 rounded-full">
                                        🚌 10 min
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 bg-neutral-100 text-neutral-700 text-[12px] font-semibold px-2.5 py-1 rounded-full">
                                        🚶 25 min
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-neutral-50 flex items-center justify-center shrink-0">
                                <MapPin className="w-5 h-5 text-neutral-600" />
                            </div>
                            <div className="pt-1.5">
                                <h3 className="text-[14px] font-bold text-neutral-900">Address</h3>
                                <p className="text-[13px] text-neutral-500 mt-1 leading-relaxed pr-4">
                                    {place.address || 'Address temporarily unavailable.'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="pt-4">
                    <a
                        href={place.link || `https://maps.google.com/?q=${encodeURIComponent(place.title + " " + (place.address || ""))}`}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full flex items-center justify-center gap-2 bg-neutral-900 text-white font-bold py-4 rounded-xl hover:bg-neutral-800 transition-colors shadow-md"
                    >
                        <Navigation className="w-4 h-4" /> Take me there
                    </a>
                </div>
            </div>
        </div>
    );
}
