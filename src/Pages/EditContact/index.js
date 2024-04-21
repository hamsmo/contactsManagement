import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./EditContact.module.css";
import { connect } from "react-redux";
import { editContact } from "../../Redux/actions";
import { Formik } from "formik";
import * as Yup from "yup";
import { Col, FormControl, FormGroup, FormLabel, Row } from "react-bootstrap";

import Loader from "../../Components/Loader";
import Header from "../../Components/Header";

const EditContact = ({ contacts, editContact }) => {
  const [contact, setContact] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const { id } = useParams();
  const navigate = useNavigate();

  // Form configurations
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address"),
  });

  const handleSubmit = async (values) => {
    const updatedValues = {
      name: {
        first: values.firstName,
        last: values.lastName,
      },
      email: values.email,
      phone: values.phone,
    };
    await editContact(contact.id, updatedValues);
    navigate(`/contact/${contact.id}`);
  };
  // End form configurations

  useEffect(() => {
    if (id && contacts) {
      const contact = contacts.filter((contact) => contact.id === id)[0];
      const contactValues = {
        id: contact.id,
        firstName: contact.name.first,
        lastName: contact.name.last,
        email: contact.email,
        phone: contact.phone,
      };
      setContact(contactValues);
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
            title={`${contact.firstName} ${contact.lastName}'s profile edit`}
          />

          <Formik
            initialValues={contact ?? initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            validateOnChange
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              handleBlur,
              isValid,
              dirty,
            }) => (
              <form onSubmit={handleSubmit} className={styles.form}>
                <FormGroup as={Row} className="mb-3">
                  <FormLabel column sm={12} md={4} lg={3}>
                    First name
                  </FormLabel>
                  <Col sm={12} md={8} lg={9}>
                    <FormControl
                      id="firstName"
                      name="firstName"
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.firstName}
                    />
                    {touched.firstName && errors.firstName && (
                      <div className="error">{errors.firstName}</div>
                    )}
                  </Col>
                </FormGroup>

                <FormGroup as={Row} className="mb-3">
                  <FormLabel column sm={12} md={4} lg={3}>
                    Last name
                  </FormLabel>
                  <Col sm={12} md={8} lg={9}>
                    <FormControl
                      id="lastName"
                      name="lastName"
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lastName}
                    />
                    {touched.lastName && errors.lastName && (
                      <div className="error">{errors.lastName}</div>
                    )}
                  </Col>
                </FormGroup>

                <FormGroup as={Row} className="mb-3">
                  <FormLabel column sm={12} md={4} lg={3}>
                    Email
                  </FormLabel>
                  <Col sm={12} md={8} lg={9}>
                    <FormControl
                      id="email"
                      name="email"
                      type="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                    {touched.email && errors.email && (
                      <div className="error">{errors.email}</div>
                    )}
                  </Col>
                </FormGroup>

                <FormGroup as={Row} className="mb-3">
                  <FormLabel column sm={12} md={4} lg={3}>
                    Phone
                  </FormLabel>
                  <Col sm={12} md={8} lg={9}>
                    <FormControl
                      id="phone"
                      name="phone"
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.phone}
                    />
                    {touched.phone && errors.phone && (
                      <div className="error">{errors.phone}</div>
                    )}
                  </Col>
                </FormGroup>

                <div className="d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-outline-dark"
                    disabled={!(isValid && dirty)}
                  >
                    Save Contact
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  contacts: state.contacts,
});

export default connect(mapStateToProps, { editContact })(EditContact);
