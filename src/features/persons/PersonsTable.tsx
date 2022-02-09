
import { useAppSelector } from "../../app/hooks";
import {
    selectVisiblePersons
} from "./personsSlice";
import { PersonsTH } from "./PersonsTH";
import styles from "./Persons.module.css"
import { fields } from "./fields";
import { PersonsTR } from "./PersonsTR";

export const PersonsTable: React.FC = () => {
    const persons = useAppSelector(selectVisiblePersons);
    return <>
        <table className={styles.table}>
            <thead>
                <tr>
                    {fields.map(c => <PersonsTH key={c.id} field={c} />)}
                </tr>
            </thead>
            <tbody>
                {persons.map(p => <PersonsTR key={p.id} person={p} />)}
            </tbody>
        </table>
    </>
}