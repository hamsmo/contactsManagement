import React from "react";
import { Container, Row, Col, FormControl } from "react-bootstrap";
import logo from "../../Assets/images/logo.svg"; // Import your logo÷
import styles from "./Header.module.css";
import { useNavigate } from "react-router-dom";

const Header = ({ title, handleChange }) => {
  const navigate = useNavigate();
  const handleRoute = () => {
    navigate("/");
  };

  return (
    <Container style={{ marginTop: 10 }}>
      <Row className="justify-content-between">
        <Col xs={12} lg={2} className={styles.logo}>
          <img
            src={logo}
            alt="Logo"
            onClick={handleRoute}
          />
        </Col>
        {handleChange && (
          <Col xs={12} lg={3} className={styles.searchField}>
            <FormControl
              type="text"
              placeholder="Search for contact"
              onChange={handleChange}
            />
          </Col>
        )}
      </Row>
      <Row>
        <Col xs={12} className="text-center">
          <h4 className={styles.title}>{title}</h4>
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
