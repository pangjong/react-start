const webpack = require("webpack");
const path = require('path')
const getAbsolutePath = (pathDir) => path.resolve(__dirname, pathDir)
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const os = require('os')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const InterpolateHtmlPlugin = require('interpolate-html-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = (_env, argv) => {
  const isProd = argv.mode === 'production'
  const isDev = !isProd
  
  return {

    // 개발 서버 설정
    devServer: {
      // dist 디렉토리를 웹 서버의 기본 호스트 위치로 설정
      static: {
        directory: path.resolve(__dirname, './dist'),
      },
      // 인덱스 파일 설정
      // index: 'index.html',
      // 포트 번호 설정
      port: 9000,
      // 핫 모듈 교체(HMR) 활성화 설정
      hot: true,
      // gzip 압축 활성화
      compress: true,
      devMiddleware: {
        // dist 디렉토리에 실제 파일 생성
        writeToDisk: true,
        publicPath: '/public'
      },
      // History 라우팅 대체 사용 설정
      historyApiFallback: true,
      // 개발 서버 자동 실행 설정
      open: true,
      // 오류 표시 설정
      client: {
        overlay: true,
      },
    },

    // 기본 구성
    entry: {
      main: './src/index.js',
    },
    output: {
      path: getAbsolutePath('dist'),
      filename: 'assets/js/[name].[contenthash:8].js',
      publicPath: '/',
    },
    mode: 'development',
    devtool: isDev && 'cheap-module-source-map',

    // React 앱 배포(production) 시 성능을 향상 시키는 prop-types 제거, React.createElement 컴파일 결과 인라인 처리, 정적 React 요소를 상수로 출력하는 플러그인 등을 설치합니다.
    // @React 최적화 플러그인 configuration has an unknown property 'env' 이슈로 주석 22.06.16
    // env: {
    //   production: {
    //     only: ["src"],
    //     plugins: [
    //       [
    //         "transform-react-remove-prop-types",
    //         { removeImport: true } // import PropTypes from 'prop-types' 제거
    //       ],
    //       "@babel/plugin-transform-react-inline-elements",
    //       "@babel/plugin-transform-react-constant-elements"
    //     ]
    //   }
    // },
    plugins: [
      // 환경 변수 플러그인 인스턴스 생성 npm i cross-env 설치
      new webpack.EnvironmentPlugin({
        NODE_ENV: isDev ? 'development' : 'production'
      }),

      // 플러그인 인스턴스 생성
      new HtmlWebpackPlugin({
        template: getAbsolutePath('public/index.html'),
        inject: true,
        favicon: './public/favicon.ico',
        manifest: './public/manifest.json',
      }),
      // React 앱에서 "클래스 필드" 문법을 사용하기 위한 플러그인, "동적 가져오기"를 사용하기 위한 플러그인 등을 설치합니다. 
      //  @React 최적화 플러그인 Invalid configuration object. Webpack has been initialized using a configuration object that does not match the API schema.
      // '@babel/plugin-transform-runtime',
      // '@babel/plugin-syntax-dynamic-import',
      // '@babel/plugin-proposal-class-properties',

      // css 간소화
      new MiniCssExtractPlugin({
        filename: 'assets/css/[name].[contenthash:8].css',
        chunkFilename: 'assets/css/[name].[contenthash:8].chunk.css',
      }),
      // %PUBLIC_URL% 오류 대처하기 위해
      new InterpolateHtmlPlugin(HtmlWebpackPlugin, {
        PUBLIC_URL: 'static', // can modify `static` to another name or get it from `process`
        NODE_ENV: isDev ? 'development' : 'production',
      }),
      isDev && new ReactRefreshWebpackPlugin(),
      // 웹펙 빌드 결과물 정리 플러그인 인스턴스 생성
      new CleanWebpackPlugin({
        // 플러그인 옵션 셜정
        // dry 기본 값: false
        // dry: true,
        // verbose 기본 값: false
        verbose: true,
        // cleanOnceBeforeBuildPatterns 기본 값: ['**/*']
        cleanOnceBeforeBuildPatterns: [
          '**/*',
          // build 폴더 안의 모든 것을 지우도록 설정
          path.resolve(process.cwd(), 'build/**/*')
        ]
      }),
    ].filter(Boolean),
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
      alias: {
        '@components': getAbsolutePath('src/components/'),
        '@contexts': getAbsolutePath('src/contexts/'),
        '@hooks': getAbsolutePath('src/hooks/'),
        '@pages': getAbsolutePath('src/pages/'),
      },
    },


    // 빌드 최적화 구성
    optimization: {
      minimize: true,
      minimizer: [
        new CssMinimizerPlugin({
          parallel: os.cpus().length - 1
        }),
      ],
      splitChunks: {
        chunks: 'all',
        minSize: 0,
        minRemainingSize: 0,
        maxSize: 0,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 20,
        enforceSizeThreshold: 50000,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
          },
          default: {
            minChunks: 2,
            priority: -10,
            reuseExistingChunk: true,
          },
        },
      },
    },

    module: {
      rules: [
        // 바벨 loader 구성
        {
          test: /\.jsx?$/i,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
                cacheCompression: false,
                envName: isProd ? 'production' : 'development',
                presets: [
                  ['@babel/preset-env', {
                    targets: {
                      browsers: ['> 5% in KR'],
                    },
                  }], '@babel/preset-react'
                ],
                plugins: 
                  [isDev && require.resolve('react-refresh/babel')].filter(Boolean),
              },
            }
          ]
        },
        // Sass
        {
          test: /\.s[ac]ss$/,
          use: [
            isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                // 2 => postcss-loader, sass-loader
                importLoaders: 2,
              },
            },
            'resolve-url-loader',
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        },
        // style-loader, css-loader 구성
        {
          test: /\.css$/i,
          use: [
            isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            { loader: 'css-loader', options: { importLoaders: 1 } },
            'postcss-loader',
          ],
        },
        // CSS 모듈
        {
          test: /\.module.css$/i,
          use: [
            isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: true,
                // 0 => 불러올 로더 없음 (기본 값)
                // 1 => postcss-loader
                importLoaders: 1,
              },
            },
            'postcss-loader',
          ],
        },
        // 이미지 로더
        {
          test: /\.(jpe?g|png|gif|ico)$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
                name: 'assets/images/[name].[hash:8].[ext]',
              }
            }
          ]
        },
        // SVG 로더
        {
          test: /\.svg$/i,
          use: ['@svgr/webpack'],
        },
        // 웹폰트 로더
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'assets/fonts/[name].[hash:8].[ext]',
              },
            },
          ],
        },
      ]
    }
  }
}