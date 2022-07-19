import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/login/Login';
import Main from '../pages/main/Main';
import MainContent from '../components/main-content/MainContent';
import ChangePassword from '../components/main-content/change-password/ChangePassword';

import AccountManager from '../pages/account-manager/AccountManager';
import MachineDataManager from '../pages/machine-data-manager/MachineDataManager';
import MainDataManager from '../pages/main-data-manager/MainDataManager';
import MajorManager from '../pages/major-manager/MajorManager';
import NotFound from '../pages/404/NotFound';
import UserAccount from '../pages/account-manager/user-account/UserAccount';
import UserRole from '../pages/account-manager/user-role/UserRole';
import NewRoleUser from '../pages/account-manager/user-role/NewRoleUser/NewRoleUser';
const RoutesData = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<Login />} />
				<Route path="/main" element={<Main />}>
					<Route index element={<MainContent />} />
					<Route path="change-password" element={<ChangePassword />} />
					<Route path="account-manager" element={<AccountManager />}></Route>
					<Route path="account-manager/user-account" element={<UserAccount />} />
					<Route path="account-manager/user-role" element={<UserRole />} />
					<Route path="account-manager/user-role/new-role-user" element={<NewRoleUser />} />
					<Route path="main-data-manager" element={<MainDataManager />} />
					<Route path="machine-data-manager" element={<MachineDataManager />} />
					<Route path="major-manager" element={<MajorManager />} />
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default RoutesData;
