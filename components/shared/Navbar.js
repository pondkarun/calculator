import Link from 'next/link';
import { useRouter } from "next/router";
const Navbar = () => {
    const router = useRouter();
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary p-3">
            <Link href="/">
                <a className="navbar-brand">Navbar</a>
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link href="/calculator">
                            <a className={`nav-link ${router.asPath === '/calculator' || router.asPath === '/' ? "active" : ""}`} > เครื่องคิดเลข</a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <a className={`nav-link ${router.asPath === '/user' ? "active" : ""}`}>ข้อมูลผู้ใช้</a>
                    </li>
                </ul>

            </div>
        </nav>

    )
}

export default Navbar
