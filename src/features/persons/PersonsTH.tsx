import { useDispatch } from "react-redux"
import { sortByColumn } from "./personsSlice"
import { Column } from "./person"
interface Props {
    column: Column;
}

export const PersonsTH: React.FC<Props> = (
    { column }) => {
    const dispatch = useDispatch();
    const orderClick: React.MouseEventHandler = () => {
        dispatch(sortByColumn(column))
    }
    return <th onClick={orderClick}>
        {column.title}
    </th>
}