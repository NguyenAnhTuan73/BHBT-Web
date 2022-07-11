import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Button, Modal, message } from 'antd';
import { getAllUsers } from '../../../../service/auth/AuthService';
const { Option } = Select;
const SurfaceUpdateAccount = (props: any) => {
	const { isModalUpdateVisible, handleUpdateOk, handleUpdateCancel } = props;
	const [dataAllUser, setDataAllUser] = useState([]);
	useEffect(() => {
		getAllUsers()
			.then(res => {
				console.log('respopup', res);
				setDataAllUser(res.data.data);
			})
			.catch(error => {
				console.log(error);
			});
	}, []);

	const popUpNameRole = dataAllUser.map((item: any, index: number) => {
		return item.userGroup.name;
	});

	const onFinish = (values: any) => {
		console.log('data info', values);
	};
	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};

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
					name="username"
					label={
						<label className="font-semibold">
							Tên đăng nhập <span className="text-[#FF0000]">(*)</span>
						</label>
					}
					rules={[
						{
							validator(rule, value) {
								const checkLogin = /^[A-Za-z0-9 ]+$/;
								if (value === '' || value === undefined || value === null) {
									return Promise.reject(new Error('Vui lòng nhập tên đăng nhập'));
								} else if (!checkLogin.test(value)) {
									return Promise.reject(new Error('Chỉ nhập được sô và chữ'));
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
							message: 'Nhập đúng định dạng email',
						},
						{
							required: true,
							message: 'Nhập email của bạn',
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
