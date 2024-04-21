import React from "react";
import styles from "./Footer.module.css";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const handleRoute = () => {
    navigate("/addContact");
  };

  return (
    <div className={styles.footer}>
      <div className={styles.iconHolder}>
        <div />
        <div className={styles.addIcon} onClick={handleRoute}>
          +
        </div>
      </div>
      <p className={styles.footerText}>All Rights Reserved VOIS 2022</p>
    </div>
  );
};

export default Footer;
