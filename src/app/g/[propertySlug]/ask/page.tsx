"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User } from "lucide-react";

export default function AskButlerPage() {
    const [messages, setMessages] = useState([
        { role: "assistant", text: "Hi! I'm your digital butler. How can I make your stay better today?" }
    ]);
    const [input, setInput] = useState("");

    const quickChips = ["Breakfast now 🥐", "Easy hike 🥾", "Need towels 🛁"];

    const handleSend = (text: string) => {
        if (!text.trim()) return;
        setMessages(prev => [...prev, { role: "user", text }]);
        setInput("");

        // Mock AI response
        setTimeout(() => {
            setMessages(prev => [...prev, {
                role: "assistant",
                text: "I can help with that! If you need fresh towels, I've just pinged your host. They'll be dropped at your door later today. While you wait, the 'Lac Blanc' trail is perfect for a morning hike."
            }]);
        }, 1000);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-80px)] max-w-md mx-auto bg-white">
            {/* Header */}
            <div className="pt-12 pb-4 px-6 bg-white border-b border-gray-100 shrink-0 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <Bot className="w-5 h-5" />
                </div>
                <div>
                    <h1 className="text-lg font-bold text-gray-900 tracking-tight">StayOS Assistant</h1>
                    <p className="text-xs text-green-600 font-medium flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block" /> Online
                    </p>
                </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-6">
                <div className="space-y-6 pb-4">
                    {messages.map((msg, i) => (
                        <div key={i} className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
                            <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center ${msg.role === 'user' ? 'bg-gray-100 border border-gray-200' : 'bg-blue-100 text-blue-600'}`}>
                                {msg.role === 'user' ? <User className="w-4 h-4 text-gray-500" /> : <Bot className="w-5 h-5" />}
                            </div>
                            <div className={`p-4 rounded-2xl text-[15px] leading-relaxed shadow-sm border ${msg.role === 'user'
                                    ? 'bg-black text-white border-transparent'
                                    : 'bg-white border-gray-100 text-gray-800'
                                }`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100 shrink-0 pt-2">
                {/* Quick Chips */}
                <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide no-scrollbar">
                    {quickChips.map((chip, i) => (
                        <button
                            key={i}
                            onClick={() => handleSend(chip)}
                            className="shrink-0 px-4 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-medium rounded-full transition-colors"
                        >
                            {chip}
                        </button>
                    ))}
                </div>

                <div className="relative flex items-center">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
                        placeholder="Ask for recommendations or help..."
                        className="pr-12 h-12 rounded-full border-gray-200 bg-gray-50 focus-visible:ring-1 focus-visible:ring-black"
                    />
                    <Button
                        size="icon"
                        className="absolute right-1.5 h-9 w-9 rounded-full bg-blue-600 hover:bg-blue-700"
                        onClick={() => handleSend(input)}
                    >
                        <Send className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
