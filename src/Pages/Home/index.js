import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import ContactsApi from "../../Api";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import Header from "../../Components/Header";
import ContactCard from "../../Components/ContactCard";
import Loader from "../../Components/Loader";
import { storeContacts } from "../../Redux/actions";

const Home = ({ storeContacts, contacts }) => {
  const [filteredContacts, setFilteredContacts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [letters, setLetters] = useState([]);
  const [filteredLetter, setFilteredLetter] = useState();
  const [searchText, setSearchText] = useState("");

  const navigate = useNavigate();

  const handleRoute = (id) => {
    navigate(`/contact/${id}`);
  };

  // Filter contacts based on the selected letter and the searchText
  const handleFilterContacts = () => {
    let filteredContactsByLetter, filteredContactsBySearch;

    // Filter contacts by selected letter
    filteredContactsByLetter =
      filteredLetter &&
      contacts.filter((contact) =>
        contact.name.first.startsWith(filteredLetter)
      );

    // Filter contacts by searchText
    if (filteredLetter) {
      filteredContactsBySearch =
        searchText &&
        filteredContactsByLetter.filter((contact) =>
          contact.name.first.toLowerCase().includes(searchText.toLowerCase())
        );
    } else {
      filteredContactsBySearch =
        searchText &&
        contacts.filter((contact) =>
          contact.name.first.toLowerCase().includes(searchText.toLowerCase())
        );
    }

    if (filteredContactsBySearch) {
      setFilteredContacts(filteredContactsBySearch);
    } else {
      setFilteredContacts(filteredContactsByLetter);
    }
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleFilterLetter = (letter) => {
    // reset filterLetter if oldValue = newOld
    if (filteredLetter === letter) {
      setFilteredLetter("");
    } else {
      setFilteredLetter(letter);
    }
  };

  const getContacts = async () => {
    const res = await ContactsApi.getContacts();

    // Appen id to each contact, then store in redux
    const updatedRes = res.map((contact) => ({
      ...contact,
      id: uuidv4(),
    }));
    storeContacts(updatedRes);
  };

  // set first letters based on the contacts redux state
  useEffect(() => {
    if (contacts) {
      setIsLoading(false);
      const firstLetters = new Set(
        contacts.map((contact) => contact.name.first[0])
      );
      setLetters([...firstLetters]);
    }
  }, [contacts]);

  useEffect(() => {
    if (searchText || filteredLetter) {
      handleFilterContacts();
    } else {
      setFilteredContacts(null);
    }
  }, [searchText, filteredLetter]);

  useEffect(() => {
    // Get contacts from api if no contacts stored in Redux
    if (!contacts) {
      getContacts();
    }
  }, []);

  return (
    <div>
      <Header title="Contacts" handleChange={handleSearch} />

      <Container className="p-3">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {/* Letters */}
            <Row>
              <Col xs={12} className={`${styles.letters} text-center`}>
                {letters.map((letter, index) => (
                  <span
                    key={index}
                    className={
                      filteredLetter === letter ? styles.activeLetter : ""
                    }
                    onClick={() => handleFilterLetter(letter)}
                  >
                    {letter}
                  </span>
                ))}
              </Col>
            </Row>

            {/* Contacts List */}
            <Row>
              {(filteredContacts ?? contacts).map((contact) => (
                <Col xs={12} md={6} lg={4} key={contact.id}>
                  <ContactCard
                    contact={contact}
                    handleClick={() => handleRoute(contact.id)}
                  />
                </Col>
              ))}
            </Row>
          </>
        )}
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  contacts: state.contacts,
});

export default connect(mapStateToProps, {
  storeContacts,
})(Home);
