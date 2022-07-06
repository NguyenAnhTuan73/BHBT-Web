import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router-dom';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

function App() {
	return (
		<div className="App">
			<Outlet />
		</div>
	);
}

export default App;
