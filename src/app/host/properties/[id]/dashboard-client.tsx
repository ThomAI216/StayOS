"use client";

import { useState } from "react";
import {
    BarChart3, Settings, CheckCircle2, Star, Image, Gift, Compass,
    Wifi, Clock, FileText, ParkingCircle, DoorOpen, AlertTriangle,
    TrendingUp, ShieldCheck, Target, Zap, MessageSquare,
    ChevronRight, CircleAlert, CircleCheck, CircleDot, ThumbsUp, ThumbsDown,
    X, Save, Upload, ToggleLeft, ToggleRight, ExternalLink, Plus,
    Sparkles, Link2, Brain, Package, ChefHat, Car, Snowflake, Wine,
    Baby, Briefcase, Waves, Mountain
} from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// ─── Tab Config ──────────────────────────────────────────────────────────────
const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "swot", label: "SWOT", icon: Compass },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "readiness", label: "Readiness", icon: CheckCircle2 },
    { id: "reviews", label: "Reviews", icon: Star },
    { id: "photos", label: "Photos", icon: Image },
    { id: "upsells", label: "Upsells", icon: Gift },
];

// ─── SWOT Styles ─────────────────────────────────────────────────────────────
const swotStyles: Record<string, { bg: string; border: string; icon: any; title: string; text: string }> = {
    strength: { bg: "bg-emerald-50", border: "border-emerald-200", icon: ShieldCheck, title: "Strengths", text: "text-emerald-700" },
    weakness: { bg: "bg-red-50", border: "border-red-200", icon: AlertTriangle, title: "Weaknesses", text: "text-red-700" },
    opportunity: { bg: "bg-blue-50", border: "border-blue-200", icon: TrendingUp, title: "Opportunities", text: "text-blue-700" },
    threat: { bg: "bg-amber-50", border: "border-amber-200", icon: Target, title: "Threats", text: "text-amber-700" },
};

const sentimentColor: Record<string, string> = {
    positive: "bg-emerald-100 text-emerald-700",
    neutral: "bg-slate-100 text-slate-600",
    negative: "bg-red-100 text-red-700",
};

const sourceColor: Record<string, string> = {
    airbnb: "bg-pink-50 text-pink-600",
    booking: "bg-blue-50 text-blue-600",
    direct: "bg-violet-50 text-violet-600",
    google: "bg-amber-50 text-amber-600",
};

// ─── Partner Upsells catalog ──────────────────────────────────────────────────
const partnerCatalog = [
    { id: "ski-delivery", icon: Snowflake, title: "Ski Equipment Delivery", desc: "Skis, boots & poles delivered to the door", price: "From €45/day", category: "winter", tags: ["ski", "winter"] },
    { id: "private-chef", icon: ChefHat, title: "Private Chef Dinner", desc: "3-course raclette or fondue evening for your group", price: "From €120/head", category: "food", tags: ["couple", "family", "luxury"] },
    { id: "airport-xfer", icon: Car, title: "Airport Transfer", desc: "Private transfer from/to Geneva or Lyon airport", price: "From €95", category: "transport", tags: ["all"] },
    { id: "champagne", icon: Wine, title: "Welcome Champagne & Chocolates", desc: "Bottle of local champagne + artisan chocolates on arrival", price: "€65", category: "romantic", tags: ["couple", "celebration"] },
    { id: "family-pack", icon: Baby, title: "Family Adventure Pack", desc: "Sledding, kids ski school booking + mountain guide", price: "From €85/family", category: "family", tags: ["family", "children"] },
    { id: "late-checkout", icon: Clock, title: "Late Checkout", desc: "Check out by 2pm instead of 11am", price: "€35", category: "stay", tags: ["all"] },
    { id: "spa-access", icon: Waves, title: "Spa & Thermal Baths Pass", desc: "Full-day access to local thermal spa", price: "€45/person", category: "wellness", tags: ["couple", "wellness"] },
    { id: "guided-hike", icon: Mountain, title: "Private Guided Hike", desc: "Local guide for 3-hour mountain trail hike", price: "€120/group", category: "outdoor", tags: ["adventure", "family"] },
    { id: "workspace", icon: Briefcase, title: "Workspace Setup", desc: "External monitor, keyboard, ergonomic chair", price: "€25/day", category: "business", tags: ["business", "remote work"] },
];

