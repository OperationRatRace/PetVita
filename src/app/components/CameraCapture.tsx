import { useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
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
import { Camera, X, Check, Upload } from "lucide-react";

interface Pet {
  id: number;
  name: string;
  species: string;
}

interface CameraCaptureProps {
  open: boolean;
  onClose: () => void;
  pets: Pet[];
  onSave: (data: {
    petId: number;
    petName: string;
    photo: string;
    notes: string;
  }) => void;
}

export function CameraCapture({
  open,
  onClose,
  pets,
  onSave,
}: CameraCaptureProps) {
  const [step, setStep] = useState<"capture" | "select" | "notes" | "confirm">(
    "capture"
  );
  const [selectedPet, setSelectedPet] = useState<string>("");
  const [notes, setNotes] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
        setStep("select");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (selectedPet && photo) {
      const pet = pets.find((p) => p.id.toString() === selectedPet);
      if (pet) {
        onSave({
          petId: pet.id,
          petName: pet.name,
          photo,
          notes,
        });
        handleClose();
      }
    }
  };

  const handleClose = () => {
    setStep("capture");
    setSelectedPet("");
    setNotes("");
    setPhoto(null);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>
            {step === "capture" && "Capture Photo/Video"}
            {step === "select" && "Select Pet"}
            {step === "notes" && "Add Notes"}
            {step === "confirm" && "Confirm Entry"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {step === "capture" && (
            <div className="text-center">
              <div className="border-2 border-dashed border-border rounded-lg p-12 mb-4">
                <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">
                  Take a photo or select from gallery
                </p>
                <input
                  type="file"
                  accept="image/*,video/*"
                  capture="environment"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="camera-input"
                />
                <Label htmlFor="camera-input">
                  <Button type="button" asChild>
                    <span>
                      <Upload className="w-4 h-4 mr-2" />
                      Select Photo/Video
                    </span>
                  </Button>
                </Label>
              </div>
            </div>
          )}

          {step === "select" && (
            <div>
              {photo && (
                <div className="mb-4 relative">
                  <img
                    src={photo}
                    alt="Captured"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}
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
                  onClick={() => setStep("capture")}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  onClick={() => setStep("notes")}
                  disabled={!selectedPet}
                  className="flex-1"
                >
                  Next
                </Button>
              </div>
            </div>
          )}

          {step === "notes" && (
            <div>
              {photo && (
                <div className="mb-4 relative">
                  <img
                    src={photo}
                    alt="Captured"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}
              <Label htmlFor="notes">Add Notes</Label>
              <Textarea
                id="notes"
                placeholder="Describe what you observed... (e.g., 'Sallita's poop looks normal, good consistency')"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
              />
              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  onClick={() => setStep("select")}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button onClick={() => setStep("confirm")} className="flex-1">
                  Next
                </Button>
              </div>
            </div>
          )}

          {step === "confirm" && (
            <div>
              {photo && (
                <div className="mb-4 relative">
                  <img
                    src={photo}
                    alt="Captured"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}
              <div className="space-y-3 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Pet</p>
                  <p className="font-medium">
                    {pets.find((p) => p.id.toString() === selectedPet)?.name}
                  </p>
                </div>
                {notes && (
                  <div>
                    <p className="text-sm text-muted-foreground">Notes</p>
                    <p className="text-sm">{notes}</p>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setStep("notes")}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button onClick={handleSave} className="flex-1">
                  <Check className="w-4 h-4 mr-2" />
                  Add to Journal
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
