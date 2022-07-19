import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Button, Modal, message } from 'antd';

const SurfaceDeleteUserRole = (props: any) => {
	const { isModalDelete, handleDeleteUserRoleOk, handleDeleteUserRoleCancel } = props;
	const onFinish = (values: any) => {};
	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<Modal
			closable={false}
			footer={null}
			visible={isModalDelete}
			onOk={handleDeleteUserRoleOk}
			onCancel={handleDeleteUserRoleCancel}
		>
			<h1>XÁC NHẬN XOÁ VAI TRÒ NGƯỜI DÙNG</h1>

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
				<p className="my-10">Bạn có chắc muốn xoá Vai trò người dùng này ?</p>

				<div className=" w-full text-right ">
					<Button
						htmlType="submit"
						onClick={handleDeleteUserRoleCancel}
						className="px-3 py-1 border-[1px] text-main border-main mr-2 rounded-lg"
					>
						Không
					</Button>
					<Button
						onClick={handleDeleteUserRoleOk}
						style={{ backgroundColor: '#008080' }}
						type="primary"
						htmlType="submit"
						className=" border-[1px]  bg-main border-main rounded-lg"
					>
						Đồng ý
					</Button>
				</div>
			</Form>
		</Modal>
	);
};

export default SurfaceDeleteUserRole;
