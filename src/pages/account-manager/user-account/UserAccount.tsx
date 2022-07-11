import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Table, Modal } from 'antd';

import { SearchOutlined, EditOutlined, ConsoleSqlOutlined, KeyOutlined } from '@ant-design/icons';
import { getListAllStaff, getAllUsers } from '../../../service/auth/AuthService';
import SurfaceCreateUser from './surfaceCreateUser/SurfaceCreateUser';
import { iteratorSymbol } from 'immer/dist/internal';
import SurfaceUpdateAccount from './surfaceUpdateAccount/SurfaceUpdateAccount';
const { Option } = Select;
const UserAccount = () => {
	const [pageSize, setPageSize] = useState(5);
	const [totalPages, setTotalPages] = useState(1);
	const [listAllUsers, setListAllUser] = useState([]);
	const [nameRole, setNameRole] = useState({});
	const [loading, setLoading] = useState<boolean>(false);
	// show modal

	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isModalUpdateVisible, setIsModalUpdateVisible] = useState(false);

	const showModal = () => {
		setIsModalVisible(true);
	};
	const handleOk = () => {
		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};
	// modal update account
	const showModalUpdate = () => {
		setIsModalUpdateVisible(true);
	};
	const handleUpdateOk = () => {
		setIsModalUpdateVisible(false);
	};
	const handleUpdateCancel = () => {
		setIsModalUpdateVisible(false);
	};
	useEffect(() => {
		setLoading(true);

		getAllUsers()
			.then(res => {
				setListAllUser(res.data.data);
				setTotalPages(listAllUsers.length);
				setLoading(false);
			})
			.catch(e => {
				console.log('e', e);
			});
	}, []);

	const dataListRole = listAllUsers.map((item: any, index: number) => {
		return item.userGroup.name;
	});

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
			thao_tac: (
				<>
					<EditOutlined
						onClick={showModalUpdate}
						style={{ color: ' red', marginRight: '10px', cursor: 'pointer' }}
					/>
					<KeyOutlined style={{ cursor: 'pointer' }} />
				</>
			),
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
						<Select defaultValue={'--Tất cả-'} style={{ width: '150px' }}>
							<Option value="Đang hoạt động">Đang hoạt động</Option>
							<Option value="Vô hiệu hoá">Vô hiệu hoá</Option>
						</Select>
					</div>
					<div>
						<h2>Vai trò người dùng</h2>
						<Select defaultValue={'-Tất cả-'} style={{ width: '150px' }}>
							{dataListRole
								.filter((item: any, i: number) => dataListRole.indexOf(item) === i)
								.map((item: any, inx: number) => (
									<Option value={item} key={inx}>
										{item}
									</Option>
								))}
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
						<SurfaceCreateUser
							isModalVisible={isModalVisible}
							handleOk={handleOk}
							handleCancel={handleCancel}
							setIsModalVisible={setIsModalVisible}
						/>
						<SurfaceUpdateAccount
							isModalUpdateVisible={isModalUpdateVisible}
							showModalUpdate={showModalUpdate}
							handleUpdateOk={handleUpdateOk}
							handleUpdateCancel={handleUpdateCancel}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserAccount;
