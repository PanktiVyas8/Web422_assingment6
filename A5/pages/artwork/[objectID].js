import { useRouter } from "next/router";
import { Row, Col } from "react-bootstrap";
import ArtworkCardDetail from "@/components/ArtworkCardDetail";

export default function ArtworkById() {
  // useRouter to access url
  const router = useRouter();
  // gets id from url
  const { objectID } = router.query;

  return (
    <Row>
      <Col>
        {/* shows detail using the object ID */}
        <ArtworkCardDetail objectID={objectID} />
      </Col>
    </Row>
  );
}
