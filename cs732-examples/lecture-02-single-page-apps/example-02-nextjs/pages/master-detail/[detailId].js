import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../../css/master-detail.module.css';
import withLayout from '../../components/layout';

function MasterDetailExample() {

    const router = useRouter();
    const { detailId } = router.query;

    return (
        <div className={styles.container}>
            <aside>
                <Link href="/master-detail/detail1"><a>First detail</a></Link>
                <Link href="/master-detail/detail2"><a>Second detail</a></Link>
                <Link href="/master-detail/detail3"><a>Third detail</a></Link>
            </aside>
            <main>
                <Detail detailId={detailId} />
            </main>
        </div>
    );
}

function Detail(props) {
    return <h3>Detail id = {props.detailId}</h3>;
}

export default withLayout(MasterDetailExample);