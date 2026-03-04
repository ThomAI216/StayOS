import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { DashboardClient } from "./dashboard-client";

export default async function PropertyDashboard({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const supabase = await createClient();

    const { data: property } = await supabase
        .from("properties")
        .select("*")
        .eq("id", id)
        .single();

    if (!property) return notFound();

    // Fetch all related data in parallel
    const [swotRes, reviewsRes, upsellsRes, photosRes, ticketsRes] = await Promise.all([
        supabase.from("property_swot").select("*").eq("property_id", id).order("created_at"),
        supabase.from("guest_reviews").select("*").eq("property_id", id).order("created_at", { ascending: false }),
        supabase.from("upsells").select("*").eq("property_id", id).order("created_at"),
        supabase.from("property_photos").select("*").eq("property_id", id).order("display_order"),
        supabase.from("tickets").select("*").eq("property_id", id).eq("status", "open"),
    ]);

    return (
        <div className="flex-1 overflow-y-auto">
            {/* Top bar */}
            <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100 px-8 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/host/properties" className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors">
                        <ArrowLeft className="w-4 h-4 text-slate-600" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold text-slate-900">{property.name}</h1>
                        <p className="text-xs text-slate-500">{property.address}</p>
                    </div>
                </div>
                <Link href={`/g/${property.slug}`} target="_blank" className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
                    <ExternalLink className="w-4 h-4" /> View Guest App
                </Link>
            </div>

            <DashboardClient
                property={property}
                swot={swotRes.data || []}
                reviews={reviewsRes.data || []}
                upsells={upsellsRes.data || []}
                photos={photosRes.data || []}
                openTickets={ticketsRes.data?.length || 0}
            />
        </div>
    );
}
