import React from 'react';
import { Form, Input, Select, Button, Modal } from 'antd';

const PopUp = ({ setIsModalVisible, isModalVisible, handleOk, handleCancel, showModal }: any) => {
	const onFinish = (values: any) => {
		console.log('data', values);
	};

	return (
		<div className="">
			<Modal closable={false} footer={null} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
				<Form onFinish={onFinish} labelCol={{ span: 8 }}>
					<h1>TẠO MỚI TÀI KHOẢN NGƯỜI DÙNG</h1>
					<Form.Item label="Nhân viên">
						<Select placeholder="-Chọn nhân viên-">
							<Select.Option>nv1</Select.Option>
							<Select.Option>nv2</Select.Option>
							<Select.Option>nv3</Select.Option>
							<Select.Option>nv4</Select.Option>
						</Select>
					</Form.Item>
					<Form.Item
						label={
							<label className="font-semibold">
								Tên đăng nhập <span className="text-[#FF0000]">(*)</span>
							</label>
						}
						name="login"
						rules={[
							{ required: true, message: 'Chỉ cho phép nhập chữ và số' },
							{
								validator(rule, value) {
									const checkLogin = /^[A-Za-z0-9 ]+$/;

									if (!checkLogin.test(value)) {
										return Promise.reject('Chỉ nhập được sô và chữ');
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
						label={
							<label className="font-semibold">
								Mật khẩu <span className="text-[#FF0000]">(*)</span>
							</label>
						}
						name="password"
						rules={[
							{ required: true, message: 'Nhập mật khẩu' },
							{ min: 8, message: 'Mật khẩu tối thiểu có 8 ký tự' },
							{ whitespace: true },
							{
								validator: (_, value) =>
									value ? Promise.resolve() : Promise.reject('Password does not match criteria.'),
							},
						]}
						hasFeedback
					>
						<Input.Password placeholder="(Nhập mật khẩu)" />
					</Form.Item>
					<Form.Item
						label={
							<label className="font-semibold">
								Nhập lại mật khẩu <span className="text-[#FF0000]">(*)</span>
							</label>
						}
						name="confirmpassword"
						dependencies={['password']}
						rules={[
							{ required: true, message: 'Vui lòng xác nhập lại mật khẩu' },
							({ getFieldValue }) => ({
								validator(_, value) {
									if (!value || getFieldValue('password') === value) {
										return Promise.resolve();
									}
									return Promise.reject('Mật khẩu hoặc mật khẩu xác nhận không đúng');
								},
							}),
						]}
						hasFeedback
					>
						<Input.Password placeholder="(Nhập mật khẩu)" />
					</Form.Item>

					<Form.Item
						label={
							<label className="font-semibold">
								Vai trò người dùng <span className="text-[#FF0000]">(*)</span>
							</label>
						}
					>
						<Select placeholder="-Chọn nhóm người dùng-">
							<Select.Option> Tổng Giám Đốc</Select.Option>
							<Select.Option>Trưởng Phòng Nhân Sự</Select.Option>
							<Select.Option>Phó Phòng Nhân Sự</Select.Option>
							<Select.Option>Nhân Viên Kỹ Thuật</Select.Option>
						</Select>
					</Form.Item>
					<Form.Item>
						<div className=" w-full text-right">
							<Button className="px-3 py-1 border-[1px] text-[#008080] border-[#008080] mr-2 rounded-lg">
								Huỷ thao tác
							</Button>
							<Button
								onClick={showModal}
								style={{ backgroundColor: '#008080' }}
								htmlType="submit"
								className=" border-[1px]  bg-[#008080] border-[#008080] rounded-lg"
							>
								<div className="bg-[#008080] w-full h-full text-white">Lưu thông tin</div>
							</Button>
						</div>
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
};

export default PopUp;
