
import { useAppSelector } from "../../app/hooks";
import {
    selectPersonsIds,
    selectPersonsEntities
} from "./personsSlice";
import { PersonsTH } from "./PersonsTH";
import styles from "./Persons.module.css"

export const PersonsTable: React.FC = () => {
    const personsIds = useAppSelector(selectPersonsIds);
    const personsEntities = useAppSelector(selectPersonsEntities);
    return <>
        <table className={styles.table}>
            <thead>
                <tr>
                    {/* <th >_id</th> */}
                    <PersonsTH columnName="id" />
                    <PersonsTH columnName="firstName" />
                    <PersonsTH columnName="lastName" />
                    <PersonsTH columnName="email" />
                    <PersonsTH columnName="phone" />
                    <PersonsTH columnName="streetAddress" />
                    <PersonsTH columnName="city" />
                    <PersonsTH columnName="state" />
                    <PersonsTH columnName="zip" />
                    <PersonsTH columnName="description" />
                </tr>
            </thead>
            <tbody>{

                personsIds.map(id => {
                    const r = personsEntities[id]!;
                    return <tr
                        key={r.id}
                    // onClick={() => persons.toggleSelect(r)}
                    //     style={persons.isSelected(r) ? { background: "lightgray" } : {}
                    // }
                    >
                        {/* <td> {r._id}</td> */}
                        <td> {r.id}</td>
                        <td> {r.firstName}</td>
                        <td> {r.lastName}</td>
                        <td> {r.email}</td>
                        <td> {r.phone}</td>
                        <td> {r.address.streetAddress}</td>
                        <td> {r.address.city}</td>
                        <td> {r.address.state}</td>
                        <td> {r.address.zip}</td>
                        <td> {r.description}</td>
                    </tr>
                })}
            </tbody>
        </table>
    </>
}