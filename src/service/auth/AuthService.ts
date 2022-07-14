import apiClient from '../../config/apiClient';
import { deleteAccessToken, setAccessToken, setToken } from '../../helper/tokenHelper';
import { configApp } from '../../config/config';

import {
	AuthInterface,
	TypeChangePassword,
	TypeCreateUser,
	TypeUpdateUser,
	TypeAnyUser,
} from '../../interface/auth/auth.interface';

export const userLogin = async (auth: AuthInterface) => {
	return await apiClient.post('/user/login', auth);
};

export const userLogout = async () => {
	return await apiClient.post('/user/logout');
};
export const userChangePassword = async (params: TypeChangePassword) => {
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
export const postNewsUser = async (params: TypeCreateUser) => {
	return await apiClient.post(`/user/create`, params);
};
export const getAllUsers = async () => {
	return await apiClient.get(`/user/get-all`);
};
export const putUpdateUser = async (params: TypeUpdateUser) => {
	return await apiClient.put(`/user/update`, params);
};
export const putResetPasswordUser = async (params: TypeAnyUser) => {
	return await apiClient.put(`/user/reset-password`, params);
};
export const putChangeActivity = async (params: any) => {
	return await apiClient.put(`/user/change-activity`, params);
};
export const getInforUserPagination = async (
	pages: number,
	pageSize: number,
	filterSearch: string,
	sortActive: string,
	groupUserID: string,
) => {
	return await apiClient.get(
		`/user/filter/${pages}/${pageSize}?searchKey=${filterSearch}&status=${sortActive}&userGroupId=${groupUserID}`,
	);
};
export const getListFunctionUser = async () => {
	return await apiClient.get(`/user-group/get-all`);
};
// data group
export const getConfigDataGroup = async (nameGruops: string) => {
	return await apiClient.get(`/masterdata/config-text/${nameGruops}`);
};
