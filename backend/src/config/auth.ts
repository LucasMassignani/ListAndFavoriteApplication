export default {
  jwt: {
    secret: process.env.APP_SECRET || 'no-key',
    expiresIn: '1d',
  },
};
