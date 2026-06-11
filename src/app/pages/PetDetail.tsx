import { useNavigate, useParams } from "react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Progress } from "../components/ui/progress";
import { LanguageSelector } from "../components/LanguageSelector";
import { useLanguage } from "../contexts/LanguageContext";
import {
  PawPrint,
  ArrowLeft,
  Calendar,
  Syringe,
  Pill,
  FileText,
  Bell,
  Edit,
  TrendingUp,
  Heart,
  Activity as ActivityIcon,
} from "lucide-react";

interface ScheduledEvent {
  type: string;
  frequency: string;
  time: string;
  startDate: string;
}

interface Pet {
  id: number;
  name: string;
  species: string;
  breed: string;
  age: string;
  image: string;
  nextVaccination: string;
  scheduledEvents?: ScheduledEvent[];
}

interface Activity {
  id: number;
  type: string;
  description: string;
  date: string;
  photo?: string;
}

export function PetDetail() {
  const navigate = useNavigate();
  const { petId } = useParams();
  const { t } = useLanguage();

  // Mock data - in real app would fetch from state/API
  const pets: Pet[] = [
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
      scheduledEvents: [
        {
          type: "clean-teeth",
          frequency: "weekly",
          time: "09:00",
          startDate: "2026-06-10",
        },
        {
          type: "groom",
          frequency: "weekly",
          time: "09:00",
          startDate: "2026-06-10",
        },
      ],
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

  const pet = pets.find((p) => p.id === Number(petId));

  if (!pet) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="mb-4">Pet not found</h2>
          <Button onClick={() => navigate("/app")}>Back to Home</Button>
        </div>
      </div>
    );
  }

  const recentActivity: Activity[] = [
    {
      id: 1,
      type: "vaccination",
      description: "Rabies vaccination completed",
      date: "May 28, 2026",
    },
    {
      id: 2,
      type: "journal",
      description: "Regular checkup notes",
      date: "Jun 1, 2026",
    },
    {
      id: 3,
      type: "journal",
      description: "Eating well, active and playful",
      date: "Jun 3, 2026",
    },
    {
      id: 4,
      type: "medication",
      description: "Flea prevention administered",
      date: "May 20, 2026",
    },
  ];

  // Health summary data - in real app would be calculated from journal entries
  const healthSummary = {
    overallHealth: "excellent", // excellent, good, fair, poor
    eventsCompleted: 12,
    journalEntries: 8,
    incidents: 1, // negative health events
    positiveEntries: 7,
    healthScore: 92, // 0-100
    weeklyTrend: [
      { week: "Week 1", score: 85 },
      { week: "Week 2", score: 88 },
      { week: "Week 3", score: 90 },
      { week: "Week 4", score: 92 },
    ],
  };

  const getHealthEmoji = (health: string) => {
    switch (health) {
      case "excellent":
        return "😊";
      case "good":
        return "🙂";
      case "fair":
        return "😐";
      case "poor":
        return "😟";
      default:
        return "🙂";
    }
  };

  const getHealthLabel = (health: string) => {
    switch (health) {
      case "excellent":
        return "Excellent";
      case "good":
        return "Good";
      case "fair":
        return "Fair";
      case "poor":
        return "Needs Attention";
      default:
        return "Good";
    }
  };

  const getHealthColor = (health: string) => {
    switch (health) {
      case "excellent":
        return "text-green-600";
      case "good":
        return "text-blue-600";
      case "fair":
        return "text-yellow-600";
      case "poor":
        return "text-red-600";
      default:
        return "text-blue-600";
    }
  };

  const eventTypeLabels: Record<string, string> = {
    "clean-teeth": "Clean Teeth",
    groom: "Groom",
    deworm: "Deworm",
    "trim-claws": "Trim Claws",
    medication: "Medication",
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-6xl">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/app")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("backToHome")}
          </Button>
          <div className="flex items-center gap-2">
            <LanguageSelector />
            <PawPrint className="w-6 h-6 text-blue-600" />
            <span className="font-semibold">PetCare Pro</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Pet Header */}
        <Card className="p-6 mb-8">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-5xl flex-shrink-0">
              {pet.image}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1>{pet.name}</h1>
                <Badge variant="secondary">{pet.species}</Badge>
              </div>
              <p className="text-muted-foreground mb-4">
                {pet.breed} • {pet.age}
              </p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  {t("editInfo")}
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Entry Modes */}
        <Card className="p-6 mb-8">
          <h3 className="mb-4">{t("quickEntry")} for {pet.name}</h3>
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
              <span>Appointment</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <ActivityIcon className="w-5 h-5" />
              <span>Journal Entry</span>
            </Button>
          </div>
        </Card>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">{t("overview")}</TabsTrigger>
            <TabsTrigger value="health">{t("health")}</TabsTrigger>
            <TabsTrigger value="schedule">{t("schedule")}</TabsTrigger>
            <TabsTrigger value="activity">{t("activity")}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-6">
            <Card className="p-6">
              <h3 className="mb-4">{t("healthInformation")}</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("nextVaccination")}</span>
                  <span className="font-medium">{pet.nextVaccination}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("lastCheckup")}</span>
                  <span className="font-medium">May 28, 2026</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{t("weight")}</span>
                  <span className="font-medium">12 lbs</span>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="health" className="space-y-4 mt-6">
            {/* Overall Health Status */}
            <Card className="p-6">
              <div className="text-center">
                <div className="text-7xl mb-4">
                  {getHealthEmoji(healthSummary.overallHealth)}
                </div>
                <h2 className={`mb-2 ${getHealthColor(healthSummary.overallHealth)}`}>
                  {t(healthSummary.overallHealth)}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {t("overallHealthStatus")}
                </p>
                <div className="max-w-md mx-auto">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">{t("healthScore")}</span>
                    <span className="font-medium">{healthSummary.healthScore}/100</span>
                  </div>
                  <Progress value={healthSummary.healthScore} className="h-2" />
                </div>
              </div>
            </Card>

            {/* Health Metrics */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold">{healthSummary.eventsCompleted}</p>
                    <p className="text-sm text-muted-foreground">{t("eventsCompleted")}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold">{healthSummary.positiveEntries}</p>
                    <p className="text-sm text-muted-foreground">{t("positiveEntries")}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                    <Bell className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold">{healthSummary.incidents}</p>
                    <p className="text-sm text-muted-foreground">{t("incidents")}</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Weekly Trend */}
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <h3>{t("healthTrend")}</h3>
              </div>
              <div className="space-y-4">
                {healthSummary.weeklyTrend.map((week, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">{week.week}</span>
                      <span className="font-medium">{week.score}/100</span>
                    </div>
                    <Progress value={week.score} className="h-2" />
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-start gap-2">
                  <Heart className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-green-900">
                      {t("trendingUpward")}
                    </p>
                    <p className="text-xs text-green-700 mt-1">
                      {pet.name}'s {t("healthImproving")}
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Journal Summary */}
            <Card className="p-6">
              <h3 className="mb-4">{t("journalSummary")}</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">{t("totalEntries")}</span>
                  <Badge variant="secondary">{healthSummary.journalEntries}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">{t("positiveNotes")}</span>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                    {healthSummary.positiveEntries}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">{t("healthConcerns")}</span>
                  <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                    {healthSummary.incidents}
                  </Badge>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-4 mt-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3>Scheduled Events</h3>
                <Button size="sm" variant="outline">
                  <Bell className="w-4 h-4 mr-2" />
                  Add Event
                </Button>
              </div>

              {pet.scheduledEvents && pet.scheduledEvents.length > 0 ? (
                <div className="space-y-3">
                  {pet.scheduledEvents.map((event, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <p className="font-medium">
                          {eventTypeLabels[event.type]}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {event.frequency.charAt(0).toUpperCase() +
                            event.frequency.slice(1)}{" "}
                          at {event.time}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Starts {event.startDate}
                        </p>
                      </div>
                      <Calendar className="w-5 h-5 text-blue-600" />
                    </div>
                  ))}
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-start gap-2">
                      <Bell className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-blue-900">
                          Push Notifications Enabled
                        </p>
                        <p className="text-xs text-blue-700 mt-1">
                          You'll receive reminders like "Time for {pet.name}'s teeth
                          cleaning!" or "Grooming time for {pet.name}!" on your
                          phone at the scheduled times.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">
                    No scheduled events yet
                  </p>
                  <Button size="sm" className="mt-4">
                    Set Up Events
                  </Button>
                </div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4 mt-6">
            <Card className="p-6">
              <h3 className="mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      {activity.type === "vaccination" && (
                        <Syringe className="w-4 h-4 text-blue-600" />
                      )}
                      {activity.type === "medication" && (
                        <Pill className="w-4 h-4 text-blue-600" />
                      )}
                      {activity.type === "journal" && (
                        <FileText className="w-4 h-4 text-blue-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
