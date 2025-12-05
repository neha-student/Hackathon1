import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  Sparkles, ArrowLeft, Mail, Calendar, 
  Trash2, Send, Users, CheckCircle
} from "lucide-react";
import { toast } from "sonner";

interface ShortlistedCandidate {
  id: string;
  name: string;
  role: string;
  matchPercentage: number;
  email: string;
  status: "pending" | "invited" | "tested";
}

const mockShortlisted: ShortlistedCandidate[] = [
  { id: "1", name: "Aanya Sharma", role: "Python Developer", matchPercentage: 94, email: "aanya.s@email.com", status: "invited" },
  { id: "2", name: "Sneha Kumar", role: "Full Stack Developer", matchPercentage: 91, email: "sneha.k@email.com", status: "pending" },
  { id: "3", name: "Rohan Verma", role: "Data Scientist", matchPercentage: 89, email: "rohan.v@email.com", status: "tested" },
];

const Shortlisted = () => {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState(mockShortlisted);
  const [loading, setLoading] = useState<string | null>(null);

  const handleSendInvite = async (candidate: ShortlistedCandidate) => {
    setLoading(candidate.id);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setCandidates(prev => 
      prev.map(c => c.id === candidate.id ? { ...c, status: "invited" as const } : c)
    );
    
    toast.success(`Test invite sent to ${candidate.name}`);
    setLoading(null);
  };

  const handleRemove = (id: string) => {
    setCandidates(prev => prev.filter(c => c.id !== id));
    toast.info("Candidate removed from shortlist");
  };

  const getStatusBadge = (status: ShortlistedCandidate["status"]) => {
    switch (status) {
      case "pending":
        return <span className="px-3 py-1 bg-accent/20 text-accent-foreground rounded-full text-xs font-medium">Pending Invite</span>;
      case "invited":
        return <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-medium">Invited</span>;
      case "tested":
        return <span className="px-3 py-1 bg-primary/30 text-primary rounded-full text-xs font-medium flex items-center gap-1"><CheckCircle className="w-3 h-3" />Tested</span>;
    }
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
                <span className="font-display text-2xl font-bold gradient-text">Shortlisted</span>
              </div>
            </div>
            <Button variant="hero" onClick={() => navigate("/test-schedule")}>
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Tests
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {candidates.length > 0 ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  {candidates.length} candidate{candidates.length !== 1 ? "s" : ""} shortlisted
                </p>
              </div>

              <div className="space-y-4">
                {candidates.map((candidate, index) => (
                  <div 
                    key={candidate.id}
                    className="glass rounded-2xl p-6 shadow-card hover:shadow-elevated transition-all duration-300 animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 gradient-primary rounded-2xl flex items-center justify-center text-primary-foreground font-display text-xl font-bold">
                          {candidate.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-display text-lg font-bold">{candidate.name}</h3>
                          <p className="text-sm text-muted-foreground">{candidate.role}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Mail className="w-3 h-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{candidate.email}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-2xl font-display font-bold text-primary">{candidate.matchPercentage}%</div>
                        <div className="mt-2">{getStatusBadge(candidate.status)}</div>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-4 pt-4 border-t border-border">
                      {candidate.status === "pending" && (
                        <Button 
                          variant="hero" 
                          size="sm"
                          onClick={() => handleSendInvite(candidate)}
                          disabled={loading === candidate.id}
                        >
                          {loading === candidate.id ? (
                            <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                          ) : (
                            <>
                              <Send className="w-4 h-4 mr-2" />
                              Send Test Invite
                            </>
                          )}
                        </Button>
                      )}
                      {candidate.status === "invited" && (
                        <Button variant="outline" size="sm" disabled>
                          <Mail className="w-4 h-4 mr-2" />
                          Invite Sent
                        </Button>
                      )}
                      {candidate.status === "tested" && (
                        <Button variant="default" size="sm">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          View Results
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleRemove(candidate.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20 animate-slide-up">
              <div className="w-20 h-20 bg-muted rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-muted-foreground" />
              </div>
              <h2 className="font-display text-2xl font-bold mb-2">No Candidates Yet</h2>
              <p className="text-muted-foreground mb-6">
                Start swiping right on candidates to add them to your shortlist
              </p>
              <Button variant="hero" onClick={() => navigate("/hr-dashboard")}>
                Browse Candidates
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Shortlisted;
