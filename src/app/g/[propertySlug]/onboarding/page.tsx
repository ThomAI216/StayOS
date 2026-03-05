import { GuestOnboardingClient } from "./onboarding-client";

export default async function GuestOnboardingPage({
    params,
}: {
    params: Promise<{ propertySlug: string }>;
}) {
    const { propertySlug } = await params;

    return <GuestOnboardingClient propertySlug={propertySlug} />;
}
