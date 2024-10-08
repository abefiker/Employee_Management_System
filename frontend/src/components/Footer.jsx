import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-3">
            <p>Prodigy_Info_Tech &copy; {currentYear}</p>
            <p>🍨 by Abemelek Daniel</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;