import { useTranslation } from 'react-i18next';

const translation = (text: string) => {
  const { t } = useTranslation();
  return t(text);
};

export { translation };
