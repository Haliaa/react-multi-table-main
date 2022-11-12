import Table from "./components/Table";
import tableData1 from "./tableData1.json";
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'
import {v4 as uuid} from 'uuid';
import React, {useState} from "react";

const itemsFromBackend = [
    {
        id: uuid(),
        full_name: "Wendall Gripton",
        email: "wg@creative.org",
        gender: "Male",
        age: 100,
        start_date: "2022-01-26"
    },
    {
        id: uuid(),
        full_name: "Ole Rogge",
        email: "orog@usatoday.com",
        gender: "Male",
        age: 50,
        start_date: "2021-06-23"
    },
    {
        id: uuid(),
        full_name: "Elwin Huyge",
        email: null,
        gender: "Male",
        age: 34,
        start_date: "2021-06-07"
    },
    {
        id: uuid(),
        full_name: "Anthe Maybery",
        email: "amay@dyndns.org",
        gender: "Female",
        age: 31,
        start_date: "2021-07-05"
    },
    {
        id: uuid(),
        full_name: "Arny Amerighi",
        email: "aameri@ibm.com",
        gender: "Male",
        age: 35,
        start_date: "2021-03-09"
    },
    {
        id: uuid(),
        full_name: "Lynnell Shimmans",
        email: "lshimmans6@addthis.com",
        gender: "Male",
        age: null,
        start_date: "2021-06-03"
    },
    {
        id: uuid(),
        full_name: "Pierre Klug",
        email: "pklug7@virginia.edu",
        ender: "Female",
        age: 36,
        start_date: "2021-09-19"
    },
    {
        id: uuid(),
        full_name: "Melantha Jakeway",
        email: "mjakeway8@noaa.gov",
        gender: "Female",
        age: 48,
        start_date: "2021-01-07"
    },
    {
        id: uuid(),
        full_name: "Jodi Nickless",
        email: "jnickless9@dagon.com",
        gender: "Male",
        age: 36,
        start_date: "2021-02-05"
    }
]

// const columns = [
//     {label: "Number", accessor: "number", sortable: false},
//     {label: "Full Name", accessor: "full_name", sortable: true},
//     {label: "Email", accessor: "email", sortable: false},
//     {label: "Gender", accessor: "gender", sortable: true, sortbyOrder: "desc"},
//     {label: "Age", accessor: "age", sortable: true},
//     {label: "Start date", accessor: "start_date", sortable: true},
// ];

const columnsFromBackend = {
    [uuid()]: {
        name: "Users",
        items: itemsFromBackend
    }
};
const columnS = [
  { label: "Full Name", accessor: "full_name", sortable: true },
  { label: "Email", accessor: "email", sortable: false },
  { label: "Gender", accessor: "gender", sortable: true, sortbyOrder: "desc" },
  { label: "Age", accessor: "age", sortable: true },
  { label: "Start date", accessor: "start_date", sortable: true },
];

const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const {source, destination} = result;

    if (source.droppableId !== destination.droppableId) {
        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...sourceColumn,
                items: sourceItems
            },
            [destination.droppableId]: {
                ...destColumn,
                items: destItems
            }
        });
    } else {
        const column = columns[source.droppableId];
        const copiedItems = [...column.items];
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...column,
                items: copiedItems
            }
        });
    }
};


function App() {
    const [columns, setColumns] = useState(columnsFromBackend);
    return (
        <div>
            <div>
                <Table
                    caption="Program that keeps track of an ordered, numbered list of names"
                    data={tableData1}
                    columns={columnS}
                />
                <br/>
            </div>
            <div style={{display: "flex", justifyContent: "center", height: "100%"}}>
                <DragDropContext
                    onDragEnd={result => onDragEnd(result, columns, setColumns)}
                >
                    {Object.entries(columns).map(([columnId, column], index) => {
                        return (
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center"
                                }}
                                key={columnId}
                            >
                                <h2>{column.name}</h2>
                                <div style={{margin: 8}}>
                                    <Droppable droppableId={columnId} key={columnId}>
                                        {(provided, snapshot) => {
                                            return (
                                                <div
                                                    {...provided.droppableProps}
                                                    ref={provided.innerRef}
                                                    style={{
                                                        background: snapshot.isDraggingOver
                                                            ? "Gainsboro"
                                                            : "LightGrey",
                                                        padding: 4,
                                                        width: 250,
                                                        minHeight: 500
                                                    }}
                                                >
                                                    {column.items.map((item, index) => {
                                                        return (
                                                            <Draggable
                                                                key={item.id}
                                                                draggableId={item.id}
                                                                index={index}
                                                            >
                                                                {(provided, snapshot) => {
                                                                    return (
                                                                        <div
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}
                                                                            style={{
                                                                                userSelect: "none",
                                                                                padding: 16,
                                                                                margin: "0 0 8px 0",
                                                                                minHeight: "50px",
                                                                                backgroundColor: snapshot.isDragging
                                                                                    ? "Silver"
                                                                                    : "DimGray",
                                                                                color: "white",
                                                                                ...provided.draggableProps.style
                                                                            }}
                                                                        >
                                                                            {item.full_name}
                                                                        </div>
                                                                    );
                                                                }}
                                                            </Draggable>
                                                        );
                                                    })}
                                                    {provided.placeholder}
                                                </div>
                                            );
                                        }}
                                    </Droppable>
                                </div>
                            </div>
                        );
                    })}
                </DragDropContext>
            </div>
        </div>
    );
}

export default App;
