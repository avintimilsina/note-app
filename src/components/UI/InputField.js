const InputField = ({ value, onChange, label }) => {
	return (
		<div>
			<label className="label">
				<span className="label-text text-xl">{label}</span>
			</label>
			<input
				value={value}
				onChange={onChange}
				className="input input-bordered w-full max-w-xs"
			/>
		</div>
	);
};

export default InputField;
