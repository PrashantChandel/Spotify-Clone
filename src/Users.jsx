
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import './index.css'



function Users(props) {
    const [users, setUsers] = useState([])
    useEffect(() => {

        axios.get('http://localhost:3005/sequelize/getusers', {
        })
            .then((res) => {
                console.log(res.data);
                setUsers(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    const userselector = (user_id) => {
        console.log(user_id)
        window.localStorage.setItem("user", user_id)

    }

    return (
        <>
            Who's Listening?

            <div className='user_container'>
                {users.map((e, idx) =>
                    <div className='Hello' key={idx}>
                        <div className='user_box' onClick={() => { userselector(e.user_id) }}>
                            <div >
                                <img className='user_img' src="http://www.canada-work.com/_/rsrc/1531284300421/assistants/female_generic_profile.png" alt='user' />
                            </div>
                            <div className='user_name'>
                                {e.user_name}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )

}

export default Users;