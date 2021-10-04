import Head from "next/head";
import styles from "./Layout.module.css";
import Link from 'next/link';

const Layout = ({ children }) => {
    return (
        <div className={styles.container}>
            <Head>
                <title>AD Doca</title>
                <link rel="icon" href="/icon_addoca.ico" />
            </Head>

            <main>{children}</main>

        </div>
    );
};



export default Layout;