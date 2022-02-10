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
import { getNewPersonToAdd, Person } from "./person";
import { useState } from "react";
import { fields } from "./fields";
import { PersonFieldInput } from "./PersonFieldInput";

export const PersonAddition: React.FC = () => {
    const dispatch = useAppDispatch();
    const addPersonMode = useAppSelector(selectAddPersonMode);
    const [person, setPerson] = useState(getNewPersonToAdd());
    return <>
        <form onSubmit={e => e.preventDefault()}>
            <div className={styles.row}>
                <button
                    onClick={() => dispatch(toggleAddPersonsMode())}
                >{addPersonMode ? "Cancel" : "Add new Person"}</button>

                <button
                    style={addPersonMode ? {} : { display: "none" }}
                    onClick={() => dispatch(addPerson(person))}
                >Create new person and add to local store</button>

                <span
                    style={addPersonMode ? {} : { display: "none" }}
                >All fields should be filled</span>
            </div>

            <div
            // style={addPersonMode ? {} : { display: "none" }}
            >
                {fields
                    .filter(f => f.id != "id")
                    .map(c => <PersonFieldInput
                        key={c.id}
                        person={person}
                        field={c}
                        setPerson={setPerson}
                    />)}
            </div>
        </form>
    </>
}