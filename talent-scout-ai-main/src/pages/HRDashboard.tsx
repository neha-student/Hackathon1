import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { 
  Sparkles, Search, Users, CheckCircle, 
  X, ChevronRight, LogOut, Star, Briefcase, 
  GraduationCap, Clock, Instagram, Mail, Phone, ArrowRight
} from "lucide-react";
import { toast } from "sonner";

type ExperienceFilter = "experienced" | "freshers" | "internship";

interface Candidate {
  id: string;
  name: string;
  role: string;
  matchPercentage: number;
  experience: ExperienceFilter;
  summary: string;
  skills: string[];
  projects: string[];
  clubs: string[];
  email: string;
  instagram?: string;
  phone?: string;
}

const mockCandidates: Candidate[] = [
  {
    id: "1",
    name: "Aanya Sharma",
    role: "Python Developer",
    matchPercentage: 94,
    experience: "experienced",
    summary: "3+ years building scalable backend systems with Python, Django, and FastAPI. Led migration of monolithic architecture to microservices, reducing latency by 40%.",
    skills: ["Python", "Django", "FastAPI", "PostgreSQL", "Docker", "AWS"],
    projects: ["E-commerce Platform", "Real-time Analytics Dashboard", "ML Pipeline Automation"],
    clubs: ["Tech Lead - CodeClub", "Google Developer Student Club"],
    email: "aanya.s@email.com",
    instagram: "@aanya_codes",
    phone: "+91 98765 43210"
  },
  {
    id: "2",
    name: "Rohan Verma",
    role: "Data Scientist",
    matchPercentage: 89,
    experience: "experienced",
    summary: "Data scientist with 2 years at fintech startup. Built fraud detection models achieving 98% accuracy. Strong in ML, statistics, and data visualization.",
    skills: ["Python", "TensorFlow", "Pandas", "SQL", "Tableau", "Spark"],
    projects: ["Fraud Detection System", "Customer Churn Prediction", "NLP Sentiment Analyzer"],
    clubs: ["AI/ML Club President", "Kaggle Expert"],
    email: "rohan.v@email.com",
    instagram: "@rohan_data"
  },
  {
    id: "3",
    name: "Priya Patel",
    role: "Frontend Developer",
    matchPercentage: 86,
    experience: "freshers",
    summary: "Fresh CS graduate passionate about creating beautiful user experiences. Strong React skills with a portfolio of 5+ personal projects. Quick learner with attention to detail.",
    skills: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Figma"],
    projects: ["Portfolio Website", "Task Management App", "Weather Dashboard"],
    clubs: ["Design Club", "Web Dev Community Lead"],
    email: "priya.p@email.com",
    instagram: "@priya_designs",
    phone: "+91 87654 32109"
  },
  {
    id: "4",
    name: "Arjun Reddy",
    role: "Python Developer",
    matchPercentage: 82,
    experience: "internship",
    summary: "Computer Science student seeking internship. Strong foundation in Python and machine learning. Completed multiple Coursera certifications and personal projects.",
    skills: ["Python", "Machine Learning", "Git", "MySQL", "Flask"],
    projects: ["Chatbot using NLP", "Image Classifier", "Expense Tracker API"],
    clubs: ["Coding Club", "Hackathon Winner x2"],
    email: "arjun.r@email.com"
  },
  {
    id: "5",
    name: "Sneha Kumar",
    role: "Full Stack Developer",
    matchPercentage: 91,
    experience: "experienced",
    summary: "4 years of full-stack experience with Node.js and React. Led development of SaaS platform serving 50K+ users. Passionate about clean code and scalable architecture.",
    skills: ["Node.js", "React", "MongoDB", "GraphQL", "AWS", "Kubernetes"],
    projects: ["SaaS Platform", "Real-time Collaboration Tool", "Analytics Dashboard"],
    clubs: ["Tech Mentor", "Open Source Contributor"],
    email: "sneha.k@email.com",
    instagram: "@sneha_fullstack",
    phone: "+91 76543 21098"
  },
  {
    id: "6",
    name: "Kavya Nair",
    role: "React Developer",
    matchPercentage: 78,
    experience: "freshers",
    summary: "Recent graduate with strong fundamentals in React and JavaScript. Built 3 full-stack projects during bootcamp. Eager to learn and grow in a fast-paced environment.",
    skills: ["React", "JavaScript", "HTML", "CSS", "Node.js"],
    projects: ["E-learning Platform", "Social Media Clone", "Budget Tracker"],
    clubs: ["Web Dev Club", "Freelance Projects"],
    email: "kavya.n@email.com"
  },
  {
    id: "7",
    name: "Vikram Singh",
    role: "Backend Developer",
    matchPercentage: 75,
    experience: "internship",
    summary: "Final year student looking for internship opportunities. Proficient in Java and Spring Boot. Active contributor to open source projects.",
    skills: ["Java", "Spring Boot", "MySQL", "Git", "REST APIs"],
    projects: ["Library Management System", "Chat Application", "REST API Development"],
    clubs: ["Open Source Club", "Technical Fest Organizer"],
    email: "vikram.s@email.com",
    instagram: "@vikram_codes"
  }
];

