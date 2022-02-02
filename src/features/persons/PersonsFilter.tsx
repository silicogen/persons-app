import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import styles from './Persons.module.css';
import {
    filter,
    selectFilterEnabled,
    selectFilterStrIsNew,
    selectFilteredTotal
} from './personsSlice'


export const PersonsFilter: React.FC = () => {
    const dispatch = useDispatch();
    const [filterStr, setFilterStr] = useState<string>("");
    const filterStrIsNew = useAppSelector(selectFilterStrIsNew(filterStr));
    const filteredTotal = useAppSelector(selectFilteredTotal);
    const filterEnabled = useAppSelector(selectFilterEnabled);
    const search: React.FormEventHandler<HTMLFormElement> = e => {
        e.preventDefault();
        dispatch(filter(filterStr))
    };

    return <>
        <form
            className={styles.row}
            onSubmit={search}
        >
            <button
                type="submit"
                disabled={!filterStrIsNew}
            >Search</button>
            <input
                type="text"
                onChange={e => setFilterStr(e.currentTarget.value)}
            />
            <span>{filterEnabled && `found ${filteredTotal} persons`}</span>
        </form>
    </>


}