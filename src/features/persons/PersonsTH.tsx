import { sortByField, selectOrderSymbol } from "./personsSlice"
import { Field } from "./fields"
import { useActionProducer, useAppSelector } from "../../app/hooks";
interface Props {
    field: Field;
}

export const PersonsTH: React.FC<Props> = (
    { field }) => {
    const orderSymbol = useAppSelector(selectOrderSymbol(field.id));
    const sortByFieldMemoized = useActionProducer(sortByField);
    const orderClick: React.MouseEventHandler = () => {
        sortByFieldMemoized(field.id)
    }
    return <th onClick={orderClick}>
        {`${field.title} ${orderSymbol}`}
    </th>
}
