import { Home, Compass, MessageSquare, HelpCircle, Sparkles } from "lucide-react";
import Link from "next/link";

export default async function GuestLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ propertySlug: string }>;
}) {
    const { propertySlug } = await params;

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900 font-sans pb-20">
            <main className="flex-1">{children}</main>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 px-6 py-3 pb-safe">
                <ul className="flex justify-between items-center max-w-md mx-auto">
                    <li>
                        <Link
                            href={`/g/${propertySlug}`}
                            className="flex flex-col items-center gap-1 text-gray-500 hover:text-black"
                        >
                            <Home className="w-6 h-6" />
                            <span className="text-[10px] font-medium">Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={`/g/${propertySlug}/around`}
                            className="flex flex-col items-center gap-1 text-gray-500 hover:text-black"
                        >
                            <Compass className="w-6 h-6" />
                            <span className="text-[10px] font-medium">Around</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={`/g/${propertySlug}/ask`}
                            className="flex flex-col items-center gap-1 text-gray-500 hover:text-black relative"
                        >
                            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-blue-500 rounded-full border border-white" />
                            <MessageSquare className="w-6 h-6" />
                            <span className="text-[10px] font-medium">Ask</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={`/g/${propertySlug}/help`}
                            className="flex flex-col items-center gap-1 text-gray-500 hover:text-black"
                        >
                            <HelpCircle className="w-6 h-6" />
                            <span className="text-[10px] font-medium">Help</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={`/g/${propertySlug}/extras`}
                            className="flex flex-col items-center gap-1 text-gray-500 hover:text-black"
                        >
                            <Sparkles className="w-6 h-6" />
                            <span className="text-[10px] font-medium">Extras</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
