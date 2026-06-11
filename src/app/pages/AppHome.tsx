import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { CameraCapture } from "../components/CameraCapture";
import { ScheduledEventsSetup } from "../components/ScheduledEventsSetup";
import { LanguageSelector } from "../components/LanguageSelector";
import { SettingsDialog } from "../components/SettingsDialog";
import { Toaster } from "../components/ui/sonner";
import { toast } from "sonner";
import { useLanguage } from "../contexts/LanguageContext";
import {
  PawPrint,
  Plus,
  Syringe,
  Pill,
  Calendar,
  AlertCircle,
  Activity,
  Camera,
  FileText,
} from "lucide-react";

interface ActivityItem {
  id: number;
  type: "vaccination" | "appointment" | "medication" | "journal";
  pet: string;
  description: string;
  date: string;
  photo?: string;
}

export function AppHome() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [cameraOpen, setCameraOpen] = useState(false);
  const [scheduledEventsOpen, setScheduledEventsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Mock data - in a real app this would come from state/API
  const pets = [
    {
      id: 1,
      name: "Max",
      species: "Dog",
      breed: "Golden Retriever",
      age: "3 years",
      image: "🐕",
      nextVaccination: "Jul 15, 2026",
    },
    {
      id: 2,
      name: "Luna",
      species: "Cat",
      breed: "Siamese",
      age: "2 years",
      image: "🐱",
      nextVaccination: "Jun 20, 2026",
    },
    {
      id: 3,
      name: "Sallita The Killer Kat",
      species: "Cat",
      breed: "Tabby",
      age: "4 years",
      image: "😼",
      nextVaccination: "Aug 10, 2026",
    },
    {
      id: 4,
      name: "Dranik The Snake Kat",
      species: "Cat",
      breed: "Russian Blue",
      age: "5 years",
      image: "😺",
      nextVaccination: "Sep 5, 2026",
    },
    {
      id: 5,
      name: "Maalish The Mat",
      species: "Cat",
      breed: "Persian",
      age: "3 years",
      image: "😻",
      nextVaccination: "Jul 20, 2026",
    },
  ];

  // Show scheduled events setup prompt after a short delay on first load
  useEffect(() => {
    const hasSeenPrompt = localStorage.getItem("hasSeenScheduledEventsPrompt");
    if (!hasSeenPrompt && pets.length > 0) {
      const timer = setTimeout(() => {
        setScheduledEventsOpen(true);
        localStorage.setItem("hasSeenScheduledEventsPrompt", "true");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [pets.length]);

  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([
    {
      id: 1,
      type: "vaccination",
      pet: "Max",
      description: "Rabies vaccination completed",
      date: "May 28, 2026",
    },
    {
      id: 2,
      type: "appointment",
      pet: "Luna",
      description: "Annual checkup scheduled",
      date: "Jun 1, 2026",
    },
    {
      id: 3,
      type: "medication",
      pet: "Max",
      description: "Started flea prevention medication",
      date: "May 15, 2026",
    },
  ]);

  const handleSaveJournal = (data: {
    petId: number;
    petName: string;
    photo: string;
    notes: string;
  }) => {
    const newEntry: ActivityItem = {
      id: Date.now(),
      type: "journal",
      pet: data.petName,
      description: data.notes || "Journal entry with photo",
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      photo: data.photo,
    };
    setRecentActivity([newEntry, ...recentActivity]);
    toast.success(`Journal entry added for ${data.petName}`);
  };

  const handleSaveScheduledEvents = (data: {
    petId: number;
    petName: string;
    events: Array<{
      type: string;
      frequency: string;
      time: string;
      startDate: string;
    }>;
  }) => {
    toast.success(
      `Scheduled events set up for ${data.petName}! You'll receive notifications at the scheduled times.`
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-6xl">
          <div className="flex items-center gap-2">
            <PawPrint className="w-8 h-8 text-blue-600" />
            <span className="font-semibold text-xl">PetCare Pro</span>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSelector />
            <Button variant="ghost" size="sm" onClick={() => setSettingsOpen(true)}>
              {t("settings")}
            </Button>
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-blue-600 text-white">
                JD
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="mb-2">{t("welcomeBack")}, John!</h1>
          <p className="text-muted-foreground">
            {t("petsToday")}
          </p>
        </div>

        {/* Quick Entry Modes */}
        <Card className="p-6 mb-8">
          <h3 className="mb-4">{t("quickEntry")}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <Syringe className="w-5 h-5" />
              <span>{t("vaccination")}</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <Pill className="w-5 h-5" />
              <span>{t("medication")}</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <Calendar className="w-5 h-5" />
              <span>{t("events")}</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <Activity className="w-5 h-5" />
              <span>{t("surprises")}</span>
            </Button>
          </div>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Registered Pets */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2>{t("yourPets")}</h2>
              <Button onClick={() => navigate("/app/register-pet")}>
                <Plus className="w-4 h-4 mr-2" />
                {t("registerPet")}
              </Button>
            </div>

            {pets.length === 0 ? (
              <Card className="p-12 text-center">
                <PawPrint className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="mb-2">{t("noPetsYet")}</h3>
                <p className="text-muted-foreground mb-4">
                  {t("addFirstPet")}
                </p>
                <Button onClick={() => navigate("/app/register-pet")}>
                  <Plus className="w-4 h-4 mr-2" />
                  {t("registerFirstPet")}
                </Button>
              </Card>
            ) : (
              <div className="space-y-4">
                {pets.map((pet) => (
                  <Card
                    key={pet.id}
                    className="p-6 cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => navigate(`/app/pet/${pet.id}`)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-3xl">
                        {pet.image}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3>{pet.name}</h3>
                          <Badge variant="secondary">{pet.species}</Badge>
                        </div>
                        <p className="text-muted-foreground mb-3">
                          {pet.breed} • {pet.age}
                        </p>
                        <div className="flex items-center gap-2 text-sm">
                          <AlertCircle className="w-4 h-4 text-orange-500" />
                          <span className="text-muted-foreground">
                            Next vaccination: {pet.nextVaccination}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/app/pet/${pet.id}`);
                        }}
                      >
                        {t("viewDetails")}
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Recent Activity */}
          <div>
            <h3 className="mb-4">{t("recentActivity")}</h3>
            <Card className="p-4">
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      {activity.type === "vaccination" && (
                        <Syringe className="w-4 h-4 text-blue-600" />
                      )}
                      {activity.type === "appointment" && (
                        <Calendar className="w-4 h-4 text-blue-600" />
                      )}
                      {activity.type === "medication" && (
                        <Pill className="w-4 h-4 text-blue-600" />
                      )}
                      {activity.type === "journal" && (
                        <FileText className="w-4 h-4 text-blue-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{activity.pet}</p>
                      {activity.photo && (
                        <img
                          src={activity.photo}
                          alt="Journal entry"
                          className="w-full h-24 object-cover rounded my-2"
                        />
                      )}
                      <p className="text-sm text-muted-foreground">
                        {activity.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {activity.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Floating Camera Button */}
      <Button
        size="lg"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-shadow"
        onClick={() => setCameraOpen(true)}
      >
        <Camera className="w-6 h-6" />
      </Button>

      {/* Camera Capture Modal */}
      <CameraCapture
        open={cameraOpen}
        onClose={() => setCameraOpen(false)}
        pets={pets}
        onSave={handleSaveJournal}
      />

      {/* Scheduled Events Setup Modal */}
      <ScheduledEventsSetup
        open={scheduledEventsOpen}
        onClose={() => setScheduledEventsOpen(false)}
        pets={pets}
        onSave={handleSaveScheduledEvents}
      />

      {/* Settings Dialog */}
      <SettingsDialog
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />

      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
}
