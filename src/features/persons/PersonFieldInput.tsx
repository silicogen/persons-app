import { clone, Person } from "./person";
import { Field } from "./fields";

interface Props {
    person: Person,
    field: Field,
    setPerson: (modifier: (person: Person) => Person) => void
}

export const PersonFieldInput: React.FC<Props> = ({
    person,
    field,
    setPerson
}) => {
    return <>
        <label
        >{field.title}</label>
        {field.id === "description"
            ? <textarea
                defaultValue={field.valueString(person)} />
            : <input
                defaultValue={field.valueString(person)}
                onChange={ev => {
                    setPerson((p: Person) => {
                        const p1 = clone(p);
                        field.setValueByStr(p1, ev.target.value);
                        return p1;
                    })
                }}
            />
        }
    </>
}