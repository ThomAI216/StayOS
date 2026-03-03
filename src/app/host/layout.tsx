import Link from "next/link";
import { Home, List, Tag, Settings, LogOut, LayoutGrid } from "lucide-react";

export default function HostLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-gray-50 text-slate-900 font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
                <div className="p-6">
                    <h1 className="text-xl font-bold tracking-tight">StayOS Host</h1>
                </div>
                <nav className="flex-1 px-4 space-y-1">
                    <Link href="/host/properties" className="flex flex-row items-center gap-3 px-3 py-2 text-sm font-medium text-gray-900 bg-gray-100 rounded-lg">
                        <LayoutGrid className="w-4 h-4 text-gray-500" />
                        Properties
                    </Link>
                    <Link href="#" className="flex flex-row items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg">
                        <List className="w-4 h-4 text-gray-500" />
                        Inbox / Tickets
                    </Link>
                    <Link href="#" className="flex flex-row items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg">
                        <Tag className="w-4 h-4 text-gray-500" />
                        Upsells Admin
                    </Link>
                </nav>
                <div className="p-4 border-t border-gray-200">
                    <button className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-red-600 w-full px-2 py-2">
                        <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                {children}
            </main>
        </div>
    );
}
