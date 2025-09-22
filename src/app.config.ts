import { PAGE_LIST, SUB_PACKAGES, PRELOAD_RULE } from '@/constants/PAGE';

export default defineAppConfig({
  // 主包页面
  pages: [...PAGE_LIST],

  //  配置分包
  subPackages: [...SUB_PACKAGES],

  // 分包预加载
  preloadRule: {
    ...PRELOAD_RULE
  },

  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'Taro Demo',
    navigationBarTextStyle: 'black',
    backgroundColor: '#F6F9FD'
  },
  // tabbar
  tabBar: {
    custom: false, // 是否自定义tabbar
    color: '#9ca3af',
    selectedColor: '#952b2b',
    backgroundColor: '#fff',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '首页',
        // https://github.com/NervJS/taro/issues/18324
        // H5 可以 weapp 异常
        iconPath: './assets/images/tabbar/home.png',
        selectedIconPath: './assets/images/tabbar/home-active.png'
      },
      {
        pagePath: 'pages/personal/index',
        text: '我的',
        iconPath: './assets/images/tabbar/personal.png',
        selectedIconPath: './assets/images/tabbar/personal-active.png'
      }
    ]
  },

  usingComponents: {},
  requiredBackgroundModes: [], // 'audio', 'location'
  lazyCodeLoading: 'requiredComponents',

  permission: {
    'scope.userLocation': {
      desc: '是否允许获取你当前的地理位置信息？'
    }
  },
  requiredPrivateInfos: ['getLocation', 'chooseLocation']
});
