'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import styles from './Navbar.module.scss';

export default function Navbar() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    // Cerrar menú al presionar Escape
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsMobileMenuOpen(false);
            }
        };

        if (isMobileMenuOpen) {
            document.addEventListener('keydown', handleEscape);
            // Prevenir scroll en el body cuando el menú está abierto
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    return (
        <>
            <nav className={styles.nav}>
                {/* Menú Desktop */}
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

                {/* Botón Hamburguesa para Mobile */}
                <button 
                    className={`${styles.hamburger} ${isMobileMenuOpen ? styles['hamburger--active'] : ''}`}
                    onClick={toggleMobileMenu}
                    aria-label="Toggle mobile menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </nav>

            {/* Overlay y Menú Mobile */}
            {isMobileMenuOpen && (
                <>
                    <div 
                        className={styles.mobile__overlay} 
                        onClick={closeMobileMenu}
                    ></div>
                    <div className={styles.mobile__menu}>
                        <div className={styles.mobile__header}>
                            <h2 className={styles.mobile__title}>Menú</h2>
                            <button 
                                className={styles.mobile__close}
                                onClick={closeMobileMenu}
                                aria-label="Close mobile menu"
                            >
                                ×
                            </button>
                        </div>
                        <div className={styles.mobile__list}>
                            {navItems.map((item, index) => (
                                <Link 
                                    key={item.name} 
                                    href={item.href} 
                                    className={`${styles.mobile__link} ${pathname === item.href ? styles['mobile__link--active'] : ''}`}
                                    onClick={closeMobileMenu}
                                >
                                    <span className={styles.mobile__number}>0{index + 1}</span>
                                    <span className={styles.mobile__text}>{item.name}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
