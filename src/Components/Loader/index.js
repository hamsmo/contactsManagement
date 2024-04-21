import React from "react";
import { Spinner } from "react-bootstrap";
import styles from "./Loader.module.css";

const Loader = () => (
  <Spinner animation="border" variant="danger" className={styles.spinner} />
);

export default Loader;
