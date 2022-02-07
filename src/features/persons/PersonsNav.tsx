import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
    selectPagesCount,
    prevPage,
    nextPage,
    selectAllowPrevPage,
    selectAllowNextPage,
    selectCurentPage,
    setItemsPerPage
} from './personsSlice';
import styles from './Persons.module.css';
const options = [10, 20, 30, 40, 50];

export const PersonsNav: React.FC = () => {
    const dispatch = useAppDispatch();
    const curentPage = useAppSelector(selectCurentPage)
    const pagesCount = useAppSelector(selectPagesCount);
    const allowPrevPage = useAppSelector(selectAllowPrevPage);
    const allowNextPage = useAppSelector(selectAllowNextPage);
    const onChangeItemsPerPage: React.ChangeEventHandler<HTMLSelectElement> =
        e => dispatch(setItemsPerPage(Number.parseInt(e.target.value)))
    return <>

        <div className={styles.row}>
            <button
                onClick={() => dispatch(prevPage())}
                disabled={!allowPrevPage}
            >Prev</button>
            <span className={styles.value}>{
                `page ${curentPage}/${pagesCount}`
            }</span>
            <button
                onClick={() => dispatch(nextPage())}
                disabled={!allowNextPage}
            >Next</button>
            <select
                onChange={onChangeItemsPerPage}
            >
                {options.map(o =>
                    <option value={o}>
                        {`${o} items per page`}
                    </option>)}
            </select>
        </div>

    </>

}