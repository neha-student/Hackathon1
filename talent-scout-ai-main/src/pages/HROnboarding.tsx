import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Sparkles, Building2, Upload, FileCheck, User, BadgeCheck, ArrowRight, X } from "lucide-react";
import { toast } from "sonner";

const HROnboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    companyName: "",
    roleDescription: "",
    companyId: null as File | null,
    employeeId: null as File | null
  });

  const handleFileUpload = (type: "companyId" | "employeeId", file: File | null) => {
    if (file) {
      // Validate file type
      const validTypes = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
      if (!validTypes.includes(file.type)) {
        toast.error("Please upload a JPG, PNG, WebP or PDF file");
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }
    }
    setFormData({ ...formData, [type]: file });
  };

  const handleSubmit = async () => {
    setLoading(true);

    if (!formData.companyName || !formData.roleDescription) {
      toast.error("Please fill in all company details");
      setLoading(false);
      return;
    }

    if (!formData.companyId) {
      toast.error("Please upload company verification ID");
      setLoading(false);
      return;
    }

    if (!formData.employeeId) {
      toast.error("Please upload your employee ID");
      setLoading(false);
      return;
    }

    // Simulate verification
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success("Verification successful! Welcome to HireMatch");
    navigate("/hr-dashboard");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
      </div>

      <div className="w-full max-w-lg animate-slide-up">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center">
            <Sparkles className="w-7 h-7 text-primary-foreground" />
          </div>
          <span className="font-display text-3xl font-bold gradient-text">HireMatch</span>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-3 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                step >= s 
                  ? "gradient-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground"
              }`}>
                {s}
              </div>
              {s < 3 && (
                <div className={`w-12 h-1 rounded-full transition-all ${
                  step > s ? "gradient-primary" : "bg-muted"
                }`} />
              )}
            </div>
          ))}
        </div>

        <div className="glass rounded-3xl p-8 shadow-elevated">
          {/* Step 1: Company Details */}
          {step === 1 && (
            <div className="animate-slide-up">
              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Building2 className="w-8 h-8 text-primary-foreground" />
              </div>
              <h2 className="font-display text-2xl font-bold text-center mb-2">Company Details</h2>
              <p className="text-muted-foreground text-center text-sm mb-8">
                Tell us about your company
              </p>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Company Name</label>
                  <Input
                    placeholder="e.g., TechCorp Inc."
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Your Role / Job Title</label>
                  <Input
                    placeholder="e.g., HR Manager, Talent Acquisition Lead"
                    value={formData.roleDescription}
                    onChange={(e) => setFormData({ ...formData, roleDescription: e.target.value })}
                  />
                </div>
              </div>

              <Button 
                variant="hero" 
                size="lg" 
                className="w-full mt-8"
                onClick={() => {
                  if (!formData.companyName || !formData.roleDescription) {
                    toast.error("Please fill in all fields");
                    return;
                  }
                  setStep(2);
                }}
              >
                Continue
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          )}

          {/* Step 2: Company Verification */}
          {step === 2 && (
            <div className="animate-slide-up">
              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FileCheck className="w-8 h-8 text-primary-foreground" />
              </div>
              <h2 className="font-display text-2xl font-bold text-center mb-2">Company Verification</h2>
              <p className="text-muted-foreground text-center text-sm mb-8">
                Upload your company's verification document
              </p>

              <div 
                className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer hover:border-primary hover:bg-primary/5 ${
                  formData.companyId ? "border-primary bg-primary/5" : "border-border"
                }`}
                onClick={() => document.getElementById('companyIdInput')?.click()}
              >
                <input
                  id="companyIdInput"
                  type="file"
                  accept="image/*,.pdf"
                  className="hidden"
                  onChange={(e) => handleFileUpload("companyId", e.target.files?.[0] || null)}
                />
                {formData.companyId ? (
                  <div className="flex items-center justify-center gap-3">
                    <BadgeCheck className="w-8 h-8 text-primary" />
                    <div className="text-left">
                      <p className="font-medium">{formData.companyId.name}</p>
                      <p className="text-sm text-muted-foreground">Click to change</p>
                    </div>
                    <button
                      className="ml-2 p-1 hover:bg-destructive/10 rounded-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFormData({ ...formData, companyId: null });
                      }}
                    >
                      <X className="w-4 h-4 text-destructive" />
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                    <p className="font-medium">Upload Company Certificate / Registration</p>
                    <p className="text-sm text-muted-foreground mt-1">JPG, PNG, WebP or PDF (max 5MB)</p>
                  </>
                )}
              </div>

              <div className="flex gap-3 mt-8">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="flex-1"
                  onClick={() => setStep(1)}
                >
                  Back
                </Button>
                <Button 
                  variant="hero" 
                  size="lg" 
                  className="flex-1"
                  onClick={() => {
                    if (!formData.companyId) {
                      toast.error("Please upload company verification document");
                      return;
                    }
                    setStep(3);
                  }}
                >
                  Continue
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Employee ID */}
          {step === 3 && (
            <div className="animate-slide-up">
              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <User className="w-8 h-8 text-primary-foreground" />
              </div>
              <h2 className="font-display text-2xl font-bold text-center mb-2">Employee Verification</h2>
              <p className="text-muted-foreground text-center text-sm mb-8">
                Upload your employee ID card
              </p>

              <div 
                className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer hover:border-primary hover:bg-primary/5 ${
                  formData.employeeId ? "border-primary bg-primary/5" : "border-border"
                }`}
                onClick={() => document.getElementById('employeeIdInput')?.click()}
              >
                <input
                  id="employeeIdInput"
                  type="file"
                  accept="image/*,.pdf"
                  className="hidden"
                  onChange={(e) => handleFileUpload("employeeId", e.target.files?.[0] || null)}
                />
                {formData.employeeId ? (
                  <div className="flex items-center justify-center gap-3">
                    <BadgeCheck className="w-8 h-8 text-primary" />
                    <div className="text-left">
                      <p className="font-medium">{formData.employeeId.name}</p>
                      <p className="text-sm text-muted-foreground">Click to change</p>
                    </div>
                    <button
                      className="ml-2 p-1 hover:bg-destructive/10 rounded-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFormData({ ...formData, employeeId: null });
                      }}
                    >
                      <X className="w-4 h-4 text-destructive" />
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                    <p className="font-medium">Upload Your Employee ID Card</p>
                    <p className="text-sm text-muted-foreground mt-1">JPG, PNG, WebP or PDF (max 5MB)</p>
                  </>
                )}
              </div>

              <div className="flex gap-3 mt-8">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="flex-1"
                  onClick={() => setStep(2)}
                >
                  Back
                </Button>
                <Button 
                  variant="hero" 
                  size="lg" 
                  className="flex-1"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  ) : (
                    <>
                      Complete Setup
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Back Link */}
        <div className="text-center mt-6">
          <button
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => navigate("/select-type")}
          >
            ← Back to Selection
          </button>
        </div>
      </div>
    </div>
  );
};

export default HROnboarding;
