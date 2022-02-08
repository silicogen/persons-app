import { Person } from "./person";

export interface Column {
    id: string;
    compare: (p1: Person, p2: Person) => number;
    valueString: (p: Person) => string;
    setValueByStr: (p: Person, s: string) => void;
    title: string;
}

export interface Columns {
    [key: string]: Column;
}

export const defaultComparier = (p1: Person, p2: Person) =>
    p1.id - p2.id;

export const columnsMap: Columns = {
    id: {
        id: "id",
        compare: defaultComparier,
        title: "ID",
        valueString: (p: Person) => p.id.toString(),
        setValueByStr(p: Person, s: string) {
            p.id = Number.parseInt(s);
        }
    },

    firstName: {
        id: "firstName",
        compare: (p1: Person, p2: Person) =>
            p1.firstName.localeCompare(p2.firstName),
        title: "First name",
        valueString: (p: Person) => p.firstName,
        setValueByStr(p: Person, s: string) {
            p.firstName = s;
        }
    },

    lastName: {
        id: "lastName",
        compare: (p1: Person, p2: Person) =>
            p1.lastName.localeCompare(p2.lastName),
        title: "Last name",
        valueString: (p: Person) => p.lastName,
        setValueByStr(p: Person, s: string) {
            p.lastName = s;
        }
    },

    email: {
        id: "email",
        compare: (p1: Person, p2: Person) =>
            p1.email.localeCompare(p2.email),
        title: "Email",
        valueString: (p: Person) => p.email,
        setValueByStr(p: Person, s: string) {
            p.email = s;
        }
    },

    phone: {
        id: "phone",
        compare: (p1: Person, p2: Person) =>
            p1.phone.localeCompare(p2.phone),
        title: "Phone",
        valueString: (p: Person) => p.phone,
        setValueByStr(p: Person, s: string) {
            p.phone = s;
        }
    },

    streetAddress: {
        id: "streetAddress",
        compare: (p1: Person, p2: Person) =>
            p1.address.streetAddress.localeCompare(p2.address.streetAddress),
        title: "Street address",
        valueString: (p: Person) => p.address.streetAddress,
        setValueByStr(p: Person, s: string) {
            p.address.streetAddress = s;
        }
    },

    city: {
        id: "city",
        compare: (p1: Person, p2: Person) =>
            p1.address.city.localeCompare(p2.address.city),
        title: "City",
        valueString: (p: Person) => p.address.city,
        setValueByStr(p: Person, s: string) {
            p.address.city = s;
        }
    },

    state: {
        id: "state",
        compare: (p1: Person, p2: Person) =>
            p1.address.state.localeCompare(p2.address.state),
        title: "State",
        valueString: (p: Person) => p.address.state,
        setValueByStr(p: Person, s: string) {
            p.address.state = s;
        }
    },

    zip: {
        id: "zip",
        compare: (p1: Person, p2: Person) =>
            p1.address.zip.localeCompare(p2.address.zip),
        title: "Zip",
        valueString: (p: Person) => p.address.zip,
        setValueByStr(p: Person, s: string) {
            p.address.zip = s;
        }
    },

    description: {
        id: "description",
        compare: (p1: Person, p2: Person) =>
            p1.description.localeCompare(p2.description),
        title: "Description",
        valueString: (p: Person) => p.description,
        setValueByStr(p: Person, s: string) {
            p.description = s;
        }
    },
}

export const columns = Object.values(columnsMap);