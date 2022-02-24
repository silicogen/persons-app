

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

export const testPersonToAdd: Person = {
    id: 0,
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@yandex.ru",
    phone: "(123)456-7890",
    address: {
        streetAddress: "5471 Elementum Dr",
        city: "Moskow",
        state: "MN",
        zip: "61232",
    },
    description: "Just mr. Smith"
}

export const defaultPersonToAdd: Person = {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: {
        streetAddress: "",
        city: "",
        state: "",
        zip: "",
    },
    description: ""
}

export const clone = (person: Person): Person => ({
    ...person,
    address: {
        ...person.address
    }
})

export const getNewPersonToAdd = (): Person =>
    clone(defaultPersonToAdd);