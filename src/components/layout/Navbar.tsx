'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.scss';

export default function Navbar() {
    const pathname = usePathname();

    const navItems = [
        { name: "Inicio", href: "/" },
        { name: "Boxeadores", href: "/boxeador" },
        { name: "Combates", href: "/combates" },
        { name: "Predicciones", href: "/predicciones" },
    ];

    const getLinkClass = (href: string) => {
        return pathname === href
            ? `${styles.nav__link} ${styles['nav__link--active']}`
            : styles.nav__link;
    };

    return (
        <nav className={styles.nav}>
            <div className={styles.nav__list}>
                {navItems.map((item, index) => (
                    <Link key={item.name} href={item.href} className={getLinkClass(item.href)}>
                        <span className={styles.nav__text}>{item.name}</span>
                        <div className={styles.nav__underline}></div>
                        <div className={styles.nav__background}></div>
                        <span className={styles.nav__number}>0{index + 1}</span>
                    </Link>
                ))}
            </div>
        </nav>
    );
}
