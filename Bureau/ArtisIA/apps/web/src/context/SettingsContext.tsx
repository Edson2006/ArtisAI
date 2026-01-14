"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { getUserSettings } from "@/utils/firebase/settings";
import { UserSettings, defaultSettings } from "@/types/settings";

interface SettingsContextType {
  settings: UserSettings | null;
  theme: 'light' | 'dark' | 'system';
  language: 'fr' | 'en';
  isLoading: boolean;
  refreshSettings: () => Promise<void>;
}

const SettingsContext = createContext<SettingsContextType>({
  settings: null,
  theme: 'light',
  language: 'fr',
  isLoading: true,
  refreshSettings: async () => {},
});

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshSettings = async () => {
    if (user) {
      try {
        const data = await getUserSettings(user.uid);
        setSettings(data);
        applyTheme(data.theme);
      } catch (error) {
        console.error("Error refreshing settings:", error);
      }
    }
  };

  useEffect(() => {
    const initSettings = async () => {
      if (user) {
        try {
          const data = await getUserSettings(user.uid);
          setSettings(data);
          applyTheme(data.theme);
        } catch (error) {
          console.error("Error loading settings:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSettings(null);
        setIsLoading(false);
        applyTheme('light'); // Default to light when logged out
      }
    };
    initSettings();
  }, [user]);

  const applyTheme = (theme: 'light' | 'dark' | 'system') => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  };

  // Listen for system theme changes if mode is system
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (settings?.theme === "system") {
        applyTheme("system");
      }
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [settings?.theme]);

  return (
    <SettingsContext.Provider 
      value={{ 
        settings, 
        theme: settings?.theme || 'light', 
        language: settings?.language || 'fr',
        isLoading,
        refreshSettings
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
