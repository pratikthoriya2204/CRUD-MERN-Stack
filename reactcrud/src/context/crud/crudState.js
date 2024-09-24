import React, { useState } from "react";
import CrudContext from "./crudContext";

const CrudState = (props) => {
    const host = 'http://localhost:5000';

    const dataInitial = [];
    const [mydata, setMydata] = useState(dataInitial);

    const readData = async () => {

        const response = await fetch(`${host}/api/crud/read`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });

        const json = await response.json();
        // console.log(json)
        setMydata(json);
    }

    const addData = async (name, email, gender, mob, status) => {
        const response = await fetch(`${host}/api/crud/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, gender, mob, status }),
        });
        const json = await response.json();
        setMydata(mydata.concat(json));
    }

    const deleteData = async (id) => {
        const responce = await fetch(`${host}/api/crud/delete/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
        });

        const delData = mydata.filter((data) => { return data._id !== id });
        setMydata(delData);

        const json = await responce.json();
        console.log(json);
    }

    const editData = async (id, name, email, gender, mob, status) => {
        const responce = await fetch(`${host}/api/crud/update/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, gender, mob, status })
        });
        const json = await responce.json();
        console.log(json);

        let newData = JSON.parse(JSON.stringify(mydata));
        for (let index = 0; index < newData.length; index++) {
            const element = newData[index];
            if(element._id === id){
                element.name = name;
                element.email = email;
                element.gender = gender;
                element.mob = mob;
                element.status = status;
                break;
            }
        }
        setMydata(newData);
    }

    return (
        <CrudContext.Provider value={{ mydata, readData, addData, deleteData, editData }}>
            {props.children}
        </CrudContext.Provider>
    )
}

export default CrudState;