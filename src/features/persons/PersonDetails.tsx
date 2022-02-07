import { useAppSelector } from "../../app/hooks";
import {
    selectSelectedPerson
} from "./personsSlice";
import styles from './Persons.module.css';

export const PersonDetails: React.FC = () => {
    const person = useAppSelector(selectSelectedPerson);
    if (person === undefined)
        return <div key="selectedPersonDiv">
        </div>;
    return <>
        <div>
            Выделенный субъект:
        </div>
        <div
            className={styles.details}
            key="selectedPersonDiv"
        >
            Описание:
            <textarea value={person.description}/>
            Адрес проживания:
            <b>{person.address.streetAddress}</b>
            Город: <b>{person.address.city}</b>
            Провинция/штат: <b>{person.address.state}</b>
            Индекс: <b>{person.address.zip}</b>
        </div>
    </>
}