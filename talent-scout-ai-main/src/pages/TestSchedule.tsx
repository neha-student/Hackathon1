import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { 
  Sparkles, Calendar, Clock, Plus, Trash2, 
  Send, ArrowLeft, CheckCircle, Users
} from "lucide-react";
import { toast } from "sonner";

interface Question {
  id: string;
  question: string;
  expectedAnswer: string;
}

interface ScheduledTest {
  id: string;
  candidateName: string;
  candidateEmail: string;
  date: string;
  time: string;
  status: "pending" | "completed" | "missed";
}

const TestSchedule = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"schedule" | "questions">("schedule");
  const [loading, setLoading] = useState(false);
  
  const [scheduleData, setScheduleData] = useState({
    candidateEmail: "",
    date: "",
    time: "",
    duration: "60"
  });

  const [questions, setQuestions] = useState<Question[]>([
    { id: "1", question: "Describe a challenging project you worked on and how you overcame obstacles.", expectedAnswer: "" },
    { id: "2", question: "How do you approach debugging a complex issue in your code?", expectedAnswer: "" }
  ]);

  const [scheduledTests, setScheduledTests] = useState<ScheduledTest[]>([
    { id: "1", candidateName: "Aanya Sharma", candidateEmail: "aanya.s@email.com", date: "2024-01-15", time: "10:00", status: "pending" },
    { id: "2", candidateName: "Rohan Verma", candidateEmail: "rohan.v@email.com", date: "2024-01-14", time: "14:00", status: "completed" }
  ]);

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      question: "",
      expectedAnswer: ""
    };
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (id: string) => {
    if (questions.length <= 1) {
      toast.error("You need at least one question");
      return;
    }
    setQuestions(questions.filter(q => q.id !== id));
  };

  const updateQuestion = (id: string, field: "question" | "expectedAnswer", value: string) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, [field]: value } : q
    ));
  };

  const handleSchedule = async () => {
    if (!scheduleData.candidateEmail || !scheduleData.date || !scheduleData.time) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newTest: ScheduledTest = {
      id: Date.now().toString(),
      candidateName: "New Candidate",
      candidateEmail: scheduleData.candidateEmail,
      date: scheduleData.date,
      time: scheduleData.time,
      status: "pending"
    };

    setScheduledTests([newTest, ...scheduledTests]);
    setScheduleData({ candidateEmail: "", date: "", time: "", duration: "60" });
    toast.success("Test scheduled! Invite sent to candidate.");
    setLoading(false);
  };

  const handleSaveQuestions = () => {
    const emptyQuestions = questions.filter(q => !q.question.trim());
    if (emptyQuestions.length > 0) {
      toast.error("Please fill in all questions");
      return;
    }
    toast.success("Question pool saved successfully!");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => navigate("/hr-dashboard")}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="font-display text-2xl font-bold gradient-text">Test Manager</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 max-w-2xl mx-auto">
          <button
            onClick={() => setActiveTab("schedule")}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
              activeTab === "schedule"
                ? "gradient-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            <Calendar className="w-4 h-4 inline mr-2" />
            Schedule Tests
          </button>
          <button
            onClick={() => setActiveTab("questions")}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
              activeTab === "questions"
                ? "gradient-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            <Plus className="w-4 h-4 inline mr-2" />
            Question Pool
          </button>
        </div>

        {activeTab === "schedule" ? (
          <div className="max-w-2xl mx-auto space-y-8 animate-slide-up">
            {/* Schedule Form */}
            <div className="glass rounded-3xl p-8 shadow-elevated">
              <h2 className="font-display text-xl font-bold mb-6">Schedule New Test</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Candidate Email</label>
                  <Input
                    type="email"
                    placeholder="candidate@email.com"
                    value={scheduleData.candidateEmail}
                    onChange={(e) => setScheduleData({ ...scheduleData, candidateEmail: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Date</label>
                    <Input
                      type="date"
                      value={scheduleData.date}
                      onChange={(e) => setScheduleData({ ...scheduleData, date: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Time</label>
                    <Input
                      type="time"
                      value={scheduleData.time}
                      onChange={(e) => setScheduleData({ ...scheduleData, time: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Duration (minutes)</label>
                  <select
                    className="flex h-12 w-full rounded-xl border-2 border-input bg-card px-4 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:border-primary transition-all duration-300"
                    value={scheduleData.duration}
                    onChange={(e) => setScheduleData({ ...scheduleData, duration: e.target.value })}
                  >
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">60 minutes</option>
                    <option value="90">90 minutes</option>
                  </select>
                </div>

                <Button 
                  variant="hero" 
                  size="lg" 
                  className="w-full"
                  onClick={handleSchedule}
                  disabled={loading}
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Invite
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Scheduled Tests List */}
            <div>
              <h2 className="font-display text-xl font-bold mb-4">Scheduled Tests</h2>
              <div className="space-y-3">
                {scheduledTests.map((test) => (
                  <div 
                    key={test.id}
                    className="glass rounded-2xl p-4 shadow-card flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        test.status === "completed" ? "bg-primary/20" : 
                        test.status === "missed" ? "bg-destructive/20" : "bg-accent/20"
                      }`}>
                        {test.status === "completed" ? (
                          <CheckCircle className="w-5 h-5 text-primary" />
                        ) : (
                          <Users className="w-5 h-5 text-accent" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold">{test.candidateName}</p>
                        <p className="text-sm text-muted-foreground">{test.candidateEmail}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {test.date}
                      </p>
                      <p className="text-sm text-muted-foreground flex items-center gap-2 justify-end">
                        <Clock className="w-3 h-3" />
                        {test.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Questions Tab */
          <div className="max-w-2xl mx-auto animate-slide-up">
            <div className="glass rounded-3xl p-8 shadow-elevated">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl font-bold">Question Pool</h2>
                <Button variant="outline" size="sm" onClick={addQuestion}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Question
                </Button>
              </div>

              <div className="space-y-6">
                {questions.map((q, index) => (
                  <div key={q.id} className="bg-muted/50 rounded-2xl p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <span className="text-sm font-semibold text-primary">Question {index + 1}</span>
                      <button
                        onClick={() => removeQuestion(q.id)}
                        className="p-1 hover:bg-destructive/10 rounded-full transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </button>
                    </div>
                    <textarea
                      placeholder="Enter your question..."
                      className="flex min-h-[80px] w-full rounded-xl border-2 border-input bg-card px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:border-primary transition-all duration-300 resize-none"
                      value={q.question}
                      onChange={(e) => updateQuestion(q.id, "question", e.target.value)}
                    />
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Expected Answer (for AI evaluation)</label>
                      <textarea
                        placeholder="What key points should the answer include?"
                        className="flex min-h-[60px] w-full rounded-xl border-2 border-input bg-card px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:border-primary transition-all duration-300 resize-none"
                        value={q.expectedAnswer}
                        onChange={(e) => updateQuestion(q.id, "expectedAnswer", e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <Button 
                variant="hero" 
                size="lg" 
                className="w-full mt-6"
                onClick={handleSaveQuestions}
              >
                Save Question Pool
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default TestSchedule;
