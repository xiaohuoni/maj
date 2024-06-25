import {
  NavBarListItem,
  NavBarProps,
  TabBarListItem,
  TabBarProps,
  TitleListItem,
} from 'src/.maj/mobilelayout/AlitaLayout';
import HomeGary from './assets/demoIcon/home.png';
import HomeBlue from './assets/demoIcon/home1.png';
import ListGary from './assets/demoIcon/list.png';
import ListBlue from './assets/demoIcon/list1.png';
import SetGary from './assets/demoIcon/setting.png';
import SetBlue from './assets/demoIcon/setting1.png';

export function getKeepAlive() {
  return [/./];
}

const titleList: TitleListItem[] = [
  {
    pagePath: '/',
    title: '首页',
  },
  {
    pagePath: '/list',
    title: '列表',
  },
  {
    pagePath: '/settings',
    title: '设置',
  },
];
const navList: NavBarListItem[] = [];
const navBar: NavBarProps = {
  navList,
  fixed: false,
  onLeftClick: () => {
    // router.goBack();
  },
};
const tabList: TabBarListItem[] = [
  {
    pagePath: '/home',
    text: '首页',
    iconPath: HomeGary,
    selectedIconPath: HomeBlue,
    title: '首页',
    iconSize: '',
    badge: '',
  },
  {
    pagePath: '/model',
    text: '数据',
    iconPath: ListGary,
    selectedIconPath: ListBlue,
    title: '数据',
    iconSize: '',
    badge: '',
  },
  {
    pagePath: '/about',
    text: '关于',
    iconPath: SetGary,
    selectedIconPath: SetBlue,
    title: '设置',
    iconSize: '',
    badge: '',
  },
];

const tabBar: TabBarProps = {
  color: `#999999`,
  selectedColor: '#00A0FF',
  borderStyle: 'white',
  position: 'bottom',
  list: tabList,
};

export const mobileLayout = {
  documentTitle: '默认标题',
  navBar,
  tabBar,
  titleList,
};
