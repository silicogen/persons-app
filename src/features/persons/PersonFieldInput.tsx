import { clone, Person } from "./person";
import { Field } from "./fields";
import styles from './Persons.module.css';
import { testPersonToAdd as ph } from './person';

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
    const error = field.validate(person).error;
    const onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = e => {
        setPerson((p: Person) => {
            const p1 = clone(p);
            field.setValueByStr(p1, e.target.value);
            return p1;
        })
    };
    const inputProps = {
        id: field.id,
        placeholder: field.valueString(ph),
        className: styles.recordFieldInput,
        value: field.valueString(person),
        onChange: onChange,
    }

    return <div
        className={styles.recordField}
    >
        <label
            className={styles.recordFieldLabel}
            htmlFor={field.id}
        >{field.title}</label>
        {field.id === "description"
            ? <textarea {...inputProps} />
            : <input {...inputProps} />
        }
        <label
            style={error ? {} : { display: "none" }}
            className={styles.recordFieldMessage}
        >{error}</label>
    </div>
}
