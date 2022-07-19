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
import {
	URL_PRAMETERES,
	URL_CONFIG_USERS,
	URL_CONFIG_GROUP,
	URL_CONFIG_POSITION,
	URL_CONFIG_EMPLOYEE,
	URL_CONFIG_MASTER_DATA,
} from '../../core/enums/user.enum';
export const userLogin = async (auth: AuthInterface) => {
	return await apiClient.post('/user/login', auth);
};

export const userLogout = async () => {
	return await apiClient.post(URL_CONFIG_USERS.LOGIN);
};
export const userChangePassword = async (params: TypeChangePassword) => {
	return await apiClient.put(URL_CONFIG_USERS.LOGOUT, params);
};
export const getListAllStaff = async () => {
	return await apiClient.get(URL_CONFIG_USERS.LIST_ALL_STAFF);
};
export const getPanigationStaff = async (page: number, pageSize: number) => {
	return await apiClient.get(`${URL_CONFIG_USERS.PANIGATION_STAFF}/${page}/${pageSize}`);
};
// User
export const getDetailUser = async (id: number) => {
	return await apiClient.get(`${URL_CONFIG_USERS.DETAIL_USER}/${id}`);
};
export const getListUsers = async (page: number, pageSize: number) => {
	return await apiClient.get(`${URL_CONFIG_USERS.LIST_USERS}/${page}/${pageSize}`);
};
export const postNewsUser = async (params: TypeCreateUser) => {
	return await apiClient.post(URL_CONFIG_USERS.NEWS_USER, params);
};
export const getAllUsers = async () => {
	return await apiClient.get(URL_CONFIG_USERS.ALL_USER);
};
export const putUpdateUser = async (params: TypeUpdateUser) => {
	return await apiClient.put(URL_CONFIG_USERS.UPDATE_USER, params);
};
export const putResetPasswordUser = async (params: TypeAnyUser) => {
	return await apiClient.put(URL_CONFIG_USERS.RESET_PASSWORD_USER, params);
};
export const putChangeActivity = async (params: any) => {
	return await apiClient.put(URL_CONFIG_USERS.CHANGE_ACTIVITY, params);
};
export const getInforUserPagination = async (
	pages: number,
	pageSize: number,
	filterSearch: string,
	sortActive: string,
	groupUserID?: string,
) => {
	const dataUrlName = {};
	return await apiClient.get(
		`/user/filter/${pages}/${pageSize}?${URL_PRAMETERES.SEARCH_KEY}=${filterSearch}&${URL_PRAMETERES.STATUS}=${sortActive}&${URL_PRAMETERES.USER_GROUP_ID}=${groupUserID}`,
	);
};
export const getListFunctionUser = async () => {
	return await apiClient.get(URL_CONFIG_GROUP.LIST_GROUP_USERS_ALL);
};
// data group
export const getConfigDataGroup = async (nameGruops: string) => {
	return await apiClient.get(`${URL_CONFIG_GROUP.DATA_GROUP}/${nameGruops}`);
};
export const getInforGroupUser = async (
	pages: number,
	pageSize: number,
	filterSearch: string,
	sortActive?: string,
	groupUserID?: string,
) => {
	return await apiClient.get(
		`${URL_CONFIG_GROUP.LIST_GROUP_USERS}/${pages}/${pageSize}/?${URL_PRAMETERES.SEARCH_KEY}=${filterSearch}&${URL_PRAMETERES.STATUS}=${sortActive}&${URL_PRAMETERES.USER_GROUP_ID}=${groupUserID}`,
	);
};

export const postCreateGroup = async (params: any) => {
	return await apiClient.post(`${URL_CONFIG_GROUP.CREATE_GROUP}`, params);
};

// EMPLOYEE

export const getInforEmployee = async (id: string) => {
	return await apiClient.get(`${URL_CONFIG_EMPLOYEE.INFOR_EMPLOYEE}/${id}`);
};
export const getInforAllEmployee = async () => {
	return await apiClient.get(`${URL_CONFIG_EMPLOYEE.INFOR_ALL_EMPLOYEE}`);
};
export const getListEmployee = async (
	pages?: number,
	pageSize?: number,
	filterSearch?: string,
	sortActive?: string,
) => {
	return await apiClient.get(
		`${URL_CONFIG_EMPLOYEE.LIST_EMPLOYEE}/${pages}/${pageSize}/?${URL_PRAMETERES.SEARCH_KEY}=${filterSearch}&${URL_PRAMETERES.STATUS}=${sortActive}`,
	);
};
// POSITION  - CHỨC VỤ
export const getInforPositionItem = async (id: string) => {
	return await apiClient.get(`${URL_CONFIG_POSITION.INFOR_POSITION_ITEM}/${id}`);
};
export const getListPositionAllItems = async () => {
	return await apiClient.get(`${URL_CONFIG_POSITION.LIST_POSITION_ALL_ITEMS}`);
};
export const getListAllPosition = async (pages: number, pageSize: number, filterSearch: string, sortActive: string) => {
	return await apiClient.get(
		`${URL_CONFIG_POSITION.LIST_ALL_POSITION}/${pages}/${pageSize}/?${URL_PRAMETERES.SEARCH_KEY}=${filterSearch}&${URL_PRAMETERES.STATUS}=${sortActive}`,
	);
};
// MASTER DATA
export const getListAllFeature = async () => {
	return await apiClient.get(`${URL_CONFIG_MASTER_DATA.CONFIG_ALL_FEATURE}`);
};
export const getListOfGroup = async (nameGroup: string) => {
	return await apiClient.get(`${URL_CONFIG_MASTER_DATA.CONFIG_GROUPS}/${nameGroup}`);
};
