import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const CountryCard = ({ name, population, region, capital, image }) => {
  return (
    <Card>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>Population: {population}</Card.Text>
        <Card.Text>Region: {region}</Card.Text>
        <Card.Text>Capital: {capital}</Card.Text>
        <Link to={`country/${name}`}>See more</Link>
      </Card.Body>
    </Card>
  );
};

CountryCard.propTypes = {
  name: PropTypes.string,
  population: PropTypes.number,
  region: PropTypes.string,
  capital: PropTypes.string,
  image: PropTypes.string,
};

export default CountryCard;
