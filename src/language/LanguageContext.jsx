import React, { createContext, useContext, useEffect, useState } from "react";
import { translations } from "./translations";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const defaultLang = "ru";
  const preferredLang = navigator.language.slice(0, 2);

  const [language, setLanguage] = useState(() => {
    const storageLange = localStorage.getItem("lang");
    return storageLange || preferredLang || defaultLang;
  });

  useEffect(() => {
    localStorage.setItem("lang", language);
  }, [language]);

  const lang = (key) => translations[key][language] || language;

  return (
    <LanguageContext.Provider value={{ lang, setLanguage, language }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => useContext(LanguageContext);
