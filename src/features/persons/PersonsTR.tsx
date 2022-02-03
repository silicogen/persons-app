
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    selectIsSelectedPerson,
    toggleSelect
} from "./personsSlice";
import { columns } from "./columns";
import { Person } from "./person";

interface Props {
    person: Person;
}

export const PersonsTR: React.FC<Props> = ({ person }) => {
    const isSelectedPerson = useAppSelector(selectIsSelectedPerson(person.id));
    const dispatch = useAppDispatch();
    return <tr
        key={person.id}>
        {columns.map(c => <td
            onClick={() => { dispatch(toggleSelect(person.id)) }}
            key={c.id}
            style={isSelectedPerson ? { background: "lightgray" } : {}}
        > {c.valueStr(person)}</td>)}
    </tr>
}