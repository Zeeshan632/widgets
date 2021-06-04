import React, { useState } from "react";
import Dropdown from "./Dropdown";
import Convert from "./Convert";

const options = [
	{
		label: "Afrikaan",
		value: "af",
	},
	{
		label: "Arabic",
		value: "ar",
	},
	{
		label: "Hindi",
		value: "hi",
	},
	{
		label: "Sindhi",
		value: "sd",
	},
	{
		label: "Urdu",
		value: "ur",
	},
	{
		label: "Turkish",
		value: "tr",
	},
	{
		label: "English",
		value: "en",
	},
];

const Translate = () => {
	const [language, setLanguage] = useState(options[0]);
	const [text, setText] = useState("");

	return (
		<div className="ui container">
			<div className="ui form">
				<div className="field">
					<label>Enter Text</label>
					<input value={text} onChange={(e) => setText(e.target.value)} />
				</div>
			</div>
			<Dropdown
				label="Select a Language"
				options={options}
				selected={language}
				onSelectedChange={setLanguage}
			/>
			<hr />
			<h3 className="ui header">Output</h3>
			<Convert language={language} text={text} />
		</div>
	);
};

export default Translate;