// ─── Main Component ───────────────────────────────────────────────────────────
export function DashboardClient({
    property, swot, reviews, upsells, photos, openTickets,
}: {
    property: any; swot: any[]; reviews: any[]; upsells: any[]; photos: any[]; openTickets: number;
}) {
    const [activeTab, setActiveTab] = useState("overview");

    // Drawer state
    const [settingsDrawer, setSettingsDrawer] = useState<{ open: boolean; field: string; label: string; value: string; multiline: boolean; hint: string } | null>(null);
    const [settingsValue, setSettingsValue] = useState("");

    // Sub-views
    const [upsellsView, setUpsellsView] = useState<"list" | "marketplace">("list");
    const [enabledPartners, setEnabledPartners] = useState<Set<string>>(new Set(["ski-delivery", "champagne", "late-checkout"]));
    const [aiUpsellEnabled, setAiUpsellEnabled] = useState(false);

    // Readiness AI analysis
    const [listingUrl, setListingUrl] = useState("");
    const [analysisRun, setAnalysisRun] = useState(false);
    const [analysisLoading, setAnalysisLoading] = useState(false);

    // Computed
    const avgRating = reviews.length > 0
        ? (reviews.reduce((s: number, r: any) => s + r.rating, 0) / reviews.length).toFixed(1) : "—";
    const positiveCount = reviews.filter((r: any) => r.sentiment === "positive").length;
    const negativeCount = reviews.filter((r: any) => r.sentiment === "negative").length;
    const activeUpsells = upsells.filter((u: any) => u.is_active).length;

    const readinessItems = [
        { label: "WiFi credentials", done: !!(property.wifi_network && property.wifi_password), icon: Wifi, field: "wifi_network", hint: "70% of guests ask for Wi-Fi in the first 10 minutes. Set this to avoid messages!" },
        { label: "House rules", done: !!property.house_rules, icon: FileText, field: "house_rules", hint: "Clear rules prevent misunderstandings and bad reviews." },
        { label: "Check-in time", done: !!property.check_in_time, icon: Clock, field: "check_in_time", hint: "Guests need to plan their travel. Missing this causes unnecessary messages." },
        { label: "Check-out time", done: !!property.check_out_time, icon: Clock, field: "check_out_time", hint: "Required for cleaning schedules and next-guest arrival." },
        { label: "Entry instructions", done: !!property.entry_instructions, icon: DoorOpen, field: "entry_instructions", hint: "Lockbox confusion is 1 of the top 3 causes of bad first impressions." },
        { label: "Parking info", done: !!property.parking_info, icon: ParkingCircle, field: "parking_info", hint: "3 reviews mentioned parking issues. Add it to save them the stress." },
        { label: "Property photos", done: photos.length > 0, icon: Image, field: "", hint: "Listings with 10+ photos get 35% more bookings." },
        { label: "Upsells configured", done: upsells.length > 0, icon: Gift, field: "", hint: "Upsells add +€200–500/month in extra revenue per property on average." },
    ];
    const readinessDone = readinessItems.filter(r => r.done).length;
    const readinessPercent = Math.round((readinessDone / readinessItems.length) * 100);

    const swotGroups: Record<string, any[]> = { strength: [], weakness: [], opportunity: [], threat: [] };
    swot.forEach(s => { if (swotGroups[s.category]) swotGroups[s.category].push(s); });

    // Settings field definitions
    const settingsFields = [
        { field: "wifi_network", label: "WiFi Network Name", icon: Wifi, multiline: false, value: property.wifi_network, hint: "The exact SSID as it appears on the router." },
        { field: "wifi_password", label: "WiFi Password", icon: Wifi, multiline: false, value: property.wifi_password, hint: "Guests see this instantly when they open the app — no calling you!" },
        { field: "check_in_time", label: "Check-in Time", icon: Clock, multiline: false, value: property.check_in_time, hint: "e.g. 15:00 — helps guests plan their journey." },
        { field: "check_out_time", label: "Check-out Time", icon: Clock, multiline: false, value: property.check_out_time, hint: "e.g. 11:00 — essential for your cleaning team scheduling." },
        { field: "entry_instructions", label: "Entry Instructions", icon: DoorOpen, multiline: true, value: property.entry_instructions, hint: "Step-by-step. Include lockbox location, door code, and where to find keys." },
        { field: "parking_info", label: "Parking Info", icon: ParkingCircle, multiline: true, value: property.parking_info, hint: "3 guests mentioned parking confusion. Even 'Street parking available nearby' helps." },
        { field: "house_rules", label: "House Rules", icon: FileText, multiline: true, value: property.house_rules, hint: "Clear rules reduce bad reviews. Be friendly but specific." },
    ];

    function openSettingsDrawer(field: typeof settingsFields[number]) {
        setSettingsDrawer({ open: true, field: field.field, label: field.label, value: field.value || "", multiline: field.multiline, hint: field.hint });
        setSettingsValue(field.value || "");
    }

    function runAnalysis() {
        setAnalysisLoading(true);
        setTimeout(() => { setAnalysisLoading(false); setAnalysisRun(true); }, 1800);
    }

    return (
        <>
            {/* Settings Drawer */}
            <Sheet open={!!settingsDrawer?.open} onOpenChange={() => setSettingsDrawer(null)}>
                <SheetContent className="w-full sm:max-w-md flex flex-col gap-0 p-0">
                    <SheetHeader className="px-6 py-5 border-b border-slate-100">
                        <SheetTitle className="text-base font-bold text-slate-900">{settingsDrawer?.label}</SheetTitle>
                    </SheetHeader>
                    <div className="flex-1 px-6 py-6 space-y-5">
                        {/* AI Hint */}
                        <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-2xl">
                            <Zap className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                            <p className="text-xs text-amber-700 leading-relaxed">{settingsDrawer?.hint}</p>
                        </div>
                        {/* Input */}
                        {settingsDrawer?.multiline ? (
                            <Textarea
                                value={settingsValue}
                                onChange={e => setSettingsValue(e.target.value)}
                                placeholder={`Enter ${settingsDrawer.label.toLowerCase()}...`}
                                rows={8}
                                className="resize-none text-sm border-slate-200 rounded-xl"
                            />
                        ) : (
                            <Input
                                value={settingsValue}
                                onChange={e => setSettingsValue(e.target.value)}
                                placeholder={`Enter ${settingsDrawer?.label.toLowerCase()}...`}
                                className="h-12 border-slate-200 rounded-xl text-sm"
                            />
                        )}
                    </div>
                    <div className="px-6 py-4 border-t border-slate-100">
                        <Button className="w-full h-12 bg-slate-900 hover:bg-slate-800 rounded-xl font-semibold text-sm gap-2" onClick={() => setSettingsDrawer(null)}>
                            <Save className="w-4 h-4" /> Save Changes
                        </Button>
                    </div>
                </SheetContent>
            </Sheet>

            {/* Main content */}
            <div className="max-w-5xl mx-auto px-8 py-6">
                {/* Tabs */}
                <div className="flex gap-1 overflow-x-auto [&::-webkit-scrollbar]:hidden mb-8 bg-slate-100 rounded-2xl p-1.5">
                    {tabs.map(tab => (
                        <button key={tab.id} onClick={() => { setActiveTab(tab.id); setUpsellsView("list"); }}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${activeTab === tab.id ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                            {tab.id === "reviews" && reviews.length > 0 && (
                                <span className="text-[10px] bg-slate-200 px-1.5 py-0.5 rounded-full">{reviews.length}</span>
                            )}
                        </button>
                    ))}
                </div>

                {/* ══ OVERVIEW ══════════════════════════════════════════════════════ */}
                {activeTab === "overview" && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <StatCard label="Avg. Rating" value={avgRating} sub={`${reviews.length} reviews`} icon={Star} color="text-amber-500" />
                            <StatCard label="Open Tickets" value={String(openTickets)} sub="guest requests" icon={MessageSquare} color="text-blue-500" />
                            <StatCard label="Active Upsells" value={String(activeUpsells)} sub={`of ${upsells.length} total`} icon={Gift} color="text-violet-500" />
                            <StatCard label="Pack Ready" value={`${readinessPercent}%`} sub={`${readinessDone}/${readinessItems.length} items`} icon={CheckCircle2} color="text-emerald-500" />
                        </div>
                        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white">
                            <div className="flex items-center gap-2 mb-3">
                                <Zap className="w-5 h-5 text-amber-400" />
                                <h3 className="font-bold text-sm uppercase tracking-wider text-slate-300">AI Property Insights</h3>
                            </div>
                            <p className="text-sm leading-relaxed text-slate-200">
                                Your property is performing <strong>above average</strong> with a {avgRating}★ rating from {reviews.length} reviews.
                                {negativeCount > 0 && ` ${negativeCount} review${negativeCount > 1 ? 's' : ''} flagged issues — check the Reviews tab.`}
                                {!property.parking_info && " Adding parking info could save 3+ guest messages per stay."}
                                {photos.length === 0 && " Upload photos to boost guest confidence by ~35%."}
                            </p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {[
                                { label: "SWOT Analysis", tab: "swot", icon: Compass, desc: `${swot.length} insights` },
                                { label: "Property Settings", tab: "settings", icon: Settings, desc: `${settingsFields.filter(f => !f.value).length} items missing` },
                                { label: "Content Readiness", tab: "readiness", icon: CheckCircle2, desc: `${readinessPercent}% complete` },
                                { label: "Guest Reviews", tab: "reviews", icon: Star, desc: `${reviews.length} reviews` },
                                { label: "Photos", tab: "photos", icon: Image, desc: `${photos.length} uploaded` },
                                { label: "Upsells Manager", tab: "upsells", icon: Gift, desc: `${activeUpsells} active` },
                            ].map(item => (
                                <button key={item.tab} onClick={() => setActiveTab(item.tab)}
                                    className="flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-2xl hover:border-slate-300 hover:shadow-sm transition-all text-left group">
                                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-slate-200 transition-colors">
                                        <item.icon className="w-5 h-5 text-slate-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-slate-900 truncate">{item.label}</p>
                                        <p className="text-xs text-slate-400">{item.desc}</p>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-slate-300" />
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* ══ SWOT ══════════════════════════════════════════════════════════ */}
                {activeTab === "swot" && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {(["strength", "weakness", "opportunity", "threat"] as const).map(category => {
                                const style = swotStyles[category];
                                const Icon = style.icon;
                                const items = swotGroups[category];
                                return (
                                    <div key={category} className={`${style.bg} border ${style.border} rounded-2xl p-5`}>
                                        <div className="flex items-center gap-2 mb-3">
                                            <Icon className={`w-5 h-5 ${style.text}`} />
                                            <h3 className={`font-bold ${style.text}`}>{style.title}</h3>
                                            <span className={`text-xs font-medium ${style.text} opacity-60 ml-auto`}>{items.length}</span>
                                        </div>
                                        <ul className="space-y-2">
                                            {items.map((item: any) => (
                                                <li key={item.id} className="text-sm text-slate-700 flex gap-2 items-start">
                                                    <CircleDot className={`w-3 h-3 mt-1 shrink-0 ${style.text} opacity-50`} />
                                                    {item.content}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="bg-white border border-slate-200 rounded-2xl p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Zap className="w-5 h-5 text-amber-500" />
                                <h3 className="font-bold text-slate-900">AI Recommendations</h3>
                            </div>
                            <div className="space-y-3">
                                {[
                                    { text: "Add late checkout as an upsell — 73% of ski properties in your area offer this, avg. revenue €25/guest", priority: "High" },
                                    { text: "Upload 5+ property photos to improve guest confidence and reduce pre-arrival questions by ~40%", priority: "High" },
                                    { text: "Clarify entry instructions with step-by-step guide + photos of lockbox to prevent check-in issues", priority: "Medium" },
                                    { text: "Add summer activities (hiking, paragliding) to combat seasonal occupancy drop", priority: "Medium" },
                                    { text: "Consider a parking partnership with nearby garage — this resolves your #1 weakness", priority: "Low" },
                                ].map((rec, i) => (
                                    <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full shrink-0 mt-0.5 ${rec.priority === "High" ? "bg-red-100 text-red-600" :
                                                rec.priority === "Medium" ? "bg-amber-100 text-amber-600" : "bg-slate-200 text-slate-500"}`}>
                                            {rec.priority}
                                        </span>
                                        <p className="text-sm text-slate-700">{rec.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* ══ SETTINGS ══════════════════════════════════════════════════════ */}
                {activeTab === "settings" && (
                    <div className="space-y-3">
                        <p className="text-xs text-slate-400 mb-4">Click any item to edit it. Missing fields improve your guest experience when filled in.</p>
                        {settingsFields.map(f => (
                            <button key={f.field} onClick={() => openSettingsDrawer(f)}
                                className={`w-full flex items-start gap-4 p-5 rounded-2xl border text-left transition-all hover:shadow-sm ${!f.value ? "bg-amber-50 border-amber-200 hover:border-amber-300" : "bg-white border-slate-200 hover:border-slate-300"}`}>
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${!f.value ? "bg-amber-100" : "bg-slate-100"}`}>
                                    <f.icon className={`w-5 h-5 ${!f.value ? "text-amber-600" : "text-slate-500"}`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <p className={`text-sm font-semibold ${!f.value ? "text-amber-800" : "text-slate-900"}`}>{f.label}</p>
                                        {!f.value && <span className="text-[10px] font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">TO-DO</span>}
                                    </div>
                                    {!f.value
                                        ? <p className="text-xs text-amber-600 mt-1">{f.hint}</p>
                                        : <p className={`text-sm text-slate-500 mt-1 ${f.multiline ? "line-clamp-2" : "truncate"}`}>{f.value}</p>}
                                </div>
                                <ChevronRight className="w-4 h-4 text-slate-300 shrink-0 mt-2" />
                            </button>
                        ))}
                    </div>
                )}

                {/* ══ READINESS ══════════════════════════════════════════════════════ */}
                {activeTab === "readiness" && (
                    <div className="space-y-6">
                        {/* Progress */}
                        <div className="bg-white border border-slate-200 rounded-2xl p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-slate-900">Guest Pack Readiness</h3>
                                <span className={`text-2xl font-black ${readinessPercent >= 80 ? "text-emerald-500" : readinessPercent >= 50 ? "text-amber-500" : "text-red-500"}`}>
                                    {readinessPercent}%
                                </span>
                            </div>
                            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden mb-1">
                                <div className={`h-full rounded-full transition-all ${readinessPercent >= 80 ? "bg-emerald-500" : readinessPercent >= 50 ? "bg-amber-500" : "bg-red-500"}`}
                                    style={{ width: `${readinessPercent}%` }} />
                            </div>
                            <p className="text-xs text-slate-400">{readinessDone} of {readinessItems.length} items complete</p>
                        </div>

                        {/* AI Listing Analyzer */}
                        <div className="bg-gradient-to-br from-violet-50 to-blue-50 border border-violet-200 rounded-2xl p-6">
                            <div className="flex items-center gap-2 mb-2">
                                <Brain className="w-5 h-5 text-violet-600" />
                                <h3 className="font-bold text-violet-900">AI Listing Analyzer</h3>
                                <span className="text-[10px] font-bold bg-violet-200 text-violet-600 px-2 py-0.5 rounded-full uppercase">AI</span>
                            </div>
                            <p className="text-sm text-violet-700 mb-4">Paste your Airbnb or Booking.com listing URL. Our AI compares your listing copy against your guest app and gives advice to improve both.</p>
                            <div className="flex gap-3">
                                <div className="relative flex-1">
                                    <Link2 className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                                    <input
                                        value={listingUrl}
                                        onChange={e => setListingUrl(e.target.value)}
                                        placeholder="https://www.airbnb.com/rooms/..."
                                        className="w-full pl-9 pr-4 py-2.5 text-sm border border-violet-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-violet-300"
                                    />
                                </div>
                                <button
                                    onClick={runAnalysis}
                                    disabled={analysisLoading}
                                    className="flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-60">
                                    {analysisLoading ? (
                                        <span className="flex items-center gap-2"><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>Analyzing…</span>
                                    ) : (
                                        <><Sparkles className="w-4 h-4" />Analyze</>
                                    )}
                                </button>
                            </div>
                            {analysisRun && (
                                <div className="mt-5 space-y-3">
                                    <p className="text-xs font-bold text-violet-800 uppercase tracking-wide">AI Analysis Results for Alpine Retreat</p>
                                    {[
                                        { type: "warn", text: 'You mention "stunning mountain views" in your listing but have no photos of the view in your guest app. Add one to set expectations correctly.' },
                                        { type: "warn", text: "Your Airbnb listing says 'fully equipped kitchen' but your guest app has no kitchen appliance list. Guests want to know if there's a Nespresso machine." },
                                        { type: "good", text: "Great job mentioning ski slope access — your guest app echoes this in the Around section with nearby pistes." },
                                        { type: "warn", text: "Entry instructions are missing from both your listing and guest app. This is your #1 risk for a poor check-in experience." },
                                        { type: "good", text: "Your listing title 'Cozy Alpine Retreat' is warm and inviting — consider adding a seasonal variant for summer guests." },
                                        { type: "tip", text: "Consider adding 'remote worker friendly' to your listing — you have 200Mbps fiber which is a strong selling point for this segment." },
                                    ].map((item, i) => (
                                        <div key={i} className={`flex items-start gap-3 p-3 rounded-xl text-sm ${item.type === "warn" ? "bg-amber-50 border border-amber-200" :
                                                item.type === "good" ? "bg-emerald-50 border border-emerald-200" :
                                                    "bg-blue-50 border border-blue-200"}`}>
                                            <span className="shrink-0 text-lg">{item.type === "warn" ? "⚠️" : item.type === "good" ? "✅" : "💡"}</span>
                                            <p className={item.type === "warn" ? "text-amber-800" : item.type === "good" ? "text-emerald-800" : "text-blue-800"}>{item.text}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Checklist */}
                        <div className="space-y-2">
                            {readinessItems.map((item, i) => (
                                <div key={i}
                                    onClick={() => item.field && openSettingsDrawer(settingsFields.find(f => f.field === item.field)!)}
                                    className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${item.done ? "bg-white border-slate-100" : "bg-amber-50 border-amber-200 cursor-pointer hover:border-amber-300"}`}>
                                    {item.done ? <CircleCheck className="w-5 h-5 text-emerald-500 shrink-0" /> : <CircleAlert className="w-5 h-5 text-amber-500 shrink-0" />}
                                    <div className="flex-1">
                                        <p className={`text-sm font-medium ${item.done ? "text-slate-700" : "text-amber-800"}`}>{item.label}</p>
                                        {!item.done && <p className="text-xs text-amber-600 mt-0.5">{item.hint}</p>}
                                    </div>
                                    {!item.done && item.field && <ChevronRight className="w-4 h-4 text-amber-400" />}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ══ REVIEWS ══════════════════════════════════════════════════════ */}
                {activeTab === "reviews" && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center">
                                <p className="text-3xl font-black text-slate-900">{avgRating}</p>
                                <div className="flex justify-center gap-0.5 mt-1">
                                    {[1, 2, 3, 4, 5].map(s => (
                                        <Star key={s} className={`w-3.5 h-3.5 ${s <= Math.round(Number(avgRating)) ? "text-amber-400 fill-amber-400" : "text-slate-200"}`} />
                                    ))}
                                </div>
                                <p className="text-xs text-slate-400 mt-1">Average</p>
                            </div>
                            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center">
                                <p className="text-3xl font-black text-emerald-600">{positiveCount}</p>
                                <p className="text-xs text-emerald-600 mt-2 font-medium flex items-center justify-center gap-1"><ThumbsUp className="w-3 h-3" /> Positive</p>
                            </div>
                            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-center">
                                <p className="text-3xl font-black text-red-600">{negativeCount}</p>
                                <p className="text-xs text-red-600 mt-2 font-medium flex items-center justify-center gap-1"><ThumbsDown className="w-3 h-3" /> Need Attention</p>
                            </div>
                        </div>
                        <div className="space-y-3">
                            {reviews.map((review: any) => (
                                <div key={review.id} className="bg-white border border-slate-200 rounded-2xl p-5">
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <p className="font-bold text-slate-900 text-sm">{review.guest_name}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <div className="flex gap-0.5">
                                                    {[1, 2, 3, 4, 5].map(s => (
                                                        <Star key={s} className={`w-3 h-3 ${s <= review.rating ? "text-amber-400 fill-amber-400" : "text-slate-200"}`} />
                                                    ))}
                                                </div>
                                                {review.stay_date && <span className="text-[10px] text-slate-400">{new Date(review.stay_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>}
                                            </div>
                                        </div>
                                        <div className="flex gap-1.5 flex-wrap justify-end">
                                            {review.source && <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${sourceColor[review.source] || "bg-slate-100 text-slate-500"}`}>{review.source}</span>}
                                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${sentimentColor[review.sentiment] || sentimentColor.neutral}`}>{review.sentiment}</span>
                                            {review.category && <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 capitalize">{review.category}</span>}
                                        </div>
                                    </div>
                                    <p className="text-sm text-slate-600 leading-relaxed">{review.comment}</p>
                                    {review.sentiment === "negative" && (
                                        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                                            <span className={`text-xs font-medium flex items-center gap-1 ${review.is_resolved ? "text-emerald-600" : "text-amber-600"}`}>
                                                {review.is_resolved ? <CircleCheck className="w-3 h-3" /> : <CircleAlert className="w-3 h-3" />}
                                                {review.is_resolved ? "Issue resolved" : "Needs attention"}
                                            </span>
                                            <button className="text-xs font-semibold text-blue-600 hover:underline">Reply to guest</button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ══ PHOTOS ══════════════════════════════════════════════════════ */}
                {activeTab === "photos" && (
                    <div className="space-y-6">
                        {/* Upload Zone */}
                        <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center hover:border-slate-300 transition-colors">
                            <Upload className="w-10 h-10 mx-auto text-slate-300 mb-3" />
                            <p className="text-sm font-semibold text-slate-700 mb-1">Drag & drop photos here</p>
                            <p className="text-xs text-slate-400 mb-4">JPG, PNG or WEBP · Max 10MB each · Up to 30 photos</p>
                            <button className="px-6 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-xl hover:bg-slate-800 transition-colors">
                                Select Files
                            </button>
                        </div>
                        {/* AI Tag hint */}
                        <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-2xl">
                            <Brain className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm font-semibold text-blue-800">AI Photo Tagging</p>
                                <p className="text-xs text-blue-600 mt-0.5">When you upload photos, our AI will automatically tag them (e.g. "Mountain View", "Kitchen", "Bedroom") so guests can filter by what they want to see.</p>
                            </div>
                        </div>
                        {photos.length === 0 ? (
                            <div className="py-8 text-center">
                                <p className="text-slate-400 text-sm">No photos uploaded yet.</p>
                                <p className="text-slate-300 text-xs mt-1">Listings with 10+ photos get 35% more bookings.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {photos.map((photo: any) => (
                                    <div key={photo.id} className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 group">
                                        <img src={photo.url} alt={photo.caption || ""} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <button className="p-2 bg-white/20 rounded-lg"><X className="w-4 h-4 text-white" /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* ══ UPSELLS ══════════════════════════════════════════════════════ */}
                {activeTab === "upsells" && (
                    <div className="space-y-6">
                        {/* Sub-nav */}
                        <div className="flex gap-2">
                            <button onClick={() => setUpsellsView("list")}
                                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${upsellsView === "list" ? "bg-slate-900 text-white" : "text-slate-500 hover:text-slate-700 bg-slate-100"}`}>
                                Active Upsells
                            </button>
                            <button onClick={() => setUpsellsView("marketplace")}
                                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${upsellsView === "marketplace" ? "bg-slate-900 text-white" : "text-slate-500 hover:text-slate-700 bg-slate-100"}`}>
                                Partner Marketplace
                            </button>
                        </div>

                        {upsellsView === "list" && (
                            <>
                                {/* AI Automation Toggle */}
                                <div className="bg-gradient-to-br from-violet-50 to-blue-50 border border-violet-200 rounded-2xl p-5">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
                                                <Brain className="w-5 h-5 text-violet-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-violet-900">AI Auto-Pitch Engine</p>
                                                <p className="text-xs text-violet-600 mt-0.5">Let AI offer the right upsell to the right guest automatically</p>
                                            </div>
                                        </div>
                                        <button onClick={() => setAiUpsellEnabled(v => !v)} className="shrink-0">
                                            {aiUpsellEnabled
                                                ? <ToggleRight className="w-10 h-10 text-violet-600" />
                                                : <ToggleLeft className="w-10 h-10 text-slate-300" />}
                                        </button>
                                    </div>
                                    {aiUpsellEnabled && (
                                        <div className="mt-4 pt-4 border-t border-violet-200 grid grid-cols-1 gap-2">
                                            {[
                                                { icon: "👨‍👩‍👧", label: "Family detected", pitch: "→ Family Adventure Pack + Kids Ski School" },
                                                { icon: "💑", label: "Couple stay", pitch: "→ Welcome Champagne + Romantic Restaurant" },
                                                { icon: "💼", label: "Business traveler", pitch: "→ Workspace Setup + Late Checkout" },
                                                { icon: "🏂", label: "Ski booking keywords", pitch: "→ Ski Equipment Delivery on arrival" },
                                            ].map((rule, i) => (
                                                <div key={i} className="flex items-center gap-3 text-xs text-violet-700 bg-white/60 rounded-xl px-3 py-2">
                                                    <span className="text-base">{rule.icon}</span>
                                                    <span className="font-semibold">{rule.label}</span>
                                                    <span className="text-violet-400">{rule.pitch}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Upsells list */}
                                <div className="space-y-2">
                                    {upsells.map((upsell: any) => (
                                        <div key={upsell.id} className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${upsell.is_active ? "bg-white border-slate-200" : "bg-slate-50 border-slate-100 opacity-60"}`}>
                                            <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center text-xl shrink-0">
                                                {upsell.icon || "🎁"}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-sm text-slate-900">{upsell.title}</p>
                                                <p className="text-xs text-slate-400 mt-0.5">{upsell.price_text}</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${upsell.is_active ? "bg-emerald-100 text-emerald-600" : "bg-slate-200 text-slate-500"}`}>
                                                    {upsell.is_active ? "Active" : "Paused"}
                                                </span>
                                                <ChevronRight className="w-4 h-4 text-slate-300" />
                                            </div>
                                        </div>
                                    ))}
                                    <button className="w-full flex items-center gap-3 p-4 rounded-2xl border-2 border-dashed border-slate-200 text-slate-400 hover:border-slate-300 hover:text-slate-500 transition-colors text-sm font-medium">
                                        <Plus className="w-4 h-4" /> Add custom upsell
                                    </button>
                                </div>
                            </>
                        )}

                        {upsellsView === "marketplace" && (
                            <>
                                <p className="text-sm text-slate-500">Browse partner services you can offer to your guests. Enable any to add them to your property's upsell menu.</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {partnerCatalog.map(partner => {
                                        const enabled = enabledPartners.has(partner.id);
                                        return (
                                            <div key={partner.id} className={`flex items-start gap-4 p-4 rounded-2xl border transition-all ${enabled ? "bg-emerald-50 border-emerald-200" : "bg-white border-slate-200"}`}>
                                                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${enabled ? "bg-emerald-100" : "bg-slate-100"}`}>
                                                    <partner.icon className={`w-5 h-5 ${enabled ? "text-emerald-600" : "text-slate-500"}`} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-semibold text-slate-900">{partner.title}</p>
                                                    <p className="text-xs text-slate-400 mt-0.5 mb-1">{partner.desc}</p>
                                                    <p className={`text-xs font-bold ${enabled ? "text-emerald-600" : "text-slate-500"}`}>{partner.price}</p>
                                                </div>
                                                <button
                                                    onClick={() => setEnabledPartners(prev => {
                                                        const next = new Set(prev);
                                                        enabled ? next.delete(partner.id) : next.add(partner.id);
                                                        return next;
                                                    })}
                                                    className={`shrink-0 mt-1 transition-transform hover:scale-110`}>
                                                    {enabled
                                                        ? <ToggleRight className="w-8 h-8 text-emerald-500" />
                                                        : <ToggleLeft className="w-8 h-8 text-slate-300" />}
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}

// ─── Helper ──────────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, icon: Icon, color }: { label: string; value: string; sub: string; icon: any; color: string }) {
    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
                <Icon className={`w-5 h-5 ${color}`} />
                <span className="text-xs text-slate-400 font-medium">{label}</span>
            </div>
            <p className="text-2xl font-black text-slate-900">{value}</p>
            <p className="text-xs text-slate-400 mt-0.5">{sub}</p>
        </div>
    );
}
