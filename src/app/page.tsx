import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-neutral-100 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900">StayOS</h1>
          <p className="text-neutral-500">The guest OS for premium stays.</p>
        </div>

        <div className="grid gap-4 pt-4">
          <Link href="/host/properties">
            <Button className="w-full h-12 text-lg">
              Host Login
            </Button>
          </Link>
          <Link href="/g/alpine-retreat">
            <Button variant="outline" className="w-full h-12 text-lg">
              View Guest Demo
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
