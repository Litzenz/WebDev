import React from 'react';

export default function LoadingView() {

    const divStyle = {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }

    return (
        <div style={divStyle}>
            <h1>Loading...</h1>
        </div>
    );
}