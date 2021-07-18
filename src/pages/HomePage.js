import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import FeaturedList from "../components/articles/ArticleFeatured";
import Search from "../components/layout/Search";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Footer from "../components/layout/Footer";

function HomePage() {
  return (
    <>
      <div>
        <Jumbotron fluid>
          <Container>
            <h1>Your #1 source of coding news!</h1>
            <p className="jumboText">
              We are working to make this website the best it can be for our
              users to access good and useful tutorials, guides and news about
              coding related languages.
            </p>
          </Container>
        </Jumbotron>

        <div className="headerSearch">
          <Search />
          <p className="searchText">or</p>
          <Link to="/articles">
            <Button className="HomeBtn" size="lg">
              Browse
            </Button>
          </Link>
        </div>
        <h2>Newest articles</h2>
        <FeaturedList />
        <Footer />
      </div>
    </>
  );
}

export default HomePage;
