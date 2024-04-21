import {
  ADD_CONTACT,
  DELETE_CONTACT,
  EDIT_CONTACT,
  STORE_CONTACTS,
} from "./types";

const initialState = {
  contacts: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_CONTACTS:
      return {
        ...state,
        contacts: action.payload.contacts,
      };
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, { ...action.payload }],
      };
    case EDIT_CONTACT:
      const { contactId, updatedContactData } = action.payload;
      return {
        ...state,
        contacts: state.contacts.map((contact) =>
          contact.id === contactId
            ? { ...contact, ...updatedContactData }
            : contact
        ),
      };
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact.id !== action.payload.contactId
        ),
      };
    default:
      return state;
  }
};

export default rootReducer;
