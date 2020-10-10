require('dotenv').config();

const FtpDeploy = require('ftp-deploy');

const ftpDeploy = new FtpDeploy();

const configuration = {
  user: process.env.DEPLOYMENT_USER,
  password: process.env.DEPLOYMENT_PASSWORD,
  host: process.env.DEPLOYMENT_HOST,
  port: process.env.DEPLOYMENT_PORT,
  localRoot: `${process.cwd()}/build`,
  remoteRoot: '/',
  include: ['*', '**/*'],
};

ftpDeploy
  .deploy(configuration)
  .then((response) => console.log('Finished:', response))
  .catch((error) => console.log(error))
  .then(() => process.exit(0));
