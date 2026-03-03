import { createClient } from "@/utils/supabase/server";
import { PublishClient } from "./publish-client";
import { redirect } from "next/navigation";

export default async function PublishPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect('/host/login');

    const { data: property } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .eq('host_id', user.id)
        .single();

    if (!property) {
        redirect('/host/properties');
    }

    return <PublishClient propertySlug={property.slug} />;
}
