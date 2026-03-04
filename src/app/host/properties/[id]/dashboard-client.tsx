"use client";

import { useState } from "react";
import {
    BarChart3, Settings, CheckCircle2, Star, Image, Gift, Compass,
    Wifi, Clock, FileText, ParkingCircle, DoorOpen, AlertTriangle,
    TrendingUp, ShieldCheck, Target, Zap, MessageSquare, ArrowRight,
    ChevronRight, CircleAlert, CircleCheck, CircleDot, ThumbsUp, ThumbsDown
} from "lucide-react";

const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "swot", label: "SWOT", icon: Compass },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "readiness", label: "Readiness", icon: CheckCircle2 },
    { id: "reviews", label: "Reviews", icon: Star },
    { id: "photos", label: "Photos", icon: Image },
    { id: "upsells", label: "Upsells", icon: Gift },
];

export function DashboardClient({
    property,
    swot,
    reviews,
    upsells,
    photos,
    openTickets,
}: {
    property: any;
    swot: any[];
    reviews: any[];
    upsells: any[];
    photos: any[];
    openTickets: number;
}) {
    const [activeTab, setActiveTab] = useState("overview");

    const avgRating = reviews.length > 0
        ? (reviews.reduce((s: number, r: any) => s + r.rating, 0) / reviews.length).toFixed(1)
        : "—";
    const positiveCount = reviews.filter((r: any) => r.sentiment === "positive").length;
    const negativeCount = reviews.filter((r: any) => r.sentiment === "negative").length;
    const activeUpsells = upsells.filter((u: any) => u.is_active).length;

    // Readiness checklist
    const readinessItems = [
        { label: "WiFi credentials", done: !!(property.wifi_network && property.wifi_password), icon: Wifi },
        { label: "House rules", done: !!property.house_rules, icon: FileText },
        { label: "Check-in time", done: !!property.check_in_time, icon: Clock },
        { label: "Check-out time", done: !!property.check_out_time, icon: Clock },
        { label: "Entry instructions", done: !!property.entry_instructions, icon: DoorOpen },
        { label: "Parking info", done: !!property.parking_info, icon: ParkingCircle },
        { label: "Property photos", done: photos.length > 0, icon: Image },
        { label: "Active upsells", done: upsells.length > 0, icon: Gift },
        { label: "Guest reviews", done: reviews.length > 0, icon: Star },
    ];

    const readinessDone = readinessItems.filter(r => r.done).length;
    const readinessPercent = Math.round((readinessDone / readinessItems.length) * 100);

    const swotGroups: Record<string, any[]> = { strength: [], weakness: [], opportunity: [], threat: [] };
    swot.forEach(s => { if (swotGroups[s.category]) swotGroups[s.category].push(s); });

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

    return (
        <div className="max-w-5xl mx-auto px-8 py-6">
            {/* Tabs */}
            <div className="flex gap-1 overflow-x-auto [&::-webkit-scrollbar]:hidden mb-8 bg-slate-100 rounded-2xl p-1.5">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${activeTab === tab.id
                                ? "bg-white text-slate-900 shadow-sm"
                                : "text-slate-500 hover:text-slate-700"
                            }`}
                    >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                        {tab.id === "reviews" && reviews.length > 0 && (
                            <span className="text-[10px] bg-slate-200 px-1.5 py-0.5 rounded-full">{reviews.length}</span>
                        )}
                    </button>
                ))}
            </div>

            {/* ═══════════════ OVERVIEW ═══════════════ */}
            {activeTab === "overview" && (
                <div className="space-y-6">
                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <StatCard label="Avg. Rating" value={avgRating} sub={`${reviews.length} reviews`} icon={Star} color="text-amber-500" />
                        <StatCard label="Open Tickets" value={String(openTickets)} sub="guest requests" icon={MessageSquare} color="text-blue-500" />
                        <StatCard label="Active Upsells" value={String(activeUpsells)} sub={`of ${upsells.length} total`} icon={Gift} color="text-violet-500" />
                        <StatCard label="Pack Ready" value={`${readinessPercent}%`} sub={`${readinessDone}/${readinessItems.length} items`} icon={CheckCircle2} color="text-emerald-500" />
                    </div>

                    {/* AI Summary */}
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white">
                        <div className="flex items-center gap-2 mb-3">
                            <Zap className="w-5 h-5 text-amber-400" />
                            <h3 className="font-bold text-sm uppercase tracking-wider text-slate-300">AI Property Insights</h3>
                        </div>
                        <p className="text-sm leading-relaxed text-slate-200">
                            Your property is performing <strong>above average</strong> with a {avgRating}★ rating from {reviews.length} reviews.
                            {negativeCount > 0 && ` ${negativeCount} review${negativeCount > 1 ? 's' : ''} flagged issues — check the Reviews tab for details.`}
                            {!property.parking_info && " Consider adding parking information — 2 guests mentioned difficulty finding parking."}
                            {photos.length === 0 && " Adding property photos would significantly improve your guest app."}
                            {" "}Your SWOT analysis has {swot.length} insights ready for review.
                        </p>
                    </div>

                    {/* Quick Actions Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {[
                            { label: "View SWOT Analysis", tab: "swot", icon: Compass, desc: `${swot.length} insights` },
                            { label: "Property Settings", tab: "settings", desc: "WiFi, rules, times", icon: Settings },
                            { label: "Content Readiness", tab: "readiness", desc: `${readinessPercent}% complete`, icon: CheckCircle2 },
                            { label: "Guest Reviews", tab: "reviews", desc: `${reviews.length} reviews`, icon: Star },
                            { label: "Photos", tab: "photos", desc: `${photos.length} uploaded`, icon: Image },
                            { label: "Upsells Manager", tab: "upsells", desc: `${activeUpsells} active`, icon: Gift },
                        ].map(item => (
                            <button
                                key={item.tab}
                                onClick={() => setActiveTab(item.tab)}
                                className="flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-2xl hover:border-slate-300 hover:shadow-sm transition-all text-left group"
                            >
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

            {/* ═══════════════ SWOT ═══════════════ */}
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

                    {/* AI Recommendations */}
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
                                            rec.priority === "Medium" ? "bg-amber-100 text-amber-600" :
                                                "bg-slate-200 text-slate-500"
                                        }`}>{rec.priority}</span>
                                    <p className="text-sm text-slate-700">{rec.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* ═══════════════ SETTINGS ═══════════════ */}
            {activeTab === "settings" && (
                <div className="space-y-4">
                    <SettingsCard icon={Wifi} label="WiFi Network" value={property.wifi_network} missing={!property.wifi_network} />
                    <SettingsCard icon={Wifi} label="WiFi Password" value={property.wifi_password} missing={!property.wifi_password} />
                    <SettingsCard icon={Clock} label="Check-in Time" value={property.check_in_time} missing={!property.check_in_time} />
                    <SettingsCard icon={Clock} label="Check-out Time" value={property.check_out_time} missing={!property.check_out_time} />
                    <SettingsCard icon={DoorOpen} label="Entry Instructions" value={property.entry_instructions} missing={!property.entry_instructions} multiline />
                    <SettingsCard icon={ParkingCircle} label="Parking Info" value={property.parking_info} missing={!property.parking_info} multiline />
                    <SettingsCard icon={FileText} label="House Rules" value={property.house_rules} missing={!property.house_rules} multiline />
                </div>
            )}

            {/* ═══════════════ READINESS ═══════════════ */}
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
                        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                            <div
                                className={`h-full rounded-full transition-all ${readinessPercent >= 80 ? "bg-emerald-500" : readinessPercent >= 50 ? "bg-amber-500" : "bg-red-500"}`}
                                style={{ width: `${readinessPercent}%` }}
                            />
                        </div>
                    </div>

                    {/* Checklist */}
                    <div className="space-y-2">
                        {readinessItems.map((item, i) => (
                            <div key={i} className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${item.done ? "bg-white border-slate-100" : "bg-amber-50 border-amber-200"
                                }`}>
                                {item.done ? (
                                    <CircleCheck className="w-5 h-5 text-emerald-500 shrink-0" />
                                ) : (
                                    <CircleAlert className="w-5 h-5 text-amber-500 shrink-0" />
                                )}
                                <div className="flex-1">
                                    <p className={`text-sm font-medium ${item.done ? "text-slate-700" : "text-amber-800"}`}>
                                        {item.label}
                                    </p>
                                    {!item.done && (
                                        <p className="text-xs text-amber-600 mt-0.5">Missing — add this to improve your guest experience</p>
                                    )}
                                </div>
                                <item.icon className={`w-4 h-4 ${item.done ? "text-slate-300" : "text-amber-400"}`} />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ═══════════════ REVIEWS ═══════════════ */}
            {activeTab === "reviews" && (
                <div className="space-y-6">
                    {/* Summary Bar */}
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
                            <p className="text-xs text-emerald-600 mt-1 font-medium flex items-center justify-center gap-1"><ThumbsUp className="w-3 h-3" /> Positive</p>
                        </div>
                        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-center">
                            <p className="text-3xl font-black text-red-600">{negativeCount}</p>
                            <p className="text-xs text-red-600 mt-1 font-medium flex items-center justify-center gap-1"><ThumbsDown className="w-3 h-3" /> Need Attention</p>
                        </div>
                    </div>

                    {/* Review Cards */}
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
                                            {review.stay_date && (
                                                <span className="text-[10px] text-slate-400">{new Date(review.stay_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex gap-1.5">
                                        {review.source && (
                                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${sourceColor[review.source] || "bg-slate-100 text-slate-500"}`}>
                                                {review.source}
                                            </span>
                                        )}
                                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${sentimentColor[review.sentiment] || sentimentColor.neutral}`}>
                                            {review.sentiment}
                                        </span>
                                        {review.category && (
                                            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 capitalize">
                                                {review.category}
                                            </span>
                                        )}
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

            {/* ═══════════════ PHOTOS ═══════════════ */}
            {activeTab === "photos" && (
                <div className="space-y-6">
                    {photos.length === 0 ? (
                        <div className="border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center">
                            <Image className="w-12 h-12 mx-auto text-slate-300 mb-4" />
                            <h3 className="font-bold text-slate-700 mb-1">No photos yet</h3>
                            <p className="text-sm text-slate-400 mb-4">Upload photos to showcase your property in the guest app</p>
                            <button className="px-6 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-xl hover:bg-slate-800 transition-colors">
                                Upload Photos
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {photos.map((photo: any) => (
                                <div key={photo.id} className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100">
                                    <img src={photo.url} alt={photo.caption || ""} className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* ═══════════════ UPSELLS ═══════════════ */}
            {activeTab === "upsells" && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-slate-500">{activeUpsells} active / {upsells.length} total</p>
                        <button className="text-sm font-semibold text-blue-600 hover:underline">+ Add Upsell</button>
                    </div>
                    {upsells.map((upsell: any) => (
                        <div key={upsell.id} className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${upsell.is_active ? "bg-white border-slate-200" : "bg-slate-50 border-slate-100 opacity-60"
                            }`}>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center text-lg">
                                    {upsell.icon || "🎁"}
                                </div>
                                <div>
                                    <p className="font-semibold text-sm text-slate-900">{upsell.title}</p>
                                    <p className="text-xs text-slate-400 mt-0.5">{upsell.price_text}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${upsell.is_active ? "bg-emerald-100 text-emerald-600" : "bg-slate-200 text-slate-500"
                                    }`}>
                                    {upsell.is_active ? "Active" : "Inactive"}
                                </span>
                                <ChevronRight className="w-4 h-4 text-slate-300" />
                            </div>
                        </div>
                    ))}

                    {/* AI Upsell Hint */}
                    <div className="bg-gradient-to-br from-violet-50 to-blue-50 border border-violet-200 rounded-2xl p-5 mt-6">
                        <div className="flex items-center gap-2 mb-2">
                            <Zap className="w-4 h-4 text-violet-500" />
                            <h4 className="text-sm font-bold text-violet-800">AI-Powered Personalization</h4>
                        </div>
                        <p className="text-xs text-violet-600 leading-relaxed">
                            Coming soon: StayOS AI will automatically suggest relevant upsells based on guest profile.
                            Couples get champagne & restaurant recommendations. Families get kids activities & adventure packs.
                            Business travelers get late checkout & workspace setup.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

// ── Helper Components ──

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

function SettingsCard({ icon: Icon, label, value, missing, multiline }: { icon: any; label: string; value: string; missing: boolean; multiline?: boolean }) {
    return (
        <div className={`flex items-start gap-4 p-5 rounded-2xl border transition-all ${missing ? "bg-amber-50 border-amber-200" : "bg-white border-slate-200"
            }`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${missing ? "bg-amber-100" : "bg-slate-100"
                }`}>
                <Icon className={`w-5 h-5 ${missing ? "text-amber-600" : "text-slate-500"}`} />
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                    <p className={`text-sm font-semibold ${missing ? "text-amber-800" : "text-slate-900"}`}>{label}</p>
                    {missing && (
                        <span className="text-[10px] font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">TO-DO</span>
                    )}
                </div>
                {missing ? (
                    <p className="text-xs text-amber-600 mt-1">Not configured yet — add this for a better guest experience</p>
                ) : (
                    <p className={`text-sm text-slate-600 mt-1 ${multiline ? "whitespace-pre-wrap" : "truncate"}`}>{value}</p>
                )}
            </div>
            <button className="text-xs font-semibold text-blue-600 hover:underline shrink-0 mt-1">
                {missing ? "Add" : "Edit"}
            </button>
        </div>
    );
}
