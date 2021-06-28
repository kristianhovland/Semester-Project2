
import React, { Component } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { withRouter } from "react-router-dom";
import "react-bootstrap-typeahead/css/Typeahead.css";

class ArticleSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articlesResults: [],
      loading: true,
    };
  }

  componentDidMount() {
    fetch("https://evening-stream-31739.herokuapp.com/contents")
      .then((response) => {
        return response.json();
      })
      .then((result) => {
       

        const searchOptions = result.map((r) => {
          return { id: r.id, label: r.title };
        });

        this.setState({
          articlesResults: searchOptions,
          loading: false,
        });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        this.setState({
          loading: false,
        });
      });
  }

  handleChange = (selected) => {
    const id = selected[0].id;
    this.props.history.push(`/articles/${id}`);
  };

  render() {
    return ( 
      <div>
      <Typeahead
        className="Search"
        onChange={(selected) => {
          this.handleChange(selected);
        }}
        options={this.state.articlesResults}
        placeholder="Search for articles."
        id="Search Bar for articless"
      />
      </div>
    );
  }
}

export default withRouter(ArticleSearch);