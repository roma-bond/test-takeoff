import { useEffect, useRef, useState, FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { setFilter } from '../../features/filter/filterSlice';
import Button from '../UI/Button';
import classes from './ContactsFilter.module.css';

const ContactsFilter = () => {
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const filter = useSelector((state: RootState) => state.filter);
  const [btnColor, setBtnColor] = useState<undefined | string>(undefined);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputRef.current) {
      dispatch(setFilter(inputRef.current.value));
    }
  };

  useEffect(() => {
    setBtnColor(filter ? '#e1194d' : 'grey');
  }, [filter]);

  return (
    <form onSubmit={submitHandler} className={classes['contacts-filter']}>
      <input type='text' id='search' ref={inputRef} />
      <Button type='submit' color={btnColor}>
        Поиск
      </Button>
    </form>
  );
};

export default ContactsFilter;
