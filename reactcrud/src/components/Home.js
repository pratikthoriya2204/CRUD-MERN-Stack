import React, { useContext, useEffect, useRef, useState } from 'react'
import crudContext from '../context/crud/crudContext';
import DataTable from './DataTable';
import Swal from 'sweetalert2';

export default function Home(props) {

    const context = useContext(crudContext);
    const { mydata, readData, addData, editData } = context;

    const [data, setData] = useState({ name: "", email: "", gender: "", mob: "", status: "" });
    const [addUpdate, setAddUpdate] = useState("Add");

    const ref = useRef(null);
    const refClose = useRef(null);

    useEffect(() => {
        readData();
        // showDelAlert("Welcome to CRUD word","warning");
        // eslint-disable-next-line
    }, []);

    const handleCreate = () => {
        ref.current.click();
    }
    const handleAddData = (e) => {
        e.preventDefault();
        addData(data.name, data.email, data.gender, data.mob, data.status);
        setData({ name: "", email: "", gender: "", mob: "", status: "" });
        refClose.current.click();
        props.showALert("Data Added Successfully ...", "success");
        Swal.fire("Record Insert Successfully...", "", "success");

    }

    const handleUpdate = (currentData) => {

        Swal.fire({
            icon: "info",
            title: "Update",
            showDenyButton: true,
            confirmButtonText: "Yes",
            text: "Are sure want to Update this Data..",
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                ref.current.click();
                setAddUpdate("Edit");
                setData({
                    id: currentData._id,
                    name: currentData.name,
                    email: currentData.email,
                    gender: currentData.gender,
                    mob: currentData.mob,
                    status: currentData.status,
                });
            }else if(result.isDenied){
                Swal.fire("Changes are not saved", "", "error");
            }
        });


    }
    const handleEditData = (e) => {

        e.preventDefault();
        editData(data.id, data.name, data.email, data.gender, data.mob, data.status);
        refClose.current.click();
        props.showALert("Data Updated ...", "primary");
        Swal.fire("Data has been Updated...", "", "success");
    }

    const onchange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className='container'>
                <h1 className='text-center my-5'>Create Read Update Delete -- Project</h1>
                <button ref={ref} onClick={handleCreate} className="btn btn-success">Create <i className="fa-solid fa-plus mx-2"></i></button>
                <table className="table table-success table-striped-columns mt-3 text-center">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Gender</th>
                            <th scope="col">Mobile No.</th>
                            <th scope="col">Status</th>
                            <th scope="col">Update</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mydata.map((data) => {
                            return <DataTable key={data._id} data={data} handleUpdate={handleUpdate} showALert={props.showALert} />
                        })}

                    </tbody>
                </table>
                <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Launch demo modal
                </button>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Name:</label>
                                        <input type="text" className="form-control" name="name" id="name" onChange={onchange} value={data.name} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email address:</label>
                                        <input type="email" className="form-control" name="email" id="email" onChange={onchange} value={data.email} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="gender" className="form-label">Gender:</label>
                                        <input type="text" className="form-control" name="gender" id="gender" onChange={onchange} value={data.gender} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="mob" className="form-label">Mobile No.:</label>
                                        <input type="number" className="form-control" name="mob" id="mob" onChange={onchange} value={data.mob} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="status" className="form-label">status:</label>
                                        <input type="number" className="form-control" name="status" id="status" onChange={onchange} value={data.status} />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className={`btn btn-primary d-${addUpdate === "Add" ? 'block' : 'none'}`} onClick={handleAddData}>{addUpdate}</button>
                                <button type="button" className={`btn btn-primary d-${addUpdate === "Add" ? 'none' : 'block'}`} onClick={handleEditData}>Edit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <DeleteAlert delAlert={delAlert} /> */}
        </>
    )
}
