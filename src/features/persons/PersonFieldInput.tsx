import { clone, Person } from "./person";
import { Field } from "./fields";
import styles from './Persons.module.css';
import { testPersonToAdd as ph } from './person';
import { useState } from "react";

interface Props {
    person: Person,
    setPerson: (person: Person) => void,
    field: Field
}

export const PersonFieldInput: React.FC<Props> = ({
    person,
    setPerson,
    field
}) => {
    const [eS, setES] = useState(0);
    let error = field.validate(person).error;
    const onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = e => {
        const np = clone(person);
        field.setValueByStr(np, e.target.value);
        setPerson(np);
        error = field.validate(np).error;
        switch (eS) {
            case 0: setES(error ? 1 : 2); break
            case 1: error || setES(2); break
            case 2: error && setES(3); break
        }
    };
    const inputProps = {
        id: field.id,
        placeholder: field.valueString(ph),
        className: styles.recordFieldInput,
        value: field.valueString(person),
        onChange: onChange,
        onBlur: () => setES(3)
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
            style={eS === 3 ? {} : { display: "none" }}
            className={styles.recordFieldMessage}
        >{error}</label>
    </div>
}
