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
    //код когда получаем dispatch а потом его используем в обработчике непохо бы обопзить, чтобы в компоненте мы не видели dispatch
    const orderClick: React.MouseEventHandler = () => {
        sortByColumnMemoized(column.id)
    }
    return <th onClick={orderClick}>
        {`${column.title} ${orderSymbol}`}
    </th>
}
