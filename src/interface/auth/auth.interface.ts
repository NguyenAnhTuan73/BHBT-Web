import { StringLiteral } from 'typescript';

export interface AuthInterface {
	userName: string;
	password: string;
}

export interface ParamFieldItems {
	index: number;
	name: number;
}

export interface AuthInterface {
	userName: string;
	password: string;
}

export interface ParamFieldItems {
	index: number;
	name: number;
}

export interface TypeUser {
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
export interface TypeDataSliderChild {
	id: number;
	titleChild: string;
}
export interface TypeDataSlider {
	id: number;
	title: number;
	dataChild: [];
}

export interface TypeChangePassword {
	oldPassword: string;
	password: string;
}
export interface TypeCreateUser {
	userName: string;
	password: string;
	email: string;
}
export interface TypeUpdateUser {
	id: string;
	email: string;
	employeeId: string;
	userGroupId: string;
}
export interface TypeAnyUser {
	id: string;
}
// user
export interface TypeDataUser {
	id: string;
	email: string;
	employee?: {
		id: string;
		no: string;
		name: string;
	};
	status: {
		key: string;
		value: string;
		displayText: string;
		group: string;
	};
	userGroup: { id: string; name: string };
	username: string;
}
export interface TypeRecord {
	no: number;
	login: string;
	staff: string;
	email: string;
	userrole: string;
	status: { props: { id: string; checked: boolean } };
}
export interface TypeDataGroups {
	key: string;
	value: string;
	displayText: string;
}
export interface TypeDataUserRole {
	id: string;
	name: string;
}
// USER GROUPS ROLE

export interface TypeUserGroups {
	id: string;
	name: string;
	userNumber: number;
	isAdmin: boolean;
}
// user position
export interface TypePositionGroups {
	description?: string;
	id: string;
	name: string;
	userNumber: number;
	isActive: boolean;
	sortOrder: number;
}
// Employee

export interface TypeDataEmployee {
	id: string;
	isActive: boolean;
	name: string;
	position: {
		id: string;
		no: string;
		name: string;
	};
}
export interface TypeMasterDataFeature {
	id: string;
	name: string;
	description: string;
	features: [
		{
			id: string;
			name: string;
			description: string;
		},
	];
}
export interface TypeConfigText {
	isFixed: boolean;
	isNotAllowedEditText: boolean;
	key: string;
	value: string;
	displayText: string;
	group: StringLiteral;
}
