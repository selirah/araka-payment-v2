import { AppProps /*, AppContext */ } from 'next/app';
import { NextPage } from 'next';
import { wrapper } from 'store';
import { appWithTranslation } from '../i18n';
if (typeof window !== 'undefined') {
  require('bootstrap/dist/css/bootstrap.min.css');
  require('font-awesome/css/font-awesome.min.css');
  require('flag-icon-css/css/flag-icon.min.css');
  require('swiper/swiper-bundle.min.css');
  require('./css/mobiriseicons.css');
  require('./css/style.css');
  require('./css/wizard.css');
  // require('antd/dist/antd.css');
  require('jquery');
  require('bootstrap/dist/js/bootstrap.bundle.min');
  require('@popperjs/core');
  require('gsap/dist/gsap.min');
  require('swiper/swiper-bundle.esm');
  require('./js/script');
}

const MyApp: NextPage<AppProps> = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default wrapper.withRedux(appWithTranslation(MyApp));
