import React from 'react';

const Button = (props: any) => {
	return (
		<button
			className="text-white bg-secondary 
		rounded-lg px-6 py-1 cursor-pointer font-semibold"
			onClick={() => props.onClick()}
		>
			{props.children}
		</button>
	);
};
export const OutlineButton = (props: any) => {
	return (
		<button
			className="px-3 py-1 border-[1px] text-main border-main mr-2 rounded-lg"
			onClick={() => props.onClick()}
		>
			{props.children}
		</button>
	);
};
export const ButtonForm = (props: any) => {
	return (
		<button
			onClick={() => props.onClick()}
			className=" px-3 py-1 border-[1px] text-white border-main bg-main font-semibold mr-2 rounded-lg"
		>
			{props.children}
		</button>
	);
};

export default Button;
