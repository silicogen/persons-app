

export interface Address {
    streetAddress: string,
    city: string,
    state: string,
    zip: string,
}

export interface Person {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    address: Address,
    description: string
}

export interface Column {
    compare: (p1: Person, p2: Person) => number;
    value: (p: Person) => string;
    title: string;
}

export interface Columns {
    [key: string]: Column;
}

export const columnsMap: Columns = {
    id: {
        compare: (p1: Person, p2: Person) =>
            p1.id - p2.id,
        title: "ID",
        value: (p: Person) => p.id.toString(),
    },

    firstName: {
        compare: (p1: Person, p2: Person) =>
            p1.firstName.localeCompare(p2.firstName),
        title: "First name",
        value: (p: Person) => p.firstName,
    },

    lastName: {
        compare: (p1: Person, p2: Person) =>
            p1.lastName.localeCompare(p2.lastName),
        title: "Last name",
        value: (p: Person) => p.lastName,
    },

    email: {
        compare: (p1: Person, p2: Person) =>
            p1.email.localeCompare(p2.email),
        title: "Email",
        value: (p: Person) => p.email,
    },

    phone: {
        compare: (p1: Person, p2: Person) =>
            p1.phone.localeCompare(p2.phone),
        title: "Phone",
        value: (p: Person) => p.phone,
    },

    streetAddress: {
        compare: (p1: Person, p2: Person) =>
            p1.address.streetAddress.localeCompare(p2.address.streetAddress),
        title: "Street address",
        value: (p: Person) => p.address.streetAddress,
    },

    city: {
        compare: (p1: Person, p2: Person) =>
            p1.address.city.localeCompare(p2.address.city),
        title: "City",
        value: (p: Person) => p.address.city,
    },

    state: {
        compare: (p1: Person, p2: Person) =>
            p1.address.state.localeCompare(p2.address.state),
        title: "State",
        value: (p: Person) => p.address.state,
    },

    zip: {
        compare: (p1: Person, p2: Person) =>
            p1.address.zip.localeCompare(p2.address.zip),
        title: "Sip",
        value: (p: Person) => p.address.zip,
    },

    description: {
        compare: (p1: Person, p2: Person) =>
            p1.description.localeCompare(p2.description),
        title: "Description",
        value: (p: Person) => p.description,
    },
}

export type ColumnKey = keyof Columns;

export const columns = Object.values(columnsMap);