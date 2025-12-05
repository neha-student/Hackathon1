import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { 
  Sparkles, Upload, FileCheck, User, Mail, Phone, 
  Instagram, ArrowRight, X, BadgeCheck, FileText,
  AlertCircle, Search, Building2
} from "lucide-react";
import { toast } from "sonner";

interface Company {
  id: string;
  name: string;
  industry: string;
  openRoles: number;
}

const mockCompanies: Company[] = [
  { id: "1", name: "TechCorp Inc.", industry: "Technology", openRoles: 12 },
  { id: "2", name: "DataDriven AI", industry: "AI/ML", openRoles: 8 },
  { id: "3", name: "CloudScale Solutions", industry: "Cloud Computing", openRoles: 5 },
  { id: "4", name: "FinTech Innovations", industry: "Finance", openRoles: 15 },
  { id: "5", name: "GreenEnergy Labs", industry: "Sustainability", openRoles: 3 },
];

const CandidateProfile = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    instagram: "",
    digilocker: "",
    description: "",
    resume: null as File | null,
    resumeValid: false
  });

  const handleResumeUpload = async (file: File | null) => {
    if (!file) {
      setFormData({ ...formData, resume: null, resumeValid: false });
      return;
    }

    // Validate file type
    const validTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!validTypes.includes(file.type)) {
      toast.error("Please upload a PDF or Word document");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    // Simulate ATS check
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock ATS validation (random for demo)
    const isATSValid = Math.random() > 0.3;
    
    if (isATSValid) {
      setFormData({ ...formData, resume: file, resumeValid: true });
      toast.success("Resume is ATS-friendly!");
    } else {
      setFormData({ ...formData, resume: file, resumeValid: false });
      toast.error("Resume is not ATS-friendly. Please use a standard format without tables, graphics, or fancy formatting.");
    }
    setLoading(false);
  };

  const handleSubmit = async () => {
    setLoading(true);

    if (!formData.name || !formData.email) {
      toast.error("Please fill in required fields");
      setLoading(false);
      return;
    }

    if (!formData.resume || !formData.resumeValid) {
      toast.error("Please upload an ATS-friendly resume");
      setLoading(false);
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success("Profile created successfully!");
    setStep(2);
    setLoading(false);
  };

  const filteredCompanies = mockCompanies.filter(company =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
      </div>

      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 gradient-secondary rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-secondary-foreground" />
            </div>
            <span className="font-display text-2xl font-bold gradient-text">HireMatch</span>
          </div>
          {step === 2 && (
            <Button variant="outline" onClick={() => navigate("/take-test")}>
              My Tests
            </Button>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {step === 1 ? (
          <div className="max-w-lg mx-auto animate-slide-up">
            <div className="text-center mb-8">
              <h1 className="font-display text-3xl font-bold mb-2">
                Create Your <span className="gradient-text">Profile</span>
              </h1>
              <p className="text-muted-foreground">
                Let companies discover your talent
              </p>
            </div>

            <div className="glass rounded-3xl p-8 shadow-elevated">
              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Full Name <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      placeholder="Your full name"
                      className="pl-12"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Email <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      className="pl-12"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="tel"
                      placeholder="+91 98765 43210"
                      className="pl-12"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                {/* Instagram */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Instagram Handle</label>
                  <div className="relative">
                    <Instagram className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      placeholder="@yourusername"
                      className="pl-12"
                      value={formData.instagram}
                      onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                    />
                  </div>
                </div>

                {/* DigiLocker */}
                <div>
                  <label className="text-sm font-medium mb-2 block">DigiLocker ID</label>
                  <div className="relative">
                    <FileCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      placeholder="Your DigiLocker ID"
                      className="pl-12"
                      value={formData.digilocker}
                      onChange={(e) => setFormData({ ...formData, digilocker: e.target.value })}
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="text-sm font-medium mb-2 block">About You</label>
                  <textarea
                    placeholder="Tell us about yourself, your skills, and what you're looking for..."
                    className="flex min-h-[120px] w-full rounded-xl border-2 border-input bg-card px-4 py-3 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 resize-none"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                {/* Resume Upload */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Resume <span className="text-destructive">*</span>
                    <span className="text-muted-foreground font-normal ml-1">(ATS-friendly required)</span>
                  </label>
                  <div 
                    className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer hover:border-secondary hover:bg-secondary/5 ${
                      formData.resume 
                        ? formData.resumeValid 
                          ? "border-primary bg-primary/5" 
                          : "border-destructive bg-destructive/5"
                        : "border-border"
                    }`}
                    onClick={() => !loading && document.getElementById('resumeInput')?.click()}
                  >
                    <input
                      id="resumeInput"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={(e) => handleResumeUpload(e.target.files?.[0] || null)}
                    />
                    {loading ? (
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 border-2 border-secondary/30 border-t-secondary rounded-full animate-spin mb-2" />
                        <p className="text-sm text-muted-foreground">Checking ATS compatibility...</p>
                      </div>
                    ) : formData.resume ? (
                      <div className="flex items-center justify-center gap-3">
                        {formData.resumeValid ? (
                          <BadgeCheck className="w-8 h-8 text-primary" />
                        ) : (
                          <AlertCircle className="w-8 h-8 text-destructive" />
                        )}
                        <div className="text-left">
                          <p className="font-medium">{formData.resume.name}</p>
                          <p className={`text-sm ${formData.resumeValid ? "text-primary" : "text-destructive"}`}>
                            {formData.resumeValid ? "ATS-friendly ✓" : "Not ATS-friendly ✗"}
                          </p>
                        </div>
                        <button
                          className="ml-2 p-1 hover:bg-destructive/10 rounded-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            setFormData({ ...formData, resume: null, resumeValid: false });
                          }}
                        >
                          <X className="w-4 h-4 text-destructive" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <FileText className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                        <p className="font-medium">Upload Your Resume</p>
                        <p className="text-sm text-muted-foreground mt-1">PDF or Word (max 5MB)</p>
                      </>
                    )}
                  </div>
                  {formData.resume && !formData.resumeValid && (
                    <p className="text-xs text-destructive mt-2 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      Use a simple format without tables, graphics, or columns
                    </p>
                  )}
                </div>

                <Button
                  variant="coral"
                  size="lg"
                  className="w-full mt-6"
                  onClick={handleSubmit}
                  disabled={loading || !formData.resumeValid}
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-secondary-foreground/30 border-t-secondary-foreground rounded-full animate-spin" />
                  ) : (
                    <>
                      Create Profile
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </Button>
              </div>
            </div>

            <div className="text-center mt-6">
              <button
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => navigate("/select-type")}
              >
                ← Back to Selection
              </button>
            </div>
          </div>
        ) : (
          /* Company Search View */
          <div className="max-w-2xl mx-auto animate-slide-up">
            <div className="text-center mb-8">
              <h1 className="font-display text-3xl font-bold mb-2">
                Discover <span className="gradient-text">Companies</span>
              </h1>
              <p className="text-muted-foreground">
                Find your dream company and apply
              </p>
            </div>

            {/* Search */}
            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search companies by name or industry..."
                className="pl-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Company List */}
            <div className="space-y-4">
              {filteredCompanies.map((company) => (
                <div 
                  key={company.id}
                  className="glass rounded-2xl p-6 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 gradient-primary rounded-xl flex items-center justify-center">
                        <Building2 className="w-7 h-7 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-bold">{company.name}</h3>
                        <p className="text-sm text-muted-foreground">{company.industry}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                        {company.openRoles} Open Roles
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredCompanies.length === 0 && (
              <div className="text-center py-12">
                <Building2 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No companies found</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default CandidateProfile;
