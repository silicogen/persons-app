import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  fetchPersonsSmall,
  fetchPersonsLarge
} from './personsSlice';
import styles from './Persons.module.css';

export function PersonsFetch() {
  const status = useAppSelector(state => state.persons.status)
  const dispatch = useAppDispatch();

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

      <span >{status === "loading" && "loading"}</span>

    </div>
  </>
}
