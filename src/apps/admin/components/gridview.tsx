import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "components/ui/table";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";
import { Button } from "components/ui/button";

interface Column {
  header: string;
  accessor: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface GridViewProps {
  data: any[];
  columns: Column[];
}

export function GridView({ data, columns }: GridViewProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column.accessor}>{column.header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {columns.map((column) => (
              <TableCell key={column.accessor}>
                {column.render
                  ? column.render(row[column.accessor], row)
                  : row[column.accessor]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

