import axios, { formToJSON } from "axios";
import { useState } from "react";


const Delete = ({ setDelete, _delete, setFetch }) => {
	const removePassword = (event) => {
		event.preventDefault();
		axios.get(`/api/delete/${_delete}`)
			.then(() => {
				setDelete(false);
				setFetch(e => !e);
			})
			.catch((e) => console.log(`Error${e.message}`))
	}
	return (
		<div className="w-[450px] h-[200px] border-4 bg-white rounded-2xl  absolute left-[42%] top-[20%] pointer-events-auto">
			<form className="w-full h-full flex flex-col items-center justify-around">
				<p className="text-xl font-bold w-full text-center">Do you Want to Delete Save Password ?</p>
				<div className="flex w-full">
					<button onClick={removePassword} className="border-2 text-base font-bold mx-4 w-[40%] h-[50px] rounded-lg hover:bg-red-400 bg-red-600" >Confirm</button>

					<button onSubmit={(e) => e.preventDefault()} onClick={() => setDelete(false)} className="border-2 text-base font-bold mx-4 w-[40%] h-[50px] rounded-lg hover:bg-green-400 bg-green-600"  >Cancel</button>
				</div>
			</form>
		</div>
	);
}
const Create = ({ setCreate, setFetch }) => {
	const [Error, setError] = useState("")

	const SubmitForm = (e) => {
		e.preventDefault();
		const __data = formToJSON(document.getElementById("form"));
		if (!__data.name || !__data.password) {
			setError("Name And Password is require");
			return;
		}
		__data.userId = "1"; //TODO use local storge to store id of user
		axios.post("/api/add", __data)
			.then(() => {
				console.log(__data)
				setCreate(false);
				setFetch(e => !e);
			})
			.catch((e) => setError(`Could Not Add Password ${e.message}`));
	}
	const tags = JSON.parse(localStorage.getItem("tag"));
	return <div className=" w-[600px] absolute h-[650px] left-[37%] top-[8%] rounded-lg bg-slate-500 shadow-xl">
		<form id="form" className="w-full h-full flex flex-col items-center ">
			<div className=" rounded-lg w-full h-[40px] my-2 flex justify-end it ">
				<button onClick={() => setCreate(false)} type="button" className="hover:bg-slate-400 text-lg font-extrabold rounded-full border-2  w-[50px] h-full m-2 ">X</button>
			</div>
			<p className="text-[29px] text-white font-bold w-full text-center m-4">Add Your New Password</p>
			{Error && <p className="text-[20px] rounded-xl border-2 bg-red-500 w-[60%] text-center m-4">{Error}</p>}

			<input key={1} className="border-2 rounded-lg w-[530px] h-[50px] my-2 placeholder:text-center  bg-slate-50 shadow-lg text-[20px] px-[20px]" placeholder="name" type="text" name="name" required={true} />
			<input key={2} className="border-2 rounded-lg w-[530px] h-[50px] my-2 placeholder:text-center  bg-slate-50 shadow-lg text-[20px] px-[20px]" placeholder="Email" type="email" name="email" />
			<input key={3} className="border-2 rounded-lg w-[530px] h-[50px] my-2 placeholder:text-center  bg-slate-50 shadow-lg text-[20px] px-[20px]" placeholder="Username" type="text" name="username" />
			<input key={4} className="border-2 rounded-lg w-[530px] h-[50px] my-2 placeholder:text-center  bg-slate-50 shadow-lg text-[20px] px-[20px]" placeholder="Password" type="text" name="password" required={true} />

			<select placeholder="Tags" className="border-2 font-semibold rounded-lg w-[530px] h-[50px] my-2 placeholder:text-center  bg-slate-50 shadow-lg text-[20px] px-[20px]" name="tagId" > {/*TODO: add placeholder to select  */}
				<option  className="border-2 text-center  rounded-lg w-[530px] h-[50px] my-2 placeholder:text-center font-semibold  bg-slate-50 shadow-lg text-[20px] px-[20px]" value={0} >All item </option>
				{tags.map((tag,i) => <option className="border-2 text-center  rounded-lg w-[530px] h-[50px] my-2 placeholder:text-center font-semibold  bg-slate-50 shadow-lg text-[20px] px-[20px]" value={tag.id} key={i}>{tag.tagname}</option>)}
			</select>
			<div className="flex items-center w-[430px] h-[40px]  text-xl mt-3 mb-0 ">
			<label className="text-white text-2xl font-bold mx-10" for="favourite">Favourite</label>
			<label className="text-white" htmlFor="favourite" value="1">Yes</label>

			<input className="mx-4  h-[100px] w-7"  type="radio" name="favourite" value={true}/>
			<label className="text-white" defaultChecked htmlFor="favourite" >No</label>

			<input className="mx-4  h-[100px] w-7" defaultChecked value={false} type="radio" name="favourite"/>
			</div>
			<button onClick={SubmitForm} className="border-2 text-base  mx-4 w-[40%] h-[50px] rounded-lg hover:bg-green-400 bg-green-600 my-10">Add Password</button>
		</form>
	</div>
}
const Edit = ({ setEdit, edit, setFetch }) => {
	const [Error, setError] = useState("")

	const SubmitForm = (e) => {
		e.preventDefault();
		const __data = formToJSON(document.getElementById("form"));
		if (!__data.name || !__data.password) {
			setError("Name And Password is require");
			return;
		}
		__data.userId = "1"; //TODO use local storge to store id of user
		__data.id = edit.id;
		axios.post("/api/update", __data)
			.then((e) => {
				setEdit(false);
				setFetch(e => !e);
			})
			.catch((e) => {
				setError(`Could Not Add Password ${e}`)
				console.log(e)

			});
	}
	const tags = JSON.parse(localStorage.getItem("tag"));
	return <div className=" w-[600px] absolute h-[650px] left-[37%] top-[8%] rounded-lg bg-slate-500 shadow-xl">
		<form id="form" className="w-full h-full flex flex-col items-center ">
			<div className=" rounded-lg w-full h-[40px] my-2 flex justify-end it ">
				<button onClick={() => setEdit(false)} type="button" className="hover:bg-slate-400 text-lg font-extrabold rounded-full border-2  w-[50px] h-full m-2 ">X</button>
			</div>
			<p className="text-[29px] text-white font-bold w-full text-center m-4">Add Your New Password</p>
			{Error && <p className="text-[20px] rounded-xl border-2 bg-red-500 w-[60%] text-center m-4">{Error}</p>}

			<input defaultValue={edit.name} className="border-2 rounded-lg w-[530px] h-[50px] my-2 placeholder:text-center  bg-slate-50 shadow-lg text-[20px] px-[20px]" placeholder="name" type="text" name="name" required={true} />
			<input defaultValue={edit.email} className="border-2 rounded-lg w-[530px] h-[50px] my-2 placeholder:text-center  bg-slate-50 shadow-lg text-[20px] px-[20px]" placeholder="Email" type="email" name="email" />
			<input defaultValue={edit.username} className="border-2 rounded-lg w-[530px] h-[50px] my-2 placeholder:text-center  bg-slate-50 shadow-lg text-[20px] px-[20px]" placeholder="Username" type="text" name="username" />
			<input defaultValue={edit.password} className="border-2 rounded-lg w-[530px] h-[50px] my-2 placeholder:text-center  bg-slate-50 shadow-lg text-[20px] px-[20px]" placeholder="Password" type="text" name="password" required={true} />


			<select placeholder="Tags" className="border-2 font-semibold rounded-lg w-[530px] h-[50px] my-2 placeholder:text-center  bg-slate-50 shadow-lg text-[20px] px-[20px]" name="tagId" > {/*TODO: add placeholder to select  */}
				<option  className="border-2 text-center  rounded-lg w-[530px] h-[50px] my-2 placeholder:text-center font-semibold  bg-slate-50 shadow-lg text-[20px] px-[20px]" value={0} >All item </option>
				{tags.map((tag,i) => <option className="border-2 text-center  rounded-lg w-[530px] h-[50px] my-2 placeholder:text-center font-semibold  bg-slate-50 shadow-lg text-[20px] px-[20px]" value={tag.id} key={i}>{tag.tagname}</option>)}
			</select>
			<div className="flex items-center w-[430px] h-[40px]  text-xl mt-3 mb-0 ">
			<label className="text-white text-2xl font-bold mx-10" for="favourite">Favourite</label>
			<label className="text-white" htmlFor="favourite" value="1">Yes</label>

			<input className="mx-4  h-[100px] w-7"  type="radio" name="favourite" value={true}/>
			<label className="text-white" defaultChecked htmlFor="favourite" >No</label>

			<input className="mx-4  h-[100px] w-7" defaultChecked value={false} type="radio" name="favourite"/>
			</div>
			<button onClick={SubmitForm} className="border-2 text-base  mx-4 w-[40%] h-[50px] rounded-lg hover:bg-green-400 bg-green-600 my-6">Update Password</button>
		</form>
	</div>
}
export { Delete, Create, Edit }