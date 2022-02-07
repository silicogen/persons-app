import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import styles from './Persons.module.css';
import {
    filter,
    selectFilterEnabled,
    selectFilteredTotal,
    selectFilterStr
} from './personsSlice'


export const PersonsFilter: React.FC = () => {
    const dispatch = useAppDispatch();
    const [tryFilterStr, setTryFilterStr] = useState<string>("");
    const filterStr = useAppSelector(selectFilterStr);
    const filteredTotal = useAppSelector(selectFilteredTotal);
    const filterEnabled = useAppSelector(selectFilterEnabled);
    const search: React.FormEventHandler<HTMLFormElement> = e => {
        e.preventDefault();
        dispatch(filter(tryFilterStr))
    };
    const changeTryFilterStr: React.ChangeEventHandler<HTMLInputElement> = e =>
        setTryFilterStr(e.currentTarget.value)

    return <>
        <form
            className={styles.row}
            onSubmit={search}
        >
            <button
                type="submit"
                disabled={tryFilterStr === filterStr}
            >Search</button>
            <input
                type="text"
                onChange={changeTryFilterStr}
            />
            <span>{filterEnabled && `found ${filteredTotal} persons containing '${filterStr}'`}</span>
        </form>
    </>


}