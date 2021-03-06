import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../src/app/store';

import Login from './pages/login/Login';
import Main from './pages/main/Main';
import 'antd/dist/antd.min.css';
import MainContent from './components/main-content/MainContent';
import ChangePassword from './components/main-content/change-password/ChangePassword';

import AccountManager from './pages/account-manager/AccountManager';
import MachineDataManager from './pages/machine-data-manager/MachineDataManager';
import MajorManager from './pages/major-manager/MajorManager';
import MainDataManager from './pages/main-data-manager/MainDataManager';
import NotFound from './pages/404/NotFound';
import UserAccount from './pages/account-manager/user-account/UserAccount';
import UserRole from './pages/account-manager/user-role/UserRole';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route index element={<Login />} />
					<Route path="/main" element={<Main />}>
						<Route index element={<MainContent />} />
						<Route path="change-password" element={<ChangePassword />} />
						<Route path="account-manager" element={<AccountManager />}></Route>
						<Route path="account-manager/user-account" element={<UserAccount />} />
						<Route path="account-manager/user-role" element={<UserRole />} />
						<Route path="main-data-manager" element={<MainDataManager />} />
						<Route path="machine-data-manager" element={<MachineDataManager />} />
						<Route path="major-manager" element={<MajorManager />} />
						<Route path="*" element={<NotFound />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
