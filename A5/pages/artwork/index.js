/*********************************************************************************
* WEB422 – Assignment 5
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
*Name: Pankti Vyas   Student ID: 113535173   Date: July 25th 2025
*
********************************************************************************/

import { useState, useEffect } from "react";
import { Row, Col, Card, Pagination } from "react-bootstrap";
import { useRouter } from "next/router";
import useSWR from "swr";
import ArtworkCard from "@/components/ArtworkCard";
import Error from "next/error";
import validObjectIDList from '@/public/data/validObjectIDList.json';


// Set how much artwork to show per page
const PER_PAGE = 12;

export default function Artwork() {
  // Create state for list of artwork pages and current page
  const [artworkList, setArtworkList] = useState([]);
  const [page, setPage] = useState(1);

  // Get the URL query string
  const router = useRouter();
  let finalQuery = router.asPath.split("?")[1];

  // fetch search results using SWR
  const { data, error } = useSWR(
    finalQuery ? `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}` : null
  );

   // When data is loaded, divide results into pages
   useEffect(() => {
    if (data?.objectIDs?.length > 0 && validObjectIDList?.objectIDs?.length > 0) {
      // filter search results to only include valid objectIDs
      const filteredResults = validObjectIDList.objectIDs.filter(id => data.objectIDs.includes(id));

      const results = [];
      for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
        const chunk = filteredResults.slice(i, i + PER_PAGE);
        results.push(chunk);
      }
      setArtworkList(results);
      // start from page 1 for new search
      setPage(1); 
    }
  }, [data]);

  // go to previous page
  function previousPage() {
    if (page > 1) setPage(page - 1);
  }

  // go to next page
  function nextPage() {
    if (page < artworkList.length) setPage(page + 1);
  }

  // Show error if data fails
  if (error) return <Error statusCode={404} />;

  return (
    <>
    {/* displays artwork cards of current page */}
      {artworkList.length > 0 ? (
        <>
          <Row className="gy-4">
            {artworkList[page - 1].map((objectID) => (
              <Col lg={3} key={objectID}>
                <ArtworkCard objectID={objectID} />
              </Col>
            ))}
          </Row>
          <Row className="mt-4">
            <Col>
            {/* pagination buttons to flip through pages */}
              <Pagination>
                <Pagination.Prev onClick={previousPage} />
                <Pagination.Item>{page}</Pagination.Item>
                <Pagination.Next onClick={nextPage} />
              </Pagination>
            </Col>
          </Row>
        </>
      ) : (
        data && (
          <Card>
            <Card.Body>
              {/* if no results, display message */}
              <h4>No Results Found</h4>
              No pieces found, please try another search.
            </Card.Body>
          </Card>
        )
      )}
    </>
  );
}
