import React from 'react'
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { userURL } from '../Endpoints';

function User() {

    const { Id } = useParams()
    const { data, isLoading, error } = useFetch(userURL + Id + "/get");

    if (data) {
        // data.map((Duser) => {
        //     if (data.Id === Id) {
        //       userDetails.push(Duser)

        //     }
        //     return 0
        //   })
        console.log(data);
    }


    return (
        <div>
            {isLoading && <div>Loading ...</div>}
            {isLoading && <div>{error}</div>}
            {data && <div>{data.FirstName}</div>}
        </div>
    )
}

export default User