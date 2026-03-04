"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function SignOutButton() {
    const supabase = createClient();
    const router = useRouter();

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push("/login");
        router.refresh();
    };

    return (
        <button
            onClick={handleSignOut}
            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-red-600 w-full px-2 py-2 transition-colors"
        >
            <LogOut className="w-4 h-4" /> Sign Out
        </button>
    );
}
