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

import { Image, Row, Col } from 'react-bootstrap';

export default function Home() {
  return (
    <>
    {/* wide image of the Met Museum */}
      <Image 
        src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg"
        fluid 
        rounded 
      />
      <br /><br />
      {/* create rows with 2 columns */}
      <Row>
        <Col lg={6}>
          {/* 2 paragraphs */}
          <p>
            The Metropolitan Museum of Art in New York City, also known as "The Met", is the largest art museum in the United States and the third largest museum in the world. 
            Located next to Central Park, at 1000 Fifth Avenue, it is the home of over two million works in its permanent collection with 1.5 million currently listed. The museum 
            also has an additional building, The Met Cloisters, located in Upper Manhattan that focuses on its appreciation of medieval Europe.
          </p>
          <p>
            The Met was established in 1870 by a group of Americans, including philanthropists, artists, and businessmen with the purpose of allowing Americans to experience and 
            learn about art through a collection that displays works from around the world like African, Asian, Oceanian, Byzantine, and Islamic art. The collection consists 
            of musical instruments, clothing, armor, and other historical pieces from various regions of the world. The Met galleries also include paintings and sculptures 
            that help encapsulate a variety of different time periods.
          </p>
        </Col>
        <Col lg={6}>
          <p>
            The museum’s is quite the tourist attraction with 5.36 million visitors in 2023, it is the most-visited museum in the United States and the fifth-most visited
            art museum in the world. Additionally, The Costume Institute is known for hosting the annual Met Gala, where various well-known celebrities raise money for the Institute
            and dress according to a theme.
            <br></br>
            <br />
            {/* link to wikipedia */}
            <a href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art" target="_blank" rel="noreferrer">
              Learn more on Wikipedia - Metropolitan Museum of Art
            </a>
          </p>
        </Col>
      </Row>
    </>
  );
}
