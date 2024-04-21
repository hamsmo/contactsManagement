import React from "react";
import styles from "./ContactCard.module.css";
import DefaultImg from "../DefaultImg";

const ContactCard = ({ contact, handleClick }) => {
  const { picture, name, email, phone } = contact;
  return (
    <div className={styles.contactCard} onClick={handleClick}>
      <div className={styles.contactCardImg}>
        {picture ? (
          <img src={picture.medium} alt="Contact Profile" />
        ) : (
          <DefaultImg />
        )}
      </div>
      <div>
        <p className={styles.name}>
          {name.last}, {name.first}
        </p>
        <p className={styles.details}>{email}</p>
        <p className={styles.details}>{phone}</p>
      </div>
    </div>
  );
};

export default ContactCard;
