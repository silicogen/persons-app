import { Person } from "./person";
export interface Field {
    id: string,
    compare: (p1: Person, p2: Person) => number,
    valueString: (p: Person) => string,
    setValueByStr: (p: Person, s: string) => void,
    title: string,
    validate: (person: Person) => { error?: string, warning?: string }
}

export interface FieldsMap {
    [key: string]: Field;


}

export const defaultComparier = (p1: Person, p2: Person) =>
    p1.id - p2.id;

export const fieldsMap: FieldsMap = {
    id: {
        id: "id",
        compare: defaultComparier,
        title: "ID",
        valueString: p => p.id.toString(),
        setValueByStr(p, s) {
            p.id = Number.parseInt(s);
        },
        validate: p => ({})
    },

    firstName: {
        id: "firstName",
        compare: (p1, p2) =>
            p1.firstName.localeCompare(p2.firstName),
        title: "First name",
        valueString: p => p.firstName,
        setValueByStr(p, s) {
            p.firstName = s;
        },
        validate: p => /^[A-Z][a-z]+$/.test(p.firstName) ? {}
            : { error: "Last name should have form 'Aaaa...'. For example 'John'" }
    },

    lastName: {
        id: "lastName",
        compare: (p1, p2) =>
            p1.lastName.localeCompare(p2.lastName),
        title: "Last name",
        valueString: p => p.lastName,
        setValueByStr(p, s) {
            p.lastName = s;
        },
        validate: p => /^[A-Z][a-z]+$/.test(p.lastName) ? {}
            : { error: "Last name should have form 'Aaaa...'. For example 'Smith'" }
    },

    email: {
        id: "email",
        compare: (p1, p2) =>
            p1.email.localeCompare(p2.email),
        title: "Email",
        valueString: p => p.email,
        setValueByStr(p, s) {
            p.email = s;
        },
        validate: p => /^.+@.+\..+$/.test(p.email) ? {}
            : { error: "Email should have form 'aaa@aaa.aaa'. For example 'john.smith@mail.ru'" }
    },

    phone: {
        id: "phone",
        compare: (p1, p2) =>
            p1.phone.localeCompare(p2.phone),
        title: "Phone",
        valueString: p => p.phone,
        setValueByStr(p, s) {
            p.phone = s;
        },
        validate: p => /^\(\d{3}\)\d{3}-\d{4}$/.test(p.phone) ? {}
            : { error: "Phone should have form '(nnn)nnn-nnn'. For example '(123)456-7890'" }
    },

    streetAddress: {
        id: "streetAddress",
        compare: (p1, p2) =>
            p1.address.streetAddress.localeCompare(p2.address.streetAddress),
        title: "Street address",
        valueString: p => p.address.streetAddress,
        setValueByStr(p, s) {
            p.address.streetAddress = s;
        },
        validate: p => /^\d{4}/.test(p.address.streetAddress) ? {}
            : { error: "Street address should have form 'nnnn Name of Street'. For example '5471 Elementum Dr'" }
    },

    city: {
        id: "city",
        compare: (p1, p2) =>
            p1.address.city.localeCompare(p2.address.city),
        title: "City",
        valueString: p => p.address.city,
        setValueByStr(p, s) {
            p.address.city = s;
        },
        validate: p => /^[A-Z][a-z]+$/.test(p.address.city) ? {}
            : { error: "City should have form 'Aaaa...'. For example 'Moskow'" }
    },

    state: {
        id: "state",
        compare: (p1, p2) =>
            p1.address.state.localeCompare(p2.address.state),
        title: "State",
        valueString: p => p.address.state,
        setValueByStr(p, s) {
            p.address.state = s;
        },
        validate: p => /^[A-Z]{2}$/.test(p.address.state) ? {}
            : { error: "State should have form 'AA'. For example 'MN'" }
    },

    zip: {
        id: "zip",
        compare: (p1, p2) =>
            p1.address.zip.localeCompare(p2.address.zip),
        title: "Zip",
        valueString: p => p.address.zip,
        setValueByStr(p, s) {
            p.address.zip = s;
        },
        validate: p => /^\d{5}$/.test(p.address.zip) ? {}
            : { error: "zip should have form 'nnnnn'. For example '20548'" }
    },

    description: {
        id: "description",
        compare: (p1, p2) =>
            p1.description.localeCompare(p2.description),
        title: "Description",
        valueString: p => p.description,
        setValueByStr(p, s) {
            p.description = s;
        },
        validate: p => /^.{10,500}$/.test(p.description) ? {}
            : { error: "Description could have any form but at least 10 and not more than 500 characters. For example 'in lacus augue ante placerat consequat vestibulum'" }
    },
}

export const fields = Object.values(fieldsMap);