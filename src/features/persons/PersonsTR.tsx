
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    selectIsSelectedPerson,
    toggleSelect
} from "./personsSlice";
import { fields } from "./fields";
import { Person } from "./person";

interface Props {
    person: Person;
}

export const PersonsTR: React.FC<Props> = ({ person }) => {
    const isSelectedPerson = useAppSelector(selectIsSelectedPerson(person.id));
    const dispatch = useAppDispatch();
    return <tr>
        {fields.map(c => <td
            onClick={() => { dispatch(toggleSelect(person.id)) }}
            key={c.id}
            style={isSelectedPerson ? { background: "lightgray" } : {}}
        > {c.valueString(person)}</td>)}
    </tr>
}