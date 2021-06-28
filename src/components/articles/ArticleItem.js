import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function ArticleItem({ id, title, image, introduction }) {
  return (

    <Card style={{ width: "500px" }}>
      <Card.Body>
        <Card.Img variant="top" src={image[0].formats.large.url} />
        <Card.Title>{title}</Card.Title>
        <p> {introduction}</p>
        <Link to={`page/${id}`}>
          <Button className="CardBtn">Read more.</Button>
        </Link>
      </Card.Body>
    </Card>

  );
}

export default ArticleItem;