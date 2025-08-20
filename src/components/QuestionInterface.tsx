import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Send, Sparkles } from "lucide-react";

interface BirthDetails {
  name: string;
  date: string;
  time: string;
  place: string;
}

interface QuestionInterfaceProps {
  birthDetails: BirthDetails;
}

export function QuestionInterface({ birthDetails }: QuestionInterfaceProps) {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generateResponse = async (userQuestion: string) => {
    setIsLoading(true);
    
    // Simulate AI response with astrology-themed content
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const responses = [
      `Dear ${birthDetails.name}, the stars whisper that your question reveals a deep cosmic truth. Based on your birth details from ${birthDetails.place}, the celestial energies suggest that this matter requires patience and trust in the universe's timing. Your path is illuminated by the same stars that guided you into this world.`,
      
      `${birthDetails.name}, your inquiry resonates with ancient wisdom. The cosmic alignment at the time of your birth in ${birthDetails.place} indicates that you possess the inner strength to navigate this situation. The universe has been preparing you for this moment since ${new Date(birthDetails.date).toLocaleDateString()}.`,
      
      `The celestial bodies speak clearly about your question, ${birthDetails.name}. Your birth time of ${birthDetails.time} reveals a unique cosmic signature that influences how you should approach this matter. Trust in the divine timing and remember that every challenge is an opportunity for growth and transformation.`,
      
      `${birthDetails.name}, the stars align to offer you guidance. Your connection to ${birthDetails.place} and the energy present at your birth creates a powerful foundation for understanding. This question you've asked shows your soul's readiness to embrace the next phase of your cosmic journey.`
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    setResponse(randomResponse);
    setIsLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      generateResponse(question);
    }
  };

  return (
    <div className="space-y-6 w-full max-w-2xl mx-auto">
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-light tracking-wide flex items-center justify-center gap-2">
            <MessageCircle className="w-6 h-6 text-accent" />
            Ask the Cosmos
          </CardTitle>
          <CardDescription>
            Seek guidance from the celestial realm about any aspect of your life
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Textarea
                placeholder="What question weighs on your heart? Ask about love, career, personal growth, or any life matter..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="min-h-[120px] bg-input/50 border-border/50 focus:border-accent resize-none"
                required
              />
            </div>
            <Button 
              type="submit" 
              disabled={isLoading || !question.trim()}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2.5"
            >
              {isLoading ? (
                <>
                  <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                  Consulting the Stars...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Seek Cosmic Guidance
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {response && (
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent" />
              Cosmic Response
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground leading-relaxed whitespace-pre-line">
              {response}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}