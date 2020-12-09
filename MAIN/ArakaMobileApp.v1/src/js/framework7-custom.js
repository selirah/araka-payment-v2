
import Framework7, { Device, Request, Utils } from 'framework7';
// import Searchbar from 'framework7/components/searchbar/searchbar.js';
// import Sheet from 'framework7/components/sheet/sheet.js';
// import Skeleton from 'framework7/components/skeleton/skeleton.js';
import Swiper from 'framework7/components/swiper/swiper.js';
import Timeline from 'framework7/components/timeline/timeline.js';
import Toast from 'framework7/components/toast/toast.js';
import Actions from 'framework7/components/actions/actions.js';
import Navbar from 'framework7/components/navbar/navbar.js';
import Popover from 'framework7/components/popover/popover.js';
// import PullToRefresh from 'framework7/components/pull-to-refresh/pull-to-refresh.js';
// import InfiniteScroll from 'framework7/components/infinite-scroll/infinite-scroll.js';
import Form from 'framework7/components/form/form.js';
import Input from 'framework7/components/input/input.js';
import Fab from 'framework7/components/fab/fab.js';
import Elevation from 'framework7/components/elevation/elevation.js';
import Checkbox from 'framework7/components/checkbox/checkbox.js';
import Card from 'framework7/components/card/card.js';
import Grid from 'framework7/components/grid/grid.js';
import Preloader from 'framework7/components/preloader/preloader.js';
// import Progressbar from 'framework7/components/progressbar/progressbar.js';
import Typography from 'framework7/components/typography/typography.js';
import LoginScreen from 'framework7/components/login-screen/login-screen.js';
import List from 'framework7/components/list/list.js';
import ListIndex from 'framework7/components/list-index/list-index.js';
import VirtualList from 'framework7/components/virtual-list/virtual-list.js';
// import ContactList from 'framework7/components/contacts-list/contacts-list.js';
import Tabs from 'framework7/components/tabs/tabs.js';
import Toggle from 'framework7/components/toggle/toggle.js';
import Swipeout from 'framework7/components/swipeout/swipeout.js';
import Popup from 'framework7/components/popup/popup.js';

Framework7.use([
  // Searchbar,
  // Sheet,
  // Skeleton,
  Popover,
  Navbar,
  Actions,
  Swiper,
  Timeline,
  Toast,
  // PullToRefresh,
  // InfiniteScroll,
  Form,
  Input,
  Fab,
  Elevation,
  Checkbox,
  Card,
  Grid,
  Preloader,
  // Progressbar,
  Typography,
  LoginScreen,
  List,
  ListIndex,
  VirtualList,
  // ContactList,
  Tabs,
  Toggle,
  Swipeout,
  Popup
]);

export default Framework7;
export { Device, Request, Utils };
