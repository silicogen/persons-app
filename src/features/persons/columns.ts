import { Person } from "./person";

export interface Column {
    id: string;
    compare: (p1: Person, p2: Person) => number;
    valueStr: (p: Person) => string;
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
        valueStr: (p: Person) => p.id.toString(),
    },

    firstName: {
        id: "firstName",
        compare: (p1: Person, p2: Person) =>
            p1.firstName.localeCompare(p2.firstName),
        title: "First name",
        valueStr: (p: Person) => p.firstName,
    },

    lastName: {
        id: "lastName",
        compare: (p1: Person, p2: Person) =>
            p1.lastName.localeCompare(p2.lastName),
        title: "Last name",
        valueStr: (p: Person) => p.lastName,
    },

    email: {
        id: "email",
        compare: (p1: Person, p2: Person) =>
            p1.email.localeCompare(p2.email),
        title: "Email",
        valueStr: (p: Person) => p.email,
    },

    phone: {
        id: "phone",
        compare: (p1: Person, p2: Person) =>
            p1.phone.localeCompare(p2.phone),
        title: "Phone",
        valueStr: (p: Person) => p.phone,
    },

    streetAddress: {
        id: "streetAddress",
        compare: (p1: Person, p2: Person) =>
            p1.address.streetAddress.localeCompare(p2.address.streetAddress),
        title: "Street address",
        valueStr: (p: Person) => p.address.streetAddress,
    },

    city: {
        id: "city",
        compare: (p1: Person, p2: Person) =>
            p1.address.city.localeCompare(p2.address.city),
        title: "City",
        valueStr: (p: Person) => p.address.city,
    },

    state: {
        id: "state",
        compare: (p1: Person, p2: Person) =>
            p1.address.state.localeCompare(p2.address.state),
        title: "State",
        valueStr: (p: Person) => p.address.state,
    },

    zip: {
        id: "zip",
        compare: (p1: Person, p2: Person) =>
            p1.address.zip.localeCompare(p2.address.zip),
        title: "Sip",
        valueStr: (p: Person) => p.address.zip,
    },

    description: {
        id: "description",
        compare: (p1: Person, p2: Person) =>
            p1.description.localeCompare(p2.description),
        title: "Description",
        valueStr: (p: Person) => p.description,
    },
}

export const columns = Object.values(columnsMap);