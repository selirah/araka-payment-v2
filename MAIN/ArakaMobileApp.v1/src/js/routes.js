
import HomePage from '../pages/home/index.f7.html';
import OnboardingPage from '../pages/onboarding.f7.html';
import WelcomePage from '../pages/welcome.f7.html';
import NewAccountPage from '../pages/newaccount.f7.html';
import LoginScreen from '../pages/login-screen.f7.html';
import StartPage from '../pages/home/start.f7.html';
import AccountPage from '../pages/home/account.f7.html';
import ReceipientsPage from '../pages/home/receipients.f7.html';
import ProfilePage from '../pages/home/profile.f7.html';
import SettingsPage from '../pages/settings.f7.html';
import AirtimePage from '../pages/payments/airtime.f7.html';
import TvPage from '../pages/payments/tv.f7.html';
import FeesPage from '../pages/payments/schoolfees.f7.html';
import TransferPage from '../pages/payments/moneyTransfer.f7.html';

var routes = [
  {
    path: '/',
    async (routeTo, routeFrom, resolve, reject) {
      if (localStorage.getItem('isLoggedIn')) {
        resolve({ component: HomePage })
      } else {
        resolve({ component: WelcomePage })
      }
    },
    tabs: [
      {
        path: '/',
        id: 'start',
        component: StartPage
      },
      {
        path: '/account/',
        id: 'account',
        component: AccountPage
      },
      {
        path: '/receipients/',
        id: 'receipients',
        component: ReceipientsPage
      },
      {
        path: '/profile/',
        id: 'profile',
        component: ProfilePage
      }
    ]
  },
  {
    path: '/login-screen/',
    component: LoginScreen
  },
  {
    path: '/settings/',
    component: SettingsPage
  },
  {
    path: '/onboarding/',
    component: OnboardingPage,
  },
  {
    path: '/home/',
    async(routeTo, routeFrom, resolve, reject) {
      if(localStorage.getItem('isLoggedIn')) {
        resolve({ component: HomePage })
      } else {
        resolve({ component: LoginScreen })
      }
    },
    tabs: [
      {
        path: '/',
        id: 'start',
        component: StartPage
      },
      {
        path: '/account/',
        id: 'account',
        component: AccountPage
      },
      {
        path: '/receipients/',
        id: 'receipients',
        component: ReceipientsPage
      },
      {
        path: '/profile/',
        id: 'profile',
        component: ProfilePage
      }
    ]
    // component: HomePage,
  },
  {
    path: '/newaccount/',
    component: NewAccountPage,
  },
  {
    path: '/welcome/',
    component: WelcomePage
  },
  {
    path: '/airtime/',
    async(routeTo, routeFrom, resolve, reject) {
      if(localStorage.getItem('isLoggedIn')) {
        resolve({ component: AirtimePage })
      } else {
        resolve({ component: LoginScreen })
      }
    }
  },
  {
    path: '/transfers/',
    async(routeTo, routeFrom, resolve, reject) {
      if(localStorage.getItem('isLoggedIn')) {
        resolve({ component: TransferPage })
      } else {
        resolve({ component: LoginScreen })
      }
    }
  },
  {
    path: '/subscriptions/',
    async(routeTo, routeFrom, resolve, reject) {
      if(localStorage.getItem('isLoggedIn')) {
        resolve({ component: TvPage })
      } else {
        resolve({ component: LoginScreen })
      }
    }
  },
  {
    path: '/fees/',
    async(routeTo, routeFrom, resolve, reject) {
      if(localStorage.getItem('isLoggedIn')) {
        resolve({ component: FeesPage })
      } else {
        resolve({ component: LoginScreen })
      }
    }
  }
];

export default routes;