import { useDispatch } from "react-redux"
import { sortByColumn } from "./personsSlice"
interface Props {
    columnName: string;
}

export const PersonsTH: React.FC<Props> = (
    { columnName }) => {
    const dispatch = useDispatch();
    const orderClick: React.MouseEventHandler = () => {
        dispatch(sortByColumn(columnName))
    }
    return <th
        onClick={orderClick}
    >
        {columnName}
    </th>
}