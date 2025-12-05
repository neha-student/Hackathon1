import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Sparkles, Briefcase, UserSearch, ArrowRight } from "lucide-react";

const UserTypeSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
      </div>

      <div className="w-full max-w-2xl animate-slide-up">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center">
            <Sparkles className="w-7 h-7 text-primary-foreground" />
          </div>
          <span className="font-display text-3xl font-bold gradient-text">HireMatch</span>
        </div>

        <div className="text-center mb-12">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
            How will you use <span className="gradient-text">HireMatch?</span>
          </h1>
          <p className="text-muted-foreground">
            Choose your path to get the best experience
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* HR / Hiring Manager */}
          <div
            className="glass rounded-3xl p-8 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-2 cursor-pointer group"
            onClick={() => navigate("/hr-onboarding")}
          >
            <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <UserSearch className="w-8 h-8 text-primary-foreground" />
            </div>
            <h2 className="font-display text-2xl font-bold mb-3">I'm Hiring</h2>
            <p className="text-muted-foreground text-sm mb-6">
              HR manager, recruiter, or team lead looking to find the perfect candidates for your company
            </p>
            <ul className="space-y-2 mb-6 text-sm">
              <li className="flex items-center gap-2 text-foreground">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                Search & filter candidates by role
              </li>
              <li className="flex items-center gap-2 text-foreground">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                AI-powered candidate summaries
              </li>
              <li className="flex items-center gap-2 text-foreground">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                Swipe to shortlist candidates
              </li>
              <li className="flex items-center gap-2 text-foreground">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                Schedule compatibility tests
              </li>
            </ul>
            <Button variant="hero" className="w-full group-hover:shadow-glow">
              Continue as Recruiter
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Job Seeker / Candidate */}
          <div
            className="glass rounded-3xl p-8 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-2 cursor-pointer group"
            onClick={() => navigate("/candidate-profile")}
          >
            <div className="w-16 h-16 gradient-secondary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Briefcase className="w-8 h-8 text-secondary-foreground" />
            </div>
            <h2 className="font-display text-2xl font-bold mb-3">I'm Looking for Work</h2>
            <p className="text-muted-foreground text-sm mb-6">
              Job seeker, student, or professional ready to find your dream opportunity
            </p>
            <ul className="space-y-2 mb-6 text-sm">
              <li className="flex items-center gap-2 text-foreground">
                <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                Create your professional profile
              </li>
              <li className="flex items-center gap-2 text-foreground">
                <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                Upload ATS-friendly resume
              </li>
              <li className="flex items-center gap-2 text-foreground">
                <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                Get discovered by top companies
              </li>
              <li className="flex items-center gap-2 text-foreground">
                <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                Take compatibility tests
              </li>
            </ul>
            <Button variant="coral" className="w-full group-hover:shadow-glow">
              Continue as Candidate
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center mt-8">
          <button
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => navigate("/")}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserTypeSelection;
