const path = require("path");

// 파일이름을 모듈이름으로 설정해서 테스트시 같은지 확인하며 통과시킴
module.exports = {
  process(src, filename, config, options) {
    return `module.exports = ${JSON.stringify(path.basename(filename))};`;
  },
};
