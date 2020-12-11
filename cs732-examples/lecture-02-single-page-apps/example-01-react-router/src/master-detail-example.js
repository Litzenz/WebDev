import React from 'react';
import styles from './master-detail.module.css';
import { NavLink, useRouteMatch, Switch, Route, useParams } from 'react-router-dom';

export default function MasterDetailExample() {

    const { path, url } = useRouteMatch();

    return (
        <div className={styles.container}>
            <aside>
                <NavLink to={`${url}/detail1`} activeClassName={styles.activeLink}>First detail</NavLink>
                <NavLink to={`${url}/detail2`} activeClassName={styles.activeLink}>Second detail</NavLink>
                <NavLink to={`${url}/detail3`} activeClassName={styles.activeLink}>Third detail</NavLink>
            </aside>
            <main>
                <Switch>
                    <Route exact path={path}>
                        <h3>Please select an item on the left</h3>
                    </Route>
                    <Route path={`${path}/:id`}>
                        <Detail />
                    </Route>
                    {/* <Route path={`${path}/detail1`}>
                        <h3>Detail one</h3>
                    </Route>
                    <Route path={`${path}/detail2`}>
                        <h3>Detail two</h3>
                    </Route>
                    <Route path={`${path}/detail3`}>
                        <h3>Detail three</h3>
                    </Route> */}
                </Switch>
            </main>
        </div>
    );
}

function Detail() {
    const { id } = useParams();
    return <h3>Detail {id}!</h3>;
}