const HRDashboard = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [experienceFilter, setExperienceFilter] = useState<ExperienceFilter | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [candidates] = useState(mockCandidates);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null);
  const [shortlisted, setShortlisted] = useState<Candidate[]>([]);

  const filteredCandidates = useMemo(() => {
    if (!hasSearched || !experienceFilter) return [];
    
    return candidates.filter(candidate => {
      const matchesSearch = searchQuery.trim() === "" || 
        candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesExperience = candidate.experience === experienceFilter;
      
      return matchesSearch && matchesExperience;
    });
  }, [candidates, searchQuery, experienceFilter, hasSearched]);

  const currentCandidate = filteredCandidates[currentIndex];

  const handleSearch = () => {
    if (!experienceFilter) {
      toast.error("Please select a category first");
      return;
    }
    setHasSearched(true);
    setCurrentIndex(0);
  };

  const handleSwipe = (direction: "left" | "right") => {
    if (!currentCandidate) return;

    setSwipeDirection(direction);

    setTimeout(() => {
      if (direction === "right") {
        setShortlisted(prev => [...prev, currentCandidate]);
        toast.success(`${currentCandidate.name} added to shortlist!`);
      } else {
        toast.info(`${currentCandidate.name} passed`);
      }

      setSwipeDirection(null);
      
      if (currentIndex < filteredCandidates.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setCurrentIndex(0);
        toast.info("You've reviewed all candidates in this category");
      }
    }, 300);
  };

  const getMatchColor = (percentage: number) => {
    if (percentage >= 90) return "text-primary";
    if (percentage >= 80) return "text-accent";
    return "text-secondary";
  };

  const experienceOptions = [
    { value: "experienced" as const, label: "Experienced", icon: Briefcase, description: "2+ years of work experience" },
    { value: "freshers" as const, label: "Freshers", icon: GraduationCap, description: "Recent graduates & entry level" },
    { value: "internship" as const, label: "Open to Internships", icon: Clock, description: "Students & trainees" }
  ];

  const handleReset = () => {
    setExperienceFilter(null);
    setHasSearched(false);
    setSearchQuery("");
    setCurrentIndex(0);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
      </div>

      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-display text-2xl font-bold gradient-text">HireMatch</span>
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                onClick={() => navigate("/shortlisted")}
                className="relative"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Shortlisted
                {shortlisted.length > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 gradient-secondary text-secondary-foreground text-xs rounded-full flex items-center justify-center">
                    {shortlisted.length}
                  </span>
                )}
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => {
                  toast.success("Logged out successfully");
                  navigate("/");
                }}
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {!hasSearched ? (
          /* Initial State - Show Filter Selection */
          <div className="max-w-3xl mx-auto animate-slide-up">
            <div className="text-center mb-10">
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Find Your <span className="gradient-text">Perfect Candidate</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Select a category and search for the role you're hiring for
              </p>
            </div>

            {/* Category Selection */}
            <div className="mb-8">
              <h2 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-4">
                Step 1: Select Candidate Type
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                {experienceOptions.map((option) => {
                  const Icon = option.icon;
                  const isSelected = experienceFilter === option.value;
                  return (
                    <button
                      key={option.value}
                      onClick={() => setExperienceFilter(option.value)}
                      className={`p-6 rounded-2xl text-left transition-all duration-300 ${
                        isSelected 
                          ? "glass shadow-elevated border-2 border-primary" 
                          : "bg-card hover:bg-muted border-2 border-transparent"
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                        isSelected ? "gradient-primary" : "bg-muted"
                      }`}>
                        <Icon className={`w-6 h-6 ${isSelected ? "text-primary-foreground" : "text-muted-foreground"}`} />
                      </div>
                      <h3 className="font-display text-lg font-semibold mb-1">{option.label}</h3>
                      <p className="text-sm text-muted-foreground">{option.description}</p>
                      {isSelected && (
                        <div className="mt-3 flex items-center gap-1 text-primary text-sm font-medium">
                          <CheckCircle className="w-4 h-4" />
                          Selected
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Search Bar */}
            <div className="mb-8">
              <h2 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-4">
                Step 2: Search for a Role
              </h2>
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="e.g., Python Developer, Data Scientist, React Developer"
                    className="pl-12 h-14 text-base"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSearch();
                    }}
                  />
                </div>
                <Button 
                  variant="hero" 
                  size="lg"
                  className="h-14 px-8"
                  onClick={handleSearch}
                  disabled={!experienceFilter}
                >
                  <Search className="w-5 h-5 mr-2" />
                  Search
                </Button>
              </div>
              {!experienceFilter && (
                <p className="text-sm text-muted-foreground mt-2">
                  Please select a candidate type above to continue
                </p>
              )}
            </div>

            {/* Quick Tips */}
            <div className="glass rounded-2xl p-6 shadow-card">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                Pro Tips
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Search by specific skills like "Python", "React", or "Machine Learning"</li>
                <li>• Use job titles like "Frontend Developer" or "Data Scientist"</li>
                <li>• Leave search empty to see all candidates in the selected category</li>
              </ul>
            </div>
          </div>
        ) : (
          /* Search Results - Show Candidate Cards */
          <div className="animate-slide-up">
            {/* Search Controls */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="flex gap-3 mb-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Search by role, skill..."
                    className="pl-12"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentIndex(0);
                    }}
                  />
                </div>
                <Button 
                  variant="outline"
                  onClick={handleReset}
                >
                  Change Category
                </Button>
              </div>

              {/* Current Filter Badge */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Showing:</span>
                <span className="px-3 py-1 gradient-primary text-primary-foreground rounded-full text-sm font-medium flex items-center gap-2">
                  {experienceFilter === "experienced" && <Briefcase className="w-3 h-3" />}
                  {experienceFilter === "freshers" && <GraduationCap className="w-3 h-3" />}
                  {experienceFilter === "internship" && <Clock className="w-3 h-3" />}
                  {experienceOptions.find(o => o.value === experienceFilter)?.label}
                </span>
                {searchQuery && (
                  <span className="px-3 py-1 bg-muted rounded-full text-sm">
                    "{searchQuery}"
                  </span>
                )}
              </div>
            </div>

            {/* Candidate Card */}
            {currentCandidate ? (
              <div className="max-w-lg mx-auto">
                <div 
                  className={`glass rounded-3xl p-6 shadow-elevated transition-all duration-300 ${
                    swipeDirection === "left" ? "animate-swipe-left" : ""
                  } ${swipeDirection === "right" ? "animate-swipe-right" : ""}`}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="font-display text-2xl font-bold">{currentCandidate.name}</h2>
                      <p className="text-muted-foreground">{currentCandidate.role}</p>
                    </div>
                    <div className={`text-right ${getMatchColor(currentCandidate.matchPercentage)}`}>
                      <div className="font-display text-3xl font-bold">{currentCandidate.matchPercentage}%</div>
                      <div className="text-xs uppercase tracking-wide">Match</div>
                    </div>
                  </div>

                  {/* AI Summary */}
                  <div className="bg-primary/5 rounded-2xl p-4 mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-primary" />
                      <span className="text-sm font-semibold text-primary">AI Summary</span>
                    </div>
                    <p className="text-sm text-foreground leading-relaxed">{currentCandidate.summary}</p>
                  </div>

                  {/* Skills */}
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold mb-2">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {currentCandidate.skills.map((skill, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-muted rounded-full text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Projects */}
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold mb-2">Projects</h3>
                    <ul className="space-y-1">
                      {currentCandidate.projects.map((project, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Star className="w-3 h-3 text-accent" />
                          {project}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Clubs & Activities */}
                  {currentCandidate.clubs.length > 0 && (
                    <div className="mb-4">
                      <h3 className="text-sm font-semibold mb-2">Clubs & Activities</h3>
                      <div className="flex flex-wrap gap-2">
                        {currentCandidate.clubs.map((club, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1 bg-secondary/20 text-secondary rounded-full text-xs font-medium"
                          >
                            {club}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Contact Info */}
                  <div className="border-t border-border pt-4 mt-4">
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <a href={`mailto:${currentCandidate.email}`} className="flex items-center gap-1 hover:text-primary transition-colors">
                        <Mail className="w-4 h-4" />
                        {currentCandidate.email}
                      </a>
                      {currentCandidate.instagram && (
                        <span className="flex items-center gap-1">
                          <Instagram className="w-4 h-4" />
                          {currentCandidate.instagram}
                        </span>
                      )}
                      {currentCandidate.phone && (
                        <span className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          {currentCandidate.phone}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Swipe Actions */}
                  <div className="flex gap-4 mt-6">
                    <Button 
                      variant="reject" 
                      size="lg" 
                      className="flex-1"
                      onClick={() => handleSwipe("left")}
                    >
                      <X className="w-5 h-5 mr-2" />
                      Pass
                    </Button>
                    <Button 
                      variant="accept" 
                      size="lg" 
                      className="flex-1"
                      onClick={() => handleSwipe("right")}
                    >
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Shortlist
                    </Button>
                  </div>
                </div>

                {/* Card Counter */}
                <p className="text-center text-sm text-muted-foreground mt-4">
                  {currentIndex + 1} of {filteredCandidates.length} candidates
                </p>
              </div>
            ) : (
              <div className="text-center py-20">
                <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="font-display text-2xl font-bold mb-2">No Candidates Found</h2>
                <p className="text-muted-foreground mb-6">
                  No {experienceOptions.find(o => o.value === experienceFilter)?.label.toLowerCase()} candidates match your search
                </p>
                <div className="flex gap-3 justify-center">
                  <Button variant="outline" onClick={() => setSearchQuery("")}>
                    Clear Search
                  </Button>
                  <Button variant="hero" onClick={handleReset}>
                    Try Different Category
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Quick Actions */}
        {shortlisted.length > 0 && (
          <div className="fixed bottom-6 right-6">
            <Button 
              variant="hero" 
              size="lg"
              onClick={() => navigate("/shortlisted")}
              className="shadow-elevated"
            >
              View Shortlist ({shortlisted.length})
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default HRDashboard;
