import { createClient } from "@/utils/supabase/server";
import { ExtrasClient } from "./extras-client";

export default async function ExtrasPage({
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

    let upsells = [];
    if (property) {
        const { data } = await supabase
            .from('upsells')
            .select('*')
            .eq('property_id', property.id)
            .eq('is_active', true);
        upsells = data || [];
    }

    return <ExtrasClient propertyId={property?.id} upsells={upsells} />;
}
