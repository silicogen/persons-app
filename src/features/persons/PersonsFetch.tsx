import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  fetchPersons,
} from './personsSlice';
import {
  smallUrl, largeUrl
} from "./urls"
import styles from './Persons.module.css';

export function PersonsFetch() {
  const status = useAppSelector(state => state.persons.status)
  const dispatch = useAppDispatch();

  return <>
    <div className={styles.row}>
      <button
        onClick={() => dispatch(fetchPersons(smallUrl))}
      >
        Fetch small
      </button>

      <button
        onClick={() => dispatch(fetchPersons(largeUrl))}
      >
        Fetch large
      </button>

      <span >{status === "loading" && "loading"}</span>

    </div>
  </>
}
