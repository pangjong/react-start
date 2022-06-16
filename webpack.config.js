const webpack = require("webpack");
const path = require('path')
const getAbsolutePath = (pathDir) => path.resolve(__dirname, pathDir)
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (_env, argv) => {
  const isProd = argv.mode === 'production'
  const isDev = !isProd

  return {
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

      // 환경 변수 플러그인 인스턴스 생성
      new webpack.EnvironmentPlugin({
        NODE_ENV: isDev ? 'development' : 'production'
      }),
    ],
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
      alias: {
        '@components': getAbsolutePath('src/components/'),
        '@contexts': getAbsolutePath('src/contexts/'),
        '@hooks': getAbsolutePath('src/hooks/'),
        '@pages': getAbsolutePath('src/pages/'),
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
                presets: ['@babel/preset-env', '@babel/preset-react'],
              }
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
          test: /\.(jpe?g|png|gif)$/i,
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