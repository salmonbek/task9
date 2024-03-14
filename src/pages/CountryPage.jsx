import { Fragment } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/shares/Loading";
import { Alert } from "react-bootstrap";
import useFetch from "../hooks/useFetch";

const CountryPage = () => {
  const { countryName } = useParams();
  const { data, loading, error } = useFetch(`name/${countryName}`, {});

  const country = data.data?.[0];

  return (
    <div className="container">
      {error ? <Alert>Error</Alert> : null}
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <h1>{country?.name?.official}</h1>
          <p>Languages: {Object.values(country?.languages || {})}</p>
        </Fragment>
      )}
    </div>
  );
};

export default CountryPage;
