import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Button, Modal, message } from 'antd';
import { putChangeActivity } from '../../../../service/auth/AuthService';

const SurfaceDisable = (props: any) => {
	const { isModalDisable, showModalDisable, handleDisableOk, handleDisableCancel, itemId } = props;
	console.log('id:', itemId);
	const onFinish = (values: any) => {
		// const result = usersNameDisable.filter((item: any) => {
		// 	return item.username === itemName;
		// });
		const params = {
			id: itemId,
		};
		putChangeActivity(params)
			.then(res => {
				console.log('res disiable', res);
			})
			.catch(error => {
				console.log(error);
			});
	};
	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};
	return (
		<Modal
			closable={false}
			footer={null}
			visible={isModalDisable}
			onOk={handleDisableOk}
			onCancel={handleDisableCancel}
		>
			<h1>XÁC NHẬN VÔ HIỆU HOÁ TÀI KHOẢN NGƯỜI DÙNG</h1>
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
				<p className="my-10">Bạn có chắc muốn vô hiệu hoá tài khoản người dùng này ?</p>

				<div className=" w-full text-right ">
					<Button
						// htmlType="submit"
						onClick={handleDisableCancel}
						className="px-3 py-1 border-[1px] text-[#008080] border-[#008080] mr-2 rounded-lg"
					>
						Không
					</Button>
					<Button
						onClick={handleDisableOk}
						style={{ backgroundColor: '#008080' }}
						type="primary"
						htmlType="submit"
						className=" border-[1px]  bg-[#008080] border-[#008080] rounded-lg"
					>
						Đồng ý
					</Button>
				</div>
			</Form>
		</Modal>
	);
};

export default SurfaceDisable;
