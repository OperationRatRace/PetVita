import { useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Calendar, Check } from "lucide-react";

interface Pet {
  id: number;
  name: string;
  species: string;
}

interface ScheduledEventsSetupProps {
  open: boolean;
  onClose: () => void;
  pets: Pet[];
  onSave: (data: {
    petId: number;
    petName: string;
    events: Array<{
      type: string;
      frequency: string;
      time: string;
      startDate: string;
    }>;
  }) => void;
}

const eventTypes = [
  { id: "clean-teeth", label: "Clean Teeth" },
  { id: "groom", label: "Groom" },
  { id: "deworm", label: "Deworm" },
  { id: "trim-claws", label: "Trim Claws" },
  { id: "medication", label: "Medication" },
];

export function ScheduledEventsSetup({
  open,
  onClose,
  pets,
  onSave,
}: ScheduledEventsSetupProps) {
  const [step, setStep] = useState<"intro" | "select-pet" | "select-events" | "schedule" | "confirm">("intro");
  const [selectedPet, setSelectedPet] = useState<string>("");
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [frequency, setFrequency] = useState<string>("weekly");
  const [time, setTime] = useState<string>("09:00");
  const [startDate, setStartDate] = useState<string>("");

  const handleEventToggle = (eventId: string) => {
    setSelectedEvents((prev) =>
      prev.includes(eventId)
        ? prev.filter((id) => id !== eventId)
        : [...prev, eventId]
    );
  };

  const handleSave = () => {
    if (selectedPet && selectedEvents.length > 0) {
      const pet = pets.find((p) => p.id.toString() === selectedPet);
      if (pet) {
        onSave({
          petId: pet.id,
          petName: pet.name,
          events: selectedEvents.map((eventType) => ({
            type: eventType,
            frequency,
            time,
            startDate,
          })),
        });
        handleClose();
      }
    }
  };

  const handleClose = () => {
    setStep("intro");
    setSelectedPet("");
    setSelectedEvents([]);
    setFrequency("weekly");
    setTime("09:00");
    setStartDate("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>
            {step === "intro" && "Setup Scheduled Events"}
            {step === "select-pet" && "Select Pet"}
            {step === "select-events" && "Choose Care Events"}
            {step === "schedule" && "Set Schedule"}
            {step === "confirm" && "Confirm Events"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {step === "intro" && (
            <div className="text-center py-4">
              <Calendar className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h3 className="mb-2">Never Miss Pet Care Tasks</h3>
              <p className="text-muted-foreground mb-6">
                Would you like to set up scheduled reminders for your pet's care routines?
                We'll notify you at the right time for teeth cleaning, grooming, and more.
              </p>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleClose} className="flex-1">
                  Maybe Later
                </Button>
                <Button onClick={() => setStep("select-pet")} className="flex-1">
                  Yes, Set Up Events
                </Button>
              </div>
            </div>
          )}

          {step === "select-pet" && (
            <div>
              <Label htmlFor="pet-select">Select Pet</Label>
              <Select value={selectedPet} onValueChange={setSelectedPet}>
                <SelectTrigger id="pet-select">
                  <SelectValue placeholder="Choose a pet" />
                </SelectTrigger>
                <SelectContent>
                  {pets.map((pet) => (
                    <SelectItem key={pet.id} value={pet.id.toString()}>
                      {pet.name} ({pet.species})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  onClick={() => setStep("intro")}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  onClick={() => setStep("select-events")}
                  disabled={!selectedPet}
                  className="flex-1"
                >
                  Next
                </Button>
              </div>
            </div>
          )}

          {step === "select-events" && (
            <div>
              <Label className="mb-3 block">Select Care Events</Label>
              <div className="space-y-3">
                {eventTypes.map((event) => (
                  <div key={event.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={event.id}
                      checked={selectedEvents.includes(event.id)}
                      onCheckedChange={() => handleEventToggle(event.id)}
                    />
                    <Label
                      htmlFor={event.id}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {event.label}
                    </Label>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  onClick={() => setStep("select-pet")}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  onClick={() => setStep("schedule")}
                  disabled={selectedEvents.length === 0}
                  className="flex-1"
                >
                  Next
                </Button>
              </div>
            </div>
          )}

          {step === "schedule" && (
            <div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="frequency">Repeat Frequency</Label>
                  <Select value={frequency} onValueChange={setFrequency}>
                    <SelectTrigger id="frequency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="biweekly">Every 2 Weeks</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="start-date">Start Date</Label>
                  <Input
                    id="start-date"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="time">Notification Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  onClick={() => setStep("select-events")}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  onClick={() => setStep("confirm")}
                  disabled={!startDate}
                  className="flex-1"
                >
                  Next
                </Button>
              </div>
            </div>
          )}

          {step === "confirm" && (
            <div>
              <div className="space-y-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Pet</p>
                  <p className="font-medium">
                    {pets.find((p) => p.id.toString() === selectedPet)?.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Events</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedEvents.map((eventId) => (
                      <span
                        key={eventId}
                        className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
                      >
                        {eventTypes.find((e) => e.id === eventId)?.label}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Schedule</p>
                  <p className="text-sm">
                    {frequency.charAt(0).toUpperCase() + frequency.slice(1)} at {time}
                  </p>
                  <p className="text-sm">Starting {startDate}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setStep("schedule")}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button onClick={handleSave} className="flex-1">
                  <Check className="w-4 h-4 mr-2" />
                  Confirm & Save
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
