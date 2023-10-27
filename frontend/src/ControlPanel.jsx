import './index.css'
import image from './image/hibenouk.jpg'
import grid from './image/grid-svgrepo-com.svg'
import start from './image/star-svgrepo-com.svg'
import arrow from './image/right-arrow.svg'
import { useEffect, useState } from 'react'
import axios from 'axios'
const Tag = ({ Tagname, count, setDisplay, display }) => {
	const HandleClick = () => {
		setDisplay(Tagname);
	}
	const res = display === Tagname ? "text-white" : "text-[#9FA5B8]"
	return <li onClick={HandleClick} className='flex  w-[70%] h-[40px] items-center pl-0 my-1 m-auto'>
		<p className={`w-[70%] hover:text-white text-[#9FA5B8]  ${res} pl-10`}>{Tagname}an</p>
		<p className='w-[20%]  text-center rounded-full border-2 text-[#9FA5B8] hover:bg-slate-600'>{count}</p>
	</li>;
}
const ControlPanel = ({ setDisplay, display }) => {
	const [tag, setTag] = useState([])
	const [tagList, setTagList] = useState(false)
	const rotation = tagList ? 'rotate-90' : "";
	useEffect(() => {
		axios.get("api/tag/1")
			.then((data) => {
				setTag(data.data)
				localStorage.setItem("tag", JSON.stringify(data.data));//Local storge
			})
			.catch((e) => console.log("Error"))
	}, [])
	const all = display === "All items" ? "text-white" : "text-[#9FA5B8]"
	const fav = display === "Favorites" ? "text-white" : "text-[#9FA5B8]"
	const array = Array(tag.length).fill(0).map((_, i) => <Tag display={display} key={i} Tagname={tag[i].tagname} count={tag[i].count} setDisplay={setDisplay} />)
	return <div className="border-2 border-black h-screen w-[25%] flex flex-col items-center bg-[#17244D] text-white font-semibold ">
		<header className="flex flex-row  items-center h-[75px] mt-10 w-full">
			<img width="70px" src={image} alt="Profile" className="rounded-full mx-4" />
			<p className='mx-4'>Hicham Benoukaiss</p>
		</header>

		<div className='w-full h-[75%] flex flex-col '>
			<ul className='w-full flex flex-col items-center my-10 mb-32'>
				<li onClick={() => setDisplay("All items")} className={`hover:text-white text-[#9FA5B8] flex ${all}  w-[75%] h-16 items-center my-2`}>
					<img src={grid} width="30px" alt="grid" className='ml-8 mr-5' />
					<p>All items</p>
					<p className='ml-auto mr-14 w-[20%]  text-center rounded-full border-2 text-[#9FA5B8] '>30</p>
				</li>
				<li onClick={() => setDisplay("Favorites")} className={`hover:text-white text-[#9FA5B8] flex ${fav}  w-[75%] h-16 items-center my-2`}>
					<img src={start} width="30px" alt="grid" className='ml-8 mr-5' />
					<p>Favorites</p>
					<p className='ml-auto mr-14 w-[20%]  text-center rounded-full border-2 text-[#9FA5B8] '>30</p>
				</li>
			</ul>

			<div onClick={()=> setTagList((e) => !e)}  className='flex px-14 '>
				<img width={20} className={rotation} src={arrow} alt="" />
				<button  className='  text-2xl mx-3' type="button">Tags</button>
			</div>
			{tagList && <ul className='w-full  items-center overflow-y-auto'>
				{array}
			</ul>}
		</div>

	</div>;
}

export { ControlPanel }
