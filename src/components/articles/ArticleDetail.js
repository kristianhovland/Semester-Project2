import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Loader from "../Loader";
import Container from "react-bootstrap/Container";
import { API } from './../../constants/api';

function ArticleDetail() {
	const [contents, setArticle] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	let history = useHistory();

	const { id } = useParams();



	if (!id) {
		history.push("/");
	}

	const url = API + "/" + id;

	useEffect(
		function () {
			async function fetchData() {
				try {
					const response = await fetch(url);

					if (response.ok) {
						const json = await response.json();
						setArticle(json);
					} else {
						setError("An error occured");
					}
				} catch (error) {
					setError(error.toString());
				} finally {
					setLoading(false);
				}
			}
			fetchData();
		},
		[url]
	);

	if (loading) {
		return <Loader />;
	}

	if (error) {
		return <div>An error occured: {error}</div>;
	}

	return (

		<Container className="DetailContainer">
			<h2 className="headingMargin">{contents.title}</h2>
			<p>{contents.text}</p>
			<p className="dateCenter">{contents.date}</p>
			
		</Container>

	);
}

export default ArticleDetail;