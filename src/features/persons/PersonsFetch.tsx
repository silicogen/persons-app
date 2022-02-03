import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  fetchPersonsSmall,
  fetchPersonsLarge,
  selectTotal
} from './personsSlice';
import styles from './Persons.module.css';
import { useEffect } from 'react';

export function PersonsFetch() {
  const status = useAppSelector(state => state.persons.status)
  const count = useAppSelector(selectTotal);
  const dispatch = useAppDispatch();
  useEffect(() => { dispatch(fetchPersonsSmall) }, [dispatch])

  return <>
    <div className={styles.row}>
      <button
        onClick={() => dispatch(fetchPersonsSmall)}
      >
        Fetch small
      </button>

      <button
        onClick={() => dispatch(fetchPersonsLarge)}
      >
        Fetch large
      </button>

      <span >{
        status === "loading"
          ? "loading"
          : `loaded ${count} persons`}
      </span>

    </div>
  </>
}
