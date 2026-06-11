import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { PawPrint, ArrowLeft, ArrowRight, Check } from "lucide-react";

export function RegisterPet() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);
  const [identificationData, setIdentificationData] = useState({
    name: "",
    species: "",
    breed: "",
    gender: "",
    dateOfBirth: "",
    color: "",
    microchipId: "",
    weight: "",
  });

  const [medicalData, setMedicalData] = useState({
    allergies: "",
    medications: "",
    vaccinations: "",
    conditions: "",
    vetName: "",
    vetPhone: "",
    insurance: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save the data
    navigate("/app");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-4xl">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/app")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <div className="flex items-center gap-2">
            <PawPrint className="w-6 h-6 text-blue-600" />
            <span className="font-semibold">PetCare Pro</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {step > 1 ? <Check className="w-4 h-4" /> : "1"}
              </div>
              <span
                className={step >= 1 ? "font-medium" : "text-muted-foreground"}
              >
                Identification
              </span>
            </div>
            <div className="w-16 h-0.5 bg-gray-200">
              <div
                className={`h-full bg-blue-600 transition-all ${
                  step >= 2 ? "w-full" : "w-0"
                }`}
              />
            </div>
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 2
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                2
              </div>
              <span
                className={step >= 2 ? "font-medium" : "text-muted-foreground"}
              >
                Medical Info
              </span>
            </div>
          </div>
        </div>

        <Card className="p-8">
          {step === 1 ? (
            <>
              <div className="mb-6">
                <h1 className="mb-2">Pet Identification</h1>
                <p className="text-muted-foreground">
                  Let's start with basic information about your pet
                </p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setStep(2);
                }}
                className="space-y-4"
              >
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Pet Name *</Label>
                    <Input
                      id="name"
                      placeholder="Max"
                      value={identificationData.name}
                      onChange={(e) =>
                        setIdentificationData({
                          ...identificationData,
                          name: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="species">Species *</Label>
                    <Select
                      value={identificationData.species}
                      onValueChange={(value) =>
                        setIdentificationData({
                          ...identificationData,
                          species: value,
                        })
                      }
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select species" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dog">Dog</SelectItem>
                        <SelectItem value="cat">Cat</SelectItem>
                        <SelectItem value="bird">Bird</SelectItem>
                        <SelectItem value="rabbit">Rabbit</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="breed">Breed</Label>
                    <Input
                      id="breed"
                      placeholder="Golden Retriever"
                      value={identificationData.breed}
                      onChange={(e) =>
                        setIdentificationData({
                          ...identificationData,
                          breed: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                      value={identificationData.gender}
                      onValueChange={(value) =>
                        setIdentificationData({
                          ...identificationData,
                          gender: value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={identificationData.dateOfBirth}
                      onChange={(e) =>
                        setIdentificationData({
                          ...identificationData,
                          dateOfBirth: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder="50"
                      value={identificationData.weight}
                      onChange={(e) =>
                        setIdentificationData({
                          ...identificationData,
                          weight: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="color">Color/Markings</Label>
                    <Input
                      id="color"
                      placeholder="Golden with white chest"
                      value={identificationData.color}
                      onChange={(e) =>
                        setIdentificationData({
                          ...identificationData,
                          color: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="microchipId">Microchip ID</Label>
                    <Input
                      id="microchipId"
                      placeholder="123456789012345"
                      value={identificationData.microchipId}
                      onChange={(e) =>
                        setIdentificationData({
                          ...identificationData,
                          microchipId: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/app")}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    Next: Medical Information
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </form>
            </>
          ) : (
            <>
              <div className="mb-6">
                <h1 className="mb-2">Medical Information</h1>
                <p className="text-muted-foreground">
                  Help us keep track of your pet's health history
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="allergies">Known Allergies</Label>
                  <Textarea
                    id="allergies"
                    placeholder="List any known allergies (e.g., chicken, penicillin)"
                    value={medicalData.allergies}
                    onChange={(e) =>
                      setMedicalData({
                        ...medicalData,
                        allergies: e.target.value,
                      })
                    }
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="medications">Current Medications</Label>
                  <Textarea
                    id="medications"
                    placeholder="List current medications and dosages"
                    value={medicalData.medications}
                    onChange={(e) =>
                      setMedicalData({
                        ...medicalData,
                        medications: e.target.value,
                      })
                    }
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="vaccinations">Vaccination History</Label>
                  <Textarea
                    id="vaccinations"
                    placeholder="List completed vaccinations and dates"
                    value={medicalData.vaccinations}
                    onChange={(e) =>
                      setMedicalData({
                        ...medicalData,
                        vaccinations: e.target.value,
                      })
                    }
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="conditions">
                    Pre-existing Conditions
                  </Label>
                  <Textarea
                    id="conditions"
                    placeholder="List any chronic conditions or past illnesses"
                    value={medicalData.conditions}
                    onChange={(e) =>
                      setMedicalData({
                        ...medicalData,
                        conditions: e.target.value,
                      })
                    }
                    rows={3}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="vetName">Veterinarian Name</Label>
                    <Input
                      id="vetName"
                      placeholder="Dr. Smith"
                      value={medicalData.vetName}
                      onChange={(e) =>
                        setMedicalData({
                          ...medicalData,
                          vetName: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="vetPhone">Vet Phone Number</Label>
                    <Input
                      id="vetPhone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      value={medicalData.vetPhone}
                      onChange={(e) =>
                        setMedicalData({
                          ...medicalData,
                          vetPhone: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="insurance">Pet Insurance Provider</Label>
                  <Input
                    id="insurance"
                    placeholder="Insurance company name and policy number"
                    value={medicalData.insurance}
                    onChange={(e) =>
                      setMedicalData({
                        ...medicalData,
                        insurance: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="flex justify-between gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate("/app")}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">
                      <Check className="w-4 h-4 mr-2" />
                      Complete Registration
                    </Button>
                  </div>
                </div>
              </form>
            </>
          )}
        </Card>

        {/* Help Text */}
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>
            All information is securely encrypted and only accessible by you
          </p>
        </div>
      </div>
    </div>
  );
}
