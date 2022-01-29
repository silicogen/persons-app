interface Props {
    columnName: string;
}

export const PersonsTH: React.FC<Props> = (
    { columnName }) => {
    const orderClick: React.MouseEventHandler = () => { }
    return <th
        onClick={orderClick}
    >
        {columnName}
    </th>
}