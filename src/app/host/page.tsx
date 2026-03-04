import { redirect } from "next/navigation";

// /host just redirects straight to the properties dashboard
export default function HostPage() {
    redirect("/host/properties");
}
