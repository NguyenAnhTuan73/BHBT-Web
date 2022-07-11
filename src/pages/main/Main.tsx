import { MenuUnfoldOutlined, BellOutlined, DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu } from 'antd';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import React from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useAppLoading from '../../hook/useAppLoading';
import { userLogout } from '../../service/auth/AuthService';
import { deleteAccessToken } from '../../helper/tokenHelper';
import avatar from '../../asset/images/avatar.jpg';
import dataMain from '../../data/data-main/dataMain';
import './main.scss';

const { Header, Content, Footer, Sider } = Layout;

import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
	label: React.ReactNode,
	key: React.Key,
	icon?: React.ReactNode,
	children?: MenuItem[],
	type?: 'group',
): MenuItem {
	return {
		key,
		icon,
		children,
		label,
		type,
	} as MenuItem;
}

const items: MenuProps['items'] = [
	getItem('QUẢN LÝ TÀI KHOẢN', 'account-manager', <MailOutlined />, [
		getItem('Tài khoản người dùng', 'account-manager/user-account'),
		getItem('Vai trò người dùng', 'account-manager/user-role'),
	]),

	getItem('QUẢN LÝ DỮ LIỆU NGUỒN', 'main-data-manager'),

	getItem('QUẢN LÝ MÁY MÓC THIẾT BỊ', 'machine-data-manager'),
	getItem('QUẢN LÝ NGHIỆP VỤ', 'major-manager'),
];

const Main: React.FC = () => {
	const onClick: MenuProps['onClick'] = e => {
		navigate(`${e.key}`);
	};

	const navigate = useNavigate();
	const location = useLocation();
	const url = location.pathname.slice(6);

	const dispath = useDispatch();
	const [, setAppLoading] = useAppLoading();

	const handleClickItem = (data: any) => {
		console.log(data);
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
									<ul className="absolute py-2 z-10  w-[200px]  text-[#000] bg-white shadow-xl  child-item  ">
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
				<div className="bg-white w-full p-2 h-[50px] flex items-center leading-[50px]">
					{items.map((item: any, index: number) => (
						<div key={index} className="">
							<h1
								className=""
								style={{
									display: item.key === url || item.key === 'account-manager' ? 'block' : 'none',
									lineHeight: '50px',
								}}
							>
								{url === '' ? 'TRANG CHỦ' : item.key === url ? `TRANG CHỦ > ${item.label}` : `  `}
							</h1>
							{item.children !== undefined ? (
								<>
									{item.children.map((itemChild: any, indexChild: number) => {
										if (itemChild.key === url) {
											return (
												<h1 key={indexChild}>
													{' '}
													{`TRANG CHỦ > QUẢN LÝ TÀI KHOẢN > ${itemChild.label}`}
												</h1>
											);
										}
									})}
								</>
							) : (
								''
							)}
						</div>
					))}

					{/* <h1>TRANG CHỦ {location.pathname === '/main/change-password' ? '> THAY ĐỔI MẬT KHẨU' : ''}</h1> */}
				</div>
				<Layout className="bg-white" style={{ padding: '12px 0' }}>
					<Sider className="bg-white" width={300}>
						<Menu
							onClick={onClick}
							style={{ width: 300 }}
							defaultSelectedKeys={['1']}
							defaultOpenKeys={['sub1']}
							mode="inline"
							items={items}
							className="bg-white h-full"
						/>

						{/* {dataMain.map((item: any, i: number) => {
								return (
									<>
										<Menu.Item key={i + 1}>
											<span onClick={() => navigate(`/main${item.path}`)}>{item.name}</span>
										</Menu.Item>
										{item.data ? (
											<Menu.SubMenu title={item.data ? item.name : ''}>
												{item.data?.map((itemChild: any, index: number) => (
													<Menu.Item>hello1</Menu.Item>
												))}
											</Menu.SubMenu>
										) : null}
									</>
								);
							})} */}
					</Sider>
					<div className="bg-white ml-3 w-full h-[85vh] ">
						<div className="py-3 px-4 h-full">
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
