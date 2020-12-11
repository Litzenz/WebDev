import Link from 'next/link';

export default function Header(props) {
    return (
        <header>
            <Link href="/"><h1>My Website</h1></Link>
            <nav>
                <Link href="/page1"><a>Page One</a></Link>
                <Link href="/page2"><a>Page Two</a></Link>
                <Link href="/master-detail/detail1"><a>Master-Detail</a></Link>
                <Link href="/about"><a>About</a></Link>
            </nav>
        </header>
    );
}