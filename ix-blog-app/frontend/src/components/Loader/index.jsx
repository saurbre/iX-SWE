import React from "react";

export default function Loader() {
    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="spinner-border" role="status" aria-hidden="true">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}