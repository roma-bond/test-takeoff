import NewContact from './NewContact';
import ContactsFilter from './ContactsFilter';
import classes from './ContactsHeader.module.css';

const ContactsHeader = () => {
  return (
    <div className={classes['contacts-header']}>
      <h1>Список контактов</h1>
      <NewContact />
      <ContactsFilter />
    </div>
  );
};

export default ContactsHeader;
