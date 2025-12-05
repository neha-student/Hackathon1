import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  Sparkles, Clock, AlertTriangle, CheckCircle, 
  Send, Shield, Eye, ArrowRight
} from "lucide-react";
import { toast } from "sonner";

interface Question {
  id: string;
  question: string;
}

const mockQuestions: Question[] = [
  { id: "1", question: "Describe a challenging project you worked on and how you overcame obstacles." },
  { id: "2", question: "How do you approach debugging a complex issue in your code?" },
  { id: "3", question: "Tell us about a time you had to learn a new technology quickly. How did you approach it?" },
  { id: "4", question: "How do you handle disagreements with team members about technical decisions?" },
  { id: "5", question: "Describe your ideal work environment and team culture." }
];

const TakeTest = () => {
  const navigate = useNavigate();
  const [testState, setTestState] = useState<"intro" | "active" | "completed">("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [warnings, setWarnings] = useState(0);
  const [result, setResult] = useState<{ passed: boolean; percentage: number } | null>(null);

  // Timer
  useEffect(() => {
    if (testState !== "active") return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [testState]);

  // Tab/window monitoring
  useEffect(() => {
    if (testState !== "active") return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setWarnings(prev => {
          const newWarnings = prev + 1;
          if (newWarnings >= 3) {
            toast.error("Test terminated due to multiple violations");
            handleSubmit();
          } else {
            toast.warning(`Warning ${newWarnings}/3: Please don't switch tabs during the test`);
          }
          return newWarnings;
        });
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      toast.warning("Right-click is disabled during the test");
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, [testState]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startTest = () => {
    setIsMonitoring(true);
    toast.info("Test monitoring enabled. Please don't switch tabs.");
    setTimeout(() => {
      setTestState("active");
    }, 1000);
  };

  const handleSubmit = () => {
    // Simulate AI evaluation
    const answeredCount = Object.values(answers).filter(a => a.trim().length > 50).length;
    const baseScore = (answeredCount / mockQuestions.length) * 100;
    const finalScore = Math.min(Math.round(baseScore + Math.random() * 15), 100);
    
    setResult({
      passed: finalScore >= 85,
      percentage: finalScore
    });
    setTestState("completed");
  };

  const question = mockQuestions[currentQuestion];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className={`border-b border-border sticky top-0 z-50 ${
        testState === "active" ? "bg-destructive/10" : "bg-card/80 backdrop-blur-sm"
      }`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 gradient-secondary rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-secondary-foreground" />
              </div>
              <span className="font-display text-2xl font-bold gradient-text">Compatibility Test</span>
            </div>
            
            {testState === "active" && (
              <div className="flex items-center gap-4">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                  timeLeft < 300 ? "bg-destructive/20 text-destructive" : "bg-muted"
                }`}>
                  <Clock className="w-4 h-4" />
                  <span className="font-mono font-bold">{formatTime(timeLeft)}</span>
                </div>
                {warnings > 0 && (
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/20 text-destructive">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="font-semibold">{warnings}/3 Warnings</span>
                  </div>
                )}
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary">
                  <Eye className="w-4 h-4" />
                  <span className="text-sm">Monitored</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {testState === "intro" && (
          <div className="max-w-xl mx-auto text-center animate-slide-up">
            <div className="w-20 h-20 gradient-secondary rounded-3xl flex items-center justify-center mx-auto mb-8">
              <Shield className="w-10 h-10 text-secondary-foreground" />
            </div>
            
            <h1 className="font-display text-3xl font-bold mb-4">
              Compatibility Assessment
            </h1>
            <p className="text-muted-foreground mb-8">
              This test evaluates your fit with the company culture and role requirements. 
              Please answer honestly and thoroughly.
            </p>

            <div className="glass rounded-3xl p-8 shadow-elevated mb-8 text-left">
              <h2 className="font-semibold mb-4">Test Rules:</h2>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Clock className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                  <span>You have <strong>60 minutes</strong> to complete the test</span>
                </li>
                <li className="flex items-start gap-2">
                  <Eye className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                  <span>Tab switching and phone use is <strong>monitored</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                  <span><strong>3 violations</strong> will terminate your test</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                  <span>You need <strong>85%</strong> or higher to pass</span>
                </li>
              </ul>
            </div>

            <Button variant="coral" size="xl" onClick={startTest}>
              Start Test
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        )}

        {testState === "active" && question && (
          <div className="max-w-2xl mx-auto animate-slide-up">
            {/* Progress */}
            <div className="mb-8">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Question {currentQuestion + 1} of {mockQuestions.length}</span>
                <span className="text-primary font-semibold">{Math.round(((currentQuestion) / mockQuestions.length) * 100)}% Complete</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full gradient-primary transition-all duration-300"
                  style={{ width: `${((currentQuestion) / mockQuestions.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="glass rounded-3xl p-8 shadow-elevated">
              <h2 className="font-display text-xl font-bold mb-6">
                {question.question}
              </h2>

              <textarea
                placeholder="Type your answer here... Be detailed and honest in your response."
                className="flex min-h-[200px] w-full rounded-xl border-2 border-input bg-card px-4 py-3 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:border-primary transition-all duration-300 resize-none"
                value={answers[question.id] || ""}
                onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })}
              />

              <div className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                  disabled={currentQuestion === 0}
                >
                  Previous
                </Button>

                {currentQuestion < mockQuestions.length - 1 ? (
                  <Button
                    variant="hero"
                    onClick={() => setCurrentQuestion(prev => prev + 1)}
                  >
                    Next Question
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                ) : (
                  <Button
                    variant="coral"
                    onClick={handleSubmit}
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Submit Test
                  </Button>
                )}
              </div>
            </div>

            {/* Question Navigator */}
            <div className="flex justify-center gap-2 mt-6">
              {mockQuestions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  className={`w-10 h-10 rounded-full font-semibold transition-all ${
                    index === currentQuestion
                      ? "gradient-primary text-primary-foreground"
                      : answers[mockQuestions[index].id]
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        )}

        {testState === "completed" && result && (
          <div className="max-w-md mx-auto text-center animate-slide-up">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 ${
              result.passed ? "gradient-primary" : "bg-destructive"
            }`}>
              {result.passed ? (
                <CheckCircle className="w-12 h-12 text-primary-foreground" />
              ) : (
                <AlertTriangle className="w-12 h-12 text-destructive-foreground" />
              )}
            </div>

            <h1 className="font-display text-4xl font-bold mb-2">
              {result.passed ? "Congratulations! 🎉" : "Better Luck Next Time"}
            </h1>
            
            <p className="text-muted-foreground mb-8">
              {result.passed 
                ? "You've passed the compatibility assessment!"
                : "Unfortunately, you didn't meet the required threshold."
              }
            </p>

            <div className="glass rounded-3xl p-8 shadow-elevated mb-8">
              <div className={`font-display text-6xl font-bold ${
                result.passed ? "gradient-text" : "text-destructive"
              }`}>
                {result.percentage}%
              </div>
              <p className="text-muted-foreground mt-2">Compatibility Score</p>
              <div className="h-3 bg-muted rounded-full mt-6 overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ${
                    result.passed ? "gradient-primary" : "bg-destructive"
                  }`}
                  style={{ width: `${result.percentage}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Required: 85% | Your Score: {result.percentage}%
              </p>
            </div>

            <Button 
              variant={result.passed ? "hero" : "outline"}
              size="lg"
              onClick={() => navigate("/")}
            >
              Back to Home
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default TakeTest;
