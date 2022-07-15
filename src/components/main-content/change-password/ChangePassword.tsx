import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { userChangePassword } from '../../../service/auth/AuthService';
import Error, { Success } from '../../../error/Error';
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
				message.success(Success.changePassword);
				navigate('/main');
			})
			.catch(error => {
				console.log('loi roi', error);
				message.error(Error.changePassword);
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
					message.error(Error.updateInfor);
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
								message: Error.currentPassword,
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
								message: Error.newPassword,
							},
							{ min: 8, message: Error.limitCharater },
							{ whitespace: true },
							{
								validator: (_, value) => (value ? Promise.resolve() : Promise.reject(Error.match)),
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
								message: Error.updateInfor,
							},

							({ getFieldValue }) => ({
								validator(_, value) {
									if (!value || getFieldValue('newPassword') === value) {
										return Promise.resolve();
									}
									return Promise.reject(Error.confirmNewPassword);
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
