import React, { useEffect, useState } from 'react';

const User = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState([]);
    const [edit, setEdit] = useState(false);
    const [id, setId] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!edit) {
            const res = await fetch(`http://localhost:5000/users`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        })
            const data = await res.json();
            console.log(data);
        }else {
            const res = await fetch(`http://localhost:5000/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            });
            const data = await res.json();
            console.log(data);
            setEdit(false);
            setId('');
        }
        await getUsers();
        setName('');
        setEmail('');
        setPassword('');
    }

    const getUsers = async () => {
        const res = await fetch(`http://localhost:5000/users`, {})
        const data = await res.json();
        console.log(data);
        setUsers(data);
    }

    const deleteUser = async (id) => {
        const userResponse = window.confirm('Are you sure you want to delete it?');
        if(userResponse) {
            const res =  await fetch(`http://localhost:5000/users/${id}`, {
            method: 'DELETE'
        });
            const date = await res.json();
            await getUsers();
        }
    }

    const editUser = async (id) => {
        const res = await fetch(`http://localhost:5000/user/${id}`, {});
        const data = await res.json();
        setEdit(true);
        setId(id);
        setName(data.name);
        setEmail(data.email);
        setPassword(data.password);
     };

    useEffect(() => {
        getUsers();
    }, []);

   return(
    <div className="row">
        <div className="col-md-4">
            <form onSubmit={handleSubmit} className="card card-body">
                <div className="form-group">
                    <input 
                        type="text" 
                        onChange={e => setName(e.target.value)} 
                        value={name} 
                        className="form-control"
                        placeholder="Name"
                        autoFocus
                    /> 
                </div>
                <div className="form-group">
                    <input 
                        type="email" 
                        onChange={e => setEmail(e.target.value)} 
                        value={email} 
                        className="form-control"
                        placeholder="Email"
                        autoFocus
                    /> 
                </div>
                <div className="form-group">
                    <input 
                        type="password" 
                        onChange={e => setPassword(e.target.value)} 
                        value={password} 
                        className="form-control"
                        placeholder="Password"
                        autoFocus
                    /> 
                </div>
                <button className="btn btn-primary btn-block">
                    {edit ? 'Update' : 'Create'}
                </button>
            </form>
        </div>
        <div className="col col-md-6">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>${user.name}</td>
                            <td>${user.email}</td>
                            <td>${user.password}</td>
                            <td>
                            <button 
                                className="btn btn-secondary btn-sm btn-block"
                                onClick={e => editUser(user._id)}
                            >
                                 Edit
                             </button>
                            <button 
                                className="btn btn-danger btn-sm btn-block"
                                onClick={() => deleteUser(user._id)}
                            >
                                Delete
                            </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>          
        </div>
    </div>
   );
};

export default User;