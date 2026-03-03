import { createClient } from "@/utils/supabase/server";
import { KnowledgeClient } from "./knowledge-client";
import { redirect } from "next/navigation";

export default async function PropertyKnowledgePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect('/host/login');

    const { data: property, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .eq('host_id', user.id)
        .single();

    if (!property || error) {
        redirect('/host/properties');
    }

    return <KnowledgeClient propertyId={id} initialData={property} />;
}
