import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import './Search.css'


const Search = () => {
    const [userData, setUserData] = useState(null);
    const [rollNo, setRollNo] = useState('');
    let obj = [];
    const [isData, setIsData] = useState(false);

    const isEmpty = () => {
        let res = true;
        if (rollNo === '' || rollNo === null) {
            toast.error('Oops!! Search field is Empty');
            res = false;
        }
        return res;
    }

    const handleSearch = async () => {
        try {
            if (isEmpty()) {
                const response = await axios.get(`http://localhost:3000/search/${rollNo}`);
                obj = response.data;
                // console.log(obj);
                console.log();
                setIsData(true);
            }
        }
        catch (err) {
            console.log(err.message)
        }
    }


    return (
        <div className='search'>

            <h1>Search</h1>

            <input
                type='number'
                name='rollNo'
                values={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
                placeholder='Search Your Roll no....'
            />

            <button type='submit' onClick={handleSearch}>Search</button>

            <div className='result'>
                {
                    isData && (
                        <>
                            <h1>{obj.rollno}</h1>
                            <h1>{obj.name}</h1>
                            <h1>{obj.standard}</h1>
                            <h1>{obj.school}</h1>
                            <h1>{obj.address}</h1>
                        </>

                    )
                }
            </div>
        </div>
    )
}

export default Search