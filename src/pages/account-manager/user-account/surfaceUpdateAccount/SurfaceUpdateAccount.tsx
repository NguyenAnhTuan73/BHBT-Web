import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Button, Modal, message } from 'antd';
import { getAllUsers, putUpdateUser } from '../../../../service/auth/AuthService';

import Error, { Success } from '../../../../error/Error';
import { isThrowStatement } from 'typescript';
import { USER_STATUS } from '../../../../core/enums/user.enum';
const { Option } = Select;
const SurfaceUpdateAccount = (props: any) => {
	const [formEdit] = Form.useForm();
	const { isModalUpdateVisible, handleUpdateOk, handleUpdateCancel, userNameHyberLink } = props;

	const [dataAllUser, setDataAllUser] = useState([]);
	useEffect(() => {
		getAllUsers()
			.then(res => {
				setDataAllUser(res.data.data);
			})
			.catch(error => {
				console.log(error);
			});
	}, []);

	const popUpNameRole = dataAllUser.map((userItem: any, i: number) => {
		return userItem.userGroup.name;
	});
	// uptade user account
	const usersName = dataAllUser.map((item: any, index: number) => {
		return item.username;
	});

	const onFinish = (values: any) => {
		console.log('value', values);
		const resultsUserName = dataAllUser
			.filter((item: any) => {
				return item.status.value === USER_STATUS.ACTIVE;
			})
			.map((itemValue: any, index: number) => {
				if (itemValue.employee !== null && itemValue.userGroup !== null) {
					return itemValue;
				}
			});
		const resultFind = resultsUserName.find((item: any) => item.employee.name === values.staff);

		const params = {
			id: resultFind.id,
			email: values.email,
			employeeId: resultFind.employee.id,
			userGroupId: resultFind.userGroup.id,
		};
		putUpdateUser(params)
			.then(res => {
				console.log('res update', res);
				message.success(Success.updateUser);
			})
			.catch(error => {
				console.log(error);
				message.error(Error.updateUser);
			});
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};
	if (!isModalUpdateVisible) {
		formEdit.setFieldsValue({
			staff: '',
			login: '',
			email: '',
			userrole: '',
		});
	}

	return (
		<Modal
			closable={false}
			footer={null}
			visible={isModalUpdateVisible}
			onOk={handleUpdateOk}
			onCancel={handleUpdateCancel}
		>
			<h1>CẬP NHẬT TÀI KHOẢN NGƯỜI DÙNG</h1>
			<Form
				form={formEdit}
				name="basic"
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
			>
				<Form.Item label="Nhân viên" name="staff">
					<Select placeholder="-Chọn nhân viên-">
						{dataAllUser.map((item: any, index: number) => {
							return (
								<div key={index}>
									{item.employee !== null ? (
										<Option key={index} value={item?.employee?.name}>
											{item.employee?.no}-{item?.employee?.name}
										</Option>
									) : (
										''
									)}
								</div>
							);
						})}
					</Select>
				</Form.Item>
				<Form.Item
					name="login"
					label={
						<label className="font-semibold">
							Tên đăng nhập <span className="text-[#FF0000]">(*)</span>
						</label>
					}
				>
					<Input placeholder={userNameHyberLink} disabled />
				</Form.Item>

				<Form.Item
					name="email"
					label="E-mail"
					rules={[
						{
							type: 'email',
							message: Error.configEmailUser,
						},
						{
							required: true,
							message: Error.emailUser,
						},
						{
							validator(reule, value) {
								const checkEmail = /^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/;
								if (value === '' || value === undefined || value === null) {
									return Promise.reject(Error.emailUser);
								} else if (!checkEmail.test(value)) {
									return Promise.reject(Error.configEmailUser);
								} else {
									return Promise.resolve();
								}
							},
						},
					]}
					hasFeedback
				>
					<Input />
				</Form.Item>
				<Form.Item
					name="userrole"
					label={
						<label className="font-semibold">
							Vai trò người dùng <span className="text-[#FF0000]">(*)</span>
						</label>
					}
				>
					<Select placeholder="-Chọn nhóm người dùng-">
						{popUpNameRole
							.filter((item: any, i: number) => popUpNameRole.indexOf(item) === i)
							.map((item: any, inx) => (
								<Option key={inx} value={item}>
									{item}
								</Option>
							))}
					</Select>
				</Form.Item>
				<Form.Item className=" ">
					<div className=" w-full text-right">
						<Button
							// htmlType="submit"
							onClick={handleUpdateCancel}
							className="px-3 py-1 border-[1px] text-[#008080] border-[#008080] mr-2 rounded-lg"
						>
							Huỷ thao tác
						</Button>
						<Button
							// onClick={showModal}
							style={{ backgroundColor: '#008080' }}
							type="primary"
							htmlType="submit"
							className=" border-[1px]  bg-[#008080] border-[#008080] rounded-lg"
						>
							Lưu thông tin
						</Button>
					</div>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default SurfaceUpdateAccount;
