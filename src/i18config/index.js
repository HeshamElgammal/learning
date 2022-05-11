import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../assets/localies/en.json';
import ar from '../assets/localies/ar.json';
import { I18nManager } from 'react-native'
i18n.use(initReactI18next).init({
    lng:I18nManager.isRTL?'ar': 'en',
    fallbackLng:I18nManager.isRTL?'ar': 'en',
    resources: {
      en: en,
      ar: ar,
    },
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });;

export default i18n;
