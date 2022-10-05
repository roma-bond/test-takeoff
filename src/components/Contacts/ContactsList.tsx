import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setContacts } from '../../features/contacts/contactsSlice';
import { RootState } from '../../app/store';
import ContactItem from './ContactItem';
import classes from './ContactsList.module.css';

const ContactsList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state: RootState) => state.contacts.value);
  const filter = useSelector((state: RootState) => state.filter.value);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/contacts')
      .then((response) => {
        dispatch(setContacts(response.data.contacts));
      })
      .catch((err) => {});
  }, [dispatch]);

  return (
    <div className={classes['contacts-list']}>
      {contacts.map((contact) => {
        if (contact.name.toLowerCase().includes(filter.toLowerCase())) {
          return <ContactItem key={contact.id} contact={contact} />;
        } else {
          return false;
        }
      })}
    </div>
  );
};

export default ContactsList;
