import React from 'react';

export default function AgeCheck(props) {
    if (props.age >= 18) {
        return <p>You're 18 or older</p>
    }
    else {
        return <p>You're not old enough to see this</p>
    }
}