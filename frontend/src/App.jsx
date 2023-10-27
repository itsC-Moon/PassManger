import { useState } from "react";
import { ControlPanel } from "./ControlPanel";
import { PasswordWindow } from "./PasswordWindow";
import { Delete, Create, Edit } from './Edit_delete'
const App = () => {
	const [display, setDisplay] = useState("All items");
	const [_delete, setDelete] = useState(false);
	const [edit, setEdit] = useState(false);
	const [create, setCreate] = useState(false);
	const [Fetch, setFetch] = useState(false);
	return (
		<div className="flex w-screen h-screen relative" >

			<ControlPanel display={display} setDisplay={setDisplay} />
			< PasswordWindow display={display} Fetch={Fetch} setDelete={setDelete} setEdit={setEdit} setCreate={setCreate} />
			{_delete && <Delete setDelete={setDelete} _delete={_delete} setFetch={setFetch} />}
			{edit && <Edit edit={edit} setEdit={setEdit} setFetch={setFetch} />}
			{create && <Create setCreate={setCreate} setFetch={setFetch} />}

		</div>
	);
}

export default App;
