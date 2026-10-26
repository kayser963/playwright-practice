
export const SAUCE_DATA = {
  url: process.env.SAUCE_URL || 'https://www.saucedemo.com', //  Fallback sécurisé
  validUser: {
    username: 'standard_user', // Récupéré de "Accepted usernames are:"
    password: 'secret_sauce',  // Récupéré de "Password for all users:"
  },
  lockedUser: {
    username: 'locked_out_user',
    password: 'secret_sauce',
  },
};
