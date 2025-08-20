import { useState } from "react";
import { BirthDetailsForm } from "@/components/BirthDetailsForm";
import { AstrologyProfile } from "@/components/AstrologyProfile";
import { QuestionInterface } from "@/components/QuestionInterface";
import { Button } from "@/components/ui/button";
import { Stars, ArrowLeft } from "lucide-react";
import cosmicBg from "@/assets/cosmic-bg.jpg";

interface BirthDetails {
  name: string;
  date: string;
  time: string;
  place: string;
}

const Index = () => {
  const [step, setStep] = useState<'form' | 'profile' | 'questions'>('form');
  const [birthDetails, setBirthDetails] = useState<BirthDetails | null>(null);

  const handleFormSubmit = (details: BirthDetails) => {
    setBirthDetails(details);
    setStep('profile');
  };

  const handleContinueToQuestions = () => {
    setStep('questions');
  };

  const handleRestart = () => {
    setStep('form');
    setBirthDetails(null);
  };

  return (
    <div 
      className="min-h-screen bg-background relative overflow-hidden"
      style={{
        backgroundImage: `url(${cosmicBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-background/70 backdrop-blur-[1px]" />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Stars className="w-12 h-12 text-accent" />
            <h1 className="text-5xl font-light tracking-wide bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
              Cosmic Insight
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Discover your celestial blueprint and receive guidance from the ancient wisdom of the stars
          </p>
        </header>

        {/* Navigation */}
        {step !== 'form' && (
          <div className="flex justify-center mb-8">
            <Button 
              variant="ghost" 
              onClick={handleRestart}
              className="text-accent hover:text-accent/80 hover:bg-accent/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Start Over
            </Button>
          </div>
        )}

        {/* Main Content */}
        <main className="flex justify-center">
          {step === 'form' && (
            <BirthDetailsForm onSubmit={handleFormSubmit} />
          )}
          
          {step === 'profile' && birthDetails && (
            <div className="space-y-8">
              <AstrologyProfile birthDetails={birthDetails} />
              <div className="flex justify-center">
                <Button 
                  onClick={handleContinueToQuestions}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg"
                >
                  Ask a Question
                </Button>
              </div>
            </div>
          )}
          
          {step === 'questions' && birthDetails && (
            <QuestionInterface birthDetails={birthDetails} />
          )}
        </main>

        {/* Footer */}
        <footer className="text-center mt-16 pt-8 border-t border-border/20">
          <p className="text-muted-foreground text-sm">
            ✨ Your cosmic journey begins with understanding your celestial essence ✨
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;