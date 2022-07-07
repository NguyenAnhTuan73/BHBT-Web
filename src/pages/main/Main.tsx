import {
	LaptopOutlined,
	NotificationOutlined,
	UserOutlined,
	MenuUnfoldOutlined,
	BellOutlined,
	DownOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu } from 'antd';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import useAppLoading from '../../hook/useAppLoading';
import { userLogout } from '../../service/auth/AuthService';
import { deleteAccessToken } from '../../helper/tokenHelper';
import { useDispatch } from 'react-redux';
import avatar from '../../asset/images/avatar.jpg';
import dataMain from '../../data/data-main/dataMain';
import './main.scss';

const { Header, Content, Footer, Sider } = Layout;

const data = dataMain.map((item: any, index: number) => {
	return {
		key: index + 1,
		label: item.name,
		children: item.data?.map((itemChild: any, i: number) => {
			return {
				key: i + 1,
				label: itemChild.titleChild,
			};
		}),
	};
});

const Main: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const dispath = useDispatch();
	const [, setAppLoading] = useAppLoading();

	const handleClickItem = (data: any) => {
		console.log(data.item);
	};

	const logout = async () => {
		setAppLoading(true);

		await userLogout()
			.then(_ => {
				deleteAccessToken();
				navigate('/');

				// window.location.reload();
				setAppLoading(false);
			})
			.catch(_ => {
				deleteAccessToken();

				navigate('/');
				window.location.reload();
				setAppLoading(false);
			});
	};

	return (
		<Layout className="h-auto">
			<div className=" bg-[#354A5F] py-2 px-[50px] text-white">
				<div className="flex items-center justify-between">
					<div className="flex items-center">
						<MenuUnfoldOutlined className="text-[20px]" />
						<h1 className="text-white ml-3 mb-0">NÊN TẢNG BẢO TRÌ BẢO HÀNH THIẾT BỊ</h1>
					</div>
					<div className=" flex items-center">
						<BellOutlined className="text-[20px] mr-3" />
						<div className="">
							<img className="w-[30px] h-[30px] rounded-full object-cover mr-3" src={avatar} alt="" />
						</div>
						<div className="">
							<div className="">
								<div className="relative item">
									<DownOutlined className="text-[10px] cursor-pointer p-1 " />
									<ul className="absolute py-2  w-[200px]  text-[#000] bg-white shadow-xl  child-item  ">
										<li
											onClick={() => navigate('change-password')}
											className=" p-1 pl-2  cursor-pointer hover:bg-[#F0F2F5] duration-300"
										>
											Đổi mật khẩu
										</li>
										<li
											onClick={logout}
											className=" p-1 pl-2  cursor-pointer hover:bg-[#F0F2F5] duration-300"
										>
											Đăng xuất
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Content style={{ padding: '0 50px' }}>
				<div className="bg-white w-full p-2">
					<h1>TRANG CHỦ {location.pathname === '/main/change-password' ? '> THAY ĐỔI MẬT KHẨU' : ''}</h1>
				</div>
				<Layout className="site-layout-background" style={{ padding: '12px 0' }}>
					<Sider className="site-layout-background" width={200}>
						<Menu
							mode="inline"
							defaultSelectedKeys={['1']}
							defaultOpenKeys={['sub1']}
							style={{ height: '100%' }}
							items={data}
							onClick={() => handleClickItem(data)}
						/>
					</Sider>
					<div className="bg-white ml-3 w-full h-[85vh] ">
						<div className="py-3 px-4">
							<Outlet />
						</div>
						<div className=""></div>
					</div>
				</Layout>
			</Content>
		</Layout>
	);
};

export default Main;
