import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Input, Table, Pagination, message } from 'antd';
import type { PaginationProps } from 'antd';
import { SearchOutlined, EyeOutlined, DeleteOutlined, ConsoleSqlOutlined } from '@ant-design/icons';
import { getListFunctionUser, getInforGroupUser } from '../../../service/auth/AuthService';
import { TypeUserGroups } from '../../../interface/auth/auth.interface';
import { Success } from '../../../error/Error';
import Button from '../../../components/button/Button';
import './userRole.scss';
import SurfaceDeleteUserRole from './surfaceDeleteUserRole/SurfaceDeleteUserRole';

const UserRole = () => {
	const navigate = useNavigate();
	const [dataPositionUser, setDataPositionUser] = useState<TypeUserGroups[]>([]);

	const [totalPages, setTotalPages] = useState<number>(0);
	const [numberPage, setNumberPage] = useState<number>(0);
	const [sizePage, setSizePage] = useState<number>(6);
	const [dataGroups, setDataGroups] = useState<any[]>([]);
	// search
	const [filterSearch, setFilterSearch] = useState<string>('');
	const [searchParams, setSearchParams] = useSearchParams();
	const typingTimeoutRef = useRef(null);
	const [sortActive, setSortActive] = useState('');
	const [loading, setLoading] = useState<boolean>(false);
	// surface
	const [isModalDelete, setIsModalDelete] = useState<boolean | undefined>(false);
	const [positionUserId, setPositionUserId] = useState<string>('');
	const [detailPositionUserId, setDetailPositionUserId] = useState<string>('');

	const [curentStatusGroup, setCurentStatusGroup] = useState<boolean>(true);
	// detail

	useEffect(() => {
		setLoading(true);

		getInforGroupUser(numberPage, sizePage, sortActive, filterSearch)
			.then(res => {
				console.log('res employ', res);
				setDataPositionUser(res.data.data.items);

				setLoading(false);
			})
			.catch(err => {
				console.log(err);
			});
		// Detail position user
	}, [numberPage, sizePage, sortActive, filterSearch]);
	console.log('checkdata', dataPositionUser);
	useEffect(() => {
		getListFunctionUser()
			.then(res => {
				console.log('res employ', res);

				setTotalPages(res.data.data?.items.length);
				setLoading(false);
			})
			.catch(err => {
				console.log(err);
			});
	}, []);
	//	SURFACE MODAL DELETE USER ROLE
	const showModalUserRole = () => {
		setIsModalDelete(true);
	};
	const handleDeleteUserRoleOk = () => {
		setIsModalDelete(false);
		console.log('delete', positionUserId);
		// const indexGroupUser = dataPositionUser.findIndex((item: TypeUserGroups) => item.id === groupId);
		// console.log('findindex', indexGroupUser);
		// if (indexGroupUser !== -1) {
		// 	dataPositionUser[indexGroupUser].isAdmin = false;
		// }
		const dataGroupFilter = dataPositionUser.filter((item: TypeUserGroups) => item.id !== positionUserId);
		console.log('hhihihihi', dataGroupFilter);
		setDataPositionUser(dataGroupFilter);
		message.success(Success.deleteGroupUser);
		// console.log('huhuhu', dataPositionUser[indexGroupUser].isAdmin);
		// dataPositionUser.filter((item: TypeUserGroups) => item.id !== groupId);
	};
	const handleDeleteUserRoleCancel = () => {
		setIsModalDelete(false);
	};
	const handleClickDeleteUserRole = (id: string, status: boolean) => {
		showModalUserRole();
		setPositionUserId(id);
		setCurentStatusGroup(status);
	};
	const handleClickDetailPositionUser = (id: string) => {
		setDetailPositionUserId(id);
		console.log('check id', id);
	};
	const columns = [
		{ title: 'STT', dataIndex: 'no' },
		{
			title: 'Vai trò người dùng',
			dataIndex: 'userPostion',
			render: (_: any, record: any) => (
				<div className="text-[#53C6F5] font-semibold cursor-pointer">{record.userPostion}</div>
			),
		},
		{ title: 'Số lượng người dùng', dataIndex: 'usersNumber' },
		{ title: 'Thao tác', dataIndex: 'actions' },
	];
	const data = dataPositionUser
		.filter((item: any) => {
			if (filterSearch === '') {
				return item;
			} else if (item.userNumber.toLowerCase().includes(filterSearch.toLowerCase())) {
				return item;
			}
		})
		.map((item, i: number) => {
			return {
				no: i + 1,
				userPostion: item.name,
				usersNumber: item.userNumber + ' người dùng',
				actions: (
					<div className="social-icons">
						<EyeOutlined
							onClick={() => handleClickDetailPositionUser(item.id)}
							className="mx-4 curson-pointer eye-icon"
						/>
						<DeleteOutlined
							onClick={() => handleClickDeleteUserRole(item.id, item.isAdmin)}
							className="curson-pointer delete-icon"
						/>
					</div>
				),
			};
		});
	// search input
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFilterSearch(e.target.value);
		setSearchParams({
			...searchParams,
			pageNumber: `${numberPage + 1}`,
			pageSize: `${sizePage}`,
			searchKey: e.target.value,
			status: sortActive,
		});
	};
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
	const handleNewRoleUser = () => {
		navigate('new-role-user');
		console.log('hhii');
	};

	return (
		<div>
			<div className="flex justify-between items-center mb-10">
				<div className="w-1/2">
					<Input
						placeholder="Tìm theo vai trò người dùng"
						className=" flex-row-reverse"
						prefix={<SearchOutlined />}
						onChange={handleChange}
					/>
				</div>
				<Button onClick={handleNewRoleUser}>Thêm mới</Button>
			</div>
			<div className="mb-10">
				<Table columns={columns} dataSource={data} pagination={false} loading={loading} />
			</div>
			<div>
				<Pagination
					defaultCurrent={1}
					defaultPageSize={6}
					total={totalPages}
					onChange={onChange}
					className="flex justify-end"
				/>
			</div>
			<div>
				<SurfaceDeleteUserRole
					isModalDelete={isModalDelete}
					handleDeleteUserRoleOk={handleDeleteUserRoleOk}
					handleDeleteUserRoleCancel={handleDeleteUserRoleCancel}
				/>
			</div>
		</div>
	);
};

export default UserRole;
