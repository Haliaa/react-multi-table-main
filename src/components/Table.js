import TableBody from "./TableBody";
import { TableHead } from "./TableHead";
import { useSortableTable } from "../useSortableTable";

const Table = ({ caption, data, columns }) => {
  const [tableData, handleSorting] = useSortableTable(data, columns);

  return (
    <div>
      <div>
        <table className="table">
          <caption>{caption}</caption>
          <TableHead
            {...{
              columns,
              handleSorting,
            }}
          />
          <TableBody {...{ columns, tableData }} />
        </table>
      </div>
    </div>
  );
};

export default Table;
