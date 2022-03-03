import { clone, Person } from "./person";
import { Field } from "./fields";
import styles from './Persons.module.css';
import { testPersonToAdd as ph } from './person';
import { useState } from "react";

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
    const [isChanged, setChanged] = useState(false);
    const [eS, setES] = useState(0);
    let error = field.validate(person).error;
    const onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = e => {
        setPerson((p: Person) => {
            const p1 = clone(p);
            field.setValueByStr(p1, e.target.value);
            return p1;
        })
        error = field.validate(person).error;
        // setChanged(true);
        if (eS === 0) {
            if (error) {
                setES(1);
            } else {
                setES(2);
            }
        } else if (eS === 1) {
            if (!error) {
                setES(2);
            }
        } else if (eS === 2) {
            if (error) {
                setES(3);
            }
        }



    };
    const inputProps
        : React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>
        & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
        = {
        id: field.id,
        placeholder: field.valueString(ph),
        className: styles.recordFieldInput,
        value: field.valueString(person),
        onChange: onChange,
        onBlur: () => {
            setChanged(true)
        }
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
