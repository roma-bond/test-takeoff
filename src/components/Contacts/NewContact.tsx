import { useState, useRef, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useAppDispatch } from '../../app/hooks';
import { addContactAction } from '../../features/contacts/contactsAPI';
import { RootState } from '../../app/store';
import Button from '../UI/Button';
import classes from './NewContact.module.css';
import { useSelector } from 'react-redux';

const NewContact = () => {
  const userId = useSelector((state: RootState) => state.auth.userId);
  const dispatch = useAppDispatch();
  const nameRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const [formIsVisible, setFormIsVisible] = useState(false);

  const visibilityButtonHandler = () => {
    setFormIsVisible(true);
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      nameRef.current &&
      addressRef.current &&
      phoneRef.current &&
      userId !== null
    ) {
      dispatch(
        addContactAction({
          contact: {
            id: Math.random(),
            name: nameRef.current.value,
            address: addressRef.current.value,
            phone: phoneRef.current.value,
          },
          userId,
        })
      );
      setFormIsVisible(false);
    } else {
      // error
    }
  };

  return (
    <div>
      {!formIsVisible ? (
        <Button type='button' onClick={visibilityButtonHandler} color='green'>
          Добавить новый контакт
        </Button>
      ) : (
        <form className={classes['new-contact']} onSubmit={submitHandler}>
          <p>
            <label htmlFor='name'>Имя</label>
            <input type='text' name='name' id='name' ref={nameRef} />
          </p>
          <p>
            <label htmlFor='address'>Адрес</label>
            <input type='text' name='address' id='address' ref={addressRef} />
          </p>
          <p>
            <label htmlFor='phone'>Телефон</label>
            <input type='text' name='phone' id='phone' ref={phoneRef} />
          </p>
          <Button>Добавить</Button>
        </form>
      )}
    </div>
  );
};

export default NewContact;
