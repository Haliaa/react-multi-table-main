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
    const [finalTableData, setFinalTableData]  = useState(tableData);

// function handleDragEnd (e) {
//     if (!e.destination) return;
//     let tempData = Array.from(finalTableData);
//     let [source_data] = tempData.splice(e.source.index, 1);
//     tempData.splice(e.destination.index, 0, source_data);
//     setFinalTableData(tempData);
//   }

function handleDragEnd (e) {
    if (!e.destination) return;
    let tempData = Array.from(finalTableData);
    let [source_data] = tempData.splice(e.source.index, 1);
    tempData.splice(e.destination.index, 0, source_data);
    setFinalTableData(tempData);
  }

    return (
        <div>
            <DragDropContext onDragEnd={handleDragEnd}>
                <table className="table">
                    <caption>{caption}</caption>
                    <DragDropContext>
                        <TableHead {...{columns, handleSorting}} />

                        <TableBody {...{columns, tableData:finalTableData}} />
                    </DragDropContext>
                </table>
            </DragDropContext>
            </div>
    );
};

export default Table;
