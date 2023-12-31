//WITH JSON API IF YOU WANT CAN RETRIVE 



// import React, { useState, useEffect } from "react";
// import "./App.css";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import { v4 as uuid } from "uuid";
// import api from "../api/contacts";
// import Header from "./Header";
// import AddContact from "./AddContact";
// import ContactList from "./ContactList";
// import ContactCard from "./ContactCard";
// import ContactDetail from "./ContactDetail";
// import EditContact from "./EditContact";

// function App() {
//   const LOCAL_STORAGE_KEY = "contacts";
//   const [contacts, setContacts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchResults, setSearchResults] = useState([]);

//   const retrieveContacts = async () => {
//     const response = await api.get("/contacts");
//     return response.data;
//   };

//   const addContactHandler = async (contact) => {
//     const request = {
//       id: uuid(),
//       ...contact,
//     };
//     const response = await api.post("/contacts", request);
//     setContacts([...contacts, response.data]);
//     console.log(contact);
//   };

//   const updateContactHandler = async (contact) => {
//     const response = await api.put(`/contacts/${contact.id}`, contact);
//     const { id, name, email } = response.data;
//     setContacts(
//       contacts.map((contact) => {
//         return contact.id === id ? { ...response.data } : contact;
//       })
//     );
//   };

//   const searchHandler = (searchTerm) => {
//     setSearchTerm(searchTerm);
//     if (searchTerm !== "") {
//       const newContactList = contacts.filter((contact) => {
//         return Object.values(contact)
//           .join(" ")
//           .toLowerCase()
//           .includes(searchTerm.toLowerCase());
//       });
//       setSearchResults(newContactList);
//     } else {
//       setSearchResults(contacts);
//     }
//   };

//   const removeContactHandler = async (id) => {
//     await api.delete(`/contacts/${id}`);
//     const newContactList = contacts.filter((contact) => {
//       return contact.id !== id;
//     });
//     setContacts(newContactList);
//   };

//   useEffect(() => {
//     const fetchContacts = async () => {
//       const allContacts = await retrieveContacts();
//       if (allContacts) setContacts(allContacts);
//     };
//     fetchContacts();
//   }, []);

//   useEffect(() => {
//     localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
//   }, [contacts]);

//   return (
//     <div className="ui container">
//       <Router>
//         <Header />
//         <Switch>
//           <Route
//             path="/"
//             exact
//             render={(props) => (
//               <ContactList
//                 {...props}
//                 contacts={
//                   searchTerm.length < 1 ? contacts : searchResults
//                 }
//                 getContactId={removeContactHandler}
//                 term={searchTerm}
//                 searchKeyword={searchHandler}
//               />
//             )}
//           />
//           <Route
//             exact
//             path="/add"
//             render={(props) => (
//               <AddContact {...props} addContactHandler={addContactHandler} />
//             )}
//           />
//           <Route
//             path="/edit"
//             render={(props) => (
//               <EditContact
//                 {...props}
//                 updateContactHandler={updateContactHandler}
//               />
//             )}
//           />
//           <Route path="/contact/:id" component={ContactDetail} />
//         </Switch>
//       </Router>
//     </div>
//   );
// }

// export default App;

// IF ONLY LOCAL STORAGE

// App.js
import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { v4 as uuid } from "uuid";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactCard from "./ContactCard";
import ContactDetail from "./ContactDetail";
import EditContact from "./EditContact";

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const addContactHandler = (contact) => {
    const newContact = { id: uuid(), ...contact };
    setContacts([...contacts, newContact]);
  };

  const updateContactHandler = (updatedContact) => {
    setContacts(
      contacts.map((contact) =>
        contact.id === updatedContact.id ? updatedContact : contact
      )
    );
  };

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    } else {
      setSearchResults(contacts);
    }
  };

  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  };

  // Load contacts from local storage during initial render
  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedContacts) {
      setContacts(storedContacts);
    }
  }, []);

  // Update local storage whenever contacts state changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="ui container">
      <Router>
        <Header />
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => (
              <ContactList
                {...props}
                contacts={
                  searchTerm.length < 1 ? contacts : searchResults
                }
                getContactId={removeContactHandler}
                term={searchTerm}
                searchKeyword={searchHandler}
              />
            )}
          />
          <Route
            exact
            path="/add"
            render={(props) => (
              <AddContact {...props} addContactHandler={addContactHandler} />
            )}
          />
          <Route
            path="/edit"
            render={(props) => (
              <EditContact
                {...props}
                updateContactHandler={updateContactHandler}
              />
            )}
          />
          <Route path="/contact/:id" component={ContactDetail} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;


