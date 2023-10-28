module.exports = {
  // 특정 파일 또는 디렉토리를 테스트 파일로 간주하지 않도록 패턴을 지정합니다.
  //
  transformIgnorePatterns: [
    "/node_modules/",
    "\\.(png|jpg|jpeg|gif|svg)$", // 여기에서 이미지 파일 확장자를 추가
  ],
  // 파일 변환 방법을 설정합니다.
  // 여기서는 JavaScript 및 TypeScript 파일에 대해 'ts-jest' 변환기를 사용합니다.
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "ts-jest",
  },

  // 모듈 이름을 매핑하여 import 문에 대한 사용자 지정 경로를 정의합니다.
  // 이 설정에서는 'src/'로 시작하는 import 경로를 실제 'src' 디렉토리로 연결합니다.
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/assetsTransformer.js',
    '\\.(css|less)$': '<rootDir>/assetsTransformer.js'
  },

  // 테스트 환경을 지정합니다. 여기서 'jsdom' 환경을 사용합니다.
  testEnvironment: "jsdom",
};
