import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
    selectPagesCount,
    prevPage,
    nextPage,
    selectAllowPrevPage,
    selectAllowNextPage,
    selectCurentPage
} from './personsSlice';
import styles from './Persons.module.css';


export const PersonsNav: React.FC = () => {
    const dispatch = useAppDispatch();
    const curentPage = useAppSelector(selectCurentPage)
    const pagesCount = useAppSelector(selectPagesCount);
    const allowPrevPage = useAppSelector(selectAllowPrevPage);
    const allowNextPage = useAppSelector(selectAllowNextPage);
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
        </div>

    </>

}