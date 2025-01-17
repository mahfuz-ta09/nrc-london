import './Table.css'



interface Header{
  key:string;
  label:string;
}

interface Body{
  module: string;
  sections: number;
  questions?: number;
  duration: string;
  focus: string;
}

interface tableProps{
  header: Header[];
  body: Body[]
}

const Table:React.FC<tableProps> = ({header , body}) => {
  // body?.map(head=>console.log(head))
    return (
      <table>
          <thead>
            <tr>
              {
                header?.map(head=>(
                  <th key={head.key}>{head.label}</th>
                ))
              }
            </tr>
          </thead>
          <tbody>
              {
                body?.map(b=>(
                  <tr key={b.module}>
                    {
                      header?.map(val=>(
                        <td key={val?.key}>{b[val.key]}</td>
                      ))
                    }
                  </tr>
                ))
              }
          </tbody>
        </table>
    )
}

export default Table

{/* <table>
        <thead>
          <tr>
            {columns?.map((column,) => (
              <th key={column.key}>{column.label || column.key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns?.map((column) => (
                  <td key={column.key}>{row[column.key] ?? "--"}</td> 
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns?.length || 1}>{emptyPlaceholder}</td>
            </tr>
          )}
        </tbody>
      </table> */}