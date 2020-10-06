// Dependencies
import React from "react";

function TaskAdd(props) {
    // Props
    const { state, handleChange, addTask, updateTask } = props;

    return (
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
    );
};

export default TaskAdd;