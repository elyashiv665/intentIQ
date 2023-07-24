import Button from '@mui/material/Button';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    Avatar,
    TableSortLabel
  } from "@material-ui/core";
  
  const columns = [
    { id: "startDate", label: "Start Date" },
    { id: "endDate", label: "End Date" },
    { id: "customer", label: "Customer" },
    { id: "impression", label: "Impression" },
    { id: "conversion", label: "Conversion" },
    { id: "attributeMatches", label: "Attribute Matches" },
    { id: "conversionRate", label: "Conversion Rate" },
    { id: "avgFrequency", label: "Avg. Frequency" },
    { id: "avgTimeToConversion", label: "Avg. Time to Conversion" },
    { id: "director", label: "Director" },
  ];
  

export default function tableGen({dataLength, displayedData, changePage, sortOrderChange, page, sortOrder, dispatch, setActiveRowHover, activeRowHover}){

    const handleRowHover = (customer) => {
        dispatch(setActiveRowHover(customer));
    };
    return <div>
        <TableContainer component={Paper}>
        <Table>
        <TableHead>
            <TableRow>
            {columns.map((column) => (
                <TableCell key={column.id} >
                {column.id === "startDate" ? (
                    <TableSortLabel
                        active={true}
                        direction={sortOrder}
                        onClick={() => dispatch(sortOrderChange())}
                    >
                        {column.label}
                    </TableSortLabel>
                    ) : (
                    column.label
                    )}
                </TableCell>
            ))}
            </TableRow>
        </TableHead>
        <TableBody>
            {displayedData.map((row) => (
             <TableRow key={row.customer} onMouseEnter={() => handleRowHover(row.customer)}>
                <TableCell>{row.startDate}</TableCell>
                <TableCell>{row.endDate}</TableCell>
                <TableCell>{row.customer}</TableCell>
                <TableCell>{row.impression}</TableCell>
                <TableCell>{row.conversion}</TableCell>
                <TableCell>{row.attributeMatches}</TableCell>
                <TableCell>{row.conversionRate}</TableCell>
                <TableCell>{row.avgFrequency}</TableCell>
                <TableCell>{row.avgTimeToConversion}</TableCell>
                <TableCell>
                <Avatar alt={row.customer} src={row.director} />
                </TableCell>
                {activeRowHover === row.customer && <Button sx={{backgroundColor: 'blue', color: 'white', marginTop: '15px'}} varient={'contained'} onClick={() => console.log('create')}>Create Insight</Button>}
            </TableRow>
            ))}
        </TableBody>
        </Table>
        </TableContainer>
        <TablePagination
            component="div"
            count={dataLength}
            rowsPerPage={parseInt(process.env.REACT_APP_PER_PAGE)}
            page={page}
            onPageChange={(e, page) =>{
                dispatch(changePage(page))
            }}
        />
  </div>
}