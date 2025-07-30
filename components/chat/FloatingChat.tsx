import { Button } from "../ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Card, CardContent } from "../ui/card"
import { Send } from "lucide-react"
import { ScrollArea } from "../ui/scroll-area"
import { useChat } from "@ai-sdk/react"
import { Textarea } from "../ui/textarea"

export default function FloatingChat() {
    const { messages, input, handleInputChange, handleSubmit } = useChat()

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault()
            handleSubmit(event as any)
        }
    }

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="default">Open Chat</Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 md:w-100 flex flex-col gap-4 mr-4">
                    <div className="bg-brand-primary flex items-center gap-4 p-4 rounded-md">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>Vaza AI</AvatarFallback>
                        </Avatar>
                        <h2 className="text-secondary font-bold">
                            Vaza AI
                        </h2>
                    </div>
                    <Card className="flex">
                        <CardContent className="px-4">
                            <ScrollArea className="h-[400px]">
                                {messages.map((message) => (
                                    <div 
                                        key={message.id}
                                        className={`flex px-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <Card
                                            className={`mb-4 max-w-[80%] ${message.role === 'user' ? 'bg-primary text-secondary' : 'bg-muted'}`}
                                        >
                                            <CardContent>
                                                <div
                                                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                                >
                                                    <div key={message.id} className="whitespace-pre-wrap">
                                                        {message.parts.map((part, i) => {
                                                            switch (part.type) {
                                                            case 'text':
                                                                return <div key={`${message.id}-${i}`}>{part.text}</div>;
                                                            }
                                                        })}
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                ))}
                            </ScrollArea>
                        </CardContent>
                    </Card>
                    <form 
                        onSubmit={handleSubmit}
                        className="w-full flex items-center gap-2"
                    >   
                        <Textarea 
                            value={input} 
                            placeholder="Send a message..." 
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            className="resize-none min-h-8 max-h-24"
                        />
                        <Button type="submit">
                            <Send />
                            Send
                        </Button>
                    </form>
                </PopoverContent>               
            </Popover>
        </div>
    )
}