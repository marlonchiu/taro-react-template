import { defineConfig, type UserConfigExport } from '@tarojs/cli';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import devConfig from './dev';
import prodConfig from './prod';
import vitePluginImp from 'vite-plugin-imp';
import tailwindcss from 'tailwindcss';
import { UnifiedViteWeappTailwindcssPlugin as uvtw } from 'weapp-tailwindcss/vite';
import type { Plugin } from 'vite';
import path from 'path';

// https://taro-docs.jd.com/docs/next/config#defineconfig-辅助函数
export default defineConfig<'vite'>(async (merge, { command, mode }) => {
  const baseConfig: UserConfigExport<'vite'> = {
    projectName: 'taro-react-template',
    date: '2025-9-19',
    // designWidth: 375, // 设计稿375
    designWidth(input: any) {
      // 配置 NutUI 375 尺寸
      if (input?.file?.replace(/\\+/g, '/').indexOf('@nutui') > -1) {
        return 375;
      }
      // 全局使用 Taro 默认的 750 尺寸
      return 750;
    },
    deviceRatio: {
      640: 2.34 / 2,
      750: 1,
      375: 2,
      828: 1.81 / 2
    },
    sourceRoot: 'src',
    outputRoot: 'dist',
    plugins: [
      [
        '@tarojs/plugin-http',
        {
          // 默认值
          enableCookie: false,
          disabledFormData: true,
          disabledBlob: true
        }
      ],
      [
        '@tarojs/plugin-html',
        {
          // 包含 `demo-`、`van-` 的类名选择器中的 px 单位不会被解析
          pxtransformBlackList: [/demo-/, /van-/]
        }
      ]
    ],
    defineConstants: {
      ENABLE_COOKIE: 'false',
      LOCATION_API_KEY: JSON.stringify('U4MBZ-3U3OQ-AHF5G-BNXOC-IKJ3O-FFFOJ')
    },
    copy: {
      patterns: [],
      options: {}
    },
    framework: 'react',
    compiler: {
      vitePlugins: [
        vitePluginImp({
          libList: [
            {
              libName: '@nutui/nutui-react-taro',
              style: name => {
                return `@nutui/nutui-react-taro/dist/esm/${name}/style/css`;
              },
              replaceOldImport: false,
              camel2DashComponentName: false
            }
          ]
        }),
        {
          // 通过 vite 插件加载 postcss,
          name: 'postcss-config-loader-plugin',
          config(config) {
            // 加载 tailwindcss
            if (typeof config.css?.postcss === 'object') {
              config.css?.postcss.plugins?.unshift(tailwindcss());
            }
          }
        },
        uvtw({
          // rem转rpx
          rem2rpx: true,
          // 除了小程序这些，其他平台都 disable
          disabled:
            process.env.TARO_ENV === 'h5' ||
            process.env.TARO_ENV === 'harmony' ||
            process.env.TARO_ENV === 'rn',
          // 由于 taro vite 默认会移除所有的 tailwindcss css 变量，所以一定要开启这个配置，进行css 变量的重新注入
          injectAdditionalCssVarScope: true
        })
      ] as Plugin[],
      type: 'vite'
    },
    mini: {
      debugReact: true,
      postcss: {
        pxtransform: {
          enable: true,
          config: {
            selectorBlackList: ['nut-']
          }
        },
        url: {
          enable: true,
          config: {
            limit: 1024 // 设定转换尺寸上限
          }
        },
        optimizeMainPackage: {
          enable: true,
          exclude: []
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      }
    },
    h5: {
      publicPath: '/',
      staticDirectory: 'static',
      output: {
        filename: 'js/[name].[hash:8].js',
        chunkFilename: 'js/[name].[chunkhash:8].js'
      },
      miniCssExtractPluginOption: {
        ignoreOrder: true,
        filename: 'css/[name].[hash].css',
        chunkFilename: 'css/[name].[chunkhash].css'
      },
      postcss: {
        autoprefixer: {
          enable: true,
          config: {}
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      },
      // 修复 fs.allow 配置问题分析与解决
      // https://juejin.cn/post/7547729051114537006
      devServer: {
        fs: {
          allow: ['..']
        }
      }
    },
    rn: {
      appName: 'taroDemo',
      postcss: {
        cssModules: {
          enable: false // 默认为 false，如需使用 css modules 功能，则设为 true
        }
      }
    },
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  };
  if (process.env.NODE_ENV === 'development') {
    // 本地开发构建配置（不混淆压缩）
    return merge({}, baseConfig, devConfig);
  }
  // 生产构建配置（默认开启压缩混淆等）
  return merge({}, baseConfig, prodConfig);
});
