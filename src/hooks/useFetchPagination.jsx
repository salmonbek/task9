import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import { LIMIT } from "../constants";
import request from "../server";

const useFetchPagination = (url, otherParams) => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);

        let params = {
          page: activePage,
          limit: LIMIT,
          ...JSON.parse(otherParams),
        };

        let {
          data: { data, total },
        } = await request.get(url, { params });

        setData(data);
        setTotal(total);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    getData();
    console.log("Render");
  }, [activePage, url, otherParams]);

  const handlePageClick = ({ selected }) => {
    setActivePage(selected + 1);
  };

  let pages = Math.ceil(total / LIMIT);

  let pagination =
    pages !== 1 ? (
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
    ) : null;

  return { pagination, data, total, loading, error };
};

export default useFetchPagination;
