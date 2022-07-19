export enum USER_STATUS {
	ACTIVE = 'Active',
	UNACTIVE = 'UnActive',
}
export enum URL_PRAMETERES {
	SEARCH_KEY = 'searchKey',
	STATUS = 'status',
	USER_GROUP_ID = 'userGroupId',
}
export enum URL_CONFIG_USERS {
	LOGIN = '/user/login',
	LOGOUT = '/user/logout',
	CHANGE_PASSWORD = '/user/change-password',
	LIST_ALL_STAFF = '/employee/get-all',
	PANIGATION_STAFF = '/employee/filter',
	DETAIL_USER = '/user',
	NEWS_USER = '/user/create',
	ALL_USER = '/user/get-all',
	UPDATE_USER = `/user/update`,
	RESET_PASSWORD_USER = '/user/reset-password',
	CHANGE_ACTIVITY = `/user/change-activity`,
	LIST_USERS = '/user/filter',
	// GROUP
}

export enum URL_CONFIG_GROUP {
	LIST_GROUP_USERS_ALL = `/user-group/get-all`,
	LIST_GROUP_USERS = `/user-group/filter`,
	DATA_GROUP = '/masterdata/config-text',
	CREATE_GROUP = `/user-group/create`,
}

export enum URL_CONFIG_POSITION {
	INFOR_POSITION_ITEM = `position`,
	LIST_POSITION_ALL_ITEMS = `position/get-all`,
	LIST_ALL_POSITION = `position/filter`,
}

export enum URL_CONFIG_EMPLOYEE {
	INFOR_EMPLOYEE = `employee`,
	INFOR_ALL_EMPLOYEE = `employee/get-all`,
	LIST_EMPLOYEE = `employee/filter`,
}

// MASTER DATA
export enum URL_CONFIG_MASTER_DATA {
	CONFIG_GROUPS = `masterdata/config-text`,
	CONFIG_ALL_FEATURE = `masterdata/feature/get-all`,
}
