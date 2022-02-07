import { sortByColumn, selectOrderSymbol } from "./personsSlice"
import { Column } from "./columns"
import { useActionProducer, useAppSelector } from "../../app/hooks";
interface Props {
    column: Column;
}

export const PersonsTH: React.FC<Props> = (
    { column }) => {
    const orderSymbol = useAppSelector(selectOrderSymbol(column.id));
    const sortByColumnMemoized = useActionProducer(sortByColumn);
    const orderClick: React.MouseEventHandler = () => {
        sortByColumnMemoized(column.id)
    }
    return <th onClick={orderClick}>
        {`${column.title} ${orderSymbol}`}
    </th>
}
