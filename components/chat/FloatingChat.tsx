import { Button } from "../ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Card, CardContent } from "../ui/card"
import { Send, MessageCircle, Sparkles, X } from "lucide-react"
import { ScrollArea } from "../ui/scroll-area"
import { useChat } from "@ai-sdk/react"
import { Textarea } from "../ui/textarea"
import { useState, useEffect, useRef } from "react"

export default function FloatingChat() {
    const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat()
    const [isOpen, setIsOpen] = useState(false)
    const [isTyping, setIsTyping] = useState(false)
    const scrollAreaRef = useRef<HTMLDivElement>(null)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault()
            handleSubmit(event as any)
        }
    }

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    // Show typing indicator when loading
    useEffect(() => {
        if (isLoading) {
            setIsTyping(true)
            const timer = setTimeout(() => setIsTyping(false), 2000)
            return () => clearTimeout(timer)
        } else {
            setIsTyping(false)
        }
    }, [isLoading])

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <Button 
                        size="lg"
                        className="group relative h-14 w-14 rounded-full bg-brand-secondary p-0 shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-110 border-0"
                    >
                        <div className="relative flex items-center justify-center">
                            {isOpen ? (
                                <X className="h-6 w-6 text-white transition-transform duration-200" />
                            ) : (
                                <MessageCircle className="h-6 w-6 text-white transition-transform duration-200 group-hover:scale-110" />
                            )}
                        </div>
                        {/* Pulsing ring animation */}
                        <div className="absolute inset-0 rounded-full bg-brand-secondary animate-pulse opacity-30"></div>
                        {/* New message indicator */}
                        {messages.length > 0 && !isOpen && (
                            <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 flex items-center justify-center">
                                <span className="text-xs text-white font-semibold">{messages.length}</span>
                            </div>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent 
                    className="w-96 md:w-[420px] mr-6 mb-4 p-0 border-0 shadow-2xl bg-white/95 backdrop-blur-lg rounded-2xl overflow-hidden"
                    sideOffset={10}
                >
                    {/* Header */}
                    <div className="bg-brand-secondary p-6 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-20">
                            <div className="absolute inset-0 bg-white/10 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-[length:20px_20px]"></div>
                        </div>
                        <div className="relative flex items-center gap-4">
                            <div className="relative">
                                <Avatar className="h-12 w-12 ring-2 ring-white/20">
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback className="bg-white/20 text-white text-sm font-semibold">
                                        VA
                                    </AvatarFallback>
                                </Avatar>
                                <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                            </div>
                            <div className="flex-1">
                                <h2 className="text-white font-bold text-lg flex items-center gap-2">
                                    Vaza AI
                                    <Sparkles className="h-4 w-4 text-yellow-300 animate-pulse" />
                                </h2>
                                <p className="text-white/80 text-sm">Your travel assistant</p>
                            </div>
                        </div>
                    </div>

                    {/* Messages Container */}
                    <ScrollArea className="h-[370px] px-4" ref={scrollAreaRef}>
                        <div className="py-4 space-y-4">
                                {messages.length === 0 ? (
                                    <div className="text-center py-8">
                                        <div className="w-16 h-16 mx-auto mb-4 bg-brand-primary/10 rounded-full flex items-center justify-center">
                                            <MessageCircle className="h-8 w-8 text-brand-primary" />
                                        </div>
                                        <h3 className="font-semibold text-gray-800 mb-2">Start a conversation</h3>
                                        <p className="text-sm text-gray-600">Ask me anything about your travel plans!</p>
                                    </div>
                                ) : (
                                    messages.map((message, index) => (
                                        <div 
                                            key={message.id}
                                            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
                                            style={{ animationDelay: `${index * 0.1}s` }}
                                        >
                                            <div
                                                className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                                                    message.role === 'user' 
                                                        ? 'bg-brand-primary text-white ml-auto' 
                                                        : 'bg-brand-secondary/10 text-gray-800 mr-auto border border-brand-secondary/20'
                                                }`}
                                            >
                                                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                                                    {message.parts.map((part, i) => {
                                                        switch (part.type) {
                                                        case 'text':
                                                            return <div key={`${message.id}-${i}`}>{part.text}</div>;
                                                        }
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                                
                                {/* Typing indicator */}
                                {isTyping && (
                                    <div className="flex justify-start animate-fade-in">
                                        <div className="bg-gray-100 rounded-2xl px-4 py-3 border border-gray-200">
                                            <div className="flex space-x-1">
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            <div ref={messagesEndRef} />
                        </div>
                    </ScrollArea>

                    {/* Input Form */}
                    <div className="p-4 bg-gray-50/80 backdrop-blur-sm border-t border-gray-200">
                        <form 
                            onSubmit={handleSubmit}
                            className="flex items-end gap-2"
                        >   
                            <div className="flex-1 relative">
                                <Textarea 
                                    value={input} 
                                    placeholder="Type your message..." 
                                    onChange={handleInputChange}
                                    onKeyDown={handleKeyDown}
                                    disabled={isLoading}
                                    className="resize-none min-h-[44px] max-h-32 border-gray-300 focus:border-brand-primary focus:ring-brand-primary/20 rounded-xl bg-white shadow-sm transition-all duration-200 pr-12"
                                />
                            </div>
                            <Button 
                                type="submit" 
                                disabled={!input.trim() || isLoading}
                                className="h-11 w-11 p-0 rounded-xl bg-brand-primary hover:bg-brand-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                            >
                                <Send className="h-4 w-4 text-white" />
                            </Button>
                        </form>
                    </div>
                </PopoverContent>               
            </Popover>
        </div>
    )
}