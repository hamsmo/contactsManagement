import React from "react";
import Header from "../../Components/Header";
import { connect } from "react-redux";
import styles from "./AddContact.module.css";
import { useNavigate } from "react-router-dom";
import { addContact } from "../../Redux/actions";
import { Formik } from "formik";
import * as Yup from "yup";
import { FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

const AddContact = ({ addContact }) => {
  const navigate = useNavigate();

  // Form configurations
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    phone: Yup.string().required("Phone is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const handleSubmit = (values) => {
    const updatedValues = {
      id: uuidv4(),
      name: {
        first: values.firstName,
        last: values.lastName,
      },
      email: values.email,
      phone: values.phone,
      address: values.address,
    };
    addContact(updatedValues);
    navigate(`/contact/${updatedValues.id}`);
  };
  // End Form configurations

  return (
    <>
      <Header title="Add new contact" />

      <Formik
        initialValues={initialValues}
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
            {/* TODO: MOVE THE FORMGROUP TO A SEPRATED COMPONENT */}
            <FormGroup className="mb-3">
              <FormLabel>First name</FormLabel>

              <FormControl
                id="firstName"
                name="firstName"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstName}
                placeholder="Enter First Name"
              />
              {touched.firstName && errors.firstName && (
                <div className="error">{errors.firstName}</div>
              )}
            </FormGroup>

            <FormGroup className="mb-3">
              <FormLabel>Last name</FormLabel>

              <FormControl
                id="lastName"
                name="lastName"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastName}
                placeholder="Enter Last Name"
              />
              {touched.lastName && errors.lastName && (
                <div className="error">{errors.lastName}</div>
              )}
            </FormGroup>

            <FormGroup className="mb-3">
              <FormLabel>Email</FormLabel>

              <FormControl
                id="email"
                name="email"
                type="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder="Enter Email"
              />
              {touched.email && errors.email && (
                <div className="error">{errors.email}</div>
              )}
            </FormGroup>

            <FormGroup className="mb-3">
              <FormLabel>Phone</FormLabel>

              <FormControl
                id="phone"
                name="phone"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
                placeholder="Enter Phone"
              />
              {touched.phone && errors.phone && (
                <div className="error">{errors.phone}</div>
              )}
            </FormGroup>

            <FormGroup className="mb-3">
              <FormLabel>Address</FormLabel>

              <FormControl
                id="address"
                name="address"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.address}
                placeholder="Enter Address"
              />
              {touched.address && errors.address && (
                <div className="error">{errors.address}</div>
              )}
            </FormGroup>

            <div className="d-flex justify-content-center">
              <button
                type="submit"
                className="btn btn-outline-dark"
                disabled={!(isValid && dirty)}
              >
                Add contact
              </button>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default connect(null, { addContact })(AddContact);
