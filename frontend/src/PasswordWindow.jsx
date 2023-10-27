import './index.css'
import eye_on from './image/visibility_on.svg'
import eye_off from './image/visibility_off.svg'
import { useEffect, useState } from 'react';
import axios from 'axios';
const Passlist = ({ _data, setEdit, setDelete }) => {

	const [visibilty, setVisibilty] = useState(false);
	const [Type, setType] = useState("password");
	const HandelVisibilty = (e) => {
		setVisibilty(!visibilty);
		if (visibilty) {
			e.target.src = eye_off
			setType("text");
		}
		else {
			e.target.src = eye_on
			setType("password");

		}
	}
	return <li className=" font-semibold border-b-2 border-gray-400 w-full h-[100px] flex flex-row">
		<div className="h-full flex items-center justify-center text-center  w-[10%]">
			<p className="W-full ">{_data.name}</p>
		</div>
		<div className="flex  flex-col items-center justify-center w-[30%]">
			<p>{_data.email}</p>
			<p>{_data.username}</p>
		</div>

		<div className="h-full flex items-center justify-start text-center   w-[30%] ">
			<input type={Type} readOnly={true} value={_data.password} className='text-center outline-none text-lg bg-white' />
			<img onClick={HandelVisibilty} src={eye_on} width={30} alt="eye" />
		</div>
		<div className="h-full flex items-center justify-start text-center   w-[15%]">
			<p className="w-full h-[40%] border-2 rounded-3xl bg-slate-200 ">{_data.tag}</p>
		</div>
		<div className="flex  w-[25%] justify-evenly items-center">
			<button onClick={() => setEdit(e => _data)} className="border-2 rounded-2xl text-slate-200 hover:bg-blue-400  bg-blue-500 w-[88px] h-1/2" type="button">Edit</button>
			<button onClick={() => setDelete(e => _data.id)} className="border-2 rounded-2xl text-slate-200 hover:bg-red-400  bg-red-600 w-[88px] h-1/2" type="button">Delete</button>
		</div>
	</li>;
}

const PasswordWindow = ({ display, setCreate,Fetch,setDelete, setEdit }) => {

	const [data, setData] = useState([]); //TODO: fix where is not data from server
	useEffect(() => {
		axios.get(`/api/1`)
			.then((_data) => {
				setData([..._data.data])
				console.log(_data.data)
			})
			.catch((e) => console.log("ERROR=" + e));

	}, [display,Fetch])
	const array = Array(data.length).fill(0).map((_, i) => <Passlist setDelete={setDelete} setEdit={setEdit} key={i} _data={data[i]} />);
	return <div className="h-screen w-[75%] ">
		<header className="border-b-2 border-gray-200  w-full  h-[10%]">
			<form action="" className=" w-1/2 h-full flex   items-center    ">
				<input placeholder="Search...." type="text" className="bg-[#FAFBFF] text-lg px-10  border-2  h-1/2 rounded-xl w-[400px] mx-7 ml-12" />
				<button className="  h-[38px] w-[80px] rounded-xl bg-blue-800 text-teal-50 font-mono hover:bg-blue-500" type="submit">Search</button>
			</form>
			{/* TODO:Add sort and filter button  */}
		</header>

		<div className="h-[90%] w-full   p-14 bg-[#FAFBFF] ">
			<div className="flex h-[14%] ">
				<h1 className=" pt-6 pl-14 text-4xl font-bold w-[75%]  h-full">{display}</h1>
				<div className="w-[50%] h-full flex items-center justify-center  ">
					<button onClick={() => setCreate((create) => !create)} type="button" className="h-[70%] w-[40%] border-2 rounded-3xl bg-[#4070FF] text-white text-lg font-semibold hover:bg-[#4070B1]"><span className=" mx-3 ">+</span> Add item</button>
				</div>
			</div>


			<ul className="w-full  h-[76%] overflow-y-auto border rounded-2xl bg-white">
				<li className="text-[23px] font-bold border-b-2 border-gray-400 w-full h-[100px] flex flex-row">
					<div className="h-full flex items-center justify-center text-center  w-[15%]">
						<p className="W-full ">Name</p>
					</div>
					<div className="flex  flex-col items-center justify-center w-[30%]">
						<p>Username/Email</p>
					</div>
					<div className="h-full flex items-center justify-center text-center  w-[30%] ">
						<p>Password</p>
					</div>
					<div className="flex  flex-col items-center justify-center w-[30%]">
						<p>tag</p>
					</div>
					<div className="flex w-[25%] justify-evenly items-center">
						<button className="  w-[80px] h-1/2" type="button">Option</button>
					</div>
				</li>

				{data && array}


			</ul>
		</div>

	</div>
}

export { PasswordWindow }
