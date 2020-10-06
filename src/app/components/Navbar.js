// Dependencies
import React from "react";

function Navbar(props) {
    // Props
    const { title } = props;

    return (
        <nav className="light-blue darken-4">
            <div className="container">
                <a className="brand-logo" href="/">{title}</a>
            </div>
        </nav>
    );
};

export default Navbar;