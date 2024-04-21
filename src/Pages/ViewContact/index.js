import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import styles from "./ViewContact.module.css";
import { deleteContact } from "../../Redux/actions";

import DefaultImg from "../../Components/DefaultImg";
import Loader from "../../Components/Loader";
import Header from "../../Components/Header";

const ViewContact = ({ contacts, deleteContact }) => {
  const [contact, setContact] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = () => {
    deleteContact(contact.id);
    navigate(`/`);
  };

  const handleEdit = () => {
    navigate(`/contact/edit/${contact.id}`);
  };

  const getContactLocation = () => {
    return `${contact.location.street.name} ${contact.location.street.number}, ${contact.location.city}, ${contact.location.country}`;
  };

  useEffect(() => {
    if (id && contacts) {
      const contact = contacts.find((contact) => contact.id === id);
      setContact(contact);
      setIsLoading(false);
    }
  }, [id, contacts]);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header
            title={`${contact.name.first} ${contact.name.last}'s profile`}
          />

          <div className={styles.contactInfo}>
            <div className={styles.contactImg}>
              {contact.picture ? (
                <img src={contact.picture.medium} />
              ) : (
                <DefaultImg />
              )}
            </div>
            <div>
              <p className={styles.details}>
                Email: <span className={styles.email}>{contact.email}</span>
              </p>
              <p className={styles.details}>Phone: {contact.phone}</p>

              <p className={styles.details}>
                Address: {contact.address ?? getContactLocation()}
              </p>
            </div>
          </div>

          <div className={styles.buttons}>
            <button className="btn btn-outline-danger" onClick={handleDelete}>
              Delete
            </button>
            <button className="btn btn-outline-dark" onClick={handleEdit}>
              Edit
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  contacts: state.contacts,
});

export default connect(mapStateToProps, { deleteContact })(ViewContact);
