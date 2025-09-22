import React, { useEffect, PropsWithChildren } from 'react';
import { useLaunch, useDidShow, useDidHide } from '@tarojs/taro';

// 全局样式
import '@/assets/style/app.scss';

function App({ children }: PropsWithChildren<unknown>) {
  useLaunch(() => {
    console.log('App launched');
  });

  // 可以使用所有的 React Hooks
  useEffect(() => {});

  // 对应 onShow
  useDidShow(() => {});

  // 对应 onHide
  useDidHide(() => {});

  return children;
}

export default App;
