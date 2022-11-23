import {Draggable, Droppable} from "react-beautiful-dnd";

const TableBody = ({columns, tableData}) => {
    return (
        <Droppable droppableId="tbody">
            {(provided) => {
                return (
                    <tbody ref={provided.innerRef} {...provided.droppableProps}>
                    {tableData.map((data, index) => {
                        return (
                            <Draggable
                                draggableId={data.full_name}
                                index={index}
                                key={data.full_name}>
                                {(provided) => {
                                    return (
                                        <tr
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            key={data.id}>
                                            {columns.map(({accessor}) => {
                                                const index = tableData.indexOf(data)+1;
                                                const tData = data[accessor] ? data[accessor] : index;
                                                return <td {...provided.dragHandleProps} key={accessor}>{tData}</td>;
                                            })}
                                        </tr>
                                    )
                                }}
                            </Draggable>
                        );
                    })}
                    {provided.placeholder}
                    </tbody>
                )

            }
            }
        </Droppable>
    );
};

export default TableBody;
