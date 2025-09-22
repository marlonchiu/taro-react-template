import Taro from '@tarojs/taro';

export const $toast = {
  /** 提示 */
  show: (message: string) => {
    Taro.showToast({
      title: message,
      icon: 'none'
    });
  },

  /** 成功 */
  success: (message: string) => {
    Taro.showToast({
      title: message,
      icon: 'success'
    });
  },

  /** 失败 */
  error: (message: string) => {
    Taro.showToast({
      title: message,
      icon: 'error'
    });
  },

  /** 加载中 */
  loading: (message: string = '加载中...') => {
    Taro.showToast({
      title: message,
      icon: 'loading'
    });
  },

  /** 关闭 */
  hide: () => {
    Taro.hideToast();
  }
};

export default $toast;
