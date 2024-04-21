import {
  ADD_CONTACT,
  DELETE_CONTACT,
  EDIT_CONTACT,
  STORE_CONTACTS,
} from "./types";

export const storeContacts = (contacts) => ({
  type: STORE_CONTACTS,
  payload: { contacts },
});

export const addContact = (contact) => ({
  type: ADD_CONTACT,
  payload: contact,
});

export const editContact = (id, data) => ({
  type: EDIT_CONTACT,
  payload: { contactId: id, updatedContactData: data },
});

export const deleteContact = (contactId) => ({
  type: DELETE_CONTACT,
  payload: { contactId },
});
