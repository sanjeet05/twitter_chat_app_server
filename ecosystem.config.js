module.exports = {
  apps: [
    {
      name: 'node_app_v1',
      script: './src/index.js',
      instances: 2,
      exec_mode: 'cluster',
    },
  ],
};
