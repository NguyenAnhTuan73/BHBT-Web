import React, { useState, useEffect } from 'react';
import { Input, Checkbox, Form, Select, Button } from 'antd';
import { OutlineButton, ButtonForm } from '../../../../components/button/Button';
import { getListAllFeature, getListOfGroup, postCreateGroup } from '../../../../service/auth/AuthService';
import { TypeMasterDataFeature, TypeConfigText } from '../../../../interface/auth/auth.interface';
const { Option } = Select;
const NewRoleUser = () => {
	const data = [
		{ title: 'Danh mục quản lý' },
		{ title: 'Xem', data: 'DataPermission' },
		{ title: 'Tạo mới', data: 'CreatePermission' },
		{ title: 'Sửa', data: 'ModifilePermission' },
		{ title: 'Quản lý khác(Xoá, import...)', data: 'ManagerPermission' },
	];
	const [dataRoleUsers, setDataRoleUsers] = useState<TypeMasterDataFeature[]>([]);
	const [dataPermission, setDataPermission] = useState<TypeConfigText[]>([]);
	const [createPermission, setCreatePermission] = useState<TypeConfigText[]>([]);
	const [modifilePermission, setModifilePermission] = useState<TypeConfigText[]>([]);
	const [managerPermission, setManagerPermission] = useState<TypeConfigText[]>([]);

	const dtPermission = 'DataPermission';
	const dtCreatePermission = 'CreatePermission';
	const dtModifierPermission = 'ModifierPermission';
	const dtManagerPermission = 'ManagerPermission';
	// create group
	const [valueNameGroup, setValueNameGroup] = useState<string>('');
	useEffect(() => {
		getListAllFeature()
			.then(res => {
				console.log('new role user', res);
				setDataRoleUsers(res.data.data);
			})
			.catch(e => {
				console.log(e);
			});

		getListOfGroup(dtPermission).then(res => {
			setDataPermission(res.data.data);
		});
		getListOfGroup(dtCreatePermission).then(res => {
			setCreatePermission(res.data.data);
		});
		getListOfGroup(dtModifierPermission).then(res => {
			setModifilePermission(res.data.data);
		});
		getListOfGroup(dtManagerPermission).then(res => {
			setManagerPermission(res.data.data);
		});
	}, []);
	console.log('datadata', dataRoleUsers);
	const defaulDataPermission = dataPermission[1]?.displayText;
	const defaulDataCreatePermission = createPermission[1]?.displayText;
	const defaulDataModifilePermission = modifilePermission[1]?.displayText;
	const defaulDataManagerPermission = managerPermission[1]?.displayText;

	const handleChange = (value: string) => {
		console.log(`selected ${value}`);
	};
	const params = {};

	const handleClickSaveInfor = (params: any) => {
		console.log('hii');
	};
	return (
		<>
			<div className="">
				<Form>
					<div className=" flex justify-between items-center mb-4">
						<h1>TẠO MỚI VAI TRÒ NGƯỜI DÙNG</h1>
						<div className="">
							<OutlineButton>Huỷ thao tác</OutlineButton>
							<ButtonForm onClick={handleClickSaveInfor}>Lưu thông tin</ButtonForm>
						</div>
					</div>
					<Form.Item
						name="roleName"
						label="Vai trò người dùng"
						rules={[{ required: true, message: 'Vui lòng nhập vai trò người dùng' }]}
					>
						<div className="w-1/2">
							<Input onChange={e => setValueNameGroup(e.target.value)} className="" />
						</div>
					</Form.Item>
					<div className=" flex justify-center items-center">
						<Checkbox />
						<p className="ml-3 my-0 font-semibold">Thuộc nhóm toàn quyền quản trị hệ thống</p>
					</div>
					<div className="">
						<h6>
							Phần quyền chi tiết: <span className="text-red font-semibold">(*)</span>
						</h6>
						<div className=" flex justify-between items-center font-semibold">
							{data.map((item: any, i: number) => {
								return <p key={i}>{item.title}</p>;
							})}
						</div>
						<div className="h-[2px] w-full bg-[rgb(226,229,231)]"></div>
					</div>
					<Form.Item>
						<div className="">
							<div className="px-2 py-5">
								{dataRoleUsers.map((item: TypeMasterDataFeature, index: number) => {
									return (
										<div className=" " key={item.id}>
											<h5 className="mb-5">{item.description}</h5>
											{item.features.map((itemChild, i: number) => {
												return (
													<div className="flex justify-between items-center mb-5 w-full">
														<p className="w-[20%] m-0">{itemChild.description}</p>
														<div className="w-[20%] mx-2">
															<Select
																defaultValue={defaulDataPermission}
																onChange={handleChange}
																className=""
															>
																{dataPermission.map(
																	(dataP: TypeConfigText, i: number) => {
																		return (
																			<Option key={i}>{dataP.displayText}</Option>
																		);
																	},
																)}
															</Select>
														</div>
														<div className="w-[20%] mx-2">
															<Select
																defaultValue={defaulDataCreatePermission}
																className=""
															>
																{createPermission.map(
																	(dataCP: TypeConfigText, i: number) => {
																		return (
																			<Option key={i}>
																				{dataCP.displayText}
																			</Option>
																		);
																	},
																)}
															</Select>
														</div>
														<div className="w-[20%] mx-2">
															<Select
																defaultValue={defaulDataModifilePermission}
																className=""
															>
																{modifilePermission.map(
																	(dataMoP: TypeConfigText, i: number) => {
																		return (
																			<Option key={i}>
																				{dataMoP.displayText}
																			</Option>
																		);
																	},
																)}
															</Select>
														</div>
														<div className="w-[20%] mx-2">
															<Select
																defaultValue={defaulDataManagerPermission}
																className=""
															>
																{managerPermission.map(
																	(dataMaP: TypeConfigText, i: number) => {
																		return (
																			<Option key={i}>
																				{dataMaP.displayText}
																			</Option>
																		);
																	},
																)}
															</Select>
														</div>
													</div>
												);
											})}
										</div>
									);
								})}
							</div>
						</div>
					</Form.Item>
				</Form>
			</div>
		</>
	);
};

export default NewRoleUser;
