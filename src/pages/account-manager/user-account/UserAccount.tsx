import React, { useEffect, useState } from 'react';
import { Input, Select, Table, Space, Switch } from 'antd';

import { SearchOutlined, EditOutlined, KeyOutlined } from '@ant-design/icons';
import { getAllUsers } from '../../../service/auth/AuthService';

import SurfaceCreateUser from './surfaceCreateUser/SurfaceCreateUser';
import SurfaceUpdateAccount from './surfaceUpdateAccount/SurfaceUpdateAccount';
import SurfaceCreatePassword from './surfaceCreatePassword/SurfaceCreatePassword';

import SurfaceChangeStatus from './surfaceChangeActivity/SurfaceChangeStatus';
import { stringify } from 'querystring';

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
	const [IsModalChangeActivity, setIsModalChangeActivity] = useState(false);
	const [itemId, setItemId] = useState('');

	const [currentStatusItem, setCurrenStatustItem] = useState('');
	// SEARCH USER
	const [value, setValue] = useState('');

	const [tableFilter, setTableFilter] = useState([]);

	const filterData = (e: any) => {
		if (e.target.value !== '') {
			setValue(e.target.value);
			const filterTable = listAllUsers.filter((i: any) =>
				Object.keys(i).some((key: any) => String(i[key]).toLowerCase().includes(e.target.value.toLowerCase())),
			);
			setTableFilter([...filterTable]);
		} else {
			setValue(e.target.value);
			setListAllUser([...listAllUsers]);
		}
	};
	// SEARCH USER
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
		setItemNameEdit(params.login);
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
		setCreatePw(params.login);
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
		{ title: 'STT', dataIndex: 'no' },
		{ title: 'Tên đăng nhập', dataIndex: 'login' },
		{ title: 'Nhân viên', dataIndex: 'staff' },
		{ title: 'Email', dataIndex: 'email' },
		{ title: 'Vai trò người dùng', dataIndex: 'userrole' },
		{
			title: 'Trạng thái',
			dataIndex: 'status',
		},
		{
			title: 'Thao tác',
			dataIndex: 'action',
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
	const dataListAllUser =
		value.length > 0
			? tableFilter.map((item: any, i: number) => {
					return {
						no: i + 1,
						login: item.username,
						staff: item.employee?.name,
						email: item.email,
						userrole: item.userGroup.name,
						status: (
							<Switch
								checked={item.status.value === 'Active' ? true : false}
								onClick={() => hadleClickChangeActivity(item.id, item.status.value)}
							/>
						),

						action: (
							<>
								<EditOutlined style={{ color: ' red', marginRight: '10px', cursor: 'pointer' }} />
								<KeyOutlined style={{ cursor: 'pointer' }} />
							</>
						),
					};
			  })
			: listAllUsers.map((item: any, i: number) => {
					return {
						no: i + 1,
						login: item.username,
						staff: item.employee?.name,
						email: item.email,
						userrole: item.userGroup.name,
						status: (
							<Switch
								checked={item.status.value === 'Active' ? true : false}
								onClick={() => hadleClickChangeActivity(item.id, item.status.value)}
							/>
						),

						action: (
							<>
								<EditOutlined style={{ color: ' red', marginRight: '10px', cursor: 'pointer' }} />
								<KeyOutlined style={{ cursor: 'pointer' }} />
							</>
						),
					};
			  });

	//

	// MODAL SURFACE ChangeActivity AND ENABLE
	const showModalChangeActivity = () => {
		setIsModalChangeActivity(true);
	};

	const handleChangeActivityOk = () => {
		setIsModalChangeActivity(false);
	};

	const handleChangeActivityCancel = () => {
		setIsModalChangeActivity(false);
	};

	const hadleClickChangeActivity = (id: string, data: string) => {
		showModalChangeActivity();
		setItemId(id);
		setCurrenStatustItem(data);
	};

	return (
		<div className="h-full">
			<div className="h-full">
				<div className="flex items-center justify-between mb-4">
					<div className="w-1/2 ">
						<Input
							placeholder="Tìm theo tên đăng nhập, email, (nhân viên)..."
							className="h-[30px] flex flex-row-reverse"
							prefix={<SearchOutlined />}
							value={value}
							onChange={e => filterData(e)}
						/>
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
						<SurfaceChangeStatus
							IsModalChangeActivity={IsModalChangeActivity}
							showModalChangeActivity={showModalChangeActivity}
							handleChangeActivityOk={handleChangeActivityOk}
							handleChangeActivityCancel={handleChangeActivityCancel}
							itemId={itemId}
							currentStatusItem={currentStatusItem}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserAccount;
