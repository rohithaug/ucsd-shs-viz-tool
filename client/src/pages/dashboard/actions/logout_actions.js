import Cookie from 'js-cookie';

// Create a function to remove the user token from the cookie
export const logout = () => {
    Cookie.remove('token');
    window.location.href = '/signin';
};