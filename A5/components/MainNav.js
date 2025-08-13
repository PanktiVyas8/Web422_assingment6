import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';

import Link from 'next/link';

// useRouter
import { useRouter } from 'next/router';

//useState
import { useState } from 'react';

// jotai for saved search history
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';

export default function MainNav() {
  // store current search
  const [searchField, setSearchField] = useState('');

  // new page when form is submitted
  const router = useRouter();

  // search history
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  //  when the search form is submitted
  const handleSubmit = (e) => {
    // prevent page from reloading
    e.preventDefault(); 
    // query is built
    const query = `title=true&q=${searchField}`;
    // saved to history
    setSearchHistory(current => [...current, query]);
    // takes user to the artwork page with what was searched
    router.push(`/artwork?${query}`);
  };

  return (
    <>
      {/* nav bar */}
      <Navbar className="fixed-top navbar-dark bg-danger" expand="lg">
        <Container>
          {/* ADD MY NAME HERE */}
          <Navbar.Brand>Pankti Vyas</Navbar.Brand>

          {/* for smaller screens */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          {/* opens when the toggle button is clicked */}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* home page */}
              <Link href="/" passHref legacyBehavior>
                <Nav.Link>Home</Nav.Link>
              </Link>

              {/* advanced search page */}
              <Link href="/search" passHref legacyBehavior>
                <Nav.Link>Advanced Search</Nav.Link>
              </Link>

              {/* dropdown for user (fav and history)*/}
              <NavDropdown title="User" id="basic-nav-dropdown">
                <Link href="/favourites" passHref legacyBehavior>
                  <NavDropdown.Item>Favourites</NavDropdown.Item>
                </Link>
                <Link href="/history" passHref legacyBehavior>
                  <NavDropdown.Item>Search History</NavDropdown.Item>
                </Link>
              </NavDropdown>
            </Nav>

            {/* search bar inside the navbar */}
            <Form className="d-flex" onSubmit={handleSubmit}>
              {/* input for search */}
              <FormControl
                type="text"                 
                placeholder="Search"
                className="me-2"            
                value={searchField}      
                // update when user types
                onChange={(e) => setSearchField(e.target.value)} 
              />
              <Button type="submit" variant="outline-light">
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}
