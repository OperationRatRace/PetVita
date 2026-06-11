import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "ru" | "fi";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Header
    settings: "Settings",
    signIn: "Sign In",
    getStarted: "Get Started",

    // Home
    welcomeBack: "Welcome back",
    petsToday: "Here's what's happening with your pets today",
    quickEntry: "Quick Entry",
    vaccination: "Vaccination",
    medication: "Medication",
    events: "Events",
    surprises: "Surprises",
    yourPets: "Your Pets",
    registerPet: "Register Pet",
    noPetsYet: "No pets registered yet",
    addFirstPet: "Start by adding your first pet to track their healthcare",
    registerFirstPet: "Register Your First Pet",
    viewDetails: "View Details",
    recentActivity: "Recent Activity",

    // Pet Detail
    backToHome: "Back to Home",
    editInfo: "Edit Info",
    overview: "Overview",
    health: "Health",
    schedule: "Schedule",
    activity: "Activity",
    healthInformation: "Health Information",
    nextVaccination: "Next Vaccination",
    lastCheckup: "Last Checkup",
    weight: "Weight",

    // Health Summary
    overallHealthStatus: "Overall Health Status",
    healthScore: "Health Score",
    eventsCompleted: "Events Completed",
    positiveEntries: "Positive Entries",
    incidents: "Incidents",
    healthTrend: "Health Trend (Past 4 Weeks)",
    trendingUpward: "Trending Upward",
    healthImproving: "health has been improving steadily over the past month. Keep up the great care!",
    journalSummary: "Journal Summary",
    totalEntries: "Total Entries",
    positiveNotes: "Positive Notes",
    healthConcerns: "Health Concerns",

    // Language
    language: "Language",
    english: "English",
    russian: "Russian",
    finnish: "Finnish",

    // Settings
    settingsTitle: "Settings",
    languageSettings: "Language Settings",
    selectLanguage: "Select your preferred language",
    close: "Close",

    // Status
    excellent: "Excellent",
    good: "Good",
    fair: "Fair",
    needsAttention: "Needs Attention",
  },
  ru: {
    // Header
    settings: "Настройки",
    signIn: "Войти",
    getStarted: "Начать",

    // Home
    welcomeBack: "С возвращением",
    petsToday: "Вот что происходит с вашими питомцами сегодня",
    quickEntry: "Быстрый ввод",
    vaccination: "Вакцинация",
    medication: "Лекарства",
    events: "События",
    surprises: "Сюрпризы",
    yourPets: "Ваши питомцы",
    registerPet: "Регистрация питомца",
    noPetsYet: "Питомцы еще не зарегистрированы",
    addFirstPet: "Начните с добавления вашего первого питомца для отслеживания его здоровья",
    registerFirstPet: "Зарегистрировать первого питомца",
    viewDetails: "Подробнее",
    recentActivity: "Недавняя активность",

    // Pet Detail
    backToHome: "Назад на главную",
    editInfo: "Редактировать",
    overview: "Обзор",
    health: "Здоровье",
    schedule: "Расписание",
    activity: "Активность",
    healthInformation: "Информация о здоровье",
    nextVaccination: "Следующая вакцинация",
    lastCheckup: "Последний осмотр",
    weight: "Вес",

    // Health Summary
    overallHealthStatus: "Общее состояние здоровья",
    healthScore: "Показатель здоровья",
    eventsCompleted: "Событий завершено",
    positiveEntries: "Положительных записей",
    incidents: "Инциденты",
    healthTrend: "Тренд здоровья (последние 4 недели)",
    trendingUpward: "Улучшение",
    healthImproving: "здоровье стабильно улучшается в течение последнего месяца. Продолжайте в том же духе!",
    journalSummary: "Сводка журнала",
    totalEntries: "Всего записей",
    positiveNotes: "Положительные записи",
    healthConcerns: "Проблемы со здоровьем",

    // Language
    language: "Язык",
    english: "Английский",
    russian: "Русский",
    finnish: "Финский",

    // Settings
    settingsTitle: "Настройки",
    languageSettings: "Настройки языка",
    selectLanguage: "Выберите предпочитаемый язык",
    close: "Закрыть",

    // Status
    excellent: "Отлично",
    good: "Хорошо",
    fair: "Удовлетворительно",
    needsAttention: "Требует внимания",
  },
  fi: {
    // Header
    settings: "Asetukset",
    signIn: "Kirjaudu sisään",
    getStarted: "Aloita",

    // Home
    welcomeBack: "Tervetuloa takaisin",
    petsToday: "Tässä mitä lemmikkisi tekevät tänään",
    quickEntry: "Pikalähetys",
    vaccination: "Rokotus",
    medication: "Lääkitys",
    events: "Tapahtumat",
    surprises: "Yllätykset",
    yourPets: "Lemmikkisi",
    registerPet: "Rekisteröi lemmikki",
    noPetsYet: "Lemmikkejä ei vielä rekisteröity",
    addFirstPet: "Aloita lisäämällä ensimmäinen lemmikkisi terveyden seurantaa varten",
    registerFirstPet: "Rekisteröi ensimmäinen lemmikki",
    viewDetails: "Näytä tiedot",
    recentActivity: "Viimeaikainen toiminta",

    // Pet Detail
    backToHome: "Takaisin kotiin",
    editInfo: "Muokkaa tietoja",
    overview: "Yleiskatsaus",
    health: "Terveys",
    schedule: "Aikataulu",
    activity: "Toiminta",
    healthInformation: "Terveystiedot",
    nextVaccination: "Seuraava rokotus",
    lastCheckup: "Viimeisin tarkastus",
    weight: "Paino",

    // Health Summary
    overallHealthStatus: "Yleinen terveydentila",
    healthScore: "Terveyspistemäärä",
    eventsCompleted: "Suoritetut tapahtumat",
    positiveEntries: "Positiiviset merkinnät",
    incidents: "Tapaukset",
    healthTrend: "Terveyssuuntaus (viimeiset 4 viikkoa)",
    trendingUpward: "Nouseva trendi",
    healthImproving: "terveys on parantunut tasaisesti viimeisen kuukauden aikana. Jatka hyvää hoitoa!",
    journalSummary: "Päiväkirjan yhteenveto",
    totalEntries: "Merkintöjä yhteensä",
    positiveNotes: "Positiiviset huomautukset",
    healthConcerns: "Terveysongelmat",

    // Language
    language: "Kieli",
    english: "Englanti",
    russian: "Venäjä",
    finnish: "Suomi",

    // Settings
    settingsTitle: "Asetukset",
    languageSettings: "Kieliasetukset",
    selectLanguage: "Valitse haluamasi kieli",
    close: "Sulje",

    // Status
    excellent: "Erinomainen",
    good: "Hyvä",
    fair: "Kohtalainen",
    needsAttention: "Vaatii huomiota",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem("language");
    return (stored as Language) || "en";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
