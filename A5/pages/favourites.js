import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { Row, Col, Card } from 'react-bootstrap';
import ArtworkCard from '@/components/ArtworkCard';

export default function Favourites() {
  const [favouritesList] = useAtom(favouritesAtom);

 
  if (!favouritesList) return null;

  return (
    <>
      <h4>My Favourite Artworks</h4>

      {favouritesList.length > 0 ? (
        <Row className="gy-4">
          {favouritesList.map((objectID) => (
            <Col lg={3} key={objectID}>
              <ArtworkCard objectID={objectID} />
            </Col>
          ))}
        </Row>
      ) : (
        <Card>
          <Card.Body>
            <h5>No favourites have been added yet.</h5>
            Browse the collection and click the "+ Favourite" button to save artwork you like!
          </Card.Body>
        </Card>
      )}
    </>
  );
}
