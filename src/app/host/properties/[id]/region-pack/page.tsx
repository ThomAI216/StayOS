import { createClient } from "@/utils/supabase/server";
import { RegionPackClient } from "./region-client";
import { redirect } from "next/navigation";

export default async function RegionPackReviewPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient();

    // Verify user owns this property
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        redirect('/host/login');
    }

    const { data: property } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .eq('host_id', user.id)
        .single();

    if (!property) {
        redirect('/host/properties');
    }

    const { data: places } = await supabase
        .from('places')
        .select('*')
        .eq('property_id', id);

    return <RegionPackClient propertyId={id} initialPlaces={places || []} />;
}
