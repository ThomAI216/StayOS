import { createClient } from "@/utils/supabase/server";
import { HelpClient } from "./help-client";

export default async function HelpPage({
    params,
}: {
    params: Promise<{ propertySlug: string }>;
}) {
    const { propertySlug } = await params;
    const supabase = await createClient();

    const { data: property } = await supabase
        .from('properties')
        .select('id')
        .eq('slug', propertySlug)
        .single();

    let tickets = [];
    if (property) {
        const { data } = await supabase
            .from('tickets')
            .select('*')
            .eq('property_id', property.id)
            .order('created_at', { ascending: false });
        tickets = data || [];
    }

    return <HelpClient propertyId={property?.id} initialTickets={tickets} />;
}
