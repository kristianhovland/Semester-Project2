import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API } from './../../constants/api';
import Loader from './../Loader';
import ErrorMessage from './../Error';

function AdminList() {
  const [contents, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(function () {
    async function fetchData() {
      try {
        const response = await fetch(API);

        if (response.ok) {
          const json = await response.json();
          setArticles(json);
        } else {
          setError("Error Occured");
        }
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage message={`Error: ${error}`} />;
  }

	return (
    <>
    <h4>Select the article you want to edit.</h4>
		<ul className="admin-list">
			{contents.map((contents) => {
				return (
					<li key={contents.title}>
						<Link to={`/admin/edit/${contents.id}`}>{contents.title}</Link>
					</li>
				);
			})}
		</ul>
   </>
	);
}

export default AdminList;