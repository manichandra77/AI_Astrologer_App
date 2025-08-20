import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Stars, Sun, Moon, Sparkles } from "lucide-react";

interface BirthDetails {
  name: string;
  date: string;
  time: string;
  place: string;
}

interface AstrologyProfileProps {
  birthDetails: BirthDetails;
}

export function AstrologyProfile({ birthDetails }: AstrologyProfileProps) {
  // Simple astrology logic based on birth date
  const getZodiacSign = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    const signs = [
      { sign: "Capricorn", start: [12, 22], end: [1, 19], element: "Earth", ruling: "Saturn" },
      { sign: "Aquarius", start: [1, 20], end: [2, 18], element: "Air", ruling: "Uranus" },
      { sign: "Pisces", start: [2, 19], end: [3, 20], element: "Water", ruling: "Neptune" },
      { sign: "Aries", start: [3, 21], end: [4, 19], element: "Fire", ruling: "Mars" },
      { sign: "Taurus", start: [4, 20], end: [5, 20], element: "Earth", ruling: "Venus" },
      { sign: "Gemini", start: [5, 21], end: [6, 20], element: "Air", ruling: "Mercury" },
      { sign: "Cancer", start: [6, 21], end: [7, 22], element: "Water", ruling: "Moon" },
      { sign: "Leo", start: [7, 23], end: [8, 22], element: "Fire", ruling: "Sun" },
      { sign: "Virgo", start: [8, 23], end: [9, 22], element: "Earth", ruling: "Mercury" },
      { sign: "Libra", start: [9, 23], end: [10, 22], element: "Air", ruling: "Venus" },
      { sign: "Scorpio", start: [10, 23], end: [11, 21], element: "Water", ruling: "Pluto" },
      { sign: "Sagittarius", start: [11, 22], end: [12, 21], element: "Fire", ruling: "Jupiter" }
    ];

    for (const zodiac of signs) {
      const [startMonth, startDay] = zodiac.start;
      const [endMonth, endDay] = zodiac.end;
      
      if ((month === startMonth && day >= startDay) || (month === endMonth && day <= endDay)) {
        return zodiac;
      }
    }
    
    return signs[0]; // Default to Capricorn
  };

  const zodiac = getZodiacSign(birthDetails.date);
  
  const getPersonality = (sign: string) => {
    const personalities: Record<string, string[]> = {
      "Aries": ["Bold", "Pioneering", "Energetic", "Courageous"],
      "Taurus": ["Stable", "Practical", "Reliable", "Patient"],
      "Gemini": ["Curious", "Adaptable", "Witty", "Communicative"],
      "Cancer": ["Nurturing", "Intuitive", "Emotional", "Protective"],
      "Leo": ["Confident", "Creative", "Generous", "Dramatic"],
      "Virgo": ["Analytical", "Perfectionist", "Helpful", "Modest"],
      "Libra": ["Harmonious", "Diplomatic", "Charming", "Fair"],
      "Scorpio": ["Intense", "Mysterious", "Transformative", "Passionate"],
      "Sagittarius": ["Adventurous", "Philosophical", "Optimistic", "Free-spirited"],
      "Capricorn": ["Ambitious", "Disciplined", "Practical", "Responsible"],
      "Aquarius": ["Independent", "Innovative", "Humanitarian", "Unique"],
      "Pisces": ["Compassionate", "Artistic", "Intuitive", "Dreamy"]
    };
    
    return personalities[sign] || personalities["Aries"];
  };

  const personality = getPersonality(zodiac.sign);

  return (
    <div className="space-y-6 w-full max-w-2xl mx-auto">
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-light tracking-wide flex items-center justify-center gap-2">
            <Stars className="w-8 h-8 text-accent" />
            {birthDetails.name}'s Cosmic Profile
          </CardTitle>
          <CardDescription className="text-lg">
            Born in {birthDetails.place} on {new Date(birthDetails.date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sun className="w-5 h-5 text-accent" />
              Sun Sign
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-2xl font-semibold text-accent">{zodiac.sign}</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-secondary/50">
                    {zodiac.element} Element
                  </Badge>
                  <Badge variant="outline" className="border-accent/30">
                    Ruled by {zodiac.ruling}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent" />
              Key Traits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {personality.map((trait, index) => (
                <Badge key={index} variant="secondary" className="bg-muted/50 justify-center">
                  {trait}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Moon className="w-5 h-5 text-accent" />
            Cosmic Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">
            As a {zodiac.sign}, you embody the essence of the {zodiac.element.toLowerCase()} element, 
            bringing {personality[0].toLowerCase()} energy to everything you do. Your birth time of {birthDetails.time} 
            in {birthDetails.place} adds unique celestial influences to your cosmic blueprint. 
            The planets aligned at your moment of birth continue to guide your path through life's adventures.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}