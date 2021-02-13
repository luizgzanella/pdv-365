import axios from 'axios';
import Cookies from 'js-cookie';

const getAccessToken = () => Cookies.get('token');

export const isAuthenticated = () => !!getAccessToken();

export const signOut = () => Cookies.remove('token');
