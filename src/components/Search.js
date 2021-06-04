import React, { useState, useEffect } from "react";
import axios from "axios";

const Search = () => {
	const [term, setTerm] = useState("programming");
	const [debouncedTerm, setDebouncedTerm] = useState(term);
	const [results, setResults] = useState([]);

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setDebouncedTerm(term);
		}, 500);
		return () => {
			clearTimeout(timeoutId);
		};
	}, [term]);

	useEffect(() => {
		const search = async () => {
			const { data } = await axios.get("https://en.wikipedia.org/w/api.php", {
				params: {
					action: "query",
					list: "search",
					origin: "*",
					format: "json",
					srsearch: debouncedTerm,
				},
			});
			setResults(data.query.search);
		};
		if (debouncedTerm) {
			search();
		}
	}, [debouncedTerm]);

	const renderedResults = results.map((result) => {
		return (
			<div key={result.pageid} className="item">
				<div className="right floated content">
					<a
						className="ui button"
						href={`https://en.wikipedia.org?curid=${result.pageid}`}
						target="_blank"
						rel="noreferrer"
					>
						Go
					</a>
				</div>
				<div className="content">
					<div className="header">
						<h3>{result.title}</h3>
					</div>
					<span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
				</div>
			</div>
		);
	});

	return (
		<div>
			<div className="ui form container">
				<div className="field">
					<label htmlFor="search-term">Enter Search Term</label>
					<input
						className="input"
						id="search-term"
						value={term}
						onChange={(e) => setTerm(e.target.value)}
					/>
				</div>
			</div>
			<div className="ui container">
				<div className="ui celled list">{renderedResults}</div>
			</div>
		</div>
	);
};

export default Search;
