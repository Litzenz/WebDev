import React from 'react';
import styles from './dialog.module.css';
import Card from './card';

export default function Dialog({ title, buttons, onButtonClick, children }) {

    return (
        <div className={styles.dialogBackground}>
            <div>
                <Card title={title}>
                    <div>
                        {children}
                    </div>
                    <div className="flex-row-end" style={{ marginTop: "var(--half-spacing)" }}>
                        {buttons && buttons.map((name, index) =>
                            <button
                                key={index}
                                style={{ marginLeft: "var(--half-spacing)" }}
                                onClick={e => onButtonClick({ ...e, buttonName: name })}>{name}</button>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    )

}