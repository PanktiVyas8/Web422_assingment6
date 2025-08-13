import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';
import { Card, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';

export default function History() {
  // get to search histoy
  const [searchHistory] = useAtom(searchHistoryAtom);

  const router = useRouter();

  // format for buttons
  function formatHistoryText(query) {
    const params = new URLSearchParams(query);
    const searchBy = params.get('searchBy') || 'title';
    const q = params.get('q') || '';
    const geo = params.get('geoLocation');
    const medium = params.get('medium');
    const highlight = params.get('isHighlight') === 'true';
    const onView = params.get('isOnView') === 'true';

    let label = `${capitalize(searchBy)}: ${q}`;
    if (geo) label += ` | Location: ${geo}`;
    if (medium) label += ` | Medium: ${medium}`;
    if (highlight) label += ` | Highlighted`;
    if (onView) label += ` | On View`;

    return label;
  }

  // captialized first letter
  function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h4>Search History</h4>

          {/* if there is history, display buttons */}
          {searchHistory.length > 0 ? (
            searchHistory.map((historyItem, index) => (
              <div key={index} className="mb-2">
                {/* button links to the page*/}
                <Button
                  variant="outline-primary"
                  className="me-2 mb-2"
                  onClick={() => router.push(`/artwork?${historyItem}`)}
                >
                  {formatHistoryText(historyItem)}
                </Button>
              </div>
            ))
          ) : (
            // if no search history, display message
            <p>No search history could be found.</p>
          )}
        </Card.Body>
      </Card>
    </>
  );
}
