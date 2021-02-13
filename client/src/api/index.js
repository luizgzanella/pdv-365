import Axios from 'axios';
import Cookies from 'js-cookie';
import { isAuthenticated } from '../utils/auth';

function createAPI() {
  const api = Axios.create({ baseURL: 'http://localhost:3001' });

  const signup = async (username, name, password) => {
    const { data } = await api.post('/signup', { username, name, password });

    return data?.status;
  };

  const signin = async (username, password) => {
    const { data } = await api.post('/signin', { username, password });

    if (data?.token) {
      Cookies.set('token', data.token);
    }

    return isAuthenticated();
  };

  const getUsers = async () => {
    //
  };

  const updateUser = async () => {
    //
  };

  const deleteUser = async () => {
    //
  };

  const getProducts = async () => {
    const { data } = await api.get('/product');

    return data?.productsList ?? [];
  };

  const createProduct = async (product) => {
    const { data } = await api.post('/product', product);
  };

  const deleteProduct = async (id) => {
    await api.delete(`/product/${id}`);
  };

  const updateProduct = async (id, product) => {
    await api.patch(`/product/${id}`, product);
  };

  const sendFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const data = await api.post('/upload', formData);

    return data?.data.url;
  };

  return {
    signup,
    signin,
    getUsers,
    updateUser,
    deleteUser,
    getProducts,
    createProduct,
    deleteProduct,
    updateProduct,
    sendFile,
  };
}

const api = createAPI();

export default api;
