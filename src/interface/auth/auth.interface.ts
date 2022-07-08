export interface authInterface {
	userName: string;
	password: string;
}

export interface ParamFieldItems {
	index: number;
	name: number;
}

export interface authInterface {
	userName: string;
	password: string;
}

export interface ParamFieldItems {
	index: number;
	name: number;
}

export interface typeUser {
	accessToken: string;
	employeeId: null | string;
	employeeName: null | string;
	expiredTime: number;
	isAdmin: boolean;
	refreshExpiredTime: number;
	refreshToken: string;
	tokenType: string;
	userGroupId: string;
	userId: string;
	userName: string;
}
export interface typeDataSliderChild {
	id: number;
	titleChild: string;
}
export interface typeDataSlider {
	id: number;
	title: number;
	dataChild: [];
}

export interface typeChangePassword {
	oldPassword: string;
	password: string;
}
export interface typeCreateUser {
	username: string;
	password: string;
	email: string;
}
