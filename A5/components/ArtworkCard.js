import Card from 'react-bootstrap/Card';           
import Button from 'react-bootstrap/Button';   
import Col from 'react-bootstrap/Col';             
import useSWR from 'swr';                   
import Error from 'next/error';            
import Link from 'next/link';                      

export default function ArtworkCard({ objectID }) {
  
  // fetch data using SWR and objectId
  const { data, error } = useSWR(
    objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null
  );

  // show 404 if there is an error
  if (error) return <Error statusCode={404} />;

  // If still loading, show nothing
  if (!data) return null;

  // id there is data, show the artwork info in a card
  return (
    <Card>
      {/* image of artwork or placeholder */}
      <Card.Img
        variant="top"
        src={data.primaryImageSmall ? data.primaryImageSmall : "https://placehold.co/375x375?text=Not+Available"}
      />

      {/* body artwork details */}
      <Card.Body>
        {/* artwork title or N/A*/}
        <Card.Title>{data.title ? data.title : "N/A"}</Card.Title>

        {/* details */}
        <Card.Text>
          <strong>Date:</strong> {data.objectDate || "N/A"}<br />
          <strong>Classification:</strong> {data.classification || "N/A"}<br />
          <strong>Medium:</strong> {data.medium || "N/A"}
        </Card.Text>

        {/* link for more details*/}
        <Link href={`/artwork/${objectID}`} passHref legacyBehavior>
          <Button variant="light">ID: {objectID}</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}
