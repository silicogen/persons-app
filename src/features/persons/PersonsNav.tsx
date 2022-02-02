import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
    selectTotal
} from './personsSlice';
import styles from './Persons.module.css';


export const PersonsNav: React.FC = () => {
    const count = useAppSelector(selectTotal);
    return <>

        <div className={styles.row}>
            <button
            // onClick={persons.prev}
            // disabled={persons.prevDisabled }
            >Prev</button>
            <span className={styles.value}>{count}</span>
            <button
            // onClick={persons.next}
            // disabled={persons.nextDisabled} 
            >Next</button>
        </div>

    </>

}