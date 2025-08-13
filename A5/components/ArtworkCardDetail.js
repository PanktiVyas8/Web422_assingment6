// Import necessary modules
import Card from 'react-bootstrap/Card';
import useSWR from 'swr';
import Error from 'next/error';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';

export default function ArtworkCardDetail({ objectID }) {
  // fetch data using SWR and objectId
  const { data, error } = useSWR(
    objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null
  );

  // change fav list
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  // checking if artwork is added 
  const [showAdded, setShowAdded] = useState(favouritesList.includes(objectID));

  // when favourite button is clicked
  function favouritesClicked() {
    if (showAdded) {
      // remove
      setFavouritesList(current => current.filter(fav => fav !== objectID));
      setShowAdded(false);
    } else {
      //add
      setFavouritesList(current => [...current, objectID]);
      setShowAdded(true);
    }
  }

  // show 404 if there is an error
  if (error) return <Error statusCode={404} />;

  // If still loading, show nothing
  if (!data) return null;

  return (
    <Card>
      {data.primaryImage && (
        <Card.Img variant="top" src={data.primaryImage} />
      )}

      <Card.Body>
        <Card.Title>{data.title ? data.title : "N/A"}</Card.Title>

        {/* info about artwork */}
        <Card.Text>
          <strong>Date:</strong> {data.objectDate || "N/A"}<br />
          <strong>Classification:</strong> {data.classification || "N/A"}<br />
          <strong>Medium:</strong> {data.medium || "N/A"}<br />
          <br />
          {/*  extra details */}
          <strong>Artist:</strong> {data.artistDisplayName || "N/A"}<br />
          <strong>Credit Line:</strong> {data.creditLine || "N/A"}<br />
          <strong>Dimensions:</strong> {data.dimensions || "N/A"}<br />

          {/* wiki data link if there is one */}
          {data.artistWikidata_URL && (
            <>
              <br />
              <a href={data.artistWikidata_URL} target="_blank" rel="noreferrer">
                Learn More on Wikipedia 
              </a>
            </>
          )}
        </Card.Text>

      {/* fav button to add tof favourites */}
        <Button
          variant={showAdded ? "primary" : "outline-primary"}
          onClick={favouritesClicked}
        >
          {showAdded ? "+ Favourite (added)" : "+ Favourite"}
        </Button>
      </Card.Body>
    </Card>
  );
}
