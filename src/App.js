import React from "react";

import Table from "./components/Table";
import tableData from "./tableData.json";

const columns = [
    {label: "№", accessor: "number", sortable: false},
    {label: "Full Name", accessor: "full_name", sortable: true},
    {label: "Email", accessor: "email", sortable: false},
    {label: "Gender", accessor: "gender", sortable: true, sortbyOrder: "desc"},
    {label: "Age", accessor: "age", sortable: true},
    {label: "Start date", accessor: "start_date", sortable: true},
];

function App() {
    return (
        <div>
            <Table
                caption="Program that keeps track of an ordered, numbered list of names"
                data={tableData}
                columns={columns}
            />
        </div>
    );
}

export default App;
