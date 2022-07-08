import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Table, Modal } from 'antd';
import { SearchOutlined, EditOutlined } from '@ant-design/icons';
import { getListAllStaff, getAllUsers } from '../../../service/auth/AuthService';
import PopUp from './popup/PopUp';

const UserAccount = () => {
	const [pageSize, setPageSize] = useState(5);
	const [totalPages, setTotalPages] = useState(1);
	const [listAllUsers, setListAllUser] = useState([]);
	const [loading, setLoading] = useState<boolean>(false);
	// show modal

	const [isModalVisible, setIsModalVisible] = useState(false);

	const showModal = () => {
		setIsModalVisible(true);
	};
	const handleOk = () => {
		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	useEffect(() => {
		setLoading(true);

		getAllUsers()
			.then(res => {
				console.log('resalluser', res);
				setListAllUser(res.data.data);
				setTotalPages(listAllUsers.length);
				setLoading(false);
			})
			.catch(e => {
				console.log('e', e);
			});
	}, []);

	const columns = [
		{ title: 'STT', dataIndex: 'stt' },
		{ title: 'Tên đăng nhập', dataIndex: 'ten_dang_nhap' },
		{ title: 'Nhân viên', dataIndex: 'nhan_vien' },
		{ title: 'Email', dataIndex: 'email' },
		{ title: 'Vai trò người dùng', dataIndex: 'vai_tro_nguoi_dung' },
		{ title: 'Trạng thái', dataIndex: 'trang_thai' },
		{ title: 'Thao tác', dataIndex: 'thao_tac' },
	];
	const dataListAllUser = listAllUsers.map((item: any, i: number) => {
		return {
			stt: i + 1,
			ten_dang_nhap: item.username,
			nhan_vien: item.employee?.name,
			email: item.email,
			vai_tro_nguoi_dung: item.userGroup.name,
			trang_thai: item.status.value,
			thao_tac: <EditOutlined />,
		};
	});
	return (
		<div className="h-full">
			<div className="h-full">
				<div className="flex items-center justify-between mb-4">
					<div className="w-1/2 ">
						<Input className="h-[30px] flex flex-row-reverse" prefix={<SearchOutlined />} />
					</div>
					<button onClick={showModal} className="bg-[#354A5F] px-8 py-2 text-white font-semibold rounded-lg">
						Thêm mới
					</button>
				</div>
				<div className="mb-4 flex">
					<div className="mr-3">
						<h2>Trạng thái</h2>
						<Select placeholder="--Tất cả-" style={{ width: '150px' }}>
							<Select.Option>Đang hoạt động</Select.Option>
							<Select.Option>Vô hiệu hoá</Select.Option>
						</Select>
					</div>
					<div>
						<h2>Vai trò người dùng</h2>
						<Select placeholder="--Tất cả-" style={{ width: '150px' }}>
							<Select.Option>Đang hoạt động</Select.Option>
							<Select.Option>Vô hiệu hoá</Select.Option>
						</Select>
					</div>
				</div>
				<div className="w-full">
					<Table
						columns={columns}
						pagination={{ pageSize: pageSize, total: totalPages }}
						dataSource={dataListAllUser}
						loading={loading}
					/>
					<div className="">
						<PopUp
							isModalVisible={isModalVisible}
							showModal={showModal}
							handleOk={handleOk}
							handleCancel={handleCancel}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserAccount;
