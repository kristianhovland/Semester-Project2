import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { API } from "../../constants/api";
import AuthContext from "../../context/AuthContext";

export default function DeletePostButton({ id }) {
	const [error, setError] = useState(null);

	const history = useHistory();

    const [auth] = useContext(AuthContext);

    const headers = {
      headers: {
        Authorization: `Bearer ${auth.jwt}`,
      },
    };

    const url = `${API}/${id}`;

	async function handleDelete() {
		try {
			await axios.delete(url, headers);
			history.push("/admin/edit");
		} catch (error) {
			setError(error);
		}
	}

	return (
		<button type="button" className="deleteBtn" onClick={handleDelete}>
			{error ? "Error" : "Delete"}
		</button>
	);
}

