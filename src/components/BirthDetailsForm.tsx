import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, MapPin, User } from "lucide-react";

interface BirthDetails {
  name: string;
  date: string;
  time: string;
  place: string;
}

interface BirthDetailsFormProps {
  onSubmit: (details: BirthDetails) => void;
}

export function BirthDetailsForm({ onSubmit }: BirthDetailsFormProps) {
  const [formData, setFormData] = useState<BirthDetails>({
    name: "",
    date: "",
    time: "",
    place: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.date && formData.time && formData.place) {
      onSubmit(formData);
    }
  };

  const handleChange = (field: keyof BirthDetails, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-md mx-auto border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="text-center space-y-2">
        <CardTitle className="text-2xl font-light tracking-wide">Birth Details</CardTitle>
        <CardDescription className="text-muted-foreground">
          Enter your details to receive your cosmic insights
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2 font-medium">
              <User className="w-4 h-4 text-accent" />
              Full Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="bg-input/50 border-border/50 focus:border-accent"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date" className="flex items-center gap-2 font-medium">
              <Calendar className="w-4 h-4 text-accent" />
              Date of Birth
            </Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => handleChange("date", e.target.value)}
              className="bg-input/50 border-border/50 focus:border-accent"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="time" className="flex items-center gap-2 font-medium">
              <Clock className="w-4 h-4 text-accent" />
              Time of Birth
            </Label>
            <Input
              id="time"
              type="time"
              value={formData.time}
              onChange={(e) => handleChange("time", e.target.value)}
              className="bg-input/50 border-border/50 focus:border-accent"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="place" className="flex items-center gap-2 font-medium">
              <MapPin className="w-4 h-4 text-accent" />
              Place of Birth
            </Label>
            <Input
              id="place"
              type="text"
              placeholder="City, Country"
              value={formData.place}
              onChange={(e) => handleChange("place", e.target.value)}
              className="bg-input/50 border-border/50 focus:border-accent"
              required
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2.5"
          >
            Generate My Cosmic Profile
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}