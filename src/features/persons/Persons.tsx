import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  fetchPersons,
  selectCount
} from './personsSlice';
import {
  smallUrl, largeUrl
} from "./urls"
import styles from './Persons.module.css';
import { PersonsTable } from './PersonsTable';

export function Persons() {
  const count = useAppSelector(selectCount);
  const status = useAppSelector(state => state.persons.status)
  const dispatch = useAppDispatch();

  return <div>
    <div className={styles.row}>

      <span className={styles.value}>{count}</span>

    </div>
    <div className={styles.row}>

      <button
        // className={styles.asyncButton}
        onClick={() => dispatch(fetchPersons(smallUrl))}
      >
        Fetch small
      </button>

      <button
        // className={styles.asyncButton}
        onClick={() => dispatch(fetchPersons(largeUrl))}
      >
        Fetch large
      </button>

      <span >{status === "loading" && "loading"}</span>

    </div>
    <PersonsTable />
  </div>
}
