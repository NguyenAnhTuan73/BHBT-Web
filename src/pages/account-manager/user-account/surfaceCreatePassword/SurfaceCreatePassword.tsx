import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Button, Modal, message } from 'antd';
import { putResetPasswordUser } from '../../../../service/auth/AuthService';

const SurfaceCreatePassword = (props: any) => {
	const {
		listAllUsers,
		isModalCreatePwVisible,
		setIsModalCreatePwVisible,
		handleCreatePwOk,
		handleCreatePwCancel,
		createPw,
	} = props;
	const [isCreatePasswordContinute, setCreatePasswordContinute] = useState(false);
	const [newPassword, setNewPassword] = useState('');

	const showCreatePasswordContinute = () => {
		setCreatePasswordContinute(true);
	};
	const handleCreatePwCOk = () => {
		setCreatePasswordContinute(false);
	};
	const handleCreatePwCCancel = () => {
		setCreatePasswordContinute(false);
	};
	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};
	const handleContinute = () => {
		setIsModalCreatePwVisible(false);
		showCreatePasswordContinute();
	};
	// news create password to account
	const onFinish = (values: any) => {
		console.log('data info pw', values);

		const usersNameCreatePw = listAllUsers.map((item: any, index: number) => {
			return item;
		});
		console.log('check pw', usersNameCreatePw);
		const result = usersNameCreatePw.filter((item: any) => {
			return item.username === createPw;
		});

		const params = {
			id: result[0].id,
		};
		putResetPasswordUser(params)
			.then(res => {
				console.log('res pword', res);
				setNewPassword(res.data.data.password);
				message.success('Cập nhật mới mật khẩu người dùng thành công');
			})
			.catch(error => {
				console.log(error);
				message.error('Cập nhật mật khẩu thất bại');
			});
	};
	return (
		<>
			<Modal
				closable={false}
				footer={null}
				visible={isModalCreatePwVisible}
				onOk={handleCreatePwOk}
				onCancel={handleCreatePwCancel}
			>
				<h1>XÁC NHẬN TÁI TẠO MẬT KHẨU NGƯỜI DÙNG</h1>
				<Form
					name="basic"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 16 }}
					initialValues={{ remember: true }}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
					style={{ width: '100%' }}
				>
					<p className="my-10">Bạn có chắc muốn tạo mật khẩu tài khoản người này ?</p>

					<div className=" w-full text-right ">
						<Button
							// htmlType="submit"
							onClick={handleCreatePwCancel}
							className="px-3 py-1 border-[1px] text-[#008080] border-[#008080] mr-2 rounded-lg"
						>
							Không
						</Button>
						<Button
							style={{ backgroundColor: '#008080' }}
							type="primary"
							htmlType="submit"
							className=" border-[1px]  bg-[#008080] border-[#008080] rounded-lg"
							onClick={handleContinute}
						>
							Đồng ý
						</Button>
					</div>
				</Form>
			</Modal>

			<Modal
				closable={false}
				footer={null}
				visible={isCreatePasswordContinute}
				onOk={handleCreatePwCOk}
				onCancel={handleCreatePwCCancel}
			>
				<h1>MẬT KHẨU MỚI </h1>
				<Form
					name="basic"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 16 }}
					initialValues={{ remember: true }}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
					style={{ width: '100%' }}
				>
					<div className="flex items-center justify-between">
						<p className="my-10">Mật khẩu mới cho tài khoản này:</p>
						<input
							value={newPassword}
							className="border-[1px] border-[#ccc] px-5 py-2 text-[18px] w-1/3 outline-none"
							type="text"
						/>
					</div>

					<div className=" w-full text-right ">
						<Button
							// htmlType="submit"
							onClick={handleCreatePwCCancel}
							className="px-3 py-1 border-[1px] text-[#008080] border-[#008080] mr-2 rounded-lg"
						>
							Đóng
						</Button>
						<Button
							style={{ backgroundColor: '#008080' }}
							type="primary"
							htmlType="submit"
							className=" border-[1px]  bg-[#008080] border-[#008080] rounded-lg"
						>
							Sao chép
						</Button>
					</div>
				</Form>
			</Modal>
		</>
	);
};

export default SurfaceCreatePassword;
