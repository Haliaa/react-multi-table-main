// import TableBody from "./TableBody";
// import TableHead from "./TableHead";
// import { useSortableTable } from "../useSortableTable";
//
// const Table = ({ caption, data, columns }) => {
//   const [tableData, handleSorting] = useSortableTable(data, columns);
//
//   return (
//     <>
//       <table className="table">
//         <caption>{caption}</caption>
//         <TableHead {...{ columns, handleSorting }} />
//         <TableBody {...{ columns, tableData }} />
//       </table>
//     </>
//   );
// };
//
// export default Table;

import TableBody from "./TableBody";
import TableHead from "./TableHead";
import {useSortableTable} from "../useSortableTable";
import {DragDropContext} from "react-beautiful-dnd";
import {useState} from "react";

const Table = ({caption, data, columns}) => {
    const [tableData, handleSorting] = useSortableTable(data, columns);
    const [users, setUsers] = useState(tableData);


    const handleDragEnd = (result) => {
        let tempUser = [...users];
        let [selectedRow] = tempUser.splice(result.source.index, 1);
        tempUser.splice(result.destination.index, 0, selectedRow)
        setUsers(tempUser)
        console.log(result, selectedRow)
    };
    return (
        <div>
            <table className="table">
                <caption>{caption}</caption>
                <DragDropContext onDragEnd={handleDragEnd}>
                    <TableHead {...{columns, handleSorting}} />

                    <TableBody {...{columns, tableData: users}} />
                </DragDropContext>
            </table>
        </div>
    );
};

export default Table;
