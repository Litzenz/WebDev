import React from 'react';

// This import statement lets us use CSS modules. CSS modules, during pre-processing,
// will have the names of their class selectors modified so that they don't clash - e.g.
// the ".flower" selector in this CSS module won't clash with a ".flower" selector in any
// other CSS module.
import styles from './flower.module.css';

export default function Flower(props) {

    // Because the class selector names are dynamially generated in CSS modules, we can't simply say
    // className="flower". Rather, we must use the "flower" property from the imported styles object
    // to get the actual runtime CSS class name.
    return (
        <div className={styles.flower}>
            <img src="./jasmine-flower.svg" />
        </div>
    );
}