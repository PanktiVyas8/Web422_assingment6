import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Row, Col, Form, Button } from 'react-bootstrap';

// jotai for saving search history
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';

export default function AdvancedSearch() {
  const router = useRouter();

  // handle form and errors
  const { register, handleSubmit, formState: { errors } } = useForm();

  // get search history 
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const submitForm = (data) => {
    // builds the url
    let queryString = `searchBy=${data.searchBy}`;

    if (data.geoLocation) queryString += `&geoLocation=${data.geoLocation}`;
    if (data.medium) queryString += `&medium=${data.medium}`;
    
    queryString += `&isOnView=${data.isOnView}`;
    queryString += `&isHighlight=${data.isHighlight}`;
    queryString += `&q=${data.q}`;

    // save to history
    setSearchHistory(current => [...current, queryString]);

    // artwork page with search details
    router.push(`/artwork?${queryString}`);
  };

  return (
    // search form
    <Form onSubmit={handleSubmit(submitForm)}>
      <Row>
        <Col>
          {/* main search text box */}
          <Form.Group className="mb-3">
            <Form.Label>Search Query</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="" 
              {...register("q", { required: true })} 
              className={errors.q ? "is-invalid" : ""}
            />
            {errors.q && <div className="invalid-feedback">Field is required</div>}
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          {/* drop down menu*/}
          <Form.Label>Search By</Form.Label>
          <Form.Select {...register("searchBy")} className="mb-3">
            <option value="title">Title</option>
            <option value="tags">Tags</option>
            <option value="artistOrCulture">Artist or Culture</option>
          </Form.Select>
        </Col>
        <Col md={4}>
          {/* location option*/}
          <Form.Group className="mb-3">
            <Form.Label>Geo Location</Form.Label>
            <Form.Control type="text" placeholder="" {...register("geoLocation")} />
            <Form.Text className="text-muted">
              Case Sensitive String (ie "Europe", "France", "Paris", etc.) | separate multiple values with `|`
            </Form.Text>
          </Form.Group>
        </Col>
        <Col md={4}>
          {/* medium */}
          <Form.Group className="mb-3">
            <Form.Label>Medium</Form.Label>
            <Form.Control type="text" placeholder="" {...register("medium")} />
            <Form.Text className="text-muted">
              Case Sensitive String (ie: "Paintings", "Ceramics", etc.) | separate multiple values with `|`
            </Form.Text>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          {/* checkbox */}
          <Form.Check type="checkbox" label="Highlighted" {...register("isHighlight")} />
          <Form.Check type="checkbox" label="Currently on View" {...register("isOnView")} />
        </Col>
      </Row>
      <Row>
        <Col>
          <br />
          {/* submit button */}
          <Button variant="primary" type="submit">Submit</Button>
        </Col>
      </Row>
    </Form>
  );
}
