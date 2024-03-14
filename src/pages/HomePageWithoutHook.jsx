import { useEffect, useState } from "react";
import { Alert, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import ReactPaginate from "react-paginate";

import CountryCard from "../components/card/CountryCard";
import Loading from "../components/shares/Loading";

import request from "../server";
import { LIMIT } from "../constants";

const HomePage = () => {
  const [countries, setCountries] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activePage, setActivePage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function getCountries() {
      try {
        setLoading(true);

        let params = {
          page: activePage,
          limit: LIMIT,
        };
        let {
          data: { data, total },
        } = await request.get(search ? `name/${search}` : "all", { params });

        setCountries(data);
        setTotal(total);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    getCountries();
  }, [activePage, search]);

  const handlePageClick = ({ selected }) => {
    setActivePage(selected + 1);
  };

  let pages = Math.ceil(total / LIMIT);

  return (
    <Container>
      <InputGroup className="my-3">
        <Form.Control
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Searching countries"
        />
        <InputGroup.Text>{total}</InputGroup.Text>
      </InputGroup>
      {error ? <Alert>ERROR</Alert> : null}
      {loading ? (
        <Loading />
      ) : (
        <Row xs={1} sm={2} md={3} lg={4}>
          {countries.map((country) => (
            <Col className="mb-3" key={country.name.official}>
              <CountryCard
                name={country.name.common}
                population={country.population}
                region={country.region}
                capital={country.capital?.[0]}
                image={country.flags.png}
              />
            </Col>
          ))}
        </Row>
      )}
      {pages !== 1 ? (
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          previousLabel="Previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          pageRangeDisplayed={5}
          pageCount={pages}
          renderOnZeroPageCount={null}
          onPageChange={handlePageClick}
        />
      ) : null}
    </Container>
  );
};

export default HomePage;
