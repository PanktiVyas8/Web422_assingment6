import useSWR from 'swr';
import { Card, Button } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { useState } from 'react';

export default function ArtworkCardDetail({ objectID }) {
  const { data, error } = useSWR(objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null);
  const [favourites, setFavourites] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false);

  const toggleFavourite = () => {
    if (favourites.includes(objectID)) {
      setFavourites(favourites.filter(fav => fav !== objectID));
      setShowAdded(false);
    } else {
      setFavourites([...favourites, objectID]);
      setShowAdded(true);
    }
  };

  if (error) return <div>Error loading artwork.</div>;
  if (!data) return null;

  return (
    <Card>
      {data.primaryImage && <Card.Img variant="top" src={data.primaryImage} alt={data.title} />}
      <Card.Body>
        <Card.Title>{data.title}</Card.Title>
        <Card.Text>
          <strong>Date:</strong> {data.objectDate}<br />
          <strong>Classification:</strong> {data.classification}<br />
          <strong>Medium:</strong> {data.medium}
        </Card.Text>
        <Button variant={showAdded ? 'success' : 'outline-primary'} onClick={toggleFavourite}>
          {showAdded ? 'Added to Favourites' : 'Add to Favourites'}
        </Button>
      </Card.Body>
    </Card>
  );
}