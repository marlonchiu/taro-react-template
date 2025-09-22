/**
 * 分包根目录
 */
const root = '/pagesOther';

/**
 * 分包别名
 */
const name = '其他module';

/**
 * 分包页面路径
 */
const page = {
  /** 登录页 */
  OTHER: '/other/index'
};

export default { root, name, page };

export type OtherPage = typeof page;
