import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Heart, Calendar, FileText, Shield, PawPrint } from "lucide-react";

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-6xl">
          <div className="flex items-center gap-2">
            <PawPrint className="w-8 h-8 text-blue-600" />
            <span className="font-semibold text-xl">PetCare Pro</span>
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" onClick={() => navigate("/signup")}>
              Sign In
            </Button>
            <Button onClick={() => navigate("/signup")}>Get Started</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 max-w-6xl">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl mb-6">
            Complete Healthcare Management for Your Beloved Pets
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Keep track of medical records, vaccinations, appointments, and more.
            All in one secure platform designed for pet parents who care.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" onClick={() => navigate("/signup")}>
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16 max-w-6xl">
        <h2 className="text-center mb-12">Everything You Need in One Place</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="mb-2">Health Records</h3>
            <p className="text-muted-foreground">
              Store and access complete medical history, vaccinations, and test results instantly.
            </p>
          </Card>

          <Card className="p-6">
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="mb-2">Appointments</h3>
            <p className="text-muted-foreground">
              Schedule vet visits, grooming sessions, and set automatic reminders.
            </p>
          </Card>

          <Card className="p-6">
            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="mb-2">Quick Entry</h3>
            <p className="text-muted-foreground">
              Log symptoms, medications, and daily activities with just a few taps.
            </p>
          </Card>

          <Card className="p-6">
            <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="mb-2">Secure & Private</h3>
            <p className="text-muted-foreground">
              Your pet's data is encrypted and protected with enterprise-grade security.
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-white mb-4">Ready to Give Your Pet the Best Care?</h2>
          <p className="text-blue-100 text-lg mb-8">
            Join thousands of pet parents who trust PetCare Pro with their furry family members.
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => navigate("/signup")}
          >
            Create Your Free Account
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground max-w-6xl">
          <p>© 2026 PetCare Pro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
