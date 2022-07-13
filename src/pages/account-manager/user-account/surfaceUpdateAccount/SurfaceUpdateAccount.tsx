import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Button, Modal, message } from 'antd';
import { getAllUsers, putUpdateUser } from '../../../../service/auth/AuthService';
import { typeUpdateUser } from '../../../../interface/auth/auth.interface';
import Error, { Success } from '../../../../error/Error';
import { isThrowStatement } from 'typescript';
const { Option } = Select;
const SurfaceUpdateAccount = (props: any) => {
	const [formEdit] = Form.useForm();
	const { isModalUpdateVisible, handleUpdateOk, handleUpdateCancel, itemNameEdit } = props;
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

	const popUpNameRole = dataAllUser.map((item: any, index: number) => {
		return item.userGroup.name;
	});
	// uptade user account
	const usersName = dataAllUser.map((item: any, index: number) => {
		return item.username;
	});

	const onFinish = (values: any) => {
		const resultsUserName = dataAllUser
			.filter((item: any) => {
				return item.status.displayText === 'Đang hoạt động';
			})
			.map((item: any, index: number) => {
				if (item.employee !== null && item.userGroup !== null) {
					return item;
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
								<>
									{item.employee !== null ? (
										<Option key={index} value={item?.employee?.name}>
											{item.employee?.no}-{item?.employee?.name}
										</Option>
									) : (
										''
									)}
								</>
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
					// rules={[
					// 	{
					// 		validator(rule, value) {
					// 			const checkLogin = /^[A-Za-z0-9 ]+$/;
					// 			if (value === '' || value === undefined || value === null) {
					// 				return Promise.reject(new Error('Vui lòng nhập tên đăng nhập'));
					// 			} else if (!checkLogin.test(value)) {
					// 				return Promise.reject(new Error('Chỉ nhập được sô và chữ'));
					// 			} else {
					// 				return Promise.resolve();
					// 			}
					// 		},
					// 	},
					// ]}
					initialValue={itemNameEdit}
				>
					<Input placeholder={itemNameEdit} disabled />
				</Form.Item>

				<Form.Item
					name="email"
					label="E-mail"
					rules={[
						{
							type: 'email',
							message: 'Nhập đúng định dạng email',
						},
						{
							required: true,
							message: 'Nhập email của bạn',
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
