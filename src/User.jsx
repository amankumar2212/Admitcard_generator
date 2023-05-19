import React, { useState, } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Standard from './Standard';
import StateAdd from './StateAdd';
import { useNavigate } from 'react-router-dom';
import './User.css';



const App = () => {

    const [inputs, setInputs] = useState({ rollno: "", name: "", standard: "", school: "", address: "", phone: "" });
    const [dropDown, setDropDown] = useState(false);
    const [classdropDown, setClassdropDown] = useState(false);
    const navigate = useNavigate();


    const handleInputs = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs({ ...inputs, [name]: value });
    }

    const validate = () => {
        let res = true;

        if (inputs.rollno === '' || inputs.rollno === null) {
            res = false;
            toast.error("Please Enter Roll No.");

        }
        if (inputs.name === '' || inputs.name === null) {
            res = false;
            toast.error("Please Enter Name");

        }
        if (inputs.standard === '' || inputs.standard === null) {
            res = false;
            toast.error("Please Enter Class");

        }
        if (inputs.phone === '' || inputs.phone === null) {
            res = false;
            toast.error("Please Enter Contact");

        }
        if (inputs.address === '' || inputs.address === null) {
            res = false;
            toast.error("Please Enter Address");

        }
        return res;
    }


    const hanleSubmitData = async (e) => {
        e.preventDefault();

        try {

            let obj = {
                rollno: inputs.rollno,
                name: inputs.name,
                standard: inputs.standard,
                school: inputs.school,
                address: inputs.address,
                phone: inputs.phone
            };

            if (validate()) {

                const response = await axios.post(`http://localhost:3000/post`, obj);
                console.log(response);
                toast.success("Data has been successfully sent to database");
                const userData = await axios.get(`http://localhost:3000/user/${inputs.rollno}`)
                navigate(`/user/${inputs.rollno}`);
            }

        } catch (error) {
            console.log(error.message);
        }
    }


    return (

        <div className='form-data'>
            <ToastContainer />
            <div className="form-container">

                <label>Roll Number</label>
                <input
                    type='number'
                    name='rollno'
                    placeholder='Enter Your Roll Number'
                    value={inputs.rollno}
                    onChange={handleInputs} />

                <label>Name</label>
                <input
                    type='text'
                    name='name'
                    placeholder='Enter Your Name'
                    value={inputs.name}
                    onChange={handleInputs} />

                <label>Standard</label>
                <select
                    type='text'
                    name='standard'
                    value={inputs.standard}
                    onChange={handleInputs}
                    onClick={() => setClassdropDown(classdropDown)}>

                    {
                        !classdropDown && (
                            Standard.map((drop, index) => {
                                return (
                                    <option key={index}>{drop.title}</option>
                                )
                            })
                        )
                    }

                </select>

                <label>School</label>
                <input
                    type='text'
                    name='school'
                    placeholder='Enter Your School'
                    value={inputs.school}
                    onChange={handleInputs} />

                <label>Address</label>
                <select
                    type='text'
                    name='address'
                    value={inputs.address}
                    onChange={handleInputs}
                    onClick={() => setDropDown(dropDown)} >

                    {
                        !dropDown && (
                            StateAdd.map((drop, index) => {
                                return (
                                    <option key={index}>{drop.title}</option>
                                )
                            })
                        )
                    }

                </select>

                <label>Phone</label>
                <input
                    type='number'
                    name='phone'
                    placeholder='Enter Your Phone'
                    value={inputs.phone}
                    onChange={handleInputs}
                />
                <button type='submit' onClick={hanleSubmitData}>Save and Download Admit Card</button>
            </div>

        </div>
    )
}

export default App