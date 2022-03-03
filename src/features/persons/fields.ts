import { Person, testPersonToAdd } from "./person";

type Validate = (person: Person) => { error?: string, warning?: string };
export interface Field {
    id: string,
    compare: (p1: Person, p2: Person) => number,
    getValueAsString: (p: Person) => string,
    setValueByString: (p: Person, s: string) => void,
    title: string,
    validate: Validate
}

export interface FieldsMap {
    [key: string]: Field;
}

export const defaultComparier = (p1: Person, p2: Person) => p1.id - p2.id;

function getDefaultValidate(userFriendlyPattern: string, regExp: RegExp) {
    return function validate(this: Field, p: Person): ReturnType<Validate> {
        return regExp.test(this.getValueAsString(p)) ? {}
            : { error: `${this.title} should have form '${userFriendlyPattern}'. For example '${this.getValueAsString(testPersonToAdd)}'` };
    }
}

export const fieldsMap: FieldsMap = {
    id: {
        id: "id",
        compare: defaultComparier,
        title: "ID",
        getValueAsString: p => p.id.toString(),
        setValueByString(p, s) {
            p.id = Number.parseInt(s);
        },
        validate: p => ({})
    },

    firstName: {
        id: "firstName",
        compare: (p1, p2) =>
            p1.firstName.localeCompare(p2.firstName),
        title: "First name",
        getValueAsString: p => p.firstName,
        setValueByString(p, s) {
            p.firstName = s;
        },
        validate: getDefaultValidate("Aaaa", /^[A-Z][a-z]+$/)
    },

    lastName: {
        id: "lastName",
        compare: (p1, p2) =>
            p1.lastName.localeCompare(p2.lastName),
        title: "Last name",
        getValueAsString: p => p.lastName,
        setValueByString(p, s) {
            p.lastName = s;
        },
        validate: getDefaultValidate("Aaaa", /^[A-Z][a-z]+$/)
    },

    email: {
        id: "email",
        compare: (p1, p2) =>
            p1.email.localeCompare(p2.email),
        title: "Email",
        getValueAsString: p => p.email,
        setValueByString(p, s) {
            p.email = s;
        },
        validate: getDefaultValidate("aaa@aaa.aaa", /^[A-Za-z0-9._]+@[A-Za-z0-9._]+\.[A-Za-z0-9._]+$/)
    },

    phone: {
        id: "phone",
        compare: (p1, p2) =>
            p1.phone.localeCompare(p2.phone),
        title: "Phone",
        getValueAsString: p => p.phone,
        setValueByString(p, s) {
            p.phone = s;
        },
        validate: getDefaultValidate("(nnn)nnn-nnn", /^\(\d{3}\)\d{3}-\d{4}$/)
    },
    streetAddress: {
        id: "streetAddress",
        compare: (p1, p2) =>
            p1.address.streetAddress.localeCompare(p2.address.streetAddress),
        title: "Street address",
        getValueAsString: p => p.address.streetAddress,
        setValueByString(p, s) {
            p.address.streetAddress = s;
        },
        validate: getDefaultValidate("nnnn Name of Street", /^\d{4}/)
    },

    city: {
        id: "city",
        compare: (p1, p2) =>
            p1.address.city.localeCompare(p2.address.city),
        title: "City",
        getValueAsString: p => p.address.city,
        setValueByString(p, s) {
            p.address.city = s;
        },
        validate: getDefaultValidate("Aaaa", /^[A-Z][a-z]+$/)
    },

    state: {
        id: "state",
        compare: (p1, p2) =>
            p1.address.state.localeCompare(p2.address.state),
        title: "State",
        getValueAsString: p => p.address.state,
        setValueByString(p, s) {
            p.address.state = s;
        },
        validate: getDefaultValidate("AA", /^[A-Z]{2}$/)
    },

    zip: {
        id: "zip",
        compare: (p1, p2) =>
            p1.address.zip.localeCompare(p2.address.zip),
        title: "Zip",
        getValueAsString: p => p.address.zip,
        setValueByString(p, s) {
            p.address.zip = s;
        },
        validate: getDefaultValidate("nnnnn", /^\d{5}$/)
    },

    description: {
        id: "description",
        compare: (p1, p2) =>
            p1.description.localeCompare(p2.description),
        title: "Description",
        getValueAsString: p => p.description,
        setValueByString(p, s) {
            p.description = s;
        },
        validate: p => /^.{10,500}$/.test(p.description) ? {}
            : { error: "Description could have any form but at least 10 and not more than 500 characters. For example 'in lacus augue ante placerat consequat vestibulum'" }
    },
}

export const fields = Object.values(fieldsMap);