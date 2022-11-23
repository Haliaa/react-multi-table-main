import {useState} from "react";

export const TableHead = ({columns, handleSorting,
                              // setBoolean
}) => {
    const [sortField, setSortField] = useState("");
    const [order, setOrder] = useState("asc");

    const handleSortingChange = (accessor) => {
        const sortOrder =
            accessor === sortField && order === "asc" ? "desc" : "asc";
        setSortField(accessor);
        setOrder(sortOrder);
        handleSorting(accessor, sortOrder);
    };
    const arrIsSortedBoolean =[];
    return (
        <thead>
        <tr>
            {columns.map(({label, accessor, sortable}) => {
                const cl = sortable
                    ? sortField === accessor && order === "asc"
                        ? "up"
                        : sortField === accessor && order === "desc"
                            ? "down"
                            : "default"
                    : "";
                const isDataSorted = (sortField === accessor && order === "asc") || (sortField === accessor && order === "desc")
                  arrIsSortedBoolean.push(isDataSorted)
                 // setBoolean(arrIsSortedBoolean.every(element => element === false))

                return (
                    <th
                        key={accessor}
                        onClick={sortable ? () => handleSortingChange(accessor) : null}
                        className={cl}
                    >
                        {label}
                    </th>
                );
            })}
        </tr>
        </thead>
    );
};

