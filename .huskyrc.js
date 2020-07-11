const generateTasksCommand = (arr) => arr.join(' && ');

module.exports = {
  hooks: {
    'pre-commit': generateTasksCommand([
      'pretty-quick --staged',
      'npm run lint',
      'npm run test -- --watch=false',
    ]),
  },
};
