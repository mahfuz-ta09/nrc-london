import './Table.css'

type Column = {
  key: string; 
  label?: string; 
};

type TableProps = {
  columns?: Column[];
  data: Record<string, any>[]; 
  emptyPlaceholder?: string; 
};

const Table: React.FC<TableProps> = ({ columns, data, emptyPlaceholder = "--" }) => {
        return (
            <table>
                <thead>
                    <tr>
                    {columns?.map((column, index) => (
                        <th key={index}>{column.label}</th>
                    ))}
                    </tr>
                </thead>
                <tbody>
                    {data?.length > 0 ? (
                    data?.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                        {columns?.map((column, colIndex) => (
                            <td key={colIndex}>{row[column?.key] ?? emptyPlaceholder}</td>
                        ))}
                        </tr>
                    ))
                    ) : (
                    <tr>
                        <td colSpan={columns?.length} style={{ textAlign: "center" }}>
                        No data available
                        </td>
                    </tr>
                    )}
                </tbody>
            </table>
        );
};

export default Table;
