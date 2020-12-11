import Link from 'next/link';
import withLayout from '../components/layout';

function Index() {
    return (
        <div>
            <p>Hello Next.js</p>
            <ul>
                <Link href="/about">
                    <li><a>About Page</a></li>
                </Link>
                <Link href="/users/5">
                    <li><a>User #5</a></li>
                </Link>
                <Link href="/user-fetcher-functional">
                    <li><a>User fetcher (getInitialProps example) - functional component</a></li>
                </Link>
                <Link href="/user-fetcher-stateful">
                    <li><a>User fetcher (getInitialProps example) - stateful component</a></li>
                </Link>
            </ul>
        </div>
    );
}

// export default Index;
export default withLayout(Index);