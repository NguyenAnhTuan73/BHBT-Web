import { createSlice, PayloadAction } from '@reduxjs/toolkit';
type store = {
	// id: number;
	uuid: string;
	name: string;
	// email: string;
	// created_at: string;
	// updated_at: string;
};
type userType = {
	gender: string;
	username: string;
	firstName: string;
	lastName: string;
	email: string;
	token: string;
	status: string;
	id: number;
	store: store;
};
type initType = {
	info: userType;
	isLogged: boolean;
	rememberMe: boolean;
};
const initialState: initType = {
	info: {
		gender: '',
		username: '',
		firstName: '',
		lastName: '',
		email: '',
		token: '',
		status: '',
		id: -1,
		store: {
			name: '',
			uuid: '',
		},
	},
	isLogged: false,
	rememberMe: false,
};
export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUserWhenLogged(state, action: PayloadAction<userType>) {
			state.info = action.payload;
			state.isLogged = true;
		},
		setUserWhenLogout(state) {
			state = initialState;
		},
		setRememberMe(state) {
			state.rememberMe = true;
		},
		// setUserComment(state, action: PayloadAction) {
		// 	// state.info = action.payload;
		// 	// state.isLogged = true;
		// 	console.log(action);
		// },
	},
});
export const userAction = userSlice.actions;
export default userSlice.reducer;
