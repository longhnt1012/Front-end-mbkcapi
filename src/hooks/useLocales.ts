import { useTranslation } from 'react-i18next';
// @mui
import { enUS, viVN } from '@mui/material/locale';
import { getLanguage } from 'utils';
import images from 'assets';

// ----------------------------------------------------------------------

const LANGS = [
  {
    label: 'Eng',
    value: 'en',
    systemValue: enUS,
    flag: images.language.english,
  },
  {
    label: 'Vie',
    value: 'vi',
    systemValue: viVN,
    flag: images.language.vietnamese,
  },
];

export default function useLocales() {
  const { i18n, t: translate, t } = useTranslation();
  const langStorage = getLanguage();
  const currentLang = LANGS.find((_lang) => _lang.value === langStorage) || LANGS[1];

  const handleChangeLanguage = (newLang: string): any => {
    i18n.changeLanguage(newLang, () => console.log('Changed language'));
  };

  return {
    onChangeLang: handleChangeLanguage,
    translate,
    currentLang,
    allLang: LANGS,
    t,
  };
}
