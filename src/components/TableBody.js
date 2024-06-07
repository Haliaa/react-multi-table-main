import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const TableBody = ({ columns, tableData: initialTableData }) => {
  const [tableData, setTableData] = useState(initialTableData);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = [...tableData];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTableData(items);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="tbody">
        {(provided) => (
          <tbody ref={provided.innerRef} {...provided.droppableProps}>
            {tableData.map((data, index) => (
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
                    {columns.map(({ accessor }) => (
                      <td key={accessor}>{data[accessor]}</td>
                    ))}
                  </tr>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </tbody>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TableBody;
