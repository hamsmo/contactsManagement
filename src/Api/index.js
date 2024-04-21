import axios from "axios";

const ContactsApi = {
  getContacts: async () => {
    try {
      const response = await axios.get("https://randomuser.me/api?results=10");
      return response.data.results;
    } catch (error) {
      console.error("Error fetching contacts:", error);
      throw error;
    }
  },
};

export default ContactsApi;
