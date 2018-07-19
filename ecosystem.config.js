module.exports = {
  apps: [{
    name: 'fuck-ads-bot',
    script: './index.js',
    error_file: '~/logs/fuck-ads-bot.error.log',
    out_file: '~/logs/fuck-ads-bot.out.log',
    env: {
      NODE_ENV: 'development'
    },
    env_production : {
      NODE_ENV: 'production'
    }
  }]
};
