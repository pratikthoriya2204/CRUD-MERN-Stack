import React, { useContext } from 'react'
import crudContext from '../context/crud/crudContext';
import Swal from 'sweetalert2';


function DataTable(props) {

    // fetch all data via props
    const { data, handleUpdate } = props;

    const context = useContext(crudContext);
    const { deleteData } = context;

    const handledeleteAlert = () => {
        Swal.fire({
            icon: "error",
            title: "Delete",
            showDenyButton: true,
            confirmButtonText: "Yes",
            text: "Are sure want to DELETE this Data..",
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                Swal.fire("Data has been Deleted...", "", "success");
                deleteData(data._id);
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
              }
          });
    }
    return (
        <>
            <tr>
                <th scope="row">{data.name}</th>
                <td>{data.email}</td>
                <td>{data.gender}</td>
                <td>{data.mob}</td>
                <td>{data.status}</td>
                <td><button className="btn btn-info" onClick={() => { handleUpdate(data) }} ><i className="fa-solid fa-pen-to-square"></i></button></td>
                <td><button className="btn btn-danger"  onClick={handledeleteAlert}><i className="fa-solid fa-trash-can"></i></button></td>

            </tr>
           
        </>
    )
}

export default DataTable
