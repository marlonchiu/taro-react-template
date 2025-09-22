/**
 * 分包根目录
 */
const root = '/pagesUser';

/**
 * 分包别名
 */
const name = '用户module';

/**
 * 分包页面路径
 */
const page = {
  /** 登录页 */
  LOGIN: '/login/index',
  /** 注册页 */
  REGISTER: '/register/index'
};

export default { root, name, page };

export type UserPage = typeof page;
