import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Table, Modal, Space, Switch } from 'antd';

import { SearchOutlined, EditOutlined, ConsoleSqlOutlined, KeyOutlined } from '@ant-design/icons';
import { getListAllStaff, getAllUsers } from '../../../service/auth/AuthService';
import { iteratorSymbol } from 'immer/dist/internal';
import SurfaceCreateUser from './surfaceCreateUser/SurfaceCreateUser';
import SurfaceUpdateAccount from './surfaceUpdateAccount/SurfaceUpdateAccount';
import SurfaceCreatePassword from './surfaceCreatePassword/SurfaceCreatePassword';
import SurfaceEnable from './surfaceChangeActivity/SurfaceEnable';
import SurfaceDisable from './surfaceChangeActivity/SurfaceDisable';

const { Option } = Select;
const UserAccount = () => {
	const [pageSize, setPageSize] = useState(5);
	const [totalPages, setTotalPages] = useState(1);
	const [listAllUsers, setListAllUser] = useState([]);
	const [itemNameEdit, setItemNameEdit] = useState('');
	const [createPw, setCreatePw] = useState('');
	const [loading, setLoading] = useState<boolean>(false);
	// show modal

	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isModalUpdateVisible, setIsModalUpdateVisible] = useState(false);
	const [isModalCreatePwVisible, setIsModalCreatePwVisible] = useState(false);
	// const [isModalEnable, setIsModalEnable] = useState(false);
	const [isModalDisable, setIsModalDisable] = useState(false);
	const [itemId, setItemId] = useState('');
	const [checked, setCheked] = useState(true);

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
	const handleClickEdit = (params: any) => {
		setItemNameEdit(params.ten_dang_nhap);
		showModalUpdate();
	};
	// MODAL NEW CREATE PASSWORD

	const showModalCreatePw = () => {
		setIsModalCreatePwVisible(true);
	};
	const handleCreatePwOk = () => {
		setIsModalCreatePwVisible(false);
	};
	const handleCreatePwCancel = () => {
		setIsModalCreatePwVisible(false);
	};
	const handleClickCreatePw = (params: any) => {
		setCreatePw(params.ten_dang_nhap);
		showModalCreatePw();
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
		{
			title: 'Trạng thái',
			dataIndex: 'trang_thai',
		},
		{
			title: 'Thao tác',
			dataIndex: 'thao_tac',
			render: (_: any, record: any) => (
				<Space size="middle">
					<EditOutlined
						onClick={() => {
							handleClickEdit(record);
						}}
					/>
					<KeyOutlined
						onClick={() => {
							handleClickCreatePw(record);
						}}
					/>
				</Space>
			),
		},
	];
	const dataListAllUser = listAllUsers.map((item: any, i: number) => {
		return {
			stt: i + 1,
			ten_dang_nhap: item.username,
			nhan_vien: item.employee?.name,
			email: item.email,
			vai_tro_nguoi_dung: item.userGroup.name,
			trang_thai: <Switch checked={true} onClick={() => handleClickActivity(item.id)} />,
			thao_tac: (
				<>
					<EditOutlined style={{ color: ' red', marginRight: '10px', cursor: 'pointer' }} />
					<KeyOutlined style={{ cursor: 'pointer' }} />
				</>
			),
		};
	});
	// MODAL SURFACE DISABLE AND ENABLE
	const showModalDisable = () => {
		setIsModalDisable(true);
	};
	const handleDisableOk = () => {
		setIsModalDisable(false);
		// setIsChangeActivity(false);
	};

	const handleDisableCancel = () => {
		setIsModalDisable(false);
	};

	// const onChange = (checked: boolean) => {
	// 	setIsChangeActivity(checked);
	// 	if (checked === false) {
	// 	}
	// 	console.log(`switch to ${checked}`);
	// };
	const handleClickActivity = (id: any) => {
		showModalDisable();
		setItemId(id);
		console.log('hello', id);
	};
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
							itemNameEdit={itemNameEdit}
						/>
						<SurfaceCreatePassword
							isModalCreatePwVisible={isModalCreatePwVisible}
							setIsModalCreatePwVisible={setIsModalCreatePwVisible}
							handleCreatePwOk={handleCreatePwOk}
							handleCreatePwCancel={handleCreatePwCancel}
							listAllUsers={listAllUsers}
							createPw={createPw}
						/>
						<SurfaceDisable
							isModalDisable={isModalDisable}
							showModalDisable={showModalDisable}
							handleDisableOk={handleDisableOk}
							handleDisableCancel={handleDisableCancel}
							itemId={itemId}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserAccount;
