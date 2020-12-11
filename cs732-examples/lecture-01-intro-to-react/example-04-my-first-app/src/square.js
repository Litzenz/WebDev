import React from 'react';

export default function Square(props) {

    // Elements can have their style set programatically via the style property. The value of this property
    // should be a standard JS object whose property names correspond to CSS property names, except in
    // camelCase rather than words-with-dashes as CSS itself uses. As we can see here, obtaining the style
    // values from props or any other source is fine (as is hardcoding e.g. '5px').
    const boxStyle = {
        width: props.width,
        height: props.height,
        backgroundColor: props.backgroundColor,
        margin: '5px'
    };

    return <div style={boxStyle} />
}