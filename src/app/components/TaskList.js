// Dependencies
import React from "react";

function TaskList(props) {
    // Props
    const { state, editTask, deleteTask } = props;

    return (
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
    );
};

export default TaskList;