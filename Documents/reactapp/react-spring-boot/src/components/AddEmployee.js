import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import employeeService from "../services/employee.service";

const AddEmployee = () => {
    const [name,setName]=useState('');
    const [location,seLocation]=useState('');
    const [department,setDepartment]=useState('');
    const history=useHistory();

    const {id} =useParams();
    const saveEmployee =(e)=>{
        e.preventDefault(); 
        const employee={name,location,department,id};
        if (id){
            //update the record
            employeeService.update(employee)
            .then(response => {
                console.log('Employee data updated successfully',response.data);
                history.push('/');
            })
            .catch(error=>{
                console.log('something went wrong',error);
            })
        }else{
            //create new record
            employeeService.create(employee)
        .then(response => {
            console.log('Employee data added successfully',response.data);
            history.push('/');
        })
        .catch(error=>{
            console.log('something went wrong',error);
        });
        }
    }
    useEffect (()=>{
        if (id){
            employeeService.get(id)
            .then(employee=>{
                setName(employee.data.name);
                seLocation(employee.data.location);
                setDepartment(employee.data.department);
            })
            .catch(error=>{
                console.log("something went wrong",error);
            })
        }
    },[])
    return (  
        <div className="container">
            <h1>Add New Employee</h1>
            <h3/>
            <form>
                <div className="form-group">
                    <input 
                        type="text"
                        className="form-control col-4"
                        id="name"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        placeholder="Enter name"/>
                </div>

                <div className="form-group">
                    <input 
                        type="text"
                        className="form-control col-4"
                        id="department"
                        value={department}
                        onChange={(e)=>setDepartment(e.target.value)}
                        placeholder="Enter department"/>
                </div>

                <div className="form-group">
                    <input 
                        type="text"
                        className="form-control col-4"
                        id="location"
                        value={location}
                        onChange={(e)=>seLocation(e.target.value)}
                        placeholder="Enter location"/>
                </div>
                <div>
                    <button className="btn btn-primary" onClick={(e)=>saveEmployee(e)}>Save</button>
                </div>
            </form>
            <Link to="/">Back to List</Link>
        </div>
        
    );
}
 
export default AddEmployee;