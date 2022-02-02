import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import styles from './Persons.module.css';
import { filter, selectFilterDisabled } from './personsSlice'


export const PersonsFilter: React.FC = () => {
    const dispatch = useDispatch();
    const [filterStr, setFilterStr] = useState<string>("");
    const filterDisabled = useAppSelector(selectFilterDisabled(filterStr));
    return <>
        <div className={styles.row}>
            <button
                onClick={() => dispatch(filter(filterStr))}
                disabled={filterDisabled}
            >Найти</button>
            <input
                type="text"
                onChange={e => setFilterStr(e.currentTarget.value)}
            />
        </div>
    </>


}