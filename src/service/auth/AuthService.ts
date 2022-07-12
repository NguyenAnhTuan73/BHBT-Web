import apiClient from '../../config/apiClient';
import { deleteAccessToken, setAccessToken, setToken } from '../../helper/tokenHelper';
import { configApp } from '../../config/config';

import {
	authInterface,
	typeChangePassword,
	typeCreateUser,
	typeUpdateUser,
	typeAnyUser,
} from '../../interface/auth/auth.interface';

export const userLogin = async (auth: authInterface) => {
	return await apiClient.post('/user/login', auth);
};

export const userLogout = async () => {
	return await apiClient.post('/user/logout');
};
export const userChangePassword = async (params: typeChangePassword) => {
	return await apiClient.put('/user/change-password', params);
};
export const getListAllStaff = async () => {
	return await apiClient.get(`/employee/get-all`);
};
export const getPanigationStaff = async (page: number, pageSize: number) => {
	return await apiClient.get(`/employee/filter/${page}/${pageSize}`);
};
// User
export const getDetailUser = async (id: number) => {
	return await apiClient.get(`/user/${id}`);
};
export const getListUsers = async (page: number, pageSize: number) => {
	return await apiClient.get(`/user/filter/${page}/${pageSize}`);
};
export const postNewsUser = async (params: typeCreateUser) => {
	return await apiClient.post(`/user/create`, params);
};
export const getAllUsers = async () => {
	return await apiClient.get(`/user/get-all`);
};
export const putUpdateUser = async (params: typeUpdateUser) => {
	return await apiClient.put(`/user/update`, params);
};
export const putResetPasswordUser = async (params: typeAnyUser) => {
	return await apiClient.put(`/user/reset-password`, params);
};
export const putChangeActivity = async (params: any) => {
	return await apiClient.put(`/user/change-activity`, params);
};
