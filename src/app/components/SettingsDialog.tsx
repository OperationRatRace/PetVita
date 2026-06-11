import { useLanguage } from "../contexts/LanguageContext";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
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
import { Settings } from "lucide-react";

interface SettingsDialogProps {
  open: boolean;
  onClose: () => void;
}

export function SettingsDialog({ open, onClose }: SettingsDialogProps) {
  const { language, setLanguage, t } = useLanguage();

  const languages = [
    { code: "en", label: "English", nativeLabel: "English", flag: "🇬🇧" },
    { code: "ru", label: "Russian", nativeLabel: "Русский", flag: "🇷🇺" },
    { code: "fi", label: "Finnish", nativeLabel: "Suomi", flag: "🇫🇮" },
  ] as const;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            {t("settingsTitle")}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div>
            <Label htmlFor="language-select" className="text-base mb-2 block">
              {t("languageSettings")}
            </Label>
            <p className="text-sm text-muted-foreground mb-4">
              {t("selectLanguage")}
            </p>
            <Select
              value={language}
              onValueChange={(value) => setLanguage(value as "en" | "ru" | "fi")}
            >
              <SelectTrigger id="language-select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    <span className="mr-2">{lang.flag}</span>
                    {lang.nativeLabel}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={onClose}>{t("close")}</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
