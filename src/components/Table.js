import TableBody from "./TableBody";
import {TableHead} from "./TableHead";
import {useSortableTable} from "../useSortableTable";
import {DragDropContext} from "react-beautiful-dnd";
import {
    useState,
    useRef,
    // useEffect
} from "react";

const Table = ({caption, data, columns}) => {
    const [tableData, handleSorting] = useSortableTable(data, columns);

    const [users, setUsers] = useState([...data]);

    // const prevCountRef = useRef();
    // const [boolean, setBoolean] = useState();
    // useEffect(() => {
    //     prevCountRef.current = boolean;
    //
    //     if(prevCountRef.current==='true'){
    //
    //     }
    // }, [boolean]);

    const handleDragEnd = (result) => {
        const tempUser = users;
            const [selectedRow] = tempUser.splice(result.source.index, 1);
            tempUser.splice(result.destination.index, 0, selectedRow)
            setUsers(tempUser)
    };

    return (
        <div>
            <div>
                <table className="table">
                    <caption>{caption}</caption>
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <TableHead {...{
                            columns, handleSorting,
                            // setBoolean
                        }} />

                        <TableBody {...{columns, tableData}} />
                    </DragDropContext>
                </table>
            </div>
        </div>
    );
};

export default Table;
