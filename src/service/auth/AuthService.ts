import apiClient from '../../config/apiClient';
import { deleteAccessToken, setAccessToken, setToken } from '../../helper/tokenHelper';
import { configApp } from '../../config/config';

import { authInterface, typeChangePassword } from '../../interface/auth/auth.interface';

export const userLogin = async (auth: authInterface) => {
	return await apiClient.post('/user/login', auth);
};

export const userLogout = async () => {
	return await apiClient.post('/user/logout');
};
export const userChangePassword = async (params: typeChangePassword) => {
	return await apiClient.put('/user/change-password', params);
};
