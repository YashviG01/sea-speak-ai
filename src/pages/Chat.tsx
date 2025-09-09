import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  MapPin, 
  BarChart3, 
  Download,
  Copy,
  ThumbsUp,
  ThumbsDown
} from "lucide-react";
import Navigation from "@/components/Navigation";
import OceanBackground from "@/components/OceanBackground";

interface Message {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
  type?: "text" | "data" | "visualization";
  data?: any;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AI oceanographic data assistant. I can help you explore ARGO float data using natural language queries. Try asking me something like:\n\n• \"Show me salinity profiles near the equator in March 2023\"\n• \"What are the temperature trends in the Arabian Sea?\"\n• \"Find the nearest ARGO floats to coordinates 25°N, 65°E\"",
      sender: "assistant",
      timestamp: new Date(),
      type: "text"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
      type: "text"
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(inputValue),
        sender: "assistant",
        timestamp: new Date(),
        type: inputValue.toLowerCase().includes("show") || inputValue.toLowerCase().includes("visualize") ? "visualization" : "text"
      };

      setMessages(prev => [...prev, assistantResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes("salinity") && lowerQuery.includes("equator")) {
      return "I found 24 ARGO floats with salinity data near the equatorial region (±5° latitude) for March 2023. The data shows interesting patterns:\n\n• Average surface salinity: 34.2-35.8 PSU\n• Haloclines observed at 100-150m depth\n• 3 floats show unusual freshwater lenses\n\nWould you like me to create a visualization or export this data?";
    } else if (lowerQuery.includes("temperature") && lowerQuery.includes("arabian")) {
      return "Analyzing temperature trends in the Arabian Sea from available ARGO data:\n\n• Sea surface temperature has increased by 0.3°C over the past 5 years\n• Strongest warming observed in the northern regions\n• Seasonal variations show peak temperatures in May-June\n• Mixed layer depth varies from 20-80m seasonally\n\nShall I generate temperature profile charts for specific coordinates?";
    } else if (lowerQuery.includes("nearest") && lowerQuery.includes("float")) {
      return "Searching for ARGO floats near the specified coordinates...\n\n🎯 **Nearest Active Floats:**\n• Float ID: 2903458 - Distance: 12.3 km\n• Float ID: 5906102 - Distance: 28.7 km\n• Float ID: 4903261 - Distance: 34.1 km\n\nAll floats are currently active and collecting data. Would you like detailed profiles from any of these floats?";
    } else {
      return "I understand you're looking for oceanographic data insights. I can help you with:\n\n🌊 **Data Queries**: Temperature, salinity, BGC parameters\n📊 **Visualizations**: Maps, profiles, time series\n📍 **Location-based**: Find floats by coordinates or regions\n📈 **Trend Analysis**: Long-term patterns and anomalies\n\nCould you provide more specific details about what data you're interested in exploring?";
    }
  };

  const suggestedQueries = [
    "Show me BGC data for the Pacific Ocean",
    "Temperature profiles at 30°N, 140°W",
    "Recent float deployments in the Southern Ocean",
    "Oxygen levels in the Mediterranean Sea"
  ];

  return (
    <OceanBackground>
      <Navigation />
      
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">AI Ocean Data Assistant</h1>
          <p className="text-muted-foreground">
            Ask questions about ARGO float data in natural language and get intelligent responses
          </p>
        </div>

        {/* Chat Messages */}
        <Card className="mb-6 shadow-surface min-h-[500px] flex flex-col">
          <CardContent className="flex-1 p-6">
            <div className="space-y-4 max-h-[500px] overflow-y-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.sender === "user"
                        ? "gradient-ocean text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      <div className="flex-shrink-0">
                        {message.sender === "user" ? (
                          <User className="w-5 h-5 mt-0.5" />
                        ) : (
                          <Bot className="w-5 h-5 mt-0.5 text-turquoise-500" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="whitespace-pre-wrap text-sm leading-relaxed">
                          {message.content}
                        </div>
                        {message.type === "visualization" && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            <Button size="sm" variant="outline" className="bg-background/80">
                              <BarChart3 className="w-3 h-3 mr-1" />
                              View Charts
                            </Button>
                            <Button size="sm" variant="outline" className="bg-background/80">
                              <MapPin className="w-3 h-3 mr-1" />
                              Show Map
                            </Button>
                            <Button size="sm" variant="outline" className="bg-background/80">
                              <Download className="w-3 h-3 mr-1" />
                              Export Data
                            </Button>
                          </div>
                        )}
                        {message.sender === "assistant" && (
                          <div className="mt-2 flex items-center space-x-2 text-xs">
                            <span className="text-muted-foreground">
                              {message.timestamp.toLocaleTimeString()}
                            </span>
                            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                              <Copy className="w-3 h-3" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                              <ThumbsUp className="w-3 h-3" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                              <ThumbsDown className="w-3 h-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg p-4 max-w-[80%]">
                    <div className="flex items-center space-x-2">
                      <Bot className="w-5 h-5 text-turquoise-500" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-turquoise-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-turquoise-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-turquoise-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
        </Card>

        {/* Suggested Queries */}
        <div className="mb-4">
          <p className="text-sm text-muted-foreground mb-2">Suggested queries:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQueries.map((query, index) => (
              <Badge
                key={index}
                variant="outline"
                className="cursor-pointer hover:bg-turquoise-50 hover:border-turquoise-300 transition-smooth"
                onClick={() => setInputValue(query)}
              >
                <Sparkles className="w-3 h-3 mr-1" />
                {query}
              </Badge>
            ))}
          </div>
        </div>

        {/* Message Input */}
        <Card className="shadow-surface">
          <CardContent className="p-4">
            <form onSubmit={handleSendMessage} className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me about ARGO float data, oceanographic parameters, or request visualizations..."
                className="flex-1 transition-smooth focus:shadow-surface"
                disabled={isTyping}
              />
              <Button 
                type="submit" 
                variant="hero" 
                size="icon"
                disabled={!inputValue.trim() || isTyping}
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </OceanBackground>
  );
};

export default Chat;