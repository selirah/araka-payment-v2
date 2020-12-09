const NextI18Next = require('next-i18next').default;
const { localeSubpaths } = require('next/config').default().publicRuntimeConfig;
const path = require('path');
// import Cookies from 'js-cookie';

// const locale = Cookies.get('next-i18next');

module.exports = new NextI18Next({
  // lng: locale !== null ? locale : 'en',
  otherLanguages: ['fr'],
  localeSubpaths,
  localePath: path.resolve('./public/static/locales'),
  // serverLanguageDetection: true,
  // browserLanguageDetection: true,
});
