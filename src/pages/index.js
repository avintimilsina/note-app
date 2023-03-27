import React from "react";
import { useState } from "react";

export default function Home() {
	const [count, setCount] = useState(5);
	const increament = () => {
		setCount(function (count) {
			return count + 1;
		});
	};
	const decreament = () => {
		setCount(function (count) {
			return count - 1;
		});
	};
	const obj = [
		{ fname: "Avin", lname: "Timilsina", age: 25 },
		{ fname: "rohit", lname: "sah", age: 25 },
		{ fname: "Ram", lname: "sah", age: 25 },
	];
	const [list, setList] = useState(["avin", "rohit"]);
	const addStr = () => {
		setList(function (list) {
			return [...list, text]; //spread operator
		});
	};

	const [string, setString] = useState("Avin");
	const change = () => {
		setString("Rohit");
	};

	const [text, setText] = useState("Hello world");
	const changeText = (e) => {
		console.log(e);
		setText(e.target.value);
	};

	return (
		<>
			<h1>Hello world!</h1>
			<p>Count: {count}</p>
			{obj.map((user) => (
				<div key={user.fname}>
					<p>{user.fname}</p>
					<p>{user.lname}</p>
				</div>
			))}
			{list.map((str) => (
				<div key={str}>
					<p>{str}</p>
				</div>
			))}
			<input onChange={changeText} />
			<p>My name is: {string}</p>
			<p>Input Text: {text}</p>
			<button onClick={increament}>Plus</button>
			<button onClick={decreament}>Minus</button>
			<button onClick={change}>Change</button>
			<button onClick={addStr}>Add String</button>
			{/* <button onClick={changeText}>Change text</button> */}
		</>
	);
}
