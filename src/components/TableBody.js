const TableBody = ({ tableData, columns }) => {
  return (
    <tbody>
      {tableData.map((data) => {
        return (
          <tr key={data.id}>
            {columns.map(({ accessor }) => {
              const index = tableData.indexOf(data);
              const tData = data[accessor] ? data[accessor] : index;
              return <td key={accessor}>{tData}</td>;
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
