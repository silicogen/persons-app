import { useDispatch } from "react-redux"
import { sortByColumn, selectOrderSymbol } from "./personsSlice"
import { Column } from "./columns"
import { useAppSelector } from "../../app/hooks";
interface Props {
    column: Column;
}

export const PersonsTH: React.FC<Props> = (
    { column }) => {
    const orderSymbol = useAppSelector(selectOrderSymbol(column.id));
    //код когда получаем dispatch а потом его используем в обработчике непохо бы обопзить, чтобы в компоненте мы не видели dispatch
    const dispatch = useDispatch();
    const orderClick: React.MouseEventHandler = () => {
        dispatch(sortByColumn(column))
    }
    return <th onClick={orderClick}>
        {`${column.title} ${orderSymbol}`}
    </th>
}
