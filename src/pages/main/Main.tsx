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
import avatar from '../../asset/images/avatar.jpg';
import dataMain from '../../data/data-main/dataMain';
const { Header, Content, Footer, Sider } = Layout;

const items1: MenuProps['items'] = ['1', '2', '3'].map(key => ({
	key,
	label: `nav ${key}`,
}));

const data = dataMain.map((item: any, index: number) => {
	return {
		key: index,
		label: item.name,
		children: item.data?.map((itemChild: any, i: number) => {
			console.log('hihi', itemChild);
			return {
				key: i,
				label: itemChild.titleChild,
			};
		}),
	};
});

const Main: React.FC = () => (
	<Layout>
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
					<div className="relative">
						<div className="">
							<DownOutlined className="text-[10px] cursor-pointer relative" />
							<div className="absolute w-[50px] h-[50px] bg-[#000]  "></div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<Content style={{ padding: '0 50px' }}>
			<div className="bg-white w-full p-2">
				<h1>TRANG CHỦ</h1>
			</div>
			<Layout className="site-layout-background" style={{ padding: '24px 0' }}>
				<Sider className="site-layout-background" width={200}>
					<Menu
						mode="inline"
						defaultSelectedKeys={['1']}
						defaultOpenKeys={['sub1']}
						style={{ height: '100%' }}
						items={data}
					/>
				</Sider>
				<Content style={{ padding: '0 24px', minHeight: 280 }}>Content</Content>
			</Layout>
		</Content>
		<Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
	</Layout>
);

export default Main;
