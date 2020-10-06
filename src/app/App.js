// Dependencies
import React, { Fragment, useState, useEffect } from "react";
// Functions


function App() {

    // Local state
    const [state, setState] = useState({
        _id: '',
        title: '',
        description: '',
        tasks: [],
    });

    // Functions
    const handleChange = (e) => {
        const { name, value } = e.target;
        setState({
            ...state,
            [name]: value
        });
    };

    const handleEmty = (e) => {
        setState({
            ...state,
            _id: '',
            title: '',
            description: ''
        });
    };

    function fetchTasks() {
        fetch('api/task')
            .then(res => res.json())
            .then(data => setState({ ...state, tasks: data }));
    }

    // CRUD
    const addTask = (e) => {
        e.preventDefault();
        // Fetching
        fetch('api/task', {
            method: 'POST',
            body: JSON.stringify(state),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                M.toast({ 'html': 'Task Saved' });
                handleEmty();
                fetchTasks();
            })
            .catch(err => console.log(err));
    };

    const editTask = (id) => {
        fetch(`/api/task/${id}`)
            .then(res => res.json())
            .then(data => {
                setState({
                    ...state,
                    title: data.title,
                    description: data.description,
                    _id: data._id
                });
            });
    }

    const updateTask = (e) => {
        e.preventDefault();
        fetch(`/api/task/${state._id}`, {
            method: 'PUT',
            body: JSON.stringify({
                title: state.title,
                description: state.description
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                M.toast({ html: 'Task Updated' });
                handleEmty();
                fetchTasks();
            });
    }

    const deleteTask = (id) => {
        if (confirm('Are you sure you want to delete it?')) {
            fetch(`/api/task/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    M.toast({ html: 'Task deleted' });
                    fetchTasks();
                });
        }
    }

    // UseEfect
    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <Fragment>
            <nav className="light-blue darken-4">
                <div className="container">
                    <a className="brand-logo" href="/">MERN Stack</a>
                </div>
            </nav>

            <div className="container">
                <div className="row">
                    <div className="col s5">
                        <div className="card">
                            <div className="card-content">
                                <form onSubmit={state._id === '' ? addTask : updateTask}>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input
                                                name="title"
                                                type="text"
                                                value={state.title}
                                                placeholder="Task title"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <textarea
                                                name="description"
                                                value={state.description}
                                                placeholder="Task description"
                                                className="materialize-textarea"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <button type="submit" className="btn light-blue darken-4">
                                        {state._id === '' ? 'Add Task' : 'Update Task'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="col s7">
                        <table>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    state.tasks.map(task => {
                                        return (
                                            <tr key={task._id}>
                                                <td>{task.title}</td>
                                                <td>{task.description}</td>
                                                <td>
                                                    <button onClick={() => deleteTask(task._id)} className="btn light-blue darken-4">
                                                        <i className="material-icons">delete</i>
                                                    </button>
                                                    <button onClick={() => editTask(task._id)} className="btn light-blue darken-4" style={{ margin: '4px' }}>
                                                        <i className="material-icons">edit</i>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </Fragment>
    );
};

export default App;