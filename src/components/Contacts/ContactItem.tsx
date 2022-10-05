import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../app/hooks';
import { RootState } from '../../app/store';
import { deleteContactAction } from '../../features/contacts/contactsAPI';
import { Contact } from '../../types/types';
import classes from './ContactItem.module.css';

type ContactItemProps = {
  contact: Contact;
};

const ContactItem = (props: ContactItemProps) => {
  const userId = useSelector((state: RootState) => state.auth.userId);
  const dispatch = useAppDispatch();
  const { id, name, address, phone } = props.contact;

  const clickHandler = () => {
    if (userId !== null) {
      dispatch(deleteContactAction({ id, userId }));
    }
  };

  return (
    <div className={classes['contact-item']}>
      <div>
        <p>
          Имя: <span>{name}</span>
        </p>
        <p>
          Адрес: <span>{address}</span>
        </p>
        <p>
          Телефон: <span>{phone}</span>
        </p>
      </div>
      <button onClick={clickHandler}>Удалить</button>
    </div>
  );
};

export default ContactItem;
