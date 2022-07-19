import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Input, Select, Table, Space, Switch, Pagination } from 'antd';
import type { PaginationProps } from 'antd';
import { SearchOutlined, EditOutlined, KeyOutlined } from '@ant-design/icons';
import {
	getAllUsers,
	getInforUserPagination,
	getConfigDataGroup,
	getListFunctionUser,
	putChangeActivity,
} from '../../../service/auth/AuthService';
import { TypeDataUser, TypeRecord, TypeDataGroups, TypeDataUserRole } from '../../../interface/auth/auth.interface';
import SurfaceCreateUser from './surfaceCreateUser/SurfaceCreateUser';
import SurfaceUpdateAccount from './surfaceUpdateAccount/SurfaceUpdateAccount';
import SurfaceCreatePassword from './surfaceCreatePassword/SurfaceCreatePassword';
import SurfaceChangeStatus from './surfaceChangeActivity/SurfaceChangeStatus';

import { USER_STATUS } from '../../../core/enums/user.enum';
const { Option } = Select;

const UserAccount = () => {
	const [sortActive, setSortActive] = useState('');
	const [numberPage, setNumberPage] = useState<number>(0);
	const [sizePage, setSizePage] = useState<number>(6);
	const [totalPages, setTotalPages] = useState<number>(0);
	const [searchParams, setSearchParams] = useSearchParams();
	const typingTimeoutRef = useRef(null);
	const [groupUserID, setGroupUserID] = useState('');
	const [filterSearch, setFilterSearch] = useState<string>('');
	const [userNameHyberLink, setUserNameHyberLink] = useState('');

	// data
	const [dataUser, setDataUser] = useState<any[]>([]);
	const [listAllUsers, setListAllUser] = useState<any>([]);
	const [dataGroups, setDataGroups] = useState<any>([]);
	const [userGroup, setUserGroup] = useState<any>([]);

	const [createPw, setCreatePw] = useState('');
	const [loading, setLoading] = useState<boolean>(false);
	// show modal

	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isModalUpdateVisible, setIsModalUpdateVisible] = useState(false);
	const [isModalCreatePwVisible, setIsModalCreatePwVisible] = useState(false);
	// const [isModalEnable, setIsModalEnable] = useState(false);
	const [IsModalChangeActivity, setIsModalChangeActivity] = useState(false);
	const [itemId, setItemId] = useState({});

	const [currentStatusItem, setCurrenStatustItem] = useState<boolean>(true);
	// SEARCH USER

	// Swithch
	const [status, setStatus] = useState<boolean>(true);
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
	const handleClickEdit = (record: TypeRecord) => {
		setUserNameHyberLink(record.login);

		showModalUpdate();
	};
	// MODAL NEW CREATE PASSWORD

	const showModalCreatePw = () => {
		setIsModalCreatePwVisible(true);
	};
	const handleCreatePwOk = () => {
		setStatus(!status);
		setIsModalCreatePwVisible(false);
	};
	const handleCreatePwCancel = () => {
		setIsModalCreatePwVisible(false);
	};
	const handleClickCreatePw = (params: any) => {
		setCreatePw(params.login);
		showModalCreatePw();
	};
	// GET DATA CONFIG GROUP
	useEffect(() => {
		const nameGroup = 'UserStatus';
		getConfigDataGroup(nameGroup)
			.then(res => {
				setDataGroups(res.data.data);
			})
			.catch(err => {
				console.log(err);
			});
		getListFunctionUser()
			.then(res => {
				setUserGroup(res.data.data);
			})
			.catch(err => {
				console.log(err);
			});
	}, []);
	const userRole = userGroup.map((item: TypeDataUserRole, i: number) => {
		return {
			id: item.id,
			name: item.name,
		};
	});

	const statusStaff = dataGroups.map((item: TypeDataGroups, i: number) => {
		return {
			status: item.displayText,
			value: item.value,
		};
	});
	const handleChangeStatus = (e: any) => {
		const status = statusStaff.find((item: TypeDataGroups, i: number) => {
			if (i === e) {
				return item;
			}
		}).value;
		if (status != undefined) {
			setSortActive(status);
		}
		setSearchParams({
			...searchParams,
			pageNumber: `${numberPage + 1}`,
			pageSize: `${sizePage}`,
			searchKey: e.target.value,
			status: sortActive,
		});
	};
	const handleChangeFunctionUser = (e: any) => {
		userRole.map((item: TypeDataUserRole, i: number) => {
			if (i == e) {
				setGroupUserID(item.id);
			}
		});
	};

	// GET DATA CONFIG GROUP

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

	const columns = [
		{ title: 'STT', dataIndex: 'no' },
		{
			title: 'Tên đăng nhập',
			dataIndex: 'login',
			render: (_: any, record: TypeRecord) => (
				<div
					onClick={() => {
						console.log('record', record);
						setUserNameHyberLink(record.login);

						showModalUpdate();
					}}
				>
					{record.login}
				</div>
			),
		},
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
			render: (_: any, record: TypeRecord) => (
				<Space size="middle">
					<EditOutlined
						className="mr-3  cursor-pointer "
						onClick={() => {
							handleClickEdit(record);
						}}
					/>
					<KeyOutlined
						className=" cursor-pointer "
						onClick={() => {
							handleClickCreatePw(record);
						}}
					/>
				</Space>
			),
		},
	];

	const dataListAllUser = dataUser.map((item: TypeDataUser, i: number) => {
		return {
			no: i + 1,
			login: item.username,
			staff: item.employee?.name || 'N/A',
			email: item.email || 'Not found',
			userrole: item.userGroup.name,
			status: (
				<Switch
					id={item.id}
					checked={item.status.value === USER_STATUS.ACTIVE ? true : false}
					onChange={(checked: boolean, event: any) => {
						event.preventDefault();

						hadleClickChangeActivity(item.id, checked);
					}}
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
		putChangeActivity(itemId);
		const indexUser = dataUser.findIndex((item: TypeDataUser) => item.id === itemId);
		console.log('index', indexUser);
		if (indexUser != -1) {
			dataUser[indexUser].status.value = currentStatusItem ? USER_STATUS.ACTIVE : USER_STATUS.UNACTIVE;
		}
		setIsModalChangeActivity(false);
	};

	const handleChangeActivityCancel = () => {
		setIsModalChangeActivity(false);
	};

	const hadleClickChangeActivity = (id: string, data: boolean) => {
		showModalChangeActivity();
		setItemId(id);
		setCurrenStatustItem(data);
	};
	// change pagiantion
	const handleChange = (e: any) => {
		if (typingTimeoutRef.current) {
			clearTimeout(typingTimeoutRef.current);
		} else {
			setTimeout(() => {
				setFilterSearch(e.target.value);
			}, 300);
		}
		setSearchParams({
			...searchParams,
			pageNumber: `${numberPage + 1}`,
			pageSize: `${sizePage}`,
			searchKey: e.target.value,
			status: sortActive,
		});
	};
	// onCnange input
	const onChange: PaginationProps['onChange'] = (page: number, size: number) => {
		setNumberPage(page - 1);
		setSizePage(size);
		setSearchParams({
			...searchParams,
			pageNumber: `${page}`,
			pageSize: `${size}`,
			searchKey: filterSearch,
			status: sortActive,
		});
	};
	useEffect(() => {
		getInforUserPagination(numberPage, sizePage, filterSearch, sortActive, groupUserID)
			.then(res => {
				setDataUser(res.data.data.items);
			})
			.catch(err => {
				console.log(err);
			});
	}, [numberPage, sizePage, filterSearch, sortActive, groupUserID, itemId]);

	return (
		<div className="h-full">
			<div className="h-full">
				<div className="flex items-center justify-between mb-4">
					<div className="w-1/2 ">
						<Input
							placeholder="Tìm theo tên đăng nhập, email, (nhân viên)..."
							className="h-[30px] flex flex-row-reverse"
							prefix={<SearchOutlined />}
							onChange={handleChange}
						/>
					</div>
					<button onClick={showModal} className="bg-[#354A5F] px-8 py-2 text-white font-semibold rounded-lg">
						Thêm mới
					</button>
				</div>
				<div className="mb-4 flex">
					<div className="mr-3">
						<h2>Trạng thái</h2>
						<Select defaultValue={'--Tất cả-'} className="w-[150px]" onChange={e => handleChangeStatus(e)}>
							{statusStaff.map((item: any, i: number) => (
								<Option key={i}>{item.status}</Option>
							))}
						</Select>
					</div>
					<div>
						<h2>Vai trò người dùng</h2>
						<Select
							defaultValue={'-Tất cả-'}
							className="w-[150px]"
							onChange={e => handleChangeFunctionUser(e)}
						>
							{userRole.map((item: any, i: number) => (
								<Option key={i}>{item.name}</Option>
							))}
						</Select>
					</div>
				</div>
				<div className="w-full">
					<Table columns={columns} pagination={false} dataSource={dataListAllUser} loading={loading} />
				</div>
				<div>
					<Pagination
						showSizeChanger
						onChange={onChange}
						defaultCurrent={1}
						total={totalPages}
						defaultPageSize={6}
						className="flex justify-end"
					/>
				</div>
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
						userNameHyberLink={userNameHyberLink}
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
	);
};

export default UserAccount;
