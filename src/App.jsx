import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import SearchBox from "./Components/Inputs/SearchBox";
import HeaderLogo from "./Components/Layouts/Header/HeaderLogo";
import TableAuto from "./Components/Layouts/Tables/TableAuto";
import TableTitle from "./Components/Layouts/Tables/TableTitle";
import "./index.css";

const tableHead = ["Address", "Zip Code"];

const fetchData = async (pageNumber, searchQuery) => {
  const result = await fetch(
    `http://localhost:8000/casablanca?_limit=10&_page=${pageNumber}&q=${searchQuery}`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  return result.json();
};

function App() {
  const [pageNumber, setPageNumber] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const query = useQuery(["casablancaZipCode", pageNumber, searchQuery], () =>
    fetchData(pageNumber, searchQuery)
  );

  const handleSearch = (q) => {
    setSearchQuery(q.toUpperCase());
    setPageNumber(1);
  };

  return (
    <div className="App">
      {query.isLoading && <span>Loading...</span>}
      {query.data ? (
        <>
          <HeaderLogo />
          <SearchBox onChange={handleSearch} value={searchQuery} />
          <TableTitle title="Zip code of Casablanca" />
          <div className="max-w-lg mx-auto my-4 flex items-center justify-end gap-2">
            <button
              className={pageNumber === 1 && "opacity-25 cursor-not-allowed"}
              disabled={pageNumber === 1}
              onClick={() => setPageNumber((page) => page - 1)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
            <button onClick={() => setPageNumber((page) => page + 1)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
          <TableAuto
            heading={tableHead}
            body={query.data.filter((addresses) =>
              addresses.address.includes(searchQuery)
            )}
            classes="text"
          />
        </>
      ) : null}
    </div>
  );
}

export default App;
