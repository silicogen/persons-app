import {
    useAppDispatch,
    useAppSelector,
} from "../../app/hooks";
import {
    selectAddPersonMode,
    toggleAddPersonsMode,
    addPerson
} from "./personsSlice";
import styles from './Persons.module.css';
import { getNewPersonToAdd } from "./person";
import { useState } from "react";
import { columns } from "./columns";
import { PersonFieldInput } from "./PersonFieldInput";

export const PersonAddition: React.FC = () => {
    const dispatch = useAppDispatch();
    const addPersonMode = useAppSelector(selectAddPersonMode);
    const [person, setPerson] = useState(getNewPersonToAdd());
    return <>
        <div className={styles.row}>
            <button
                onClick={() => dispatch(toggleAddPersonsMode())}
            >{addPersonMode ? "Cancel" : "Add"}</button>
            <button
                style={addPersonMode ? {} : { display: "none" }}
                onClick={() => dispatch(addPerson(person))}
            >Apply</button>
        </div>

        <form
            className={styles.details}
            style={addPersonMode ? {} : { display: "none" }}
        >
            {columns.map(c => <PersonFieldInput
                key={c.id}
                person={person}
                field={c}
                setPerson={setPerson} />)};
        </form>
    </>
}