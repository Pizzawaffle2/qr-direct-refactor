import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';

export default handleAuth({
  login: async (req, res) => {
    const redirectTo = req.query.redirectTo || '/';
    await handleLogin(req, res, {
      returnTo: redirectTo,
    });
  },
});
