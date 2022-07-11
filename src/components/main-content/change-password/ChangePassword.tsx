import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { userChangePassword } from '../../../service/auth/AuthService';
import CryptoJS from 'crypto-js';
const ChangePassword = () => {
	const navigate = useNavigate();
	const onFinish = (values: any) => {
		console.log('data', values);
		const SALT =
			'n3beYvkHzZimLUrMDWRWMXFknFulI6AKZ1qunqiIznjT5JjsJ80VbPbUOaJMWiJBmx9HzylJRvURI7AVHoGENEu9v6lT7F5fRWtc';

		const parsedSalt = CryptoJS.enc.Base64.parse(SALT);
		const resultPassword = CryptoJS.PBKDF2(values.currentPassword, parsedSalt, {
			keySize: 64 / 4,
			iterations: 1000,
			hasher: CryptoJS.algo.SHA512,
		});

		const realPass = CryptoJS.enc.Base64.stringify(resultPassword);
		const params = {
			oldPassword: realPass,
			password: values.newPassword,
		};
		console.log(params);
		userChangePassword(params)
			.then((res: any) => {
				console.log('sussec', res);
				message.success('Thay đổi mật khẩu thành công');
				navigate('/main');
			})
			.catch(error => {
				console.log('loi roi', error);
				message.error('Thay đổi mật khẩu không thành công');
			});
	};

	const oldPassword = localStorage.getItem('password');

	return (
		<div className="">
			<Form
				labelCol={{ span: 10 }}
				// onFinish={values => {
				// 	message.success('Thay đổi mật khẩu mới thành công');
				// 	console.log('data', values);
				// }}
				onFinish={onFinish}
				onFinishFailed={error => {
					message.error('Vui lòng cập nhật thông tin này');
				}}
			>
				<div className="flex justify-between items-center">
					<h1>THAY ĐỔI MẬT KHẨU</h1>
					<Button
						style={{ backgroundColor: '#008080', color: 'white', fontWeight: 'bold', borderRadius: '8px' }}
						htmlType="submit"
						// className="bg-[#008080] font-semibold text-white text-[12px] py-1 px-3 rounded-md"
					>
						LƯU THÔNG TIN
					</Button>
				</div>
				<div className="w-1/2">
					<Form.Item
						label="Mật khẩu hiện tại(*)"
						name="currentPassword"
						rules={[
							{
								required: true,
								message: 'Nhập mật khẩu hiện tại',
							},
							({ getFieldValue }) => ({
								validator(_, value) {
									if (getFieldValue('currentPassword') === oldPassword) {
										return Promise.resolve();
									}
									return Promise.reject();
								},
							}),
						]}
					>
						<Input.Password size="small" />
					</Form.Item>
					<Form.Item
						label="Mật khẩu mới(*)"
						name="newPassword"
						rules={[
							{
								required: true,
								message: 'Nhập mật khẩu mới',
							},
							{ min: 8, message: 'Mật khẩu tối thiểu 8 ký tự' },
							{ whitespace: true },
							{
								validator: (_, value) =>
									value && value.includes('A')
										? Promise.resolve()
										: Promise.reject('Password does not match criteria.'),
							},
						]}
					>
						<Input.Password size="small" />
					</Form.Item>
					<Form.Item
						label="Xác nhận lại mật khẩu mới(*)"
						name="confirmPassword"
						dependencies={['newPassword']}
						rules={[
							{
								required: true,
								message: '(Vui lòng cập nhập thông tin này)',
							},

							({ getFieldValue }) => ({
								validator(_, value) {
									if (!value || getFieldValue('newPassword') === value) {
										return Promise.resolve();
									}
									return Promise.reject('Mật khẩu hoặc mật khẩu xác nhận không đúng');
								},
							}),
						]}
					>
						<Input.Password size="small" />
					</Form.Item>
				</div>
			</Form>
		</div>
	);
};

export default ChangePassword;
