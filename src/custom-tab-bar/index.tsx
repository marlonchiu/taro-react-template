// import { useMemo } from 'react';
import Taro from '@tarojs/taro';
import { CoverView, CoverImage, View, Image } from '@tarojs/components';
import classNames from 'classnames';

import { useSelector, useCommonStore } from '@/store';

import './index.scss';

export default function CustomTabBar() {
  const { tabbarList, tabbarActive } = useCommonStore(useSelector(['tabbarList', 'tabbarActive']));
  console.log('🚀 ~ CustomTabBar ~ tabbarList:', tabbarList);

  const switchTab = (item: App.Tabbar) => {
    Taro.switchTab({ url: item.pagePath });
  };

  return (
    <View className='custom-tab-bar-container ios'>
      <View className='custom-tab-bar-wrap'>
        {(tabbarList || []).map((item, index) => (
          <View
            key={index}
            className={classNames('custom-tab-bar-item-box')}
            onClick={() => switchTab(item)}
          >
            <Image
              className='custom-tab-bar-item-icon'
              src={tabbarActive === item.key ? item.selectedIconPath : item.iconPath}
            />
            <View
              className={classNames('custom-tab-bar-item-text', {
                'is-active': tabbarActive === item.key
              })}
            >
              {item.text}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
