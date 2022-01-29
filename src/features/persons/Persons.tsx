import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  incrementAsync,
  selectCount,
} from './personsSlice';
import styles from './Persons.module.css';

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
        className={styles.asyncButton}
        onClick={() => dispatch(incrementAsync())}
      >
        Fetch
      </button>
      <span >{status === "loading" && "loading"}</span>
    </div>
  </div>
}
