import styles from '../css/layout.module.css';
import Header from './header';

export default function withLayout(Page) {
    return () => (
        <div className={styles.container}>

            <Header />

            <main>
                <Page />
            </main>
        </div>
    );
}