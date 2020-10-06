// Dependencies
import React, { Fragment, useState, useEffect } from "react";
import axios from 'axios';
// Components
import Navbar from "./components/Navbar";
import TaskAdd from "./components/TaskAdd";
import TaskList from "./components/TaskList";

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

    const handleEmty = () => {
        setState({
            ...state,
            _id: '',
            title: '',
            description: ''
        });
    };

    function fetchTasks() {
        axios('api/task')
            .then(res => setState({ ...state, tasks: res.data }))
            .catch(err => console.log(err));
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
            <Navbar title="MERN Stack" />
            <div className="container">
                <div className="row">
                    <TaskAdd state={state} handleChange={handleChange} addTask={addTask} updateTask={updateTask} />
                    <TaskList state={state} editTask={editTask} deleteTask={deleteTask} />
                </div>
            </div>
        </Fragment>
    );
};

export default App;