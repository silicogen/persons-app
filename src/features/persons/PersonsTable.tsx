
import { useAppSelector } from "../../app/hooks";
import {
    selectVisiblePersons
} from "./personsSlice";
import { PersonsTH } from "./PersonsTH";
import styles from "./Persons.module.css"
import { columns } from "./columns";

export const PersonsTable: React.FC = () => {
    const persons = useAppSelector(selectVisiblePersons);
    return <>
        <table className={styles.table}>
            <thead>
                <tr>
                    {columns.map(c => <PersonsTH key={c.id} column={c} />)}
                </tr>
            </thead>
            <tbody>
                {persons.map(p => <tr
                    key={p.id}>
                    {columns.map(c => <td key={c.id}> {c.valueStr(p)}</td>)}
                </tr>)}
            </tbody>
        </table>
    </>
}