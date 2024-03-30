import { createContext, useState } from 'react';
import { LanguageContent } from '@type/interfaces/languageContent.interface';
import en from '@utils/languages/en.json';
import ru from '@utils/languages/ru.json';

export enum LanguageKey {
  En = 'Eng',
  Ru = 'Рус',
}

export interface LanguageContextType {
  data: LanguageContent;
  language: LanguageKey | string;
  setLanguage: (language: LanguageKey) => void;
}

export const LanguageContext = createContext<LanguageContextType>({
  data: en,
  language: LanguageKey.Ru,
  setLanguage: () => {},
});

export interface Props {
  children: React.ReactNode[] | React.ReactNode;
}

export const LanguageProvider = ({ children }: Props) => {
  const [language, setLanguage] = useState(
    localStorage.getItem('lang') || LanguageKey.Ru
  );

  let data: LanguageContent;
  switch (language) {
    case LanguageKey.En:
      data = en;
      localStorage.setItem('lang', LanguageKey.En);
      break;
    case LanguageKey.Ru:
      data = ru;
      localStorage.setItem('lang', LanguageKey.Ru);
      break;
    default:
      data = ru;
      localStorage.setItem('lang', LanguageKey.En);
  }

  return (
    <LanguageContext.Provider value={{ data, language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
