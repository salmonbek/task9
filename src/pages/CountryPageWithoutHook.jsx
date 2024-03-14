import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import request from "../server";
import Loading from "../components/shares/Loading";
import { Alert } from "react-bootstrap";

const CountryPage = () => {
  const { countryName } = useParams();
  
  const [country, setCountry] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getCountry() {
      try {
        setLoading(true);
        let {
          data: { data },
        } = await request.get(`name/${countryName}`);
        setCountry(data[0]);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    getCountry();
  }, [countryName]);

  return (
    <div className="container">
      {error ? <Alert>Error</Alert> : null}
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <h1>{country.name?.official}</h1>
          <p>Languages: {Object.values(country.languages || {})}</p>
        </Fragment>
      )}
    </div>
  );
};

export default CountryPage;
