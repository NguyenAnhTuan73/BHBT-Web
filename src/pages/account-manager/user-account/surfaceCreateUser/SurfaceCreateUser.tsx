import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Button, Modal, message } from 'antd';
import { getAllUsers, postNewsUser } from '../../../../service/auth/AuthService';
import Error, { Success } from '../../../../error/Error';
const { Option } = Select;
const PopUp = ({ isModalVisible, handleOk, handleCancel }: any) => {
	const [form] = Form.useForm();
	const [popUp, setPopUp] = useState([]);
	const [objectFind, setObjectFind] = useState({});
	const [groupUserId, setGroupUserId] = useState('');
	useEffect(() => {
		getAllUsers()
			.then(res => {
				setPopUp(res.data.data);
			})
			.catch(error => {
				console.log(error);
			});
	}, []);
	const popUpNameRole = popUp.map((item: any, index: number) => {
		return item.userGroup.name;
	});

	const onFinish = (values: any) => {
		console.log('data info', values);

		const result = popUp
			.filter((item: any) => {
				return item.status.displayText === 'Đang hoạt động';
			})
			.map((item: any, i: number) => {
				if (item.employee !== null) {
					return item;
				}
			});
		const resultFind = result.find((item: any) => item.employee.name === values.staff);

		const params = {
			userName: values.username,
			password: values.password,
			email: values.email,
			employeeId: resultFind.employee.id,
			userGroupId: resultFind.userGroup.id,
		};
		postNewsUser(params)
			.then(res => {
				message.success(Success.newUser);
			})
			.catch(error => {
				message.error(Error.newUser);
			});
	};
	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};

	if (!isModalVisible) {
		form.setFieldsValue({
			staff: '',
			userName: '',
			email: '',
			password: '',
			confirmpassword: '',
			userrole: '',
		});
	}

	return (
		<Modal closable={false} footer={null} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
			<h1>TẠO MỚI TÀI KHOẢN NGƯỜI DÙNG</h1>
			<Form
				form={form}
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
						{popUp.map((item: any, index: number) => {
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
					name="username"
					label={
						<label className="font-semibold">
							Tên đăng nhập <span className="text-red">(*)</span>
						</label>
					}
					rules={[
						{
							validator(rule, value) {
								const checkLogin = /^[A-Za-z0-9 ]+$/;
								if (value === '' || value === undefined || value === null) {
									return Promise.reject(Error.userLogin);
								} else if (!checkLogin.test(value)) {
									return Promise.reject(Error.rulesUser);
								} else {
									return Promise.resolve();
								}
							},
						},
					]}
				>
					<Input placeholder="(Nhập tên đăng nhập)" />
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
					]}
					hasFeedback
				>
					<Input />
				</Form.Item>
				<Form.Item
					label={
						<label className="font-semibold">
							Mật khẩu <span className="text-red">(*)</span>
						</label>
					}
					name="password"
					rules={[
						{ required: true, message: Error.passwordAccount },
						{ min: 8, message: Error.limitCharater },
						{ whitespace: true },
						{
							validator: (_, value) => (value ? Promise.resolve() : Promise.reject(Error.match)),
						},
					]}
					hasFeedback
				>
					<Input.Password placeholder="(Nhập mật khẩu)" />
				</Form.Item>
				<Form.Item
					label={
						<label className="font-semibold">
							Nhập lại mật khẩu <span className="text-red">(*)</span>
						</label>
					}
					name="confirmpassword"
					dependencies={['password']}
					rules={[
						{ required: true, message: Error.confirmPasswordUser },
						({ getFieldValue }) => ({
							validator(_, value) {
								if (!value || getFieldValue('password') === value) {
									return Promise.resolve();
								}
								return Promise.reject(Error.confirmNewPassword);
							},
						}),
					]}
					hasFeedback
				>
					<Input.Password placeholder="(Nhập mật khẩu)" />
				</Form.Item>

				<Form.Item
					name="userrole"
					label={
						<label className="font-semibold">
							Vai trò người dùng <span className="text-red">(*)</span>
						</label>
					}
				>
					<Select defaultValue="-Chọn nhóm người dùng-">
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
							onClick={handleCancel}
							className="px-3 py-1 border-[1px] text-main border-main mr-2 rounded-lg"
						>
							Huỷ thao tác
						</Button>
						<Button
							// onClick={showModal}
							style={{ backgroundColor: '#008080' }}
							type="primary"
							htmlType="submit"
							className=" border-[1px]  bg-main border-main rounded-lg"
						>
							Lưu thông tin
						</Button>
					</div>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default PopUp;
