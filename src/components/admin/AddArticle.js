import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../common/FormError";
import axios from "axios";
import Heading from "../layout/Heading";
import AuthContext from "../../context/AuthContext"
import { API } from "../../constants/api";



const schema = yup.object().shape({
	title: yup.string().required("Title is required"),
	introduction: yup.string().required("Introduction is required"),
	date: yup.string().required("Date is required"),
	text: yup.string().required("Text is required"),
	image: yup.mixed().test("required", "Image is required", value => value && value[0])
	
});

export default function AddPost() {
	const [submitting, setSubmitting] = useState(false);
	const [serverError, setServerError] = useState(null);

	const history = useHistory();


  const [auth] = useContext(AuthContext);

    const headers = {
      headers: {
        Authorization: `Bearer ${auth.jwt}`,
      },
    };


	const { register, handleSubmit, errors } = useForm({
		resolver: yupResolver(schema),
	});


	async function onSubmit(data) {
		setSubmitting(true);
		setServerError(null);
	
		data.status = "publish";
	
		let formData = new FormData();
	
		formData.append(`files.image`, data.image[0]);
	
		delete data["image"];
	
		formData.append("data", JSON.stringify(data))
		
		try {
			const response = await axios.post(API, formData, headers);
			console.log("response", response.data);
			history.push("/admin");
		} catch (error) {
			console.log("error", error);
			setServerError(error.toString());
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<>
			<Heading content="Add post" />
			<form onSubmit={handleSubmit(onSubmit)}>
				{serverError && <FormError>{serverError}</FormError>}
				<fieldset disabled={submitting}>
					<div>
						<input name="title" placeholder="Title" ref={register} />
						{errors.title && <FormError>{errors.title.message}</FormError>}
					</div>
        			  <div>
						<input name="introduction" placeholder="Introduction" ref={register} />
						{errors.introduction && <FormError>{errors.introduction.message}</FormError>}
					</div>
         			 <div>
						<input name="date" type="date" placeholder="Date" ref={register} />
						{errors.date && <FormError>{errors.date.message}</FormError>}
					</div>
					<div>
						<textarea name="text" placeholder="Main Text" ref={register} />
					</div>
					<div>
						<input type="file" name="image" id="image"  ref={register} />
						{errors.image && <FormError>{errors.image.message}</FormError>}
					</div>

					<button className="SubmitBtn">{submitting ? "Submitting..." : "Submit"}</button>
				</fieldset>
			</form>
		</>
	);
}