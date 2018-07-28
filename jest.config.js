module.exports = {
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/*.{js, jsx}'],
  setupFiles: ['./__test__/rafShim.js', './__test__/jestsetup.js'],
  testURL: 'http://localhost/',
  // moduleFileExtensions: [
  //   'js',
  //   'jsx',
  // ],
  // moduleNameMapper: {
  //   '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
  //   '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
  // },
  // transform: {
  //   '^.+\\.js$': 'babel-jest',
  // }
}
