import { useSortableTable } from "../useSortableTable";
import { Draggable, Droppable, DragDropContext } from "react-beautiful-dnd";
import { useState } from "react";

const Table = ({ caption, data, columns }) => {
  const [tableData] = useSortableTable(data, columns);
  const [users, setUsers] = useState([...tableData]);
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");
  const arrIsSortedBoolean = [];

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const tempUsers = [...users];
    const [selectedRow] = tempUsers.splice(result.source.index, 1);
    tempUsers.splice(result.destination.index, 0, selectedRow);
    setUsers(tempUsers);
  };

  const handleSorting = (sortField, sortOrder) => {
    if (sortField) {
      const sortedTable = [...tableData].sort((a, b) => {
        if (a[sortField] === null) return 1;
        if (b[sortField] === null) return -1;
        if (a[sortField] === null && b[sortField] === null) return 0;
        return (
          a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
            numeric: true,
          }) * (sortOrder === "asc" ? 1 : -1)
        );
      });
      setUsers(sortedTable);
    }
  };

  const handleSortingChange = (accessor) => {
    const sortOrder =
      accessor === sortField && order === "asc" ? "desc" : "asc";
    setSortField(accessor);
    setOrder(sortOrder);
    handleSorting(accessor, sortOrder);
  };
  return (
    <div>
      <div>
        <table className="table">
          <caption>{caption}</caption>
          <thead>
            <tr>
              {columns.map(({ label, accessor, sortable }) => {
                const cl = sortable
                  ? sortField === accessor && order === "asc"
                    ? "up"
                    : sortField === accessor && order === "desc"
                    ? "down"
                    : "default"
                  : "";
                const isDataSorted =
                  (sortField === accessor && order === "asc") ||
                  (sortField === accessor && order === "desc");
                arrIsSortedBoolean.push(isDataSorted);

                return (
                  <th
                    key={accessor}
                    onClick={
                      sortable ? () => handleSortingChange(accessor) : null
                    }
                    className={cl}
                  >
                    {label}
                  </th>
                );
              })}
            </tr>
          </thead>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="tbody">
              {(provided) => (
                <tbody ref={provided.innerRef} {...provided.droppableProps}>
                  {users.map((data, index) => (
                    <Draggable
                      draggableId={data.full_name}
                      index={index}
                      key={data.full_name}
                    >
                      {(provided) => (
                        <tr
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          key={data.id}
                        >
                          {columns.map(({ accessor }) => {
                            const tData = data[accessor]
                              ? data[accessor]
                              : index + 1;
                            return <td key={accessor}>{tData}</td>;
                          })}
                        </tr>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </tbody>
              )}
            </Droppable>
          </DragDropContext>
        </table>
      </div>
    </div>
  );
};

export default Table;
