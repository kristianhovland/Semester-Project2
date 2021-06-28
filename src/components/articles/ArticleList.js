import { useState, useEffect } from "react";
import ArticleItem from "./ArticleItem";
import { API } from './../../constants/api';
import Loader from './../Loader';
import ErrorMessage from './../Error';

function ArticleList() {
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
    <div className="listContainer">
        {contents.map(function (contents) {
          const {  id, title, introduction, image, categories } = contents;
          return <ArticleItem key={id} id={id} title={title} image={image} categories={categories} introduction={introduction} />;
        })}
    </div>
  );
}

export default ArticleList;