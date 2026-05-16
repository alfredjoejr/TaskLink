import { AnimatePresence, motion } from 'motion/react';
import { AlertCircle, AlertTriangle, ArrowLeft, Briefcase, Calendar, CheckCircle2, ChevronRight, Clock, Edit2, FileText, LayoutDashboard, LogOut, Mail, MapPin, Menu, PlusCircle, Save, Search, Settings, Shield, Smartphone, Star, UploadCloud, User, X, Zap, Mic, Square, Type, Image as ImageIcon, XCircle, CreditCard, Lock, CheckCircle, MessageSquare, Phone, ArrowRight, Camera, Navigation, UserPlus, Users, BarChart2, Download, Receipt, Target, FileWarning, Check } from 'lucide-react';
import React, { ReactNode, useState, useRef, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Reusable Glass Card Component
function GlassCard({ children, className = "", ...props }: { children: ReactNode; className?: string } & React.HTMLAttributes<HTMLDivElement>) {
  const isOverflowHidden = !className.includes('overflow-') ? 'overflow-hidden' : '';
  return (
    <div className={`bg-white/40 backdrop-blur-2xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-3xl ${isOverflowHidden} ${className}`} {...props}>
      {children}
    </div>
  );
}

// Mock Data for Direct Hire
const DIRECT_HIRE_PROVIDERS = [
  { id: 1, name: 'Saman Kumara', avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Saman', skill: 'Expert Electrician', rating: 4.9, jobs: 142, experience: 8, snippet: 'Specialized in residential wiring and fault finding.', availableNow: true },
  { id: 2, name: 'Nimalsiri', avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Nimal', skill: 'Master Plumber', rating: 4.8, jobs: 89, experience: 12, snippet: 'Pipe repairs, bathroom installations, and leak detection.', availableNow: false },
  { id: 3, name: 'Kamal Perera', avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Kamal', skill: 'Professional Painter', rating: 4.5, jobs: 64, experience: 5, snippet: 'Interior and exterior painting, wood polishing.', availableNow: true },
  { id: 4, name: 'Siriwardena', avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Siri', skill: 'Masonry Specialist', rating: 4.7, jobs: 210, experience: 15, snippet: 'Bricklaying, concrete work, and tiling expert.', availableNow: true },
  { id: 5, name: 'Ravi', avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Ravi', skill: 'Carpenter', rating: 4.6, jobs: 45, experience: 4, snippet: 'Custom furniture, door/window frame repairs.', availableNow: false },
  { id: 6, name: 'Sunil', avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Sunil', skill: 'Expert Cleaner', rating: 4.9, jobs: 312, experience: 6, snippet: 'Deep cleaning, post-construction cleanup.', availableNow: true },
];

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'signup' | 'login' | 'forgotPassword' | 'customerDashboard' | 'providerDashboard' | 'userProfile' | 'settings' | 'postTask' | 'directHireList' | 'directHireBooking' | 'paymentGateway' | 'taskTracking' | 'providerPendingVerification' | 'providerActiveWorkspace' | 'supervisorDashboard' | 'supervisorActiveWorkspace' | 'hrDashboard' | 'financeDashboard'>('home');
  const [selectedProviderForHire, setSelectedProviderForHire] = useState<any>(null);
  const [currentUserRole, setCurrentUserRole] = useState<'client' | 'provider' | 'supervisor' | 'hr' | 'finance' | null>(null);
  
  const [paymentContext, setPaymentContext] = useState<{type: 'directHire' | 'broadcast', provider?: any} | null>(null);
  const [trackingTask, setTrackingTask] = useState<any>(null);
  const [activeWorkspaceJob, setActiveWorkspaceJob] = useState<any>(null);
  const [providerMilestoneIndex, setProviderMilestoneIndex] = useState(3);
  const [isReportIssueModalOpen, setIsReportIssueModalOpen] = useState(false);
  const [issueDescription, setIssueDescription] = useState('');
  
  // Supervisor States
  const [supervisorActiveTab, setSupervisorActiveTab] = useState<'assigned' | 'completed' | 'escalated'>('assigned');
  const [supervisorSelectedJob, setSupervisorSelectedJob] = useState<any>(null);
  const [supervisorAssessmentNotes, setSupervisorAssessmentNotes] = useState('');
  const [supervisorEvidences, setSupervisorEvidences] = useState<string[]>([]);
  const [isSupervisorEscalateModalOpen, setIsSupervisorEscalateModalOpen] = useState(false);
  const [supervisorEscalateDescription, setSupervisorEscalateDescription] = useState('');
  
  // HR States
  const [hrActiveTab, setHrActiveTab] = useState<'onboarding' | 'directory' | 'analytics'>('onboarding');
  const [hrSearchQuery, setHrSearchQuery] = useState('');
  const [hrTradeFilter, setHrTradeFilter] = useState('All Trades');
  const [hrExperienceFilter, setHrExperienceFilter] = useState('All');
  const [hrSelectedApplicant, setHrSelectedApplicant] = useState<any>(null);
  const [isHrRejectModalOpen, setIsHrRejectModalOpen] = useState(false);
  const [hrRejectReason, setHrRejectReason] = useState('');
  const [isHrApplicationDrawerOpen, setIsHrApplicationDrawerOpen] = useState(false);
  const [hrSelectedLaborerLog, setHrSelectedLaborerLog] = useState<any>(null);
  const [isHrLogModalOpen, setIsHrLogModalOpen] = useState(false);
  
  // Finance States
  const [financeActiveTab, setFinanceActiveTab] = useState<'ledger' | 'reconciliation' | 'analytics'>('ledger');
  const [financeSelectedDateRange, setFinanceSelectedDateRange] = useState('This Month');
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [financeSelectedTransaction, setFinanceSelectedTransaction] = useState<any>(null);

  const [isPostTaskOptionsOpen, setIsPostTaskOptionsOpen] = useState(false);
  const [completedTasksCount, setCompletedTasksCount] = useState(12);
  const [milestoneIndex, setMilestoneIndex] = useState(0);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (currentPage === 'taskTracking' && trackingTask && milestoneIndex < 5 && !isFeedbackModalOpen) {
      timer = setTimeout(() => {
        setMilestoneIndex(prev => prev + 1);
      }, 5000);
    } else if (currentPage === 'taskTracking' && milestoneIndex === 5 && !isFeedbackModalOpen) {
      timer = setTimeout(() => {
        setIsFeedbackModalOpen(true);
      }, 1500);
    } else if (currentPage === 'providerActiveWorkspace' && providerMilestoneIndex === 4) {
      timer = setTimeout(() => {
        setProviderMilestoneIndex(5);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [currentPage, trackingTask, milestoneIndex, isFeedbackModalOpen, providerMilestoneIndex]);

  const [isProviderOnline, setIsProviderOnline] = useState(false);
  const [incomingJobAlert, setIncomingJobAlert] = useState<any>(null);
  const [jobAlertCountdown, setJobAlertCountdown] = useState(30);
  const [providerJobFeed, setProviderJobFeed] = useState([
    {
      id: 'job-1',
      title: 'Deep clean 2-bedroom apt',
      category: 'Cleaning',
      description: 'Looking for a thorough deep clean including windows and carpet vacuuming. Must bring own supplies if possible, let me know.',
      voiceNote: 'Basically, please make sure the kitchen grease is totally cleaned, I had a small fire yesterday. The rest is standard vacuuming.',
      distance: '2.4 km away',
      neighborhood: 'Colombo 05',
      budget: 8000,
      isNegotiable: true,
      photos: ['https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=200&q=80', 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=200&q=80']
    },
    {
      id: 'job-2',
      title: 'Fix Leaking Pipe under Sink',
      category: 'Plumbing',
      description: 'Water is dripping from the U-bend under the kitchen sink. Need someone to fix it ASAP. I have no tools.',
      voiceNote: null,
      distance: '1.2 km away',
      neighborhood: 'Kollupitiya',
      budget: 3500,
      isNegotiable: false,
      photos: []
    }
  ]);

  // Simulate an incoming job when going online
  const beepAudioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    let alertTimer: NodeJS.Timeout;
    let countdownInterval: NodeJS.Timeout;

    if (isProviderOnline && currentUserRole === 'provider' && currentPage === 'providerDashboard' && !incomingJobAlert) {
      alertTimer = setTimeout(() => {
        setIncomingJobAlert({
          id: 'job-new-' + Date.now(),
          title: 'Emergency: AC Unit Not Cooling',
          category: 'HVAC / Electrical',
          description: 'My living room AC unit is blowing warm air and making a strange rattling sound. Need someone to check and repair urgently as we are hosting a party tonight.',
          voiceNote: null,
          distance: '3.1 km away',
          neighborhood: 'Nugegoda',
          budget: 6000,
          isNegotiable: true,
          photos: []
        });
        setJobAlertCountdown(30);
        // Simulate playing an audio ping
        if (beepAudioRef.current) {
          beepAudioRef.current.play().catch(() => {});
        }
      }, 6000); // Trigger 6 seconds after going online
    }

    if (incomingJobAlert) {
      countdownInterval = setInterval(() => {
        setJobAlertCountdown(prev => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            setIncomingJobAlert(null); // Dismiss if missed
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      clearTimeout(alertTimer);
      clearInterval(countdownInterval);
    };
  }, [isProviderOnline, currentUserRole, currentPage, incomingJobAlert]);

  const [dhCategory, setDhCategory] = useState('all');
  const [dhLocationRadius, setDhLocationRadius] = useState(10);
  const [dhMinRating, setDhMinRating] = useState(0);
  const [dhMinExperience, setDhMinExperience] = useState(0);
  const [dhAvailableOnly, setDhAvailableOnly] = useState(false);

  // Filter providers
  const filteredProviders = DIRECT_HIRE_PROVIDERS.filter(p => {
    if (dhAvailableOnly && !p.availableNow) return false;
    if (dhMinRating > 0 && p.rating < dhMinRating) return false;
    if (dhMinExperience > 0 && p.experience < dhMinExperience) return false;
    // Simplified category checking based on keywords
    if (dhCategory !== 'all') {
      const isMatch = p.skill.toLowerCase().includes(dhCategory);
      if (!isMatch) return false;
    }
    return true;
  });

  // Signup State
  const [role, setRole] = useState<'client' | 'provider'>('client');

  // Input refs for clicking the hidden file input
  const idInputRef = useRef<HTMLInputElement>(null);
  const permitInputRef = useRef<HTMLInputElement>(null);

  // Login State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(false);
    
    if (loginEmail === 'a@m.com' && loginPassword === '123') {
      setCurrentUserRole('client');
      setProfileData({
        firstName: 'Alice',
        lastName: 'M.',
        email: 'a@m.com',
        phone: '+1 234 567 8900',
        dob: '',
        location: '',
        bio: 'Looking for reliable professionals to help with household tasks.',
      });
      setCurrentPage('customerDashboard');
      setLoginEmail('');
      setLoginPassword('');
    } else if (loginEmail === 'b@m.com' && loginPassword === '123') {
      setCurrentUserRole('provider');
      setProfileData({
        firstName: 'Bob',
        lastName: 'K.',
        email: 'b@m.com',
        phone: '+1 987 654 3210',
        dob: '',
        location: '',
        bio: 'Experienced provider ready to get the work done efficiently and with quality.',
      });
      setCurrentPage('providerDashboard');
      setLoginEmail('');
      setLoginPassword('');
    } else if (loginEmail === 'c@m.com' && loginPassword === '123') {
      setCurrentUserRole('supervisor');
      setProfileData({
        firstName: 'Charlie',
        lastName: 'S.',
        email: 'c@m.com',
        phone: '+94 77 123 4567',
        dob: '',
        location: '',
        bio: 'Field Supervisor.',
      });
      setCurrentPage('supervisorDashboard');
      setLoginEmail('');
      setLoginPassword('');
    } else if (loginEmail === 'd@m.com' && loginPassword === '123') {
      setCurrentUserRole('hr');
      setProfileData({
        firstName: 'David',
        lastName: 'H.',
        email: 'd@m.com',
        phone: '+94 77 987 6543',
        dob: '',
        location: '',
        bio: 'HR Administration Officer.',
      });
      setCurrentPage('hrDashboard');
      setLoginEmail('');
      setLoginPassword('');
    } else if (loginEmail === 'e@m.com' && loginPassword === '123') {
      setCurrentUserRole('finance');
      setProfileData({
        firstName: 'Emma',
        lastName: 'W.',
        email: 'e@m.com',
        phone: '+94 77 111 2222',
        dob: '',
        location: '',
        bio: 'Financial Controller.',
      });
      setCurrentPage('financeDashboard');
      setLoginEmail('');
      setLoginPassword('');
    } else {
      setLoginError(true);
    }
  };

  // Forgot Password State
  const [resetEmail, setResetEmail] = useState('');
  const [resetStatus, setResetStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResetStatus('idle');
    
    if (!resetEmail.trim()) {
      setResetStatus('error');
      return;
    }
    
    // Simple frontend logic check for demonstration
    if (resetEmail.includes('@') && resetEmail.endsWith('.com')) {
      setResetStatus('success');
    } else {
      setResetStatus('error');
    }
  };

  // User Profile State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'Alice',
    lastName: 'M.',
    email: 'a@m.com',
    phone: '+1 234 567 8900',
    dob: '',
    location: '',
    bio: 'Looking for reliable professionals to help with household tasks.',
  });

  // Settings State
  const [is2FAActive, setIs2FAActive] = useState(false);
  const [is2FASetupModalOpen, setIs2FASetupModalOpen] = useState(false);
  const [twoFaCode, setTwoFaCode] = useState('');
  const [twoFaSetupStatus, setTwoFaSetupStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);
  const [deactivatePassword, setDeactivatePassword] = useState('');
  const [deactivate2FaCode, setDeactivate2FaCode] = useState('');

  const [settingsEmail, setSettingsEmail] = useState('a@m.com');
  const [isEmailVerified, setIsEmailVerified] = useState(true);
  const [newEmailInput, setNewEmailInput] = useState('');
  const [emailUpdateMessage, setEmailUpdateMessage] = useState('');

  // Post Task State
  const [taskLocation, setTaskLocation] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [taskTime, setTaskTime] = useState('');
  const [taskBudget, setTaskBudget] = useState('');
  const [isNegotiable, setIsNegotiable] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskCategory, setTaskCategory] = useState('cleaning');

  // Voice recording & photos state
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [taskPhotos, setTaskPhotos] = useState<string[]>([]);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    recordingIntervalRef.current = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (recordingIntervalRef.current) clearInterval(recordingIntervalRef.current);
    // Simulate AI transcription
    setTaskDescription(prev => prev + (prev ? " " : "") + "Transcribed text from voice recording...");
    setIsVoiceMode(false);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files) as File[];
      const remainingSlots = 5 - taskPhotos.length;
      const filesToAdd = filesArray.slice(0, remainingSlots);
      
      const newPhotos = filesToAdd.map(file => URL.createObjectURL(file));
      setTaskPhotos(prev => [...prev, ...newPhotos]);
    }
  };

  const removePhoto = (index: number) => {
    setTaskPhotos(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="relative min-h-screen overflow-hidden font-sans">
      {/* Animated Ambient Background Blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-300/40 blur-[120px] mix-blend-multiply"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, -90, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-blue-300/40 blur-[120px] mix-blend-multiply"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 45, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-20%] left-[10%] w-[70%] h-[70%] rounded-full bg-pink-300/40 blur-[120px] mix-blend-multiply"
        />
      </div>

      {/* Navigation */}
      {(currentPage !== 'hrDashboard' && currentPage !== 'financeDashboard') && (
      <nav className={`fixed top-0 w-full z-50 px-6 ${currentUserRole === 'supervisor' ? 'py-2' : 'py-4'}`}>
        <GlassCard className={`max-w-7xl mx-auto px-6 ${currentUserRole === 'supervisor' && currentPage === 'supervisorDashboard' ? 'rounded-[2rem] py-3 flex flex-col gap-3' : 'py-3 flex items-center justify-between rounded-full overflow-visible'} bg-white/50`}>
          <div className="flex items-center justify-between w-full">
            <div 
              className="flex items-center gap-2 cursor-pointer group shrink-0"
              onClick={() => setCurrentPage('home')}
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="hidden sm:block font-semibold text-xl tracking-tight text-slate-800">TaskLink</span>
              {currentUserRole === 'supervisor' && (
                <div className="flex items-center ml-1">
                  <span className="text-sm font-bold text-slate-900 leading-tight hidden sm:block mr-2">{profileData.firstName} {profileData.lastName}</span>
                  <span className="text-[10px] font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded items-center gap-1 uppercase flex whitespace-nowrap">
                    <Shield className="w-3 h-3" /> SV-4592
                  </span>
                </div>
              )}
            </div>

            {(currentUserRole !== null && currentPage !== 'home' && currentPage !== 'login' && currentPage !== 'signup' && currentPage !== 'forgotPassword') ? (
              <div className="flex items-center gap-4 relative">
                {currentUserRole === 'provider' && (
                <button
                  onClick={() => setIsProviderOnline(!isProviderOnline)}
                  className={`flex text-sm font-semibold items-center gap-2 px-3 py-1.5 rounded-full transition-all border shadow-sm cursor-pointer ${isProviderOnline ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
                >
                  <div className={`w-2.5 h-2.5 rounded-full ${isProviderOnline ? 'bg-green-500 animate-pulse' : 'bg-slate-300'}`}></div>
                  <span className="hidden sm:inline">{isProviderOnline ? 'Go Offline' : 'Go Online'}</span>
                  <span className="sm:hidden">{isProviderOnline ? 'Online' : 'Offline'}</span>
                </button>
              )}
            
              <div className="hidden md:flex items-center gap-4 relative">
              {currentUserRole === 'client' && (
                <button 
                  onClick={() => setIsPostTaskOptionsOpen(true)}
                  className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 flex items-center gap-2 px-4 py-2 rounded-xl transition-all"
                >
                  <PlusCircle className="w-4 h-4" />
                  Post a Task
                </button>
              )}
              <div 
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 overflow-hidden border-2 border-white shadow-sm flex items-center justify-center cursor-pointer hover:shadow-md transition-shadow"
              >
                <span className="text-indigo-600 font-bold text-sm">{profileData.firstName[0]}</span>
              </div>

              <AnimatePresence>
                {isProfileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-14 right-0 w-64 z-50 shadow-xl"
                  >
                    <div className="p-4 flex flex-col items-center shadow-xl border border-slate-200 bg-white rounded-3xl">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 border-4 border-white shadow-sm flex items-center justify-center mb-3">
                        <span className="text-indigo-600 font-bold text-2xl">{profileData.firstName[0]}</span>
                      </div>
                      <h2 className="text-base font-bold text-slate-900 mx-auto text-center">{profileData.firstName} {profileData.lastName}</h2>
                      <p className="text-xs text-slate-500 mb-4 mx-auto text-center">{profileData.email}</p>
                      
                      <div className="flex flex-col gap-1 w-full">
                        <button 
                          onClick={() => {
                            setCurrentPage(currentUserRole === 'provider' ? 'providerDashboard' : currentUserRole === 'supervisor' ? 'supervisorDashboard' : currentUserRole === 'hr' ? 'hrDashboard' : currentUserRole === 'finance' ? 'financeDashboard' : 'customerDashboard');
                            setIsProfileMenuOpen(false);
                          }}
                          className="flex items-center gap-3 px-3 py-2 rounded-xl text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 font-medium transition-colors text-sm w-full text-left"
                        >
                          <LayoutDashboard className="w-4 h-4" />
                          Dashboard
                        </button>
                        <button 
                          onClick={() => {
                            setCurrentPage('userProfile');
                            setIsProfileMenuOpen(false);
                          }}
                          className="flex items-center gap-3 px-3 py-2 rounded-xl text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 font-medium transition-colors text-sm w-full text-left"
                        >
                          <User className="w-4 h-4" />
                          User Profile
                        </button>
                        <button 
                          onClick={() => {
                            setCurrentPage('settings');
                            setIsProfileMenuOpen(false);
                          }}
                          className="flex items-center gap-3 px-3 py-2 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium transition-colors text-sm w-full text-left"
                        >
                          <Settings className="w-4 h-4" />
                          Settings
                        </button>
                      </div>
                      
                      <div className="mt-3 pt-3 border-t border-slate-200 w-full mb-1">
                        <button 
                          onClick={() => {
                            setCurrentUserRole(null);
                            setCurrentPage('home');
                            setIsProfileMenuOpen(false);
                          }}
                          className="flex items-center justify-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-xl font-medium transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Log out
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <button 
                onClick={() => setCurrentPage('login')}
                className="text-sm font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-100/50 px-4 py-2 rounded-xl transition-all"
              >
                Log in
              </button>
              <button 
                onClick={() => setCurrentPage('signup')}
                className="text-sm font-semibold text-white bg-slate-900 hover:bg-indigo-600 px-5 py-2.5 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20 active:scale-95 ml-2"
              >
                Sign up
              </button>
            </div>
          )}

          <button 
            className="md:hidden p-2 text-slate-600 hover:text-indigo-600 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          </div>

          {currentUserRole === 'supervisor' && currentPage === 'supervisorDashboard' && (
            <div className="w-full flex gap-2 overflow-x-auto no-scrollbar pb-1 pt-2 border-t border-slate-200/50">
              <button 
                onClick={() => setSupervisorActiveTab('assigned')}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${supervisorActiveTab === 'assigned' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                Assigned Trips
              </button>
              <button 
                onClick={() => setSupervisorActiveTab('completed')}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${supervisorActiveTab === 'completed' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                Completed Audits
              </button>
              <button 
                onClick={() => setSupervisorActiveTab('escalated')}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${supervisorActiveTab === 'escalated' ? 'bg-red-600 text-white shadow-md shadow-red-600/20' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                Escalated Disputes
              </button>
            </div>
          )}

        </GlassCard>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="md:hidden absolute top-20 left-6 right-6 z-40"
            >
              <div className="p-4 flex flex-col gap-2 rounded-3xl shadow-xl border border-slate-200 bg-white">
                {(currentUserRole !== null && currentPage !== 'home' && currentPage !== 'login' && currentPage !== 'signup' && currentPage !== 'forgotPassword') ? (
                  <>
                    <button 
                      onClick={() => {
                        setCurrentPage(currentUserRole === 'provider' ? 'providerDashboard' : currentUserRole === 'supervisor' ? 'supervisorDashboard' : currentUserRole === 'hr' ? 'hrDashboard' : currentUserRole === 'finance' ? 'financeDashboard' : 'customerDashboard');
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-sm font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-100/50 w-full py-3 rounded-xl transition-all text-center flex items-center justify-center gap-2"
                    >
                      <LayoutDashboard className="w-4 h-4" /> Dashboard
                    </button>
                    <button 
                      onClick={() => {
                        setCurrentPage('userProfile');
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-sm font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-100/50 w-full py-3 rounded-xl transition-all text-center flex items-center justify-center gap-2"
                    >
                      <User className="w-4 h-4" /> User Profile
                    </button>
                    {currentUserRole === 'client' && (
                      <button 
                        onClick={() => {
                          setIsPostTaskOptionsOpen(true);
                          setIsMobileMenuOpen(false);
                        }}
                        className="text-sm font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-100/50 w-full py-3 rounded-xl transition-all text-center flex items-center justify-center gap-2"
                      >
                        <PlusCircle className="w-4 h-4" /> Post a Task
                      </button>
                    )}
                    <button 
                      onClick={() => {
                        setCurrentPage('settings');
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-sm font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-100/50 w-full py-3 rounded-xl transition-all text-center flex items-center justify-center gap-2"
                    >
                      <Settings className="w-4 h-4" /> Settings
                    </button>
                    <button 
                      onClick={() => {
                        setCurrentUserRole(null);
                        setCurrentPage('home');
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-sm font-medium text-red-600 hover:bg-red-50 w-full py-3 rounded-xl transition-all text-center flex items-center justify-center gap-2"
                    >
                      <LogOut className="w-4 h-4" /> Log out
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={() => {
                        setCurrentPage('login');
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-sm font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-100/50 w-full py-3 rounded-xl transition-all text-center"
                    >
                      Log in
                    </button>
                    <button 
                      onClick={() => {
                        setCurrentPage('signup');
                        setIsMobileMenuOpen(false);
                      }}
                      className="text-sm font-semibold text-white bg-slate-900 hover:bg-indigo-600 w-full py-3 rounded-xl transition-all duration-300 hover:shadow-lg shadow-indigo-500/20 active:scale-95 text-center"
                    >
                      Sign up
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      )}

      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        {currentPage === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {/* Main Hero Section */}
            <main className="relative z-10 max-w-7xl mx-auto px-6 pt-40 pb-24 md:pt-48 lg:pt-56 flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="text-center max-w-3xl mx-auto mb-16"
              >
                <span className="inline-block py-1.5 px-4 rounded-full bg-white/40 border border-white/50 backdrop-blur-md text-sm font-medium text-indigo-700 mb-6 shadow-sm">
                  ✨ The new standard for everyday services
                </span>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-slate-900 mb-6 leading-[1.1]">
                  Your life, simplified. <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                    Your skills, amplified.
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-slate-600 font-medium max-w-2xl mx-auto">
                  Find trusted professionals for any task, or offer your expertise on your own terms. The smartest way to get work done.
                </p>
              </motion.div>

              {/* The Two Sides: Client & Provider */}
              <div className="grid md:grid-cols-2 gap-6 w-full max-w-5xl">
                {/* Client Action */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                  whileHover={{ y: -5 }}
                  className="group"
                  onClick={() => {
                    setRole('client');
                    setCurrentPage('signup');
                  }}
                >
                  <GlassCard className="p-8 md:p-10 h-full flex flex-col cursor-pointer transition-all duration-300 hover:shadow-2xl hover:bg-white/60">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-100 to-indigo-50 flex items-center justify-center mb-6 border border-indigo-100 shadow-inner group-hover:scale-110 transition-transform duration-300">
                      <Search className="w-6 h-6 text-indigo-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-3">Get things done</h2>
                    <p className="text-slate-600 mb-8 flex-grow">
                      Hire top-rated locals for tasks, home services, deliveries, and more. Transparent pricing and secure payments.
                    </p>
                    <div className="flex items-center text-sm font-semibold text-indigo-600 group-hover:text-indigo-700">
                      Request a service
                      <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </GlassCard>
                </motion.div>

                {/* Provider Action */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                  whileHover={{ y: -5 }}
                  className="group"
                  onClick={() => {
                    setRole('provider');
                    setCurrentPage('signup');
                  }}
                >
                  <GlassCard className="p-8 md:p-10 h-full flex flex-col cursor-pointer transition-all duration-300 hover:shadow-2xl hover:bg-white/60">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-100 to-pink-50 flex items-center justify-center mb-6 border border-purple-100 shadow-inner group-hover:scale-110 transition-transform duration-300">
                      <Briefcase className="w-6 h-6 text-purple-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-3">Earn on your terms</h2>
                    <p className="text-slate-600 mb-8 flex-grow">
                      Turn your free time into earnings. Accept requests that fit your schedule, build your reputation, and get paid fast.
                    </p>
                    <div className="flex items-center text-sm font-semibold text-purple-600 group-hover:text-purple-700">
                      Become a provider
                      <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </GlassCard>
                </motion.div>
              </div>
            </main>

            {/* Trust Elements Section */}
            <section className="relative z-10 max-w-7xl mx-auto px-6 pb-32">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <p className="text-center text-sm font-medium text-slate-500 uppercase tracking-widest mb-10">Why millions trust TaskLink</p>
                
                <div className="grid md:grid-cols-3 gap-8">
                  <GlassCard className="p-6 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                      <Shield className="w-5 h-5 text-slate-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">Vetted Professionals</h3>
                      <p className="text-sm text-slate-600">Every provider passes rigorous background checks and quality standards before joining.</p>
                    </div>
                  </GlassCard>
                  
                  <GlassCard className="p-6 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                      <Star className="w-5 h-5 text-slate-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">Guaranteed Quality</h3>
                      <p className="text-sm text-slate-600">Our platform ensures you're satisfied with the work or your money is fully refunded.</p>
                    </div>
                  </GlassCard>

                  <GlassCard className="p-6 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                      <Zap className="w-5 h-5 text-slate-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">Instant Matching</h3>
                      <p className="text-sm text-slate-600">Our smart algorithm connects you with the perfect provider in seconds, not days.</p>
                    </div>
                  </GlassCard>
                </div>
              </motion.div>
            </section>
          </motion.div>
        )}

        {currentPage === 'signup' && (
          <motion.main
            key="signup"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 max-w-xl mx-auto px-6 pt-32 pb-24 flex justify-center w-full min-h-screen"
          >
            <GlassCard className="w-full p-8 md:p-10 h-fit bg-white/50">
              <button 
                onClick={() => setCurrentPage('home')}
                className="flex items-center text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors mb-8 group"
              >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to home
              </button>
              
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Create an account</h1>
              <p className="text-slate-600 mb-8 text-sm">Join TaskLink today. It takes less than a minute.</p>

              <div className="flex bg-slate-200/50 p-1.5 rounded-2xl mb-8">
                <button 
                  onClick={() => setRole('client')}
                  className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all ${role === 'client' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  I'm a Client
                </button>
                <button 
                  onClick={() => setRole('provider')}
                  className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all ${role === 'provider' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  I'm a Provider
                </button>
              </div>

              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Email address</label>
                  <input 
                    type="email" 
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 bg-white/70 border border-white/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-white text-slate-900 shadow-sm transition-all placeholder:text-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    className="w-full px-4 py-3 bg-white/70 border border-white/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-white text-slate-900 shadow-sm transition-all placeholder:text-slate-400"
                  />
                </div>

                <AnimatePresence>
                  {role === 'provider' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginTop: 20 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      className="overflow-hidden space-y-5"
                    >
                      <div className="pt-4 border-t border-slate-200/60">
                        <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">Personal Information</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                            <input 
                              type="text" 
                              placeholder="John Doe"
                              className="w-full px-4 py-3 bg-white/70 border border-white/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-white text-slate-900 shadow-sm transition-all placeholder:text-slate-400"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Mobile Number</label>
                            <div className="flex gap-2">
                              <input 
                                type="tel" 
                                placeholder="+94 7X XXX XXXX"
                                className="w-full px-4 py-3 bg-white/70 border border-white/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-white text-slate-900 shadow-sm transition-all placeholder:text-slate-400"
                              />
                              <button type="button" className="shrink-0 px-4 py-3 bg-indigo-50 text-indigo-700 font-bold rounded-2xl hover:bg-indigo-100 transition-colors border border-indigo-100">
                                Send OTP
                              </button>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Permanent Address</label>
                            <textarea 
                              rows={2}
                              placeholder="Enter your full address"
                              className="w-full px-4 py-3 bg-white/70 border border-white/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-white text-slate-900 shadow-sm transition-all placeholder:text-slate-400 resize-none"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Profile Avatar</label>
                            <div className="flex items-center gap-4">
                              <div className="w-16 h-16 rounded-full bg-slate-200 border-2 border-white shadow-sm flex items-center justify-center text-slate-400 shrink-0 overflow-hidden">
                                <User className="w-8 h-8" />
                              </div>
                              <button type="button" className="px-4 py-2 bg-white text-sm font-semibold border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm">
                                Upload Photo
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-200/60">
                        <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">Professional Details</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Trade Category</label>
                            <select className="w-full px-4 py-3 bg-white/70 border border-white/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-white text-slate-900 shadow-sm transition-all">
                              <option value="">Select your profession...</option>
                              <option value="mason">Masons</option>
                              <option value="carpenter">Carpenters</option>
                              <option value="electrician">Electricians</option>
                              <option value="plumber">Plumbers</option>
                              <option value="painter">Painters</option>
                              <option value="cleaner">Cleaners</option>
                              <option value="allied">Allied Trades</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Years of Experience</label>
                            <input 
                              type="number" 
                              min="0"
                              placeholder="e.g. 5"
                              className="w-full px-4 py-3 bg-white/70 border border-white/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-white text-slate-900 shadow-sm transition-all placeholder:text-slate-400"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-200/60">
                        <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">Verification Documents</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">National Identity Card (NIC) Number</label>
                            <input 
                              type="text" 
                              placeholder="123456789v or 199012345678"
                              className="w-full px-4 py-3 bg-white/70 border border-white/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:bg-white text-slate-900 shadow-sm transition-all placeholder:text-slate-400"
                            />
                          </div>
                          {/* ID Card Upload */}
                          <div>
                            <label className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
                              <span>NIC / Passport Photo</span>
                              <span className="text-indigo-600 font-medium normal-case">Required*</span>
                            </label>
                            <input type="file" ref={idInputRef} className="hidden" accept="image/*" />
                            <div 
                              onClick={() => idInputRef.current?.click()}
                              className="w-full px-4 py-6 border-2 border-dashed border-indigo-200 hover:border-indigo-400 rounded-2xl bg-indigo-50/30 hover:bg-indigo-50/50 flex flex-col items-center justify-center cursor-pointer transition-all group"
                            >
                              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                <FileText className="w-5 h-5 text-indigo-600" />
                              </div>
                              <span className="text-sm font-medium text-indigo-900 text-center">Click to upload ID photo</span>
                              <span className="text-xs text-slate-500 mt-1">JPEG, PNG up to 10MB</span>
                            </div>
                          </div>

                          {/* CV Upload */}
                          <div>
                            <label className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
                              <span>Curriculum Vitae (CV)</span>
                              <span className="text-indigo-600 font-medium normal-case">Required*</span>
                            </label>
                            <input type="file" ref={permitInputRef} className="hidden" accept=".pdf,.doc,.docx" />
                            <div 
                              onClick={() => permitInputRef.current?.click()}
                              className="w-full px-4 py-6 border-2 border-dashed border-indigo-200 hover:border-indigo-400 rounded-2xl bg-indigo-50/30 hover:bg-indigo-50/50 flex flex-col items-center justify-center cursor-pointer transition-all group"
                            >
                              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                <UploadCloud className="w-5 h-5 text-indigo-600" />
                              </div>
                              <span className="text-sm font-medium text-indigo-900 text-center">Drag & Drop or Click to upload CV</span>
                              <span className="text-xs text-slate-500 mt-1">PDF, DOCX up to 5MB</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="pt-4">
                  <button type="button" onClick={() => role === 'provider' ? setCurrentPage('providerPendingVerification') : setCurrentPage('customerDashboard')} className="w-full text-base font-semibold text-white bg-slate-900 hover:bg-indigo-600 py-3.5 rounded-2xl transition-all duration-300 hover:shadow-xl shadow-indigo-500/20 active:scale-[0.98]">
                    {role === 'client' ? 'Sign Up as Client' : 'Submit Registration Pipeline'}
                  </button>
                </div>
              </form>

              <div className="mt-8 text-center text-sm text-slate-500">
                Already have an account? <span onClick={() => setCurrentPage('login')} className="font-semibold text-indigo-600 hover:text-indigo-700 cursor-pointer">Log in</span>
              </div>
            </GlassCard>
          </motion.main>
        )}

        {currentPage === 'login' && (
          <motion.main
            key="login"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 max-w-xl mx-auto px-6 pt-32 pb-24 flex justify-center w-full min-h-screen"
          >
            <GlassCard className="w-full p-8 md:p-10 h-fit bg-white/50">
              <button 
                onClick={() => setCurrentPage('home')}
                className="flex items-center text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors mb-8 group"
              >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to home
              </button>
              
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Welcome back</h1>
              <p className="text-slate-600 mb-8 text-sm">Log in to TaskLink to continue.</p>

              <form className="space-y-5" onSubmit={handleLoginSubmit}>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Email address</label>
                  <input 
                    type="email" 
                    value={loginEmail}
                    onChange={(e) => {
                      setLoginEmail(e.target.value);
                      setLoginError(false);
                    }}
                    placeholder="a@m.com"
                    className={`w-full px-4 py-3 bg-white/70 border rounded-2xl focus:outline-none focus:ring-2 focus:bg-white text-slate-900 shadow-sm transition-all placeholder:text-slate-400 ${
                      loginError ? 'border-red-300 focus:ring-red-500/50' : 'border-white/50 focus:ring-indigo-500/50'
                    }`}
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-sm font-medium text-slate-700">Password</label>
                    <span onClick={() => setCurrentPage('forgotPassword')} className="text-sm font-medium text-indigo-600 hover:text-indigo-700 cursor-pointer">Forgot password?</span>
                  </div>
                  <input 
                    type="password" 
                    value={loginPassword}
                    onChange={(e) => {
                      setLoginPassword(e.target.value);
                      setLoginError(false);
                    }}
                    placeholder="123"
                    className={`w-full px-4 py-3 bg-white/70 border rounded-2xl focus:outline-none focus:ring-2 focus:bg-white text-slate-900 shadow-sm transition-all placeholder:text-slate-400 ${
                      loginError ? 'border-red-300 focus:ring-red-500/50' : 'border-white/50 focus:ring-indigo-500/50'
                    }`}
                  />
                </div>

                <AnimatePresence>
                  {loginError && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center gap-2 text-sm text-red-600 bg-red-50/50 p-3 rounded-xl border border-red-100"
                    >
                      <AlertCircle className="w-5 h-5 shrink-0" />
                      <span>Invalid email or password.</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="pt-4">
                  <button type="submit" className="w-full text-base font-semibold text-white bg-slate-900 hover:bg-indigo-600 py-3.5 rounded-2xl transition-all duration-300 hover:shadow-xl shadow-indigo-500/20 active:scale-[0.98]">
                    Log In
                  </button>
                </div>
              </form>

              <div className="mt-8 text-center text-sm text-slate-500">
                Don't have an account? <span onClick={() => setCurrentPage('signup')} className="font-semibold text-indigo-600 hover:text-indigo-700 cursor-pointer">Sign up</span>
              </div>
            </GlassCard>
          </motion.main>
        )}

        {currentPage === 'forgotPassword' && (
          <motion.main
            key="forgotPassword"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 max-w-xl mx-auto px-6 pt-32 pb-24 flex justify-center w-full min-h-screen"
          >
            <GlassCard className="w-full p-8 md:p-10 h-fit bg-white/50">
              <button 
                onClick={() => setCurrentPage('login')}
                className="flex items-center text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors mb-8 group"
              >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to login
              </button>
              
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Reset password</h1>
              <p className="text-slate-600 mb-8 text-sm">Enter your email address and we'll send you a link to reset your password.</p>

              <form className="space-y-5" onSubmit={handleResetSubmit}>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Email address</label>
                  <input 
                    type="email" 
                    placeholder="you@example.com"
                    value={resetEmail}
                    onChange={(e) => {
                      setResetEmail(e.target.value);
                      setResetStatus('idle');
                    }}
                    className={`w-full px-4 py-3 bg-white/70 border rounded-2xl focus:outline-none focus:ring-2 focus:bg-white text-slate-900 shadow-sm transition-all placeholder:text-slate-400 ${
                      resetStatus === 'error' 
                        ? 'border-red-300 focus:ring-red-500/50' 
                        : resetStatus === 'success'
                        ? 'border-emerald-300 focus:ring-emerald-500/50'
                        : 'border-white/50 focus:ring-indigo-500/50'
                    }`}
                  />
                </div>

                <AnimatePresence mode="wait">
                  {resetStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center gap-2 text-sm text-emerald-600 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100"
                    >
                      <CheckCircle2 className="w-5 h-5 shrink-0" />
                      <span>Check your mail for the reset link!</span>
                    </motion.div>
                  )}
                  {resetStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center gap-2 text-sm text-red-600 bg-red-50/50 p-3 rounded-xl border border-red-100"
                    >
                      <AlertCircle className="w-5 h-5 shrink-0" />
                      <span>No such email found. Please try again.</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="pt-4">
                  <button type="submit" className="w-full text-base font-semibold text-white bg-slate-900 hover:bg-indigo-600 py-3.5 rounded-2xl transition-all duration-300 hover:shadow-xl shadow-indigo-500/20 active:scale-[0.98]">
                    Send Reset Link
                  </button>
                </div>
              </form>

              <div className="mt-8 text-center text-sm text-slate-500">
                Remember your password? <span onClick={() => setCurrentPage('login')} className="font-semibold text-indigo-600 hover:text-indigo-700 cursor-pointer">Log in</span>
              </div>
            </GlassCard>
          </motion.main>
        )}
        {currentPage === 'customerDashboard' && (
          <motion.main
            key="customerDashboard"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-12 min-h-screen"
          >
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main Content */}
              <div className="flex-1 flex flex-col gap-8">
                {/* Greeting & Quick Stats */}
                <div>
                  <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Welcome back, {profileData.firstName}! 👋</h1>
                    <p className="text-slate-600">Here's what's happening with your tasks today.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <GlassCard className="p-5 flex flex-col pt-6 pb-6">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center mb-3 text-blue-600">
                        <Clock className="w-5 h-5" />
                      </div>
                      <h3 className="text-3xl font-bold text-slate-900 mb-1">0</h3>
                      <p className="text-sm font-medium text-slate-500">Active tasks</p>
                    </GlassCard>
                    <GlassCard className="p-5 flex flex-col pt-6 pb-6">
                      <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center mb-3 text-purple-600">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <h3 className="text-3xl font-bold text-slate-900 mb-1">{completedTasksCount}</h3>
                      <p className="text-sm font-medium text-slate-500">Completed tasks</p>
                    </GlassCard>
                    <GlassCard 
                      onClick={() => setIsPostTaskOptionsOpen(true)}
                      className="p-5 flex flex-col pt-6 pb-6 cursor-pointer hover:bg-white/60 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center mb-3 text-indigo-600 group-hover:scale-110 transition-transform">
                        <PlusCircle className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mt-2">New Task</h3>
                      <p className="text-sm font-medium text-slate-500">Post a new job</p>
                    </GlassCard>
                  </div>
                </div>

                {/* Main Activity Area */}
                <div className="grid md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-8">
                  {/* Recent Activity */}
                  <GlassCard className="p-6 flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-lg font-bold text-slate-900">Recent Tasks</h2>
                      <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">View all</button>
                    </div>
                    
                    <div className="flex flex-col gap-4 flex-1 justify-center">
                      <div className="flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-slate-200/60 rounded-2xl">
                        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                          <CheckCircle2 className="w-5 h-5 text-slate-400" />
                        </div>
                        <h3 className="text-sm font-medium text-slate-900 mb-1">No active tasks</h3>
                        <p className="text-xs text-slate-500 mb-4 max-w-[200px]">You don't have any ongoing tasks at the moment.</p>
                        <button onClick={() => setIsPostTaskOptionsOpen(true)} className="text-xs font-semibold text-white bg-slate-900 py-2 px-4 rounded-xl hover:bg-slate-800 transition-colors">
                          Post your first task
                        </button>
                      </div>
                    </div>
                  </GlassCard>

                  {/* Recommended Providers */}
                  <GlassCard className="p-6 flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-lg font-bold text-slate-900">Top Providers</h2>
                      <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">Browse all</button>
                    </div>

                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between p-3 rounded-2xl hover:bg-white/50 transition-colors cursor-pointer border border-transparent hover:border-white/60">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                            <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Felix" alt="avatar" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-slate-900">David K.</h4>
                            <p className="text-xs text-slate-500">Plumbing & Repairs</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 bg-amber-100 text-amber-700 px-2 py-1 rounded-lg text-xs font-semibold">
                          <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                          4.9
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 rounded-2xl hover:bg-white/50 transition-colors cursor-pointer border border-transparent hover:border-white/60">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                            <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Sarah" alt="avatar" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-slate-900">Sarah O.</h4>
                            <p className="text-xs text-slate-500">Deep Cleaning</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 bg-amber-100 text-amber-700 px-2 py-1 rounded-lg text-xs font-semibold">
                          <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                          4.8
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 rounded-2xl hover:bg-white/50 transition-colors cursor-pointer border border-transparent hover:border-white/60">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                            <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Mike" alt="avatar" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-slate-900">Michael T.</h4>
                            <p className="text-xs text-slate-500">Moving Assistance</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 bg-amber-100 text-amber-700 px-2 py-1 rounded-lg text-xs font-semibold">
                          <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                          5.0
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              </div>
            </div>
          </motion.main>
        )}

        {currentPage === 'providerDashboard' && (
          <motion.main
            key="providerDashboard"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-12 min-h-screen"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Header spans all 3 columns */}
              <div className="lg:col-span-3">
                <div className="mb-4 text-center lg:text-left">
                  <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Welcome back, {profileData.firstName}! 👋</h1>
                  <p className="text-slate-600">Here's your provider overview for today.</p>
                </div>
              </div>

              {/* Quick Stats span all 3 columns */}
              <div className="lg:col-span-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                  <GlassCard className="p-5 flex flex-col pt-6 pb-6">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center mb-3 text-blue-600">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-1">3</h3>
                    <p className="text-sm font-medium text-slate-500">Active Jobs</p>
                  </GlassCard>
                  <GlassCard className="p-5 flex flex-col pt-6 pb-6">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center mb-3 text-emerald-600">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-1">LKR 45,000</h3>
                    <p className="text-sm font-medium text-slate-500">Earned this week</p>
                  </GlassCard>
                  <GlassCard className="p-5 flex flex-col pt-6 pb-6">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center mb-3 text-amber-600">
                      <Star className="w-5 h-5 fill-amber-500" />
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-1">4.9</h3>
                    <p className="text-sm font-medium text-slate-500">Average Rating</p>
                  </GlassCard>
                </div>
              </div>

              {/* Main Content Area spans 2 columns */}
              <div className="lg:col-span-2 flex flex-col gap-8">
                {/* Main Activity Area */}
                <div className="grid md:grid-cols-2 gap-8 h-full">
                  {/* Available Tasks */}
                  <GlassCard className="p-6 flex flex-col h-[500px]">
                    <div className="flex items-center justify-between mb-4 flex-shrink-0">
                      <h2 className="text-lg font-bold text-slate-900">Available Tasks Near You</h2>
                      <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">Find work</button>
                    </div>
                    
                    <div className="flex flex-col gap-4 overflow-y-auto flex-1 min-h-0 pr-2 pb-2 -mr-2">
                      {providerJobFeed.length === 0 ? (
                        <div className="text-center text-slate-500 py-8 text-sm">No tasks currently available in your area.</div>
                      ) : (
                        providerJobFeed.map(job => (
                          <div key={job.id} className="flex flex-col p-5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition-all shadow-sm">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="text-base font-bold text-slate-900">{job.title}</h4>
                              <div className="flex flex-col items-end">
                                <span className="font-bold text-indigo-700 text-lg">LKR {job.budget.toLocaleString()}</span>
                                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm mt-1 ${job.isNegotiable ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>
                                  {job.isNegotiable ? 'Negotiable' : 'Fixed'}
                                </span>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2 mb-3">
                              <span className="text-xs font-semibold px-2 py-1 bg-slate-100 text-slate-600 rounded-md">{job.category}</span>
                              <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                                <MapPin className="w-3.5 h-3.5" /> {job.distance} ({job.neighborhood})
                              </div>
                            </div>

                            <p className="text-sm text-slate-600 mb-3 line-clamp-3">{job.description}</p>
                            
                            {job.voiceNote && (
                              <div className="mb-4 bg-indigo-50/50 p-3 rounded-xl border border-indigo-100">
                                <div className="flex items-center gap-2 mb-1.5">
                                  <Mic className="w-4 h-4 text-indigo-600" />
                                  <span className="text-xs font-semibold text-indigo-900">Voice Note Transcription</span>
                                </div>
                                <p className="text-xs text-indigo-800 italic">"{job.voiceNote}"</p>
                              </div>
                            )}

                            {job.photos && job.photos.length > 0 && (
                              <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
                                {job.photos.map((photo, index) => (
                                  <div key={index} className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-slate-200 bg-slate-100">
                                    <img src={photo} alt="Task thumbnail" className="w-full h-full object-cover" />
                                  </div>
                                ))}
                              </div>
                            )}

                            <div className="grid grid-cols-2 gap-3 mt-auto">
                              <button 
                                onClick={() => setProviderJobFeed(prev => prev.filter(j => j.id !== job.id))}
                                className="py-2.5 px-4 text-sm font-semibold text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
                              >
                                Decline
                              </button>
                              <button 
                                onClick={() => {
                                  // Accept job logic
                                  setProviderJobFeed(prev => prev.filter(j => j.id !== job.id));
                                  setActiveWorkspaceJob({
                                    ...job,
                                    customerName: 'Samith Perera',
                                    customerPhone: '0712345678',
                                    exactAddress: 'No. 45, Upstair Road, Puliyanthivu, Batticaloa',
                                    lat: 7.7102,
                                    lng: 81.6924,
                                    supervisorName: 'Pasindu (Assigned)'
                                  });
                                  setProviderMilestoneIndex(3);
                                  setCurrentPage('providerActiveWorkspace');
                                }}
                                className="py-2.5 px-4 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm hover:shadow transition-all"
                              >
                                Accept Job
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </GlassCard>

                  {/* Active Jobs */}
                  <GlassCard className="p-6 flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-lg font-bold text-slate-900">Your Active Jobs</h2>
                      <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">Manage</button>
                    </div>

                    <div className="flex flex-col gap-4 flex-1 justify-center">
                      <div className="flex flex-col p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-sm font-bold text-slate-900 line-clamp-1">Fix leaking kitchen sink</h4>
                        </div>
                        <p className="text-xs text-slate-600 mb-3 line-clamp-2">The pipe under the sink has a slow leak. I suspect it's the P-trap connection.</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                            <Clock className="w-3 h-3 text-indigo-500" />
                            <span>In Progress</span>
                          </div>
                          <span className="text-xs font-semibold text-indigo-600">LKR 7,500</span>
                        </div>
                      </div>

                      <div className="flex flex-col p-4 rounded-2xl bg-slate-50 border border-slate-100 transition-colors opacity-70">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-sm font-bold text-slate-900 line-clamp-1">Move couch to 2nd floor</h4>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Awaiting Confirmation</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              </div>

              {/* Sidebar spans 1 column */}
              <div className="lg:col-span-1 flex flex-col gap-8">
                <GlassCard className="p-6 flex-1 flex flex-col">
                  <h3 className="text-base font-bold text-slate-900 mb-4">Upcoming Schedule</h3>
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-4 items-start p-3 rounded-xl hover:bg-slate-50 transition-colors">
                      <div className="flex flex-col items-center justify-center p-2 bg-indigo-100 text-indigo-700 rounded-lg min-w-[3rem]">
                        <span className="text-xs font-bold">MAY</span>
                        <span className="text-lg font-black leading-none">16</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">Fix leaking sink</h4>
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-1"><Clock className="w-3 h-3" /> 9:00 AM - 10:30 AM</p>
                      </div>
                    </div>
                  </div>
                </GlassCard>

                <GlassCard className="p-6 bg-gradient-to-br from-slate-50 to-indigo-50/30 border-slate-100 flex-1 flex flex-col justify-end">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white rounded-xl shadow-sm text-indigo-600">
                      <Star className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 mb-1">Provider Tips</h4>
                      <p className="text-xs text-slate-600 leading-relaxed mb-3">Respond to new task requests within 1 hour to increase your acceptance rate by 3x.</p>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </div>
          </motion.main>
        )}

        {currentPage === 'userProfile' && (
          <motion.main
            key="userProfile"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 max-w-3xl mx-auto px-6 pt-32 pb-24 flex justify-center w-full min-h-screen"
          >
            <GlassCard className="w-full p-8 md:p-10 h-fit bg-white/50">
              <div className="flex items-center justify-between mb-8">
                <button 
                  onClick={() => setCurrentPage('customerDashboard')}
                  className="flex items-center text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors group"
                >
                  <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                  Back to dashboard
                </button>
                <button 
                  onClick={() => setIsEditingProfile(!isEditingProfile)}
                  className={`flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl transition-all ${
                    isEditingProfile 
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-500/20' 
                      : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 shadow-sm'
                  }`}
                >
                  {isEditingProfile ? (
                    <>
                      <Save className="w-4 h-4" /> Save Profile
                    </>
                  ) : (
                    <>
                      <Edit2 className="w-4 h-4" /> Edit Profile
                    </>
                  )}
                </button>
              </div>
              
              <div className="flex flex-col md:flex-row gap-8 mb-8">
                <div className="shrink-0 flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 border-4 border-white shadow-md flex items-center justify-center relative overflow-hidden group">
                    <span className="text-indigo-600 font-bold text-4xl">{profileData.firstName[0] || 'A'}</span>
                    {isEditingProfile && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                        <UploadCloud className="w-6 h-6 text-white" />
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex-1 space-y-6">
                  {/* Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">First Name</label>
                      {isEditingProfile ? (
                        <input 
                          type="text" 
                          value={profileData.firstName}
                          onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                          className="w-full px-4 py-2.5 bg-white/70 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-slate-900 transition-all font-medium"
                        />
                      ) : (
                        <p className="px-4 py-2.5 bg-slate-50/50 border border-transparent rounded-xl text-slate-900 font-medium h-11 flex items-center">
                          {profileData.firstName}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Last Name</label>
                      {isEditingProfile ? (
                        <input 
                          type="text" 
                          value={profileData.lastName}
                          onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                          className="w-full px-4 py-2.5 bg-white/70 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-slate-900 transition-all font-medium"
                        />
                      ) : (
                        <p className="px-4 py-2.5 bg-slate-50/50 border border-transparent rounded-xl text-slate-900 font-medium h-11 flex items-center">
                          {profileData.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Email address</label>
                      {isEditingProfile ? (
                        <input 
                          type="email" 
                          value={profileData.email}
                          onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                          className="w-full px-4 py-2.5 bg-white/70 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-slate-900 transition-all text-sm"
                        />
                      ) : (
                        <p className="px-4 py-2.5 bg-slate-50/50 border border-transparent rounded-xl text-slate-600 text-sm flex items-center h-11">
                          {profileData.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone Number</label>
                      {isEditingProfile ? (
                        <input 
                          type="tel" 
                          value={profileData.phone}
                          onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                          className="w-full px-4 py-2.5 bg-white/70 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-slate-900 transition-all text-sm"
                        />
                      ) : (
                        <p className="px-4 py-2.5 bg-slate-50/50 border border-transparent rounded-xl text-slate-600 text-sm flex items-center h-11">
                          {profileData.phone || 'Not provided'}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Date of Birth</label>
                      <div className="relative">
                        {!isEditingProfile && <Calendar className="absolute left-3 top-3 w-4 h-4 text-slate-400" />}
                        {isEditingProfile ? (
                          <input 
                            type="date" 
                            value={profileData.dob}
                            onChange={(e) => setProfileData({...profileData, dob: e.target.value})}
                            className="w-full px-4 py-2.5 bg-white/70 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-slate-900 transition-all text-sm text-[15px]"
                          />
                        ) : (
                          <p className="pl-9 pr-4 py-2 text-slate-600 text-sm flex items-center h-11 bg-slate-50/50 border border-transparent rounded-xl">
                            {profileData.dob ? new Date(profileData.dob).toLocaleDateString() : 'Not provided'}
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Location</label>
                      <div className="relative">
                        {!isEditingProfile && <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400" />}
                        {isEditingProfile ? (
                          <input 
                            type="text" 
                            placeholder="City, Country"
                            value={profileData.location}
                            onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                            className="w-full px-4 py-2.5 bg-white/70 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-slate-900 transition-all text-sm"
                          />
                        ) : (
                          <p className={`pl-9 pr-4 py-2 text-sm flex items-center h-11 bg-slate-50/50 border border-transparent rounded-xl ${profileData.location ? 'text-slate-600' : 'text-slate-400 italic'}`}>
                            {profileData.location || 'Not provided'}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Bio</label>
                    {isEditingProfile ? (
                      <textarea 
                        value={profileData.bio}
                        onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                        rows={4}
                        className="w-full px-4 py-3 bg-white/70 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-slate-900 transition-all text-sm resize-none"
                      />
                    ) : (
                      <p className="px-4 py-3 bg-slate-50/50 border border-transparent rounded-xl text-slate-600 text-sm leading-relaxed min-h-[100px]">
                        {profileData.bio || 'No bio provided yet.'}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.main>
        )}

        {currentPage === 'settings' && (
          <motion.main
            key="settings"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 max-w-3xl mx-auto px-6 pt-32 pb-24 flex justify-center w-full min-h-screen"
          >
            <GlassCard className="w-full p-8 md:p-10 h-fit bg-white/50">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setCurrentPage('customerDashboard')}
                    className="p-2 -ml-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
                </div>
              </div>
              
              <div className="space-y-8">
                {/* 2FA Section */}
                <div>
                  <h2 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">Security</h2>
                  <div className="bg-white/60 border border-slate-200 rounded-2xl p-5 flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
                    <div className="flex items-start sm:items-center gap-4">
                      <div className="mt-1 sm:mt-0 p-2.5 bg-indigo-100 text-indigo-700 rounded-xl shrink-0">
                        <Smartphone className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                          Two-Factor Authentication (2FA)
                          {is2FAActive && (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-wide">Active</span>
                          )}
                        </h3>
                        <p className="text-sm text-slate-600 mt-1">Add an extra layer of security to your account.</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => is2FAActive ? setIs2FAActive(false) : setIs2FASetupModalOpen(true)}
                      className={`whitespace-nowrap px-4 py-2 ${
                        is2FAActive 
                          ? 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200' 
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm hover:shadow-md'
                      } text-sm font-medium rounded-xl transition-all self-start sm:self-auto`}
                    >
                      {is2FAActive ? 'Disable' : 'Set up 2FA'}
                    </button>
                  </div>
                </div>

                {/* Email Section */}
                <div>
                  <h2 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">Contact Methods</h2>
                  <div className="bg-white/60 border border-slate-200 rounded-2xl p-5">
                    <div className="flex items-start sm:items-center gap-4 mb-5">
                      <div className="mt-1 sm:mt-0 p-2.5 bg-blue-100 text-blue-700 rounded-xl shrink-0">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900">Email Address</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-sm text-slate-600">{settingsEmail}</p>
                          {isEmailVerified ? (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-wide">Verified</span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-bold uppercase tracking-wide">Unverified</span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-5 border-t border-slate-200">
                      <div className="flex flex-col sm:flex-row gap-3">
                        <input 
                          type="email" 
                          value={newEmailInput}
                          onChange={(e) => setNewEmailInput(e.target.value)}
                          placeholder="New email address" 
                          className="flex-1 px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-slate-900 text-sm font-medium"
                        />
                        <button 
                          onClick={() => {
                            if (newEmailInput) {
                              setSettingsEmail(newEmailInput);
                              setIsEmailVerified(false);
                              setEmailUpdateMessage('Check email with verification link');
                              setNewEmailInput('');
                            }
                          }}
                          className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-xl transition-colors shadow-sm shrink-0"
                        >
                          Update Email
                        </button>
                      </div>
                      {emailUpdateMessage && (
                        <p className="text-sm text-indigo-600 mt-3 font-medium bg-indigo-50 p-2.5 rounded-lg border border-indigo-100 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4" />
                          {emailUpdateMessage}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="pt-4">
                  <h2 className="text-sm font-bold text-red-600 mb-4 uppercase tracking-wider">Danger Zone</h2>
                  <div className="bg-red-50/50 border border-red-100 rounded-2xl p-5 flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
                    <div className="flex items-start sm:items-center gap-4">
                      <div className="mt-1 sm:mt-0 p-2.5 bg-red-100 text-red-700 rounded-xl shrink-0">
                        <AlertTriangle className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-red-900">Deactivate Account</h3>
                        <p className="text-sm text-red-700/80 mt-1">Once you deactivate your account, there is no going back.</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setIsDeactivateModalOpen(true)}
                      className="whitespace-nowrap px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-xl transition-colors shadow-sm self-start sm:self-auto"
                    >
                      Deactivate
                    </button>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Modals */}
            <AnimatePresence>
              {is2FASetupModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-slate-900/40 backdrop-blur-sm">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
                  >
                    <div className="p-6 md:p-8">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-slate-900">Set up 2FA</h3>
                        <button onClick={() => setIs2FASetupModalOpen(false)} className="text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-100 p-2 rounded-full transition-colors">
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <div className="w-48 h-48 bg-slate-50 border border-slate-100 rounded-2xl mb-5 flex items-center justify-center p-3 shadow-inner">
                          {/* QR Code Graphic using a real QR image for the tasklink mockup */}
                          <img 
                            src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=otpauth://totp/TaskLink:a@m.com?secret=JBSWY3DPEHPK3PXP&issuer=TaskLink" 
                            alt="QR Code" 
                            className="w-full h-full object-contain mix-blend-darken filter contrast-125" 
                          />
                        </div>
                        <p className="text-sm text-slate-500 mb-6 text-center leading-relaxed">
                          Scan this QR code with your Authenticator app, or manually enter the key below:
                          <br />
                          <strong className="text-slate-800 font-mono mt-3 inline-block bg-slate-100 px-4 py-2 rounded-xl border border-slate-200 tracking-wider">
                            JBSW Y3DP EHPK 3PXP
                          </strong>
                        </p>
                        
                        <div className="w-full space-y-4">
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Enter 6-digit code</label>
                            <input 
                              type="text"
                              maxLength={6}
                              value={twoFaCode}
                              onChange={(e) => {
                                setTwoFaCode(e.target.value.replace(/\D/g, ''));
                                setTwoFaSetupStatus('idle');
                              }}
                              className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-slate-900 text-center tracking-[0.5em] font-mono text-xl shadow-inner transition-all"
                              placeholder="000000"
                            />
                          </div>
                          
                          {twoFaSetupStatus === 'success' && (
                            <motion.div 
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="flex items-center justify-center gap-2 text-sm text-emerald-700 bg-emerald-50 p-3.5 rounded-xl border border-emerald-200 font-medium font-sans tracking-normal"
                            >
                              <CheckCircle2 className="w-5 h-5 shrink-0" />
                              <span>2FA successfully activated!</span>
                            </motion.div>
                          )}

                          <button 
                            onClick={() => {
                              if (twoFaCode.length === 6) {
                                setTwoFaSetupStatus('success');
                                setTimeout(() => {
                                  setIs2FAActive(true);
                                  setIs2FASetupModalOpen(false);
                                  setTwoFaSetupStatus('idle');
                                  setTwoFaCode('');
                                }, 1500);
                              }
                            }}
                            disabled={twoFaCode.length !== 6 || twoFaSetupStatus === 'success'}
                            className={`w-full py-3.5 font-semibold rounded-xl transition-all shadow-sm flex items-center justify-center
                              ${twoFaCode.length === 6 && twoFaSetupStatus !== 'success'
                                ? 'bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-md'
                                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                              }`}
                          >
                            {twoFaSetupStatus === 'success' ? 'Activated' : 'Activate 2FA'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}

              {isDeactivateModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-slate-900/60 backdrop-blur-sm">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-red-100"
                  >
                    <div className="p-6 md:p-8">
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-5 mx-auto">
                        <AlertTriangle className="w-6 h-6 text-red-600" />
                      </div>
                      
                      <h3 className="text-xl font-bold text-slate-900 text-center mb-2">
                        Deactivate Account?
                      </h3>
                      
                      <p className="text-sm text-slate-600 text-center mb-8 leading-relaxed">
                        Are you absolutely sure you want to deactivate your account? This action cannot be undone. All your data, tasks, and history will be permanently deleted.
                      </p>
                      
                      <div className="space-y-5">
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">Confirm Password</label>
                          <input 
                            type="password"
                            value={deactivatePassword}
                            onChange={(e) => setDeactivatePassword(e.target.value)}
                            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 text-slate-900 transition-all font-sans"
                            placeholder="••••••••"
                          />
                        </div>
                        {is2FAActive && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }} 
                            animate={{ opacity: 1, height: 'auto' }}
                            className="relative"
                          >
                            <label className="block text-sm font-semibold text-slate-700 mb-2">2FA Code</label>
                            <input 
                              type="text"
                              maxLength={6}
                              value={deactivate2FaCode}
                              onChange={(e) => setDeactivate2FaCode(e.target.value.replace(/\D/g, ''))}
                              className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 text-slate-900 tracking-[0.3em] font-mono transition-all text-center text-lg"
                              placeholder="000000"
                            />
                          </motion.div>
                        )}
                        
                        <div className="flex flex-col gap-3 pt-4">
                          <button 
                            onClick={() => {
                              // Taking user back to homepage
                              setCurrentPage('home');
                              setIsDeactivateModalOpen(false);
                              setDeactivatePassword('');
                              setDeactivate2FaCode('');
                              setIsProfileMenuOpen(false);
                            }}
                            disabled={!deactivatePassword || (is2FAActive && deactivate2FaCode.length !== 6)}
                            className={`w-full py-3.5 font-semibold rounded-xl text-white transition-all shadow-sm ${
                              deactivatePassword && (!is2FAActive || deactivate2FaCode.length === 6)
                                ? 'bg-red-600 hover:bg-red-700 hover:shadow-md'
                                : 'bg-red-300 cursor-not-allowed'
                            }`}
                          >
                            Yes, deactivate my account
                          </button>
                          <button 
                            onClick={() => setIsDeactivateModalOpen(false)}
                            className="w-full py-3.5 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 font-semibold rounded-xl transition-all"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </motion.main>
        )}

        {currentPage === 'postTask' && (
          <motion.main
            key="postTask"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 max-w-3xl mx-auto px-6 pt-32 pb-24 flex justify-center w-full min-h-screen"
          >
            <GlassCard className="w-full p-8 md:p-10 h-fit bg-white/50">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setCurrentPage('customerDashboard')}
                    className="p-2 -ml-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <h1 className="text-2xl font-bold text-slate-900">Post a New Task</h1>
                </div>
              </div>

              <div className="space-y-8">
                {/* Task Details */}
                <div>
                  <h2 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">What do you need help with?</h2>
                  <div className="grid gap-5">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Task Title</label>
                      <input 
                        type="text" 
                        value={taskTitle}
                        onChange={(e) => setTaskTitle(e.target.value)}
                        placeholder="e.g. Clean my 2-bedroom apartment"
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-slate-900 font-medium transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Category</label>
                        <select
                          value={taskCategory}
                          onChange={(e) => setTaskCategory(e.target.value)}
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-slate-900 font-medium transition-all appearance-none"
                        >
                          <option value="cleaning">Cleaning</option>
                          <option value="plumbing">Plumbing</option>
                          <option value="electrical">Electrical</option>
                          <option value="moving">Moving & Packing</option>
                          <option value="gardening">Gardening</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Location</label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                          <input 
                            type="text" 
                            value={taskLocation}
                            onChange={(e) => setTaskLocation(e.target.value)}
                            placeholder="Enter task address"
                            className="w-full pl-9 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-slate-900 font-medium transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-sm font-medium text-slate-700">Description</label>
                        <div className="flex bg-slate-100 rounded-lg p-1">
                          <button
                            type="button"
                            onClick={() => setIsVoiceMode(false)}
                            className={`px-3 py-1 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 ${!isVoiceMode ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                          >
                            <Type className="w-3.5 h-3.5" /> Text
                          </button>
                          <button
                            type="button"
                            onClick={() => setIsVoiceMode(true)}
                            className={`px-3 py-1 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 ${isVoiceMode ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                          >
                            <Mic className="w-3.5 h-3.5" /> Voice
                          </button>
                        </div>
                      </div>

                      {isVoiceMode ? (
                        <div className={`w-full p-6 border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-all ${isRecording ? 'border-red-400 bg-red-50/30' : 'border-slate-200 bg-slate-50'}`}>
                          {isRecording ? (
                            <>
                              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
                                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                                  <Mic className="w-8 h-8 text-red-500" />
                                </motion.div>
                              </div>
                              <h3 className="text-lg font-bold text-slate-900 mb-1">Recording...</h3>
                              <p className="text-sm text-slate-500 mb-6 font-mono">
                                {Math.floor(recordingTime / 60).toString().padStart(2, '0')}:{(recordingTime % 60).toString().padStart(2, '0')}
                              </p>
                              <button
                                type="button"
                                onClick={stopRecording}
                                className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl shadow-sm transition-colors flex items-center gap-2"
                              >
                                <Square className="w-4 h-4 fill-current" /> Stop & Process
                              </button>
                            </>
                          ) : (
                            <>
                              <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                                <Mic className="w-8 h-8 text-indigo-600" />
                              </div>
                              <h3 className="text-lg font-bold text-slate-900 mb-2">Describe your task naturally</h3>
                              <p className="text-sm text-slate-500 mb-6 text-center max-w-sm">
                                Tap record and tell us what you need. Our AI will transcribe and organize your requirements into a structured description.
                              </p>
                              <button
                                type="button"
                                onClick={startRecording}
                                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-sm transition-colors flex items-center gap-2"
                              >
                                <Mic className="w-4 h-4" /> Start Recording
                              </button>
                            </>
                          )}
                        </div>
                      ) : (
                        <textarea 
                          value={taskDescription}
                          onChange={(e) => setTaskDescription(e.target.value)}
                          rows={4}
                          placeholder="Describe what exactly needs to be done, any specific requirements, or things the provider should bring..."
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-slate-900 font-medium transition-all resize-none"
                        />
                      )}
                    </div>

                    {/* Photo Upload */}
                    <div className="mt-2">
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Task Photos <span className="text-slate-400 font-normal">(Optional, up to 5)</span>
                      </label>
                      
                      <div className="flex flex-wrap gap-4">
                        {taskPhotos.map((photo, index) => (
                          <div key={index} className="relative w-24 h-24 rounded-lg overflow-hidden border border-slate-200 group">
                            <img src={photo} alt={`Task ${index + 1}`} className="w-full h-full object-cover" />
                            <button 
                              type="button" 
                              onClick={() => removePhoto(index)}
                              className="absolute top-1 right-1 p-1 bg-black/50 hover:bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        
                        {taskPhotos.length < 5 && (
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="w-24 h-24 rounded-lg border-2 border-dashed border-slate-300 hover:border-indigo-400 hover:bg-indigo-50 flex flex-col items-center justify-center text-slate-500 hover:text-indigo-600 transition-colors"
                          >
                            <ImageIcon className="w-6 h-6 mb-1" />
                            <span className="text-[10px] font-semibold text-center leading-tight">Add<br/>Photo</span>
                          </button>
                        )}
                      </div>
                      
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handlePhotoUpload} 
                        accept="image/*" 
                        multiple 
                        className="hidden" 
                      />
                    </div>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="pt-2 border-t border-slate-200">
                  <h2 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider mt-4">When do you need it?</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                        <input 
                          type="date" 
                          value={taskDate}
                          onChange={(e) => setTaskDate(e.target.value)}
                          className="w-full pl-9 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-slate-900 font-medium transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Time</label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                        <input 
                          type="time" 
                          value={taskTime}
                          onChange={(e) => setTaskTime(e.target.value)}
                          className="w-full pl-9 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-slate-900 font-medium transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Budget */}
                <div className="pt-2 border-t border-slate-200">
                  <h2 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider mt-4">Budget & Payment</h2>
                  <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                    <div className="flex-1 w-full relative">
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Offered Amount (LKR)</label>
                      <div className="relative">
                        <span className="absolute left-4 top-3 font-semibold text-slate-400">LKR</span>
                        <input 
                          type="number" 
                          value={taskBudget}
                          onChange={(e) => setTaskBudget(e.target.value)}
                          placeholder="0.00"
                          min="0"
                          step="100"
                          className="w-full pl-14 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-slate-900 font-medium transition-all text-lg"
                        />
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:pt-6">
                      <label className="flex items-center gap-3 cursor-pointer p-3 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors">
                        <div className="relative">
                          <input 
                            type="checkbox" 
                            className="sr-only group"
                            checked={isNegotiable}
                            onChange={(e) => setIsNegotiable(e.target.checked)}
                          />
                          <div className={`block w-10 h-6 rounded-full transition-colors ${isNegotiable ? 'bg-indigo-600' : 'bg-slate-300'}`}></div>
                          <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${isNegotiable ? 'transform translate-x-4' : ''}`}></div>
                        </div>
                        <span className="text-sm font-medium text-slate-700">Price is negotiable</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Pre-Booking Fee Summary */}
                <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5"><AlertCircle className="w-5 h-5 text-indigo-600" /></div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-indigo-900 mb-1">Pre-booking Authorization</h4>
                      <p className="text-xs text-indigo-700 mb-3">
                        A fully refundable authorization hold of LKR 100 is required to broadcast this task publicly. This hold verifies your intent and is released once you hire a provider or cancel the request.
                      </p>
                      <div className="flex items-center justify-between py-2 border-t border-indigo-200/50 font-medium text-sm">
                        <span className="text-indigo-900">Task Posting Hold:</span>
                        <span className="text-indigo-900 font-bold">LKR 100.00</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-6 border-t border-slate-200 flex justify-end gap-3">
                  <button 
                    onClick={() => setCurrentPage('customerDashboard')}
                    className="px-6 py-3 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 font-semibold rounded-xl transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => {
                      setPaymentContext({ type: 'broadcast' });
                      setCurrentPage('paymentGateway');
                    }}
                    className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                  >
                    <PlusCircle className="w-5 h-5" />
                    Publish Task
                  </button>
                </div>
              </div>
            </GlassCard>
          </motion.main>
        )}

        {currentPage === 'directHireList' && (
          <motion.main
            key="directHireList"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24 w-full min-h-screen"
          >
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setCurrentPage('customerDashboard')}
                  className="p-2 -ml-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-white/50 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="text-3xl font-bold text-slate-900">Direct Hire</h1>
              </div>
              <div className="hidden lg:block">
                <h2 className="text-xl font-bold text-slate-900">{filteredProviders.length} Providers Found</h2>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Search & Filter Sidebar */}
              <div className="w-full lg:w-80 flex-shrink-0">
                <GlassCard className="p-6 sticky top-24">
                  <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Search className="w-5 h-5 text-indigo-600" />
                    Find Providers
                  </h2>

                  <div className="space-y-6">
                    {/* Skill Category */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Skill Category</label>
                      <select 
                        value={dhCategory}
                        onChange={(e) => setDhCategory(e.target.value)}
                        className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-slate-900 text-sm"
                      >
                        <option value="all">Every Category</option>
                        <option value="electrician">Electricians</option>
                        <option value="plumber">Plumbers</option>
                        <option value="painter">Painters</option>
                        <option value="mason">Masons</option>
                        <option value="carpenter">Carpenters</option>
                        <option value="cleaner">Cleaners</option>
                      </select>
                    </div>

                    {/* Location Range */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Distance Range: {dhLocationRadius} km
                      </label>
                      <input 
                        type="range" 
                        min="1" max="50" 
                        value={dhLocationRadius}
                        onChange={(e) => setDhLocationRadius(parseInt(e.target.value))}
                        className="w-full accent-indigo-600"
                      />
                      <div className="flex justify-between text-xs text-slate-500 mt-1">
                        <span>1 km</span>
                        <span>50 km</span>
                      </div>
                    </div>

                    {/* Star Rating */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Minimum Rating</label>
                      <div className="flex items-center gap-2">
                        {[0, 4, 4.5, 4.8].map(rating => (
                          <button
                            key={rating}
                            onClick={() => setDhMinRating(rating)}
                            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${dhMinRating === rating ? 'bg-amber-500 text-white border-amber-500' : 'bg-white text-slate-600 border-slate-200 hover:border-amber-300'}`}
                          >
                            {rating === 0 ? 'Any' : `${rating}+`}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Experience Level */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Years of Experience</label>
                      <select 
                        value={dhMinExperience}
                        onChange={(e) => setDhMinExperience(parseInt(e.target.value))}
                        className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-slate-900 text-sm"
                      >
                        <option value={0}>Any Experience</option>
                        <option value={1}>1+ Years</option>
                        <option value={5}>5+ Years</option>
                        <option value={10}>10+ Years</option>
                      </select>
                    </div>

                    {/* Availability */}
                    <div className="pt-4 border-t border-slate-100">
                      <label className="flex items-center justify-between cursor-pointer group">
                        <span className="text-sm font-semibold text-slate-700">Available Now Only</span>
                        <div className="relative">
                          <input 
                            type="checkbox" 
                            className="sr-only"
                            checked={dhAvailableOnly}
                            onChange={(e) => setDhAvailableOnly(e.target.checked)}
                          />
                          <div className={`block w-10 h-6 rounded-full transition-colors ${dhAvailableOnly ? 'bg-green-500' : 'bg-slate-300'}`}></div>
                          <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${dhAvailableOnly ? 'transform translate-x-4' : ''}`}></div>
                        </div>
                      </label>
                    </div>
                  </div>
                </GlassCard>
              </div>

              {/* Results Grid */}
              <div className="flex-1">
                <div className="mb-6 lg:hidden">
                  <h2 className="text-xl font-bold text-slate-900">{filteredProviders.length} Providers Found</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProviders.map(provider => (
                    <GlassCard key={provider.id} className="p-0 overflow-hidden flex flex-col group hover:shadow-xl transition-all duration-300">
                      <div className="p-6 flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div className="relative">
                            <div className="w-16 h-16 rounded-2xl bg-indigo-50 overflow-hidden border-2 border-white shadow-sm group-hover:scale-105 transition-transform">
                              <img src={provider.avatar} alt={provider.name} className="w-full h-full object-cover" />
                            </div>
                            {provider.availableNow && (
                              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
                            )}
                          </div>
                          
                          <div className="bg-amber-100/80 backdrop-blur-sm text-amber-700 px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm">
                            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                            {provider.rating}
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="flex items-center gap-1.5 mb-1">
                            <h3 className="text-lg font-bold text-slate-900">{provider.name}</h3>
                            <CheckCircle2 className="w-4 h-4 text-blue-500" />
                          </div>
                          <span className="inline-block px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-md text-xs font-bold">
                            {provider.skill}
                          </span>
                        </div>

                        <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4">
                          "{provider.snippet}"
                        </p>

                        <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 mt-auto pt-4 border-t border-slate-100">
                          <span className="flex items-center gap-1">
                            <Briefcase className="w-3.5 h-3.5" />
                            {provider.jobs} Jobs
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {provider.experience} Yrs Exp
                          </span>
                        </div>
                      </div>

                      <div className="bg-slate-50 p-4 border-t border-slate-100">
                        <button
                          onClick={() => {
                            setSelectedProviderForHire(provider);
                            setCurrentPage('directHireBooking');
                          }}
                          className="w-full py-2.5 bg-slate-900 hover:bg-indigo-600 text-white font-bold rounded-xl transition-colors shadow-sm cursor-pointer"
                        >
                          Book Directly
                        </button>
                      </div>
                    </GlassCard>
                  ))}
                  
                  {filteredProviders.length === 0 && (
                    <div className="col-span-full py-16 flex flex-col items-center justify-center text-center">
                      <div className="w-16 h-16 rounded-full bg-slate-200/50 flex items-center justify-center mb-4">
                        <Search className="w-6 h-6 text-slate-400" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">No providers found</h3>
                      <p className="text-slate-500 max-w-sm">Try adjusting your filters to see more available professionals in your area.</p>
                      <button 
                        onClick={() => {
                          setDhCategory('all');
                          setDhLocationRadius(10);
                          setDhMinRating(0);
                          setDhMinExperience(0);
                          setDhAvailableOnly(false);
                        }}
                        className="mt-6 px-6 py-2 bg-indigo-50 text-indigo-700 font-bold rounded-xl hover:bg-indigo-100 transition-colors"
                      >
                        Clear Filters
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.main>
        )}

        {currentPage === 'directHireBooking' && selectedProviderForHire && (
          <motion.main
            key="directHireBooking"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 max-w-3xl mx-auto px-6 pt-32 pb-24 flex justify-center w-full min-h-screen"
          >
            <GlassCard className="w-full p-8 md:p-10 h-fit bg-white/50">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setCurrentPage('directHireList')}
                    className="p-2 -ml-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <h1 className="text-2xl font-bold text-slate-900">Booking {selectedProviderForHire.name.split(' ')[0]}</h1>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right hidden sm:block">
                    <span className="block text-xs font-bold text-slate-900">{selectedProviderForHire.skill}</span>
                    <div className="flex items-center justify-end gap-1 text-[10px] text-amber-600 font-bold">
                      <Star className="w-3 h-3 fill-current" /> {selectedProviderForHire.rating}
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200">
                    <img src={selectedProviderForHire.avatar} alt={selectedProviderForHire.name} />
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                {/* Task Details */}
                <div>
                  <h2 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">What do you need help with?</h2>
                  <div className="grid gap-5">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Task Title</label>
                      <input 
                        type="text" 
                        value={taskTitle}
                        onChange={(e) => setTaskTitle(e.target.value)}
                        placeholder={`e.g. Need help with ${selectedProviderForHire.skill.toLowerCase()}`}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-slate-900 font-medium transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Location</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                        <input 
                          type="text" 
                          value={taskLocation}
                          onChange={(e) => setTaskLocation(e.target.value)}
                          placeholder="Enter exact address"
                          className="w-full pl-9 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-slate-900 font-medium transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-sm font-medium text-slate-700">Description</label>
                        <div className="flex bg-slate-100 rounded-lg p-1">
                          <button
                            type="button"
                            onClick={() => setIsVoiceMode(false)}
                            className={`px-3 py-1 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${!isVoiceMode ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                          >
                            <Type className="w-3.5 h-3.5" /> Text
                          </button>
                          <button
                            type="button"
                            onClick={() => setIsVoiceMode(true)}
                            className={`px-3 py-1 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${isVoiceMode ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                          >
                            <Mic className="w-3.5 h-3.5" /> Voice
                          </button>
                        </div>
                      </div>

                      {isVoiceMode ? (
                        <div className={`w-full p-6 border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-all ${isRecording ? 'border-red-400 bg-red-50/30' : 'border-slate-200 bg-slate-50'}`}>
                          {isRecording ? (
                            <>
                              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
                                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                                  <Mic className="w-8 h-8 text-red-500" />
                                </motion.div>
                              </div>
                              <h3 className="text-lg font-bold text-slate-900 mb-1">Recording...</h3>
                              <p className="text-sm text-slate-500 mb-6 font-mono">
                                {Math.floor(recordingTime / 60).toString().padStart(2, '0')}:{(recordingTime % 60).toString().padStart(2, '0')}
                              </p>
                              <button
                                type="button"
                                onClick={stopRecording}
                                className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl shadow-sm transition-colors flex items-center gap-2 cursor-pointer"
                              >
                                <Square className="w-4 h-4 fill-current" /> Stop & Process
                              </button>
                            </>
                          ) : (
                            <>
                              <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                                <Mic className="w-8 h-8 text-indigo-600" />
                              </div>
                              <h3 className="text-lg font-bold text-slate-900 mb-2">Describe your task naturally</h3>
                              <p className="text-sm text-slate-500 mb-6 text-center max-w-sm">
                                Tap record and tell us what you need. Our AI will transcribe and organize your requirements into a structured description.
                              </p>
                              <button
                                type="button"
                                onClick={startRecording}
                                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-sm transition-colors flex items-center gap-2 cursor-pointer"
                              >
                                <Mic className="w-4 h-4" /> Start Recording
                              </button>
                            </>
                          )}
                        </div>
                      ) : (
                        <textarea 
                          value={taskDescription}
                          onChange={(e) => setTaskDescription(e.target.value)}
                          rows={4}
                          placeholder="Describe exactly what needs to be done..."
                          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-slate-900 font-medium transition-all resize-none"
                        />
                      )}
                    </div>

                    {/* Photo Upload */}
                    <div className="mt-2">
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        Task Photos <span className="text-slate-400 font-normal">(Optional, up to 5)</span>
                      </label>
                      
                      <div className="flex flex-wrap gap-4">
                        {taskPhotos.map((photo, index) => (
                          <div key={index} className="relative w-24 h-24 rounded-lg overflow-hidden border border-slate-200 group">
                            <img src={photo} alt={`Task ${index + 1}`} className="w-full h-full object-cover" />
                            <button 
                              type="button" 
                              onClick={() => removePhoto(index)}
                              className="absolute top-1 right-1 p-1 bg-black/50 hover:bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        
                        {taskPhotos.length < 5 && (
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="w-24 h-24 rounded-lg border-2 border-dashed border-slate-300 hover:border-indigo-400 hover:bg-indigo-50 flex flex-col items-center justify-center text-slate-500 hover:text-indigo-600 transition-colors cursor-pointer"
                          >
                            <ImageIcon className="w-6 h-6 mb-1" />
                            <span className="text-[10px] font-semibold text-center leading-tight">Add<br/>Photo</span>
                          </button>
                        )}
                      </div>
                      
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handlePhotoUpload} 
                        accept="image/*" 
                        multiple 
                        className="hidden" 
                      />
                    </div>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="pt-2 border-t border-slate-200">
                  <h2 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider mt-4">When do you need it?</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                        <input 
                          type="date" 
                          value={taskDate}
                          onChange={(e) => setTaskDate(e.target.value)}
                          className="w-full pl-9 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-slate-900 font-medium transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Time</label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                        <input 
                          type="time" 
                          value={taskTime}
                          onChange={(e) => setTaskTime(e.target.value)}
                          className="w-full pl-9 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-slate-900 font-medium transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Budget */}
                <div className="pt-2 border-t border-slate-200">
                  <h2 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider mt-4">Budget & Payment</h2>
                  <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                    <div className="flex-1 w-full relative">
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Offered Amount (LKR)</label>
                      <div className="relative">
                        <span className="absolute left-4 top-3 font-semibold text-slate-400">LKR</span>
                        <input 
                          type="number" 
                          value={taskBudget}
                          onChange={(e) => setTaskBudget(e.target.value)}
                          placeholder="0.00"
                          min="0"
                          step="100"
                          className="w-full pl-14 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-slate-900 font-medium transition-all text-lg"
                        />
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:pt-6">
                      <label className="flex items-center gap-3 cursor-pointer p-3 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-colors">
                        <div className="relative">
                          <input 
                            type="checkbox" 
                            className="sr-only group"
                            checked={isNegotiable}
                            onChange={(e) => setIsNegotiable(e.target.checked)}
                          />
                          <div className={`block w-10 h-6 rounded-full transition-colors ${isNegotiable ? 'bg-indigo-600' : 'bg-slate-300'}`}></div>
                          <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${isNegotiable ? 'transform translate-x-4' : ''}`}></div>
                        </div>
                        <span className="text-sm font-medium text-slate-700">Price is negotiable</span>
                      </label>
                    </div>
                  </div>
                </div>
                
                {/* Pre-Booking Fee Summary */}
                <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5"><AlertCircle className="w-5 h-5 text-indigo-600" /></div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-indigo-900 mb-1">Pre-booking Authorization</h4>
                      <p className="text-xs text-indigo-700 mb-3">
                        A fully refundable authorization hold of LKR 100 is required to confirm this direct booking request. If {selectedProviderForHire.name.split(' ')[0]} declines, it is immediately released.
                      </p>
                      <div className="flex items-center justify-between py-2 border-t border-indigo-200/50 font-medium text-sm">
                        <span className="text-indigo-900">Booking Request Fee:</span>
                        <span className="text-indigo-900 font-bold">LKR 100.00</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-6 border-t border-slate-200 flex justify-end gap-3">
                  <button 
                    onClick={() => setCurrentPage('directHireList')}
                    className="px-6 py-3 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 font-semibold rounded-xl transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => {
                      setPaymentContext({ type: 'directHire', provider: selectedProviderForHire });
                      setCurrentPage('paymentGateway');
                    }}
                    className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
                  >
                    <PlusCircle className="w-5 h-5" />
                    Publish Request
                  </button>
                </div>
              </div>
            </GlassCard>
          </motion.main>
        )}

        {currentPage === 'paymentGateway' && paymentContext && (
          <motion.main
            key="paymentGateway"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 max-w-xl mx-auto px-6 pt-32 pb-24 flex justify-center w-full min-h-screen"
          >
            <GlassCard className="w-full p-8 flex flex-col items-center text-center h-fit bg-white/50 border-indigo-100">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-6 text-slate-700">
                <CreditCard className="w-8 h-8" />
              </div>
              
              <h1 className="text-2xl font-bold text-slate-900 mb-2">Processing Authorization</h1>
              <p className="text-slate-500 mb-8 max-w-sm">
                You are being redirected to the PayHere secure payment gateway to authorize the pre-booking fee.
              </p>

              <div className="w-full p-6 bg-slate-50 border border-slate-200 rounded-2xl mb-8 flex flex-col items-center">
                <span className="text-sm font-semibold text-slate-500 mb-1 uppercase tracking-wider">Authorization Hold</span>
                <span className="text-4xl font-black text-slate-900 tracking-tight">LKR 100</span>
                <div className="flex items-center gap-1 mt-3 text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                  <Lock className="w-3 h-3" /> Fully Refundable
                </div>
              </div>

              <div className="w-full flex flex-col gap-3">
                <button
                  onClick={() => {
                    setTrackingTask({
                       id: 'TASK-' + Math.floor(Math.random() * 10000),
                       title: paymentContext.type === 'directHire' ? `Booking with ${paymentContext.provider.name.split(' ')[0]}` : taskTitle || 'Task Required',
                       provider: paymentContext.provider,
                       status: 'Booked',
                       date: new Date().toLocaleDateString(),
                    });
                    setCurrentPage('taskTracking');
                  }}
                  className="w-full py-3.5 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <CheckCircle className="w-5 h-5" />
                  Simulate Successful Payment
                </button>
                <button
                  onClick={() => {
                    setCurrentPage(paymentContext.type === 'directHire' ? 'directHireBooking' : 'postTask');
                  }}
                  className="w-full py-3 text-slate-500 hover:text-slate-700 font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </GlassCard>
          </motion.main>
        )}

        {currentPage === 'taskTracking' && trackingTask && (
          <motion.main
            key="taskTracking"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 max-w-4xl mx-auto px-6 pt-32 pb-24 flex justify-center w-full min-h-screen"
          >
            <div className="w-full">
              <div className="flex items-center justify-between mb-8">
               <button 
                  onClick={() => setCurrentPage('customerDashboard')}
                  className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors font-semibold cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                </button>
                <div className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg text-sm font-bold">
                   <Clock className="w-4 h-4" /> {milestoneIndex === 5 ? 'Completed' : 'In Progress'}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Tracking Column */}
                <div className="lg:col-span-2 space-y-6">
                  <GlassCard className="p-8">
                    <h1 className="text-2xl font-bold text-slate-900 mb-2">{trackingTask.title}</h1>
                    <p className="text-slate-500 font-medium text-sm flex items-center gap-4">
                      <span>ID: {trackingTask.id}</span>
                      <span>Created: {trackingTask.date}</span>
                    </p>

                    {/* Progress Bar UI */}
                    <div className="mt-10 mb-6">
                       <h2 className="text-lg font-bold text-slate-900 mb-6">Job Flow</h2>
                       
                       <div className="relative">
                          {/* Vertical Line */}
                          <div className="absolute left-[19px] top-2 bottom-2 w-[2px] bg-slate-200 z-0"></div>
                          
                          <div className="space-y-8 relative z-10">
                            {[
                              { title: 'Task Booked', desc: 'Authorization complete.' },
                              { title: 'Supervisor Assigned', desc: 'A field supervisor is reviewing your task.' },
                              { title: 'Site Visit Completed', desc: 'Supervisor has assessed the requirements.' },
                              { title: 'Work In Progress', desc: 'Provider is actively working.' },
                              { title: 'Quality Check', desc: 'Supervisor is reviewing the work.' },
                              { title: 'Task Completed', desc: 'Payment settled and job verified.' },
                            ].map((milestone, idx) => {
                              const completed = milestoneIndex > idx || (milestoneIndex === 5 && idx === 5);
                              const current = milestoneIndex === idx && milestoneIndex !== 5;
                              return (
                               <div key={idx} className="flex gap-4 items-start">
                                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 shadow-sm ${completed ? 'bg-indigo-600 border-indigo-600' : current ? 'bg-white border-indigo-600 shadow-indigo-100' : 'bg-white border-slate-200'}`}>
                                     {completed ? (
                                        <CheckCircle className="w-5 h-5 text-white" />
                                     ) : current ? (
                                        <div className="w-3 h-3 bg-indigo-600 rounded-full animate-pulse"></div>
                                     ) : (
                                        <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                                     )}
                                  </div>
                                  <div className={`pt-2 ${completed || current ? 'opacity-100' : 'opacity-40'}`}>
                                    <h3 className={`font-bold ${current ? 'text-indigo-900 text-lg' : 'text-slate-900'}`}>{milestone.title}</h3>
                                    <p className="text-sm text-slate-500 mt-1">{milestone.desc}</p>
                                    
                                    {idx === 1 && (completed || current) && (
                                      <div className="mt-4 p-4 bg-sky-50 rounded-xl border border-sky-100 flex items-center gap-4 max-w-sm">
                                         <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden shrink-0 border-2 border-white shadow-sm">
                                            <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Supervisor" alt="Supervisor" />
                                         </div>
                                         <div className="flex-1">
                                            <h4 className="font-bold text-sky-900 text-sm flex items-center gap-1"><Shield className="w-3.5 h-3.5 text-sky-600" /> Pasindu</h4>
                                            <p className="text-xs text-sky-700 font-medium pb-0.5">Field Supervisor</p>
                                         </div>
                                         <button className="w-8 h-8 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center hover:bg-sky-200 transition-colors cursor-pointer">
                                            <Phone className="w-3.5 h-3.5" />
                                         </button>
                                      </div>
                                    )}
                                  </div>
                               </div>
                              );
                            })}
                          </div>
                       </div>
                    </div>
                  </GlassCard>
                </div>

                {/* AI Support Chatbot Sidebar */}
                <div className="lg:col-span-1">
                  <GlassCard className="h-[600px] flex flex-col p-0 overflow-hidden sticky top-24">
                     <div className="bg-indigo-600 p-4 shrink-0">
                       <h2 className="text-white font-bold flex items-center gap-2">
                          <Zap className="w-5 h-5 fill-indigo-300 text-indigo-300" />
                          AI Support Assistant
                       </h2>
                       <p className="text-indigo-200 text-xs mt-1">Available 24/7 for quick answers</p>
                     </div>
                     <div className="flex-1 bg-slate-50/50 p-4 overflow-y-auto flex flex-col gap-4">
                        <div className="bg-white p-3 rounded-2xl rounded-tl-sm border border-slate-100 shadow-sm max-w-[85%] self-start">
                           <p className="text-sm text-slate-700">Hi! I am monitoring your task <b>{trackingTask.id}</b>. Currently, a supervisor is being dispatched. Do you need any help?</p>
                        </div>
                     </div>
                     <div className="p-3 bg-white border-t border-slate-100 shrink-0">
                        <div className="relative">
                           <input type="text" placeholder="Type a message..." className="w-full pl-4 pr-10 py-2 bg-slate-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/50" />
                           <button className="absolute right-2 top-1.5 p-1 text-slate-400 hover:text-indigo-600 transition-colors">
                              <ArrowRight className="w-4 h-4" />
                           </button>
                        </div>
                     </div>
                  </GlassCard>
                </div>
              </div>
            </div>
          </motion.main>
        )}

        {currentPage === 'providerActiveWorkspace' && activeWorkspaceJob && (
          <motion.main
            key="providerActiveWorkspace"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 max-w-4xl mx-auto px-6 pt-32 pb-32 flex justify-center w-full min-h-screen"
          >
            <div className="w-full">
              <div className="flex items-center justify-between mb-8">
               <button 
                  onClick={() => setCurrentPage('providerDashboard')}
                  className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors font-semibold cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                </button>
              </div>

              <div className="space-y-6">
                {/* 1. Header & Financial Summary Strip */}
                <GlassCard className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-l-4 border-l-indigo-600">
                  <div>
                     <div className="flex flex-wrap items-center gap-3 mb-2">
                       <span className="font-mono text-sm font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">Job ID: #{activeWorkspaceJob.id.toUpperCase().replace('JOB-', 'OL-24')}</span>
                       <span className="text-sm font-bold bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full border border-indigo-100 flex items-center gap-1.5">
                         <div className={`w-2 h-2 rounded-full ${providerMilestoneIndex < 5 ? 'bg-indigo-500 animate-pulse' : 'bg-slate-400'}`}></div>
                         Status: {providerMilestoneIndex === 3 ? 'Work In Progress' : providerMilestoneIndex === 4 ? 'Quality Check (Pending)' : 'Completed'}
                       </span>
                     </div>
                     <h1 className="text-2xl font-bold text-slate-900">{activeWorkspaceJob.title}</h1>
                  </div>
                  <div className="flex flex-col items-start md:items-end w-full md:w-auto bg-slate-50 md:bg-transparent p-4 md:p-0 rounded-xl md:rounded-none">
                    <p className="text-sm font-medium text-slate-500 mb-1">Total Payout</p>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl font-black text-slate-900 tracking-tight">LKR {activeWorkspaceJob.budget.toLocaleString()}</span>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md border ${activeWorkspaceJob.isNegotiable ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-green-50 text-green-700 border-green-200'}`}>
                        {activeWorkspaceJob.isNegotiable ? 'Price Negotiable' : 'Fixed Price'}
                      </span>
                    </div>
                  </div>
                </GlassCard>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* 2. Customer Contact & Communication Panel */}
                  <GlassCard className="p-6">
                     <h2 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider flex items-center gap-2">
                       <User className="w-4 h-4 text-slate-400" /> Customer Details
                     </h2>
                     <div className="flex flex-col mb-6">
                        <span className="text-lg font-bold text-slate-900">{activeWorkspaceJob.customerName}</span>
                        <span className="text-sm font-medium text-slate-500">{activeWorkspaceJob.customerPhone}</span>
                     </div>
                     <div className="grid grid-cols-1 gap-3">
                       <a href={`tel:${activeWorkspaceJob.customerPhone}`} className="w-full py-3 px-4 font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2 text-center text-sm">
                         <Phone className="w-4 h-4" /> Call Customer
                       </a>
                       <button onClick={() => alert('AI Support Widget opened.')} className="w-full py-3 px-4 font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2 text-sm">
                         <MessageSquare className="w-4 h-4" /> Chat with Support
                       </button>
                     </div>
                  </GlassCard>

                  {/* 3. Navigation & Precise Location Card */}
                  <GlassCard className="p-6">
                     <h2 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider flex items-center gap-2">
                       <MapPin className="w-4 h-4 text-indigo-500" /> Worksite Location
                     </h2>
                     <div className="flex flex-col mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100 h-20 justify-center">
                        <span className="text-base font-medium text-slate-800 leading-snug">{activeWorkspaceJob.exactAddress}</span>
                     </div>
                     <div className="grid grid-cols-1 gap-3">
                       <a href={`https://www.google.com/maps/search/?api=1&query=${activeWorkspaceJob.lat},${activeWorkspaceJob.lng}`} target="_blank" rel="noopener noreferrer" className="w-full py-3 px-4 font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2 text-center text-sm">
                         <Navigation className="w-4 h-4" /> Open in Google Maps
                       </a>
                     </div>
                  </GlassCard>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* 4. Read-Only Job Scope Box */}
                  <div className="lg:col-span-2 space-y-6">
                    <GlassCard className="p-6 md:p-8">
                       <div className="flex items-center justify-between mb-6">
                         <h2 className="text-lg font-bold text-slate-900">Job Scope</h2>
                         <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md uppercase tracking-wide">{activeWorkspaceJob.category}</span>
                       </div>
                       
                       <div className="prose prose-slate prose-sm max-w-none text-slate-600 mb-8">
                          <p>{activeWorkspaceJob.description}</p>
                       </div>

                       {activeWorkspaceJob.voiceNote && (
                         <div className="mb-8">
                           <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                              <Mic className="w-3.5 h-3.5 text-indigo-500" /> AI Transcript (Voice Note)
                           </h3>
                           <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100">
                             <p className="text-sm text-indigo-900 font-medium italic">"{activeWorkspaceJob.voiceNote}"</p>
                           </div>
                         </div>
                       )}

                       {activeWorkspaceJob.photos && activeWorkspaceJob.photos.length > 0 && (
                         <div>
                            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                               <Camera className="w-3.5 h-3.5 text-slate-400" /> Attached Photos
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                              {activeWorkspaceJob.photos.map((photo: string, index: number) => (
                                <div key={index} className="aspect-square rounded-xl border border-slate-200 overflow-hidden bg-slate-100 cursor-pointer hover:opacity-90 transition-opacity">
                                  <img src={photo} alt={`Task detail ${index + 1}`} className="w-full h-full object-cover" />
                                </div>
                              ))}
                            </div>
                         </div>
                       )}
                    </GlassCard>
                  </div>

                  {/* 5. Real-Time Milestone Tracker */}
                  <div className="lg:col-span-1">
                    <GlassCard className="p-6 md:p-8 h-full">
                       <h2 className="text-lg font-bold text-slate-900 mb-8">Tracker</h2>
                       <div className="relative">
                          <div className="absolute left-[15px] top-2 bottom-2 w-[2px] bg-slate-100 z-0"></div>
                          <div className="space-y-6 relative z-10">
                            {[
                              { title: 'Booked', isSupervisor: false },
                              { title: 'Supervisor Assigned', subtitle: activeWorkspaceJob.supervisorName, isSupervisor: true },
                              { title: 'Site Visit Completed', isSupervisor: true },
                              { title: 'Work In Progress', isSupervisor: false },
                              { title: 'Quality Check', subtitle: 'Supervisor Sign-off', isSupervisor: true },
                              { title: 'Completed', isSupervisor: false }
                            ].map((step, idx) => {
                              const completed = providerMilestoneIndex > idx || (providerMilestoneIndex === 5 && idx === 5);
                              const current = providerMilestoneIndex === idx && providerMilestoneIndex !== 5;
                              return (
                               <div key={idx} className="flex gap-4 items-start">
                                  <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center border-2 shadow-sm bg-white ${completed ? 'border-green-500' : current ? 'border-indigo-600' : 'border-slate-200'}`}>
                                     {completed ? (
                                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                                     ) : current ? (
                                        <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full animate-pulse"></div>
                                     ) : (
                                        <div className="w-1.5 h-1.5 bg-slate-200 rounded-full"></div>
                                     )}
                                  </div>
                                  <div className={`pt-1.5 ${completed || current ? 'opacity-100' : 'opacity-40'}`}>
                                    <h3 className={`text-sm font-bold ${current ? 'text-indigo-900' : completed ? 'text-slate-900' : 'text-slate-500'}`}>{step.title}</h3>
                                    {step.subtitle && <p className="text-xs text-slate-500 mt-0.5">{step.subtitle}</p>}
                                  </div>
                               </div>
                              )
                            })}
                          </div>
                       </div>
                    </GlassCard>
                  </div>
                </div>

                {/* 6. Bottom Action Command Bar */}
                <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 p-4 px-6 z-50 flex justify-center">
                  <div className="w-full max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-4">
                    <button 
                      onClick={() => setIsReportIssueModalOpen(true)}
                      className="w-full sm:w-auto py-3 px-6 text-sm font-bold text-red-600 bg-white border-2 border-red-200 hover:bg-red-50 hover:border-red-300 rounded-xl transition-colors"
                    >
                      Escalate / Report Issue
                    </button>
                    <button 
                      onClick={() => setProviderMilestoneIndex(4)}
                      disabled={providerMilestoneIndex >= 4}
                      className={`w-full sm:w-auto py-3 px-8 text-sm font-bold text-white rounded-xl shadow-lg transition-all ${providerMilestoneIndex >= 4 ? 'bg-indigo-400 cursor-not-allowed shadow-none' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/30'}`}
                    >
                      {providerMilestoneIndex >= 5 ? 'Job Finalized' : providerMilestoneIndex === 4 ? 'Awaiting Quality Check...' : 'Signal Work Completed'}
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </motion.main>
        )}

        {currentPage === 'providerPendingVerification' && (
          <motion.main
            key="providerPendingVerification"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 max-w-xl mx-auto px-6 pt-32 pb-24 flex justify-center w-full min-h-screen"
          >
            <GlassCard className="w-full p-8 md:p-10 h-fit bg-white/50 text-center flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-indigo-50 flex items-center justify-center mb-6 shadow-sm border border-indigo-100">
                <Shield className="w-10 h-10 text-indigo-600" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Awaiting Verification</h1>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-700 font-bold rounded-lg mb-6 border border-amber-200 shadow-sm text-sm">
                <Clock className="w-4 h-4" /> Status: Pending HR Review
              </div>
              <p className="text-slate-600 mb-8 leading-relaxed max-w-md">
                Thank you for applying to be a TaskLink provider. An HR Officer will conduct a verification call with you shortly. Please keep your mobile phone nearby.
              </p>
              
              <div className="w-full bg-slate-50 p-4 rounded-xl text-left border border-slate-200">
                 <h3 className="text-sm font-bold text-slate-900 mb-2 uppercase tracking-wide">Next Steps</h3>
                 <ul className="space-y-3 text-sm text-slate-600">
                   <li className="flex items-start gap-2">
                     <CheckCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                     <span>Application submitted successfully</span>
                   </li>
                   <li className="flex items-start gap-2">
                     <div className="w-4 h-4 rounded-full border-2 border-indigo-400 shrink-0 mt-0.5 relative">
                       <div className="absolute inset-1 rounded-full bg-indigo-600 animate-pulse"></div>
                     </div>
                     <span className="font-semibold text-indigo-900">Document Verification by HR</span>
                   </li>
                   <li className="flex items-start gap-2 opacity-50">
                     <div className="w-4 h-4 rounded-full border-2 border-slate-300 shrink-0 mt-0.5"></div>
                     <span>Phone Interview</span>
                   </li>
                   <li className="flex items-start gap-2 opacity-50">
                     <div className="w-4 h-4 rounded-full border-2 border-slate-300 shrink-0 mt-0.5"></div>
                     <span>Profile Activated</span>
                   </li>
                 </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200/60 w-full">
                <button 
                  onClick={() => setCurrentPage('home')}
                  className="w-full text-base font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 py-3.5 rounded-2xl transition-all duration-300 shadow-sm flex flex-col items-center justify-center max-w-md mx-auto"
                >
                  Return to Homepage
                </button>
              </div>
            </GlassCard>
          </motion.main>
        )}

        {currentPage === 'supervisorDashboard' && (
          <motion.main
            key="supervisorDashboard"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 w-full min-h-screen pb-24 pt-[140px]"
          >
            <div className="px-4 pt-6 pb-6 w-full max-w-md mx-auto">
              <div className="flex flex-col gap-4">
                {supervisorActiveTab === 'assigned' && [
                  { id: 'OL-89412', category: 'Masonry', date: 'Today, 2:30 PM', status: 'Supervisor Assigned', statusColor: 'amber', neighborhood: 'Batticaloa Central', lat: 7.7102, lng: 81.6924, customerName: 'Rathnayake', customerPhone: '0712345678', providerName: 'Siriwardena', providerPhone: '0777123456', providerSkill: 'Masonry Specialist', title: 'Wall Crack Repair', description: 'Deep crack in the boundary wall needs inspecting and concrete patching.', photos: [], voiceNote: null, providerMilestoneIndex: 1 },
                  { id: 'OL-89415', category: 'Plumbing', date: 'Today, 4:00 PM', status: 'Quality Check Pending', statusColor: 'indigo', neighborhood: 'Kallady', lat: 7.7112, lng: 81.6934, customerName: 'Fathima', customerPhone: '0722345678', providerName: 'Nimalsiri', providerPhone: '0767123456', providerSkill: 'Master Plumber', title: 'Burst Pipe Fixing', description: 'Main line burst, provider has signaled work completion.', photos: [], voiceNote: null, providerMilestoneIndex: 4 }
                ].map((job, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col">
                    <div className="flex justify-between items-start mb-3">
                      <span className="font-mono text-sm font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">#{job.id}</span>
                      <span className="text-xs font-semibold px-2 py-1 bg-slate-100 text-slate-600 rounded-md uppercase tracking-wide">{job.category}</span>
                    </div>
                    <div className="mb-4">
                      <div className="flex items-center gap-2 text-slate-600 text-sm mb-1 font-medium">
                        <Calendar className="w-4 h-4 text-slate-400" /> {job.date}
                      </div>
                      <div className="flex items-center gap-2 text-slate-600 text-sm mb-2 font-medium">
                        <MapPin className="w-4 h-4 text-slate-400" /> {job.neighborhood}
                      </div>
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold border ${job.statusColor === 'amber' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-indigo-50 text-indigo-700 border-indigo-200'}`}>
                        <div className={`w-2 h-2 rounded-full ${job.statusColor === 'amber' ? 'bg-amber-500' : 'bg-indigo-500 animate-pulse'}`}></div>
                        Status: {job.status}
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        setSupervisorSelectedJob(job);
                        setCurrentPage('supervisorActiveWorkspace');
                      }}
                      className="mt-auto w-full py-3 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
                    >
                      Go to Job Workspace <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                
                {supervisorActiveTab === 'completed' && (
                  <div className="text-center py-10">
                    <CheckCircle2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500 font-medium">No completed audits yet today.</p>
                  </div>
                )}

                {supervisorActiveTab === 'escalated' && (
                  <div className="text-center py-10">
                    <AlertTriangle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500 font-medium">No active escalated disputes.</p>
                  </div>
                )}
              </div>
            </div>
          </motion.main>
        )}

        {currentPage === 'supervisorActiveWorkspace' && supervisorSelectedJob && (
          <motion.main
            key="supervisorActiveWorkspace"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 w-full min-h-screen bg-slate-50 pb-48 pt-[100px]"
          >
            {/* Header Sticky */}
            <div className="sticky top-[75px] w-full bg-white/95 backdrop-blur-sm z-40 border-b border-slate-200 shadow-sm pt-2">
              <div className="px-4 py-3 flex items-center gap-3">
                <button 
                  onClick={() => setCurrentPage('supervisorDashboard')}
                  className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                  <h1 className="text-sm font-bold text-slate-900 leading-tight">Job #{supervisorSelectedJob.id}</h1>
                  <span className="text-xs text-slate-500 font-medium">{supervisorSelectedJob.status}</span>
                </div>
              </div>
            </div>

            <div className="px-4 pt-6 pb-6 w-full max-w-md mx-auto space-y-6">
              {/* A. Dual-Party Contact Panel */}
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
                  <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <User className="w-4 h-4 text-indigo-500" /> Customer
                  </h2>
                  <div className="flex flex-col mb-4">
                    <span className="text-lg font-bold text-slate-900">{supervisorSelectedJob.customerName}</span>
                    <span className="text-sm text-slate-500 leading-snug mt-1">{supervisorSelectedJob.neighborhood} (Exact Address Hidden for Demo)</span>
                  </div>
                  <a href={`tel:${supervisorSelectedJob.customerPhone}`} className="w-full py-3 bg-indigo-50 text-indigo-700 font-bold rounded-xl flex justify-center items-center gap-2 text-sm border border-indigo-100 transition-colors">
                    <Phone className="w-4 h-4" /> Call Customer
                  </a>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
                  <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-emerald-500" /> Assigned Laborer
                  </h2>
                  <div className="flex flex-col mb-4">
                    <span className="text-lg font-bold text-slate-900">{supervisorSelectedJob.providerName}</span>
                    <span className="text-sm font-medium text-emerald-600 bg-emerald-50 w-max px-2 py-0.5 rounded mt-1">{supervisorSelectedJob.providerSkill}</span>
                  </div>
                  <a href={`tel:${supervisorSelectedJob.providerPhone}`} className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl flex justify-center items-center gap-2 text-sm shadow-sm hover:bg-slate-800 transition-colors">
                    <Phone className="w-4 h-4" /> Call Laborer
                  </a>
                </div>
              </div>

              {/* B. Location & Mapping Tool */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
                 <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Navigation className="w-4 h-4 text-blue-500" /> Worksite Navigation
                 </h2>
                 <p className="text-sm font-medium text-slate-600 mb-4">{supervisorSelectedJob.neighborhood} coordinates established.</p>
                 <a href={`https://www.google.com/maps/search/?api=1&query=${supervisorSelectedJob.lat},${supervisorSelectedJob.lng}`} target="_blank" rel="noopener noreferrer" className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl flex justify-center items-center gap-2 text-sm shadow-md shadow-blue-600/20 hover:bg-blue-700 transition-colors">
                    <MapPin className="w-4 h-4" /> Launch GPS Routing
                 </a>
              </div>

              {/* C. Original Job Request Viewer (Read-Only) */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
                 <div>
                   <h3 className="text-base font-bold text-slate-900 mb-1">{supervisorSelectedJob.title}</h3>
                   <span className="text-xs font-semibold px-2 py-1 bg-slate-100 text-slate-600 rounded-md uppercase tracking-wide">{supervisorSelectedJob.category}</span>
                 </div>
                 <p className="text-sm text-slate-600 border-l-2 border-indigo-200 pl-3 leading-relaxed">{supervisorSelectedJob.description}</p>
                 
                 {supervisorSelectedJob.voiceNote && (
                   <div className="bg-indigo-50/50 p-3 rounded-xl border border-indigo-100">
                     <div className="flex items-center gap-2 mb-2">
                       <Mic className="w-3.5 h-3.5 text-indigo-600" />
                       <span className="text-xs font-semibold text-indigo-900 uppercase tracking-wider">AI Transcription</span>
                     </div>
                     <p className="text-xs text-indigo-800 font-medium italic">"{supervisorSelectedJob.voiceNote}"</p>
                   </div>
                 )}

                 {supervisorSelectedJob.photos && supervisorSelectedJob.photos.length > 0 && (
                   <div className="flex gap-2 overflow-x-auto pb-2 -mx-2 px-2 no-scrollbar">
                     {supervisorSelectedJob.photos.map((photo: string, index: number) => (
                       <div key={index} className="w-24 h-24 shrink-0 rounded-xl border border-slate-200 overflow-hidden bg-slate-100">
                         <img src={photo} alt={`Job detail ${index}`} className="w-full h-full object-cover" />
                       </div>
                     ))}
                   </div>
                 )}
              </div>

              {/* D. Interactive Assessment & Data Entry Form */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
                 <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Edit2 className="w-4 h-4 text-emerald-500" /> Field Assessment Notes
                 </h2>
                 <textarea 
                   value={supervisorAssessmentNotes}
                   onChange={(e) => setSupervisorAssessmentNotes(e.target.value)}
                   placeholder="Enter official scope assessment, material needs, or quality check findings..."
                   className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-none h-32 mb-4"
                 />
                 
                 <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center bg-slate-50 text-center relative overflow-hidden group cursor-pointer hover:bg-slate-100 transition-colors">
                   <input type="file" multiple accept="image/*" capture="environment" className="absolute inset-0 opacity-0 cursor-pointer z-10" onChange={(e) => {
                     if (e.target.files) {
                       setSupervisorEvidences(Array.from(e.target.files).map(f => URL.createObjectURL(f as File)));
                     }
                   }} />
                   <Camera className="w-6 h-6 text-slate-400 mb-2 group-hover:-translate-y-1 transition-transform" />
                   <p className="text-sm font-semibold text-slate-700">Upload On-Site Evidence</p>
                   <p className="text-xs text-slate-500 mt-1">Tap to capture or select images</p>
                 </div>

                 {supervisorEvidences.length > 0 && (
                   <div className="flex gap-2 overflow-x-auto mt-4 pb-2">
                     {supervisorEvidences.map((photo, index) => (
                       <div key={index} className="w-16 h-16 shrink-0 rounded-xl border border-slate-200 overflow-hidden bg-slate-100">
                         <img src={photo} alt={`Evidence ${index}`} className="w-full h-full object-cover" />
                       </div>
                     ))}
                   </div>
                 )}
              </div>
            </div>

            {/* E. Milestone State Progression Controls (Fixed Bottom) */}
            <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 p-4 z-[60] pb-[calc(1rem+env(safe-area-inset-bottom))]">
              <div className="max-w-md mx-auto flex flex-col gap-3">
                {supervisorSelectedJob.providerMilestoneIndex === 1 && (
                  <button 
                    onClick={() => {
                      alert('Site Visit Confirmed! Work is now authorized.');
                      setCurrentPage('supervisorDashboard');
                    }}
                    className="w-full py-3.5 bg-emerald-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-600/30 hover:bg-emerald-700 transition-colors"
                  >
                    Confirm Site Visit & Authorize Work
                  </button>
                )}
                
                {supervisorSelectedJob.providerMilestoneIndex === 4 && (
                  <button 
                    onClick={() => {
                      alert('Quality Check Approved! Payout will be released.');
                      setCurrentPage('supervisorDashboard');
                    }}
                    className="w-full py-3.5 bg-indigo-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-600/30 hover:bg-indigo-700 transition-colors"
                  >
                    Approve Quality Check & Release Payout
                  </button>
                )}

                <button 
                  onClick={() => setIsSupervisorEscalateModalOpen(true)}
                  className="w-full py-3.5 bg-white text-red-600 border border-red-200 font-bold text-sm rounded-xl hover:bg-red-50 transition-colors"
                >
                  Escalate Dispute / Halt Work
                </button>
              </div>
            </div>

          </motion.main>
        )}

        {currentPage === 'hrDashboard' && (
          <motion.main
            key="hrDashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-slate-50 flex overflow-hidden"
          >
            {/* Left Sidebar Navigation */}
            <div className="w-64 bg-slate-900 text-white flex flex-col h-full border-r border-slate-800 shrink-0">
              <div className="h-16 flex items-center px-6 border-b border-slate-800">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 mr-2">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-lg tracking-tight text-white">TaskLink HR</span>
              </div>
              <div className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
                <button 
                  onClick={() => setHrActiveTab('onboarding')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    hrActiveTab === 'onboarding' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <UserPlus className="w-5 h-5" /> Onboarding Queue
                  <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">5</span>
                </button>
                <button 
                  onClick={() => setHrActiveTab('directory')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    hrActiveTab === 'directory' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Users className="w-5 h-5" /> Verified Directory
                </button>
                <button 
                  onClick={() => setHrActiveTab('analytics')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    hrActiveTab === 'analytics' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <BarChart2 className="w-5 h-5" /> Performance Analytics
                </button>
              </div>
              <div className="p-4 border-t border-slate-800">
                <button onClick={() => { setCurrentUserRole(null); setCurrentPage('home'); }} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-400 hover:bg-slate-800 hover:text-red-400 transition-colors w-full">
                  <LogOut className="w-5 h-5" /> Log Out
                </button>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-full overflow-hidden relative">
              {/* Top Header Bar */}
              <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
                <h1 className="text-xl font-bold text-slate-800">HR Administration Terminal</h1>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-900">{profileData.firstName} {profileData.lastName}</p>
                    <p className="text-xs font-semibold text-indigo-600">HR Officer</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border border-slate-300">
                    <img src="https://api.dicebear.com/7.x/notionists/svg?seed=David" alt="HR profile" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>

              {/* Tab Content */}
              <div className="flex-1 overflow-y-auto p-8">
                {hrActiveTab === 'onboarding' && (
                  <div className="space-y-6">
                    {/* A. Search, Sort, & Filter Row */}
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="relative flex-1 max-w-sm">
                        <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input 
                          type="text" 
                          placeholder="Search by applicant name or ID..."
                          value={hrSearchQuery}
                          onChange={(e) => setHrSearchQuery(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                        />
                      </div>
                      <select 
                        value={hrTradeFilter}
                        onChange={(e) => setHrTradeFilter(e.target.value)}
                        className="w-full md:w-auto px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 appearance-none"
                      >
                        <option>All Trades</option>
                        <option>Masons</option>
                        <option>Carpenters</option>
                        <option>Electricians</option>
                        <option>Plumbers</option>
                        <option>Painters</option>
                        <option>Cleaners</option>
                        <option>Allied Trades</option>
                      </select>
                      <select 
                        value={hrExperienceFilter}
                        onChange={(e) => setHrExperienceFilter(e.target.value)}
                        className="w-full md:w-auto px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 appearance-none"
                      >
                        <option>All</option>
                        <option>0-2 Years</option>
                        <option>3-5 Years</option>
                        <option>5+ Years</option>
                      </select>
                    </div>

                    {/* B. Main Applicants Data Table */}
                    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                      <div className="overflow-x-auto w-full">
                        <table className="w-full text-left text-sm whitespace-nowrap min-w-max">
                          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-xs">
                            <tr>
                              <th className="px-6 py-4">Applicant ID</th>
                              <th className="px-6 py-4">Profile Snapshot</th>
                              <th className="px-6 py-4">Selected Trade</th>
                              <th className="px-6 py-4">Experience</th>
                              <th className="px-6 py-4">Submission Timestamp</th>
                              <th className="px-6 py-4">Status</th>
                              <th className="px-6 py-4 text-right">Action</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {[
                              { id: 'APP-1024', name: 'Nalin Perera', avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Nalin', trade: 'Electrician', experience: '4 Years', date: '2023-10-25 14:30', status: 'Pending HR Review', nic: '851234567V', address: '123 Kandy Rd, Kurunegala', phone: '0711234567' },
                              { id: 'APP-1025', name: 'Chaminda Silva', avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Chaminda', trade: 'Plumber', experience: '7 Years', date: '2023-10-25 15:15', status: 'Pending HR Review', nic: '781234567X', address: '45 Galle Rd, Colombo 3', phone: '0779876543' },
                              { id: 'APP-1026', name: 'Sunil Kumara', avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=SunilK', trade: 'Mason', experience: '2 Years', date: '2023-10-26 09:00', status: 'Pending HR Review', nic: '911234567V', address: '12 Temple Rd, Kandy', phone: '0701234567' },
                            ].map((applicant, i) => (
                              <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4 font-mono text-slate-500">#{applicant.id}</td>
                                <td className="px-6 py-4 flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-200">
                                    <img src={applicant.avatar} alt={applicant.name} className="w-full h-full object-cover" />
                                  </div>
                                  <span className="font-bold text-slate-800">{applicant.name}</span>
                                </td>
                                <td className="px-6 py-4">
                                  <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-bold">{applicant.trade}</span>
                                </td>
                                <td className="px-6 py-4 text-slate-600 font-medium">{applicant.experience}</td>
                                <td className="px-6 py-4 text-slate-500">{applicant.date}</td>
                                <td className="px-6 py-4">
                                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></div>
                                    {applicant.status}
                                  </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                  <button 
                                    onClick={() => {
                                      setHrSelectedApplicant(applicant);
                                      setIsHrApplicationDrawerOpen(true);
                                    }}
                                    className="px-4 py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg text-sm font-bold transition-colors border border-indigo-200"
                                  >
                                    Review Application
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {hrActiveTab === 'directory' && (
                  <div className="space-y-6">
                    {/* A. Main Performance Grid Table */}
                    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                      <div className="overflow-x-auto w-full">
                        <table className="w-full text-left text-sm whitespace-nowrap min-w-max">
                          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-xs">
                            <tr>
                              <th className="px-6 py-4">Laborer ID</th>
                              <th className="px-6 py-4">Professional Identity</th>
                              <th className="px-6 py-4">Trade Designation</th>
                              <th className="px-6 py-4">System Status</th>
                              <th className="px-6 py-4">Completed Jobs</th>
                              <th className="px-6 py-4">Avg Rating</th>
                              <th className="px-6 py-4">Response Time</th>
                              <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {[
                              { id: 'LAB-7890', name: 'Sarath Fonseka', avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Sarath', trade: 'Plumber', status: 'Active', jobs: 42, rating: 4.8, response: '14 mins' },
                              { id: 'LAB-7891', name: 'Kamal Addara', avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Kamal', trade: 'Electrician', status: 'Suspended', jobs: 12, rating: 3.2, response: '45 mins' },
                              { id: 'LAB-7892', name: 'Ruwan Wijesinghe', avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Ruwan', trade: 'Carpenter', status: 'Active', jobs: 89, rating: 4.9, response: '8 mins' },
                            ].map((laborer, i) => (
                              <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4 font-mono text-slate-500">#{laborer.id}</td>
                                <td className="px-6 py-4 flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-200">
                                    <img src={laborer.avatar} alt={laborer.name} className="w-full h-full object-cover" />
                                  </div>
                                  <span className="font-bold text-slate-800">{laborer.name}</span>
                                </td>
                                <td className="px-6 py-4">
                                  <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-bold">{laborer.trade}</span>
                                </td>
                                <td className="px-6 py-4">
                                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold border ${laborer.status === 'Active' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                                    <div className={`w-1.5 h-1.5 rounded-full ${laborer.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                    {laborer.status}
                                  </span>
                                </td>
                                <td className="px-6 py-4 font-semibold text-slate-700">{laborer.jobs} jobs</td>
                                <td className="px-6 py-4 flex items-center gap-1 font-bold text-slate-800">
                                  <Star className={`w-4 h-4 ${laborer.rating >= 4.5 ? 'text-amber-400 fill-amber-400' : laborer.rating >= 4.0 ? 'text-amber-400' : 'text-slate-300'}`} />
                                  {laborer.rating}
                                </td>
                                <td className="px-6 py-4 text-slate-600">Avg: {laborer.response}</td>
                                <td className="px-6 py-4 flex justify-end gap-2 text-right">
                                  <button 
                                    onClick={() => {
                                      setHrSelectedLaborerLog(laborer);
                                      setIsHrLogModalOpen(true);
                                    }}
                                    className="px-3 py-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg text-xs font-bold transition-colors"
                                  >
                                    View Complete Log
                                  </button>
                                  <button className="px-3 py-1.5 bg-white text-red-600 border border-red-200 hover:bg-red-50 rounded-lg text-xs font-bold transition-colors">
                                    Restrict Account
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
                
                {hrActiveTab === 'analytics' && (
                  <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                    <BarChart2 className="w-16 h-16 mb-4 opacity-50" />
                    <p className="text-lg font-medium">Performance analytics coming soon...</p>
                  </div>
                )}
              </div>
              
              {/* Slide-Over Drawer */}
              <AnimatePresence>
                {isHrApplicationDrawerOpen && hrSelectedApplicant && (
                  <>
                    <motion.div 
                      className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm z-[110]"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setIsHrApplicationDrawerOpen(false)}
                    />
                    <motion.div 
                      className="absolute top-0 right-0 h-full w-[800px] max-w-full bg-white shadow-2xl z-[120] flex flex-col border-l border-slate-200"
                      initial={{ x: '100%' }}
                      animate={{ x: 0 }}
                      exit={{ x: '100%' }}
                      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    >
                      <div className="h-16 border-b border-slate-200 flex items-center justify-between px-6 shrink-0 bg-white">
                        <h2 className="text-lg font-bold text-slate-900">Application Review: #{hrSelectedApplicant.id}</h2>
                        <button onClick={() => setIsHrApplicationDrawerOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-50 border-b border-slate-200">
                        {/* Panel Left: Personal & Contact Profiles */}
                        <div className="space-y-6">
                          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Personal & Contact Profiles</h3>
                            
                            <div className="space-y-4">
                              <div>
                                <span className="block text-xs font-medium text-slate-500 mb-1">Full Legal Name</span>
                                <span className="block text-sm font-bold text-slate-800">{hrSelectedApplicant.name}</span>
                              </div>
                              <div>
                                <span className="block text-xs font-medium text-slate-500 mb-1">National Identity Card (NIC)</span>
                                <span className="block text-sm font-bold text-slate-800 font-mono">{hrSelectedApplicant.nic}</span>
                              </div>
                              <div>
                                <span className="block text-xs font-medium text-slate-500 mb-1">Permanent Residential Address</span>
                                <span className="block text-sm font-bold text-slate-800">{hrSelectedApplicant.address}</span>
                              </div>
                              <div>
                                <span className="block text-xs font-medium text-slate-500 mb-1">Verified Mobile Number</span>
                                <span className="block text-sm font-bold text-slate-800">{hrSelectedApplicant.phone}</span>
                              </div>
                              
                              <a href={`tel:${hrSelectedApplicant.phone}`} className="mt-4 w-full py-3 bg-slate-800 text-white font-bold rounded-xl flex justify-center items-center gap-2 text-sm shadow-sm hover:bg-slate-900 transition-colors">
                                <Phone className="w-4 h-4" /> Call Applicant
                              </a>
                            </div>
                          </div>
                        </div>

                        {/* Panel Right: Professional Document Viewer */}
                        <div className="space-y-6 flex flex-col h-full">
                          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex-1 flex flex-col">
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Professional Document Viewer</h3>
                            
                            <div className="flex gap-4 mb-4">
                              <div className="flex-1 bg-slate-50 p-3 rounded-lg border border-slate-100 w-1/2">
                                <span className="block text-xs font-medium text-slate-500 mb-1">Declared Trade Base</span>
                                <span className="block text-sm font-bold text-slate-800">{hrSelectedApplicant.trade}</span>
                              </div>
                              <div className="flex-1 bg-slate-50 p-3 rounded-lg border border-slate-100 w-1/2">
                                <span className="block text-xs font-medium text-slate-500 mb-1">Years of Experience</span>
                                <span className="block text-sm font-bold text-slate-800">{hrSelectedApplicant.experience}</span>
                              </div>
                            </div>
                            
                            <div className="flex-1 border-2 border-slate-200 rounded-xl bg-slate-50 flex flex-col items-center justify-center min-h-[250px] p-6 text-center">
                               <FileText className="w-12 h-12 text-slate-300 mb-3" />
                               <p className="text-sm font-medium text-slate-500 mb-4 px-2">Inline preview unavailable for this document type.</p>
                               <button className="px-4 py-2 bg-white border border-slate-200 shadow-sm text-slate-700 font-bold rounded-lg text-sm flex items-center gap-2 hover:bg-slate-50 transition-colors">
                                 <Download className="w-4 h-4 text-slate-500" /> Download CV Document
                               </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Drawer Footer: Decision Action Panel */}
                      <div className="p-6 bg-white shrink-0 flex gap-4">
                        <button 
                          onClick={() => { setIsHrRejectModalOpen(true); }}
                          className="flex-1 py-3.5 bg-white border-2 border-red-500 text-red-600 font-bold rounded-xl text-sm hover:bg-red-50 transition-colors"
                        >
                          Reject Application
                        </button>
                        <button 
                          onClick={() => { alert('Profile Activated & Deployed.'); setIsHrApplicationDrawerOpen(false); }}
                          className="flex-1 py-3.5 bg-green-600 text-white font-bold rounded-xl text-sm shadow-md shadow-green-600/20 hover:bg-green-700 transition-colors"
                        >
                          Approve & Activate Profile
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>

              {/* Reject Application Modal */}
              <AnimatePresence>
                {isHrRejectModalOpen && (
                  <div className="fixed inset-0 z-[130] flex items-center justify-center p-4">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsHrRejectModalOpen(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 overflow-hidden">
                      <h3 className="text-lg font-bold text-slate-900 mb-4">Reject Application</h3>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Reason for refusal</label>
                      <select value={hrRejectReason} onChange={(e) => setHrRejectReason(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 mb-6 truncate max-w-full">
                        <option value="">Select a reason...</option>
                        <option value="Incomplete CV Document">Incomplete CV Document</option>
                        <option value="Mismatched Identification Data">Mismatched Identification Data</option>
                        <option value="Failed Verification Call">Failed Verification Call</option>
                        <option value="Insufficient Experience Record">Insufficient Experience Record</option>
                      </select>
                      <div className="flex gap-3">
                        <button onClick={() => setIsHrRejectModalOpen(false)} className="flex-1 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl text-sm hover:bg-slate-200 transition-colors">Cancel</button>
                        <button onClick={() => { alert('Rejected.'); setIsHrRejectModalOpen(false); setIsHrApplicationDrawerOpen(false); }} className="flex-1 py-2.5 bg-red-600 text-white font-bold rounded-xl text-sm hover:bg-red-700 transition-colors disabled:opacity-50" disabled={!hrRejectReason}>Confirm Rejection</button>
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>

              {/* Complete Log Modal */}
              <AnimatePresence>
                {isHrLogModalOpen && hrSelectedLaborerLog && (
                  <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsHrLogModalOpen(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
                      <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
                         <div>
                            <h3 className="text-lg font-bold text-slate-900">Performance Log: {hrSelectedLaborerLog.name}</h3>
                            <span className="text-xs font-mono text-slate-500">#{hrSelectedLaborerLog.id}</span>
                         </div>
                         <button onClick={() => setIsHrLogModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5"/></button>
                      </div>
                      
                      <div className="flex-1 overflow-y-auto p-6 bg-white space-y-6">
                        {/* Metrics Snapshot */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-center">
                            <span className="block text-xs font-medium text-slate-500 uppercase tracking-widest mb-1">Cancel Rate</span>
                            <span className="text-xl font-bold text-slate-900">2.4%</span>
                          </div>
                          <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-center">
                            <span className="block text-xs font-medium text-slate-500 uppercase tracking-widest mb-1">Avg Speed</span>
                            <span className="text-xl font-bold text-slate-900">4.5 Hrs</span>
                          </div>
                          <div className="bg-green-50 border border-green-100 rounded-xl p-4 text-center">
                            <span className="block text-xs font-medium text-green-700 uppercase tracking-widest mb-1">Current Flag</span>
                            <span className="text-xl font-bold text-green-800">Clear</span>
                          </div>
                        </div>

                        {/* Review Feed */}
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Consumer Feedback History</h4>
                          <div className="space-y-4">
                            {[
                              { customer: 'Mrs. Silva', score: 5, comment: 'Excellent work. Very polite and cleaned up perfectly.' },
                              { customer: 'Mr. Fernando', score: 4, comment: 'Good job overall, arrived a bit late but finished quickly.' },
                              { customer: 'Anonymous', score: 5, comment: 'Fixed the leak immediately. Highly recommended.' }
                            ].map((review, i) => (
                               <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                                 <div className="flex items-center justify-between mb-2">
                                    <span className="font-bold text-sm text-slate-800">{review.customer}</span>
                                    <div className="flex gap-0.5">
                                      {[...Array(5)].map((_, j) => (
                                        <Star key={j} className={`w-3.5 h-3.5 ${j < review.score ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} />
                                      ))}
                                    </div>
                                 </div>
                                 <p className="text-sm text-slate-600 leading-relaxed">"{review.comment}"</p>
                               </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>

            </div>
          </motion.main>
        )}

        {currentPage === 'financeDashboard' && (
          <motion.main
            key="financeDashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-slate-50 flex overflow-hidden"
          >
            {/* Left Sidebar Navigation */}
            <div className="w-64 bg-slate-900 text-white flex flex-col h-full border-r border-slate-800 shrink-0">
              <div className="h-16 flex items-center px-6 border-b border-slate-800">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 mr-2">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-lg tracking-tight text-white">TaskLink Finance</span>
              </div>
              <div className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
                <button 
                  onClick={() => setFinanceActiveTab('ledger')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    financeActiveTab === 'ledger' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Receipt className="w-5 h-5" /> Transaction Ledger
                </button>
                <button 
                  onClick={() => setFinanceActiveTab('reconciliation')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    financeActiveTab === 'reconciliation' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <FileWarning className="w-5 h-5" /> Reconciliation Desk
                </button>
                <button 
                  onClick={() => setFinanceActiveTab('analytics')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    financeActiveTab === 'analytics' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <BarChart2 className="w-5 h-5" /> Revenue Analytics
                </button>
              </div>
              <div className="p-4 border-t border-slate-800">
                <button onClick={() => { setCurrentUserRole(null); setCurrentPage('home'); }} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-400 hover:bg-slate-800 hover:text-red-400 transition-colors w-full">
                  <LogOut className="w-5 h-5" /> Log Out
                </button>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-full overflow-hidden relative">
              {/* Top Header Bar */}
              <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
                <h1 className="text-xl font-bold text-slate-800">Finance Control Terminal</h1>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-900">{profileData.firstName} {profileData.lastName}</p>
                    <p className="text-xs font-semibold text-indigo-600">Financial Controller</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border border-slate-300">
                    <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Emma" alt="Finance profile" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>

              {/* Tab Content */}
              <div className="flex-1 overflow-y-auto p-8">
                {financeActiveTab === 'ledger' && (
                  <div className="space-y-6">
                    {/* A. Global Metric Scorecards (Top Row) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-5">
                        <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center text-green-600 shrink-0">
                          <CreditCard className="w-7 h-7" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-1">Gross Revenue (This Month)</p>
                          <p className="text-3xl font-bold text-slate-900">LKR 24,500.00</p>
                        </div>
                      </div>
                      
                      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center">
                        <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
                          <div className="flex items-center gap-2">
                            <Target className="w-5 h-5 text-indigo-500" />
                            <span className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Break-Even Tracker</span>
                          </div>
                          <span className="text-sm font-bold text-slate-800">245 / 300</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-3.5 mb-1 overflow-hidden flex">
                          <div className="bg-indigo-500 h-full rounded-full" style={{ width: '81.6%' }}></div>
                        </div>
                        <div className="flex justify-between text-xs text-slate-500 font-medium">
                          <span>0%</span>
                          <span>Target: 300 Bookings</span>
                        </div>
                      </div>
                    </div>

                    {/* B. PayHere Ledger Table */}
                    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden mt-8">
                      <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                        <h3 className="font-bold text-slate-800">Platform Transaction Ledger</h3>
                      </div>
                      <div className="overflow-x-auto w-full">
                        <table className="w-full text-left text-sm whitespace-nowrap min-w-max">
                          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-xs">
                            <tr>
                              <th className="px-6 py-4">Reference ID</th>
                              <th className="px-6 py-4">Job ID</th>
                              <th className="px-6 py-4">Customer Profile</th>
                              <th className="px-6 py-4">Amount</th>
                              <th className="px-6 py-4">Timestamp</th>
                              <th className="px-6 py-4">Status</th>
                              <th className="px-6 py-4 text-right">Action</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {[
                              { ref: 'PH-10928374', job: 'JOB-8493', customerName: 'Roshan Silva', customerId: 'CUS-492', amount: 'LKR 100.00', date: '2023-11-20 09:45:12', status: 'Success' },
                              { ref: 'PH-10928375', job: 'JOB-8494', customerName: 'Amara Weerasinghe', customerId: 'CUS-102', amount: 'LKR 100.00', date: '2023-11-20 10:15:33', status: 'Success' },
                              { ref: 'PH-10928376', job: 'JOB-8495', customerName: 'Dinesh Perera', customerId: 'CUS-511', amount: 'LKR 100.00', date: '2023-11-20 11:30:05', status: 'Pending Webhook' },
                              { ref: 'PH-10928377', job: 'JOB-8496', customerName: 'Sunethra Kumaran', customerId: 'CUS-208', amount: 'LKR 100.00', date: '2023-11-20 14:22:10', status: 'Failed' },
                            ].map((tx, i) => (
                              <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4 font-mono text-slate-500">{tx.ref}</td>
                                <td className="px-6 py-4"><a href="#" className="font-bold text-indigo-600 hover:underline">{tx.job}</a></td>
                                <td className="px-6 py-4">
                                  <span className="font-bold text-slate-800 block">{tx.customerName}</span>
                                  <span className="text-xs text-slate-500 font-mono">{tx.customerId}</span>
                                </td>
                                <td className="px-6 py-4 font-bold text-slate-800">{tx.amount}</td>
                                <td className="px-6 py-4 text-slate-500 text-xs font-mono">{tx.date}</td>
                                <td className="px-6 py-4">
                                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold border ${tx.status === 'Success' ? 'bg-green-50 text-green-700 border-green-200' : tx.status === 'Failed' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                                    <div className={`w-1.5 h-1.5 rounded-full ${tx.status === 'Success' ? 'bg-green-500' : tx.status === 'Failed' ? 'bg-red-500' : 'bg-amber-500'}`}></div>
                                    {tx.status}
                                  </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                  <button 
                                    onClick={() => { setFinanceSelectedTransaction(tx); setIsInvoiceModalOpen(true); }}
                                    className="px-3 py-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-md text-xs font-bold transition-colors border border-slate-200"
                                  >
                                    View Invoice Summary
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {financeActiveTab === 'reconciliation' && (
                  <div className="space-y-6">
                    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                      <div className="px-6 py-5 border-b border-slate-200 bg-red-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 text-amber-500"/> Gateway Discrepancy Queue
                          </h3>
                          <p className="text-sm text-slate-500 mt-1">Transactions flagged with a synchronization error or mismatched signature.</p>
                        </div>
                      </div>
                      <div className="overflow-x-auto w-full">
                        <table className="w-full text-left text-sm whitespace-nowrap min-w-max">
                          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-xs">
                            <tr>
                              <th className="px-6 py-4">System Log ID</th>
                              <th className="px-6 py-4">User Reference</th>
                              <th className="px-6 py-4">Reported Issue</th>
                              <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {[
                              { log: 'LOG-ERR-940', user: 'CUS-834', issue: 'Signature Mismatch (MD5 Hash Failed)' },
                              { log: 'LOG-ERR-941', user: 'CUS-112', issue: 'Gateway Timeout (Webhook Not Received)' },
                            ].map((err, i) => (
                              <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4 font-mono text-slate-500 text-xs">{err.log}</td>
                                <td className="px-6 py-4 font-mono font-bold text-slate-700">{err.user}</td>
                                <td className="px-6 py-4">
                                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                                    <AlertCircle className="w-3.5 h-3.5" />
                                    {err.issue}
                                  </span>
                                </td>
                                <td className="px-6 py-4 flex justify-end gap-3 text-right">
                                  <button className="px-4 py-2 bg-slate-800 text-white hover:bg-slate-900 rounded-lg text-sm font-bold transition-colors shadow-sm">
                                    Verify Gateway Signature
                                  </button>
                                  <button onClick={() => alert("Moving job status manually to BOOKED")} className="px-4 py-2 bg-white text-amber-600 border border-amber-600 hover:bg-amber-50 rounded-lg text-sm font-bold transition-colors flex items-center gap-1.5">
                                    <AlertTriangle className="w-3.5 h-3.5"/> Force Manual Approval
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {financeActiveTab === 'analytics' && (
                  <div className="space-y-6">
                    {/* A. Interactive Filters Row */}
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                       <div className="flex items-center gap-4 w-full sm:w-auto">
                         <div className="relative">
                            <select 
                              value={financeSelectedDateRange}
                              onChange={(e) => setFinanceSelectedDateRange(e.target.value)}
                              className="pl-4 pr-10 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50 appearance-none shadow-sm"
                            >
                              <option>Today</option>
                              <option>This Week</option>
                              <option>This Month</option>
                              <option>Last Quarter</option>
                              <option>Year to Date</option>
                            </select>
                            <Calendar className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                         </div>
                       </div>
                       <button className="flex items-center justify-center gap-2 px-5 py-2 w-full sm:w-auto bg-indigo-600 text-white rounded-lg text-sm font-bold shadow-md shadow-indigo-600/20 hover:bg-indigo-700 transition-colors">
                         <Download className="w-4 h-4" /> Export Financial Report
                       </button>
                    </div>

                    {/* B. Core Data Charts Components */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pt-4">
                       {/* Component 1: Revenue Velocity Graph */}
                       <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                         <h3 className="font-bold text-slate-800 text-lg mb-6 flex items-center gap-2">
                           Revenue Velocity
                           <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">(LKR)</span>
                         </h3>
                         <div className="h-72 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart
                                data={[
                                  { name: 'Mon', revenue: 1200 },
                                  { name: 'Tue', revenue: 1800 },
                                  { name: 'Wed', revenue: 2400 },
                                  { name: 'Thu', revenue: 1600 },
                                  { name: 'Fri', revenue: 3100 },
                                  { name: 'Sat', revenue: 4200 },
                                  { name: 'Sun', revenue: 3800 },
                                ]}
                                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                              >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                                <Tooltip 
                                  contentStyle={{borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                                  formatter={(value: number) => [`LKR ${value}`, 'Revenue']}
                                />
                                <Line type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={3} dot={{r: 4, strokeWidth: 2, fill: '#fff'}} activeDot={{r: 6}} />
                              </LineChart>
                            </ResponsiveContainer>
                         </div>
                       </div>

                       {/* Component 2: Category Profitability Index */}
                       <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                         <h3 className="font-bold text-slate-800 text-lg mb-6">Category Profitability Index</h3>
                         <div className="h-72 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart
                                data={[
                                  { name: 'Plumbing', volume: 145 },
                                  { name: 'Electrical', volume: 180 },
                                  { name: 'Masonry', volume: 85 },
                                  { name: 'Carpentry', volume: 110 },
                                  { name: 'Cleaning', volume: 220 },
                                ]}
                                margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
                                layout="vertical"
                              >
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                                <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 13, fontWeight: 500}} width={90} />
                                <Tooltip 
                                  contentStyle={{borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                                  cursor={{fill: '#f1f5f9'}}
                                  formatter={(value: number) => [`${value} Bookings`, 'Volume']}
                                />
                                <Bar dataKey="volume" fill="#10b981" radius={[0, 4, 4, 0]} barSize={24} />
                              </BarChart>
                            </ResponsiveContainer>
                         </div>
                       </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Invoice Modal Summary */}
            <AnimatePresence>
              {isInvoiceModalOpen && financeSelectedTransaction && (
                <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsInvoiceModalOpen(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
                  <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden flex flex-col">
                     <div className="p-6 text-center border-b border-indigo-100 bg-indigo-50/50">
                        <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm mb-4 border border-indigo-100 text-indigo-600">
                          <Receipt className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 mb-1">{financeSelectedTransaction.amount}</h3>
                        <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Platform Fee</p>
                     </div>
                     <div className="p-6 space-y-4">
                        <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                          <span className="text-sm text-slate-500">Status</span>
                          <span className="font-bold text-green-600 flex items-center gap-1.5"><CheckCircle className="w-4 h-4"/> Paid</span>
                        </div>
                        <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                          <span className="text-sm text-slate-500">Date</span>
                          <span className="font-medium text-slate-800 text-sm">{financeSelectedTransaction.date}</span>
                        </div>
                        <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                          <span className="text-sm text-slate-500">Customer</span>
                          <span className="font-medium text-slate-800 text-sm text-right">{financeSelectedTransaction.customerName}<br/><span className="text-xs text-slate-400 font-mono">{financeSelectedTransaction.customerId}</span></span>
                        </div>
                        <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                          <span className="text-sm text-slate-500">Reference ID</span>
                          <span className="font-mono text-slate-600 text-xs bg-slate-100 px-2 py-1 rounded">{financeSelectedTransaction.ref}</span>
                        </div>
                        <div className="pt-2">
                          <button onClick={() => setIsInvoiceModalOpen(false)} className="w-full py-3 bg-slate-900 hover:bg-indigo-600 text-white font-bold rounded-xl text-sm transition-all shadow-md shadow-slate-900/10">Close Receipt</button>
                        </div>
                     </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
            
          </motion.main>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSupervisorEscalateModalOpen && (
          <div className="fixed top-0 left-0 w-full h-full z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setIsSupervisorEscalateModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-slate-900">Escalate Dispute</h2>
                <button onClick={() => setIsSupervisorEscalateModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-slate-600 mb-4">Describe the issue (e.g., safety hazards, pricing arguments, severe connectivity drops) to alert Admin and Finance officers immediately.</p>
              
              <textarea 
                value={supervisorEscalateDescription}
                onChange={(e) => setSupervisorEscalateDescription(e.target.value)}
                placeholder="Enter details..."
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/50 resize-none h-32 mb-4"
              />
              
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setIsSupervisorEscalateModalOpen(false)}
                  className="py-3 px-4 font-bold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors text-sm"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    alert('Dispute Escalated to Admins.');
                    setIsSupervisorEscalateModalOpen(false);
                    setSupervisorEscalateDescription('');
                    setCurrentPage('supervisorDashboard');
                  }}
                  className="py-3 px-4 font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-md transition-colors text-sm"
                >
                  Halt & Report
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Post Task Options Modal */}
      <AnimatePresence>
        {isPostTaskOptionsOpen && (
          <div className="fixed top-0 left-0 w-full h-full z-[60] flex items-center justify-center">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setIsPostTaskOptionsOpen(false)}
            />
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md mx-4 bg-white border border-slate-200/60 rounded-3xl p-6 shadow-2xl"
            >
              <button 
                onClick={() => setIsPostTaskOptionsOpen(false)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
               >
                 <X className="w-5 h-5" />
              </button>

              <h2 className="text-xl font-bold text-slate-900 mb-2 mt-2">How would you like to hire?</h2>
              <p className="text-sm text-slate-500 mb-6">Choose how you want to connect with providers.</p>

              <div className="flex flex-col gap-4">
                <button
                  onClick={() => {
                    setCurrentPage('directHireList');
                    setIsPostTaskOptionsOpen(false);
                  }}
                  className="flex flex-col items-start p-4 text-left rounded-2xl border-2 border-slate-100 hover:border-indigo-500 hover:bg-indigo-50/50 transition-all group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-indigo-100 text-indigo-700 rounded-lg">
                      <User className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-slate-900 group-hover:text-indigo-900 transition-colors">Direct Hire</span>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed">Browse providers and invite them directly to discuss your task.</p>
                </button>

                <button
                  onClick={() => {
                    setCurrentPage('postTask');
                    setIsPostTaskOptionsOpen(false);
                  }}
                  className="flex flex-col items-start p-4 text-left rounded-2xl border-2 border-slate-100 hover:border-purple-500 hover:bg-purple-50/50 transition-all group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-purple-100 text-purple-700 rounded-lg">
                      <Search className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-slate-900 group-hover:text-purple-900 transition-colors">Broadcast Job (Global Search)</span>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed">Post your task publicly and let qualified providers apply.</p>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Incoming Job Alert Modal */}
      <AnimatePresence>
        {incomingJobAlert && (
          <div className="fixed top-0 left-0 w-full h-full z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white border border-indigo-200/60 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="bg-indigo-600 p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
                <div className="absolute top-[0%] left-[0%] w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent animate-pulse" />
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 relative">
                    <div className="absolute inset-0 rounded-full border-4 border-white/30 animate-ping"></div>
                    <Zap className="w-8 h-8 text-white drop-shadow-sm" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-1">New Job Matching Your Profile!</h2>
                  <p className="text-indigo-100 text-sm font-medium">Accept quickly before another provider takes it.</p>
                </div>
              </div>
              
              <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center gap-4 justify-between">
                 <div className="flex items-center gap-3">
                   <Clock className="w-5 h-5 text-amber-500" />
                   <div>
                     <p className="text-sm font-bold text-slate-900">Time Remaining</p>
                     <p className="text-xs text-slate-500 text-left">Reserving slot for</p>
                   </div>
                 </div>
                 <div className="text-4xl font-black tabular-nums text-amber-500 tracking-tighter">
                   00:{jobAlertCountdown.toString().padStart(2, '0')}
                 </div>
              </div>

              <div className="p-6 flex flex-col gap-4">
                 <div className="flex justify-between items-start">
                   <div>
                     <h3 className="text-xl font-bold text-slate-900">{incomingJobAlert.title}</h3>
                     <span className="text-xs font-semibold px-2 py-1 bg-slate-100 text-slate-600 rounded-md mt-2 inline-block">{incomingJobAlert.category}</span>
                   </div>
                   <div className="flex flex-col items-end">
                     <span className="font-bold text-indigo-700 text-xl">LKR {incomingJobAlert.budget.toLocaleString()}</span>
                     <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm mt-1 ${incomingJobAlert.isNegotiable ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>
                       {incomingJobAlert.isNegotiable ? 'Negotiable' : 'Fixed'}
                     </span>
                   </div>
                 </div>
                 
                 <div className="flex items-center gap-2 text-sm text-slate-600 font-medium bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <MapPin className="w-4 h-4 text-indigo-500" /> {incomingJobAlert.distance} ({incomingJobAlert.neighborhood})
                 </div>
                 
                 <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Scope</h4>
                    <p className="text-sm text-slate-600 leading-relaxed border-l-2 border-indigo-200 pl-3">{incomingJobAlert.description}</p>
                 </div>
              </div>
              
              <div className="p-6 pt-0 mt-auto grid grid-cols-2 gap-3">
                 <button 
                   onClick={() => setIncomingJobAlert(null)}
                   className="py-3.5 px-4 text-sm font-bold text-slate-600 border-2 border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-colors"
                 >
                   Pass Job
                 </button>
                 <button 
                   onClick={() => {
                     setProviderJobFeed(providerJobFeed.filter(j => j.id !== incomingJobAlert?.id));
                     setActiveWorkspaceJob({
                       ...incomingJobAlert,
                       customerName: 'Ashan Silva',
                       customerPhone: '0777123456',
                       exactAddress: '12/4, Station Road, Nugegoda',
                       lat: 6.8649,
                       lng: 79.8997,
                       supervisorName: 'Ayesh (Assigned)'
                     });
                     setIncomingJobAlert(null);
                     setProviderMilestoneIndex(3);
                     setCurrentPage('providerActiveWorkspace');
                   }}
                   className="py-3.5 px-4 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-lg shadow-indigo-600/30 hover:shadow-xl transition-all"
                 >
                   Accept Request
                 </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Job Feedback Modal */}
      <AnimatePresence>
        {isFeedbackModalOpen && (
          <div className="fixed top-0 left-0 w-full h-full z-[60] flex items-center justify-center">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg mx-4 bg-white border border-slate-200/60 rounded-3xl p-8 shadow-2xl"
            >
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                   <CheckCircle className="w-8 h-8" />
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">Job Completed!</h2>
              <p className="text-sm text-slate-500 mb-8 text-center px-4">Your task has been successfully completed. Please leave a review for your provider to help others.</p>

              <div className="flex flex-col items-center gap-6 mb-8">
                <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Rate the Provider</h3>
                <div className="flex items-center gap-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setFeedbackRating(star)}
                      className={`p-2 rounded-full transition-all hover:scale-110 cursor-pointer ${feedbackRating >= star ? 'text-amber-400' : 'text-slate-200 hover:text-amber-200'}`}
                    >
                      <Star className="w-10 h-10 fill-current" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Write a Review</label>
                <textarea 
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  rows={4}
                  placeholder="Share your experience working with this provider..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-slate-900 resize-none transition-all"
                />
              </div>

              <button
                disabled={feedbackRating === 0}
                onClick={() => {
                  setCompletedTasksCount(prev => prev + 1);
                  setIsFeedbackModalOpen(false);
                  setFeedbackRating(0);
                  setFeedbackText('');
                  setTrackingTask(null);
                  setMilestoneIndex(0);
                  setCurrentPage('customerDashboard');
                }}
                className={`w-full py-3.5 font-bold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer ${feedbackRating > 0 ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
              >
                Submit Review
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Report Issue Modal */}
      <AnimatePresence>
        {isReportIssueModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setIsReportIssueModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl p-8"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-slate-900">Escalate / Report Issue</h2>
                <button onClick={() => setIsReportIssueModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-slate-600 mb-6">Please describe the issue you are facing on-site. This alert will be sent immediately to the administrative dashboard and your assigned Field Supervisor.</p>

              <textarea 
                value={issueDescription}
                onChange={(e) => setIssueDescription(e.target.value)}
                placeholder="e.g., Additional plumbing materials needed, or Customer requested extra work outside original scope..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl mb-6 focus:outline-none focus:ring-2 focus:ring-red-500/50 resize-none h-32 text-sm"
              ></textarea>

              <div className="flex gap-3">
                <button 
                  onClick={() => setIsReportIssueModalOpen(false)}
                  className="w-full py-3 text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-2xl transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    setIsReportIssueModalOpen(false);
                    setIssueDescription('');
                    alert('Issue reported to the Field Supervisor and Administration successfully.');
                  }}
                  disabled={!issueDescription.trim()}
                  className={`w-full py-3 text-sm font-bold text-white rounded-2xl transition-colors ${!issueDescription.trim() ? 'bg-red-300 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 shadow-lg shadow-red-600/20'}`}
                >
                  Submit Report
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      {(currentUserRole !== 'supervisor' && currentUserRole !== 'hr' && currentUserRole !== 'finance') && (
      <footer className="relative z-10 border-t border-slate-200/60 bg-white/30 backdrop-blur-md mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-4 md:py-6">
          <div className="flex flex-col items-center text-center gap-4">
            <div 
              className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
              onClick={() => setCurrentPage('home')}
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-sm">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-xl text-slate-800 tracking-tight">TaskLink</span>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm font-medium text-slate-600">
              <a href="#" className="hover:text-indigo-600 hover:bg-white/50 px-4 py-2 rounded-xl transition-all">About</a>
              <a href="#" className="hover:text-indigo-600 hover:bg-white/50 px-4 py-2 rounded-xl transition-all">Contact Us</a>
              <a href="#" className="hover:text-indigo-600 hover:bg-white/50 px-4 py-2 rounded-xl transition-all">Terms & Conditions</a>
              <a href="#" className="hover:text-indigo-600 hover:bg-white/50 px-4 py-2 rounded-xl transition-all">Privacy Policy</a>
            </div>
            
            <div className="text-sm text-slate-500 font-medium">
              &copy; {new Date().getFullYear()} TaskLink Inc. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
      )}
    </div>
  );
}