'use client';

import styles from './EventInfo.module.scss';
import { motion } from 'framer-motion';

const timeZones = [
    { country: 'Argentina', time: '18:00', code: 'ARG' },
    { country: 'España', time: '23:00', code: 'ESP' },
    { country: 'México', time: '15:00', code: 'MEX' },
    { country: 'Colombia', time: '17:00', code: 'COL' },
    { country: 'Ecuador', time: '17:00', code: 'ECU' },
    { country: 'Chile', time: '18:00', code: 'CHL' },
    { country: 'Perú', time: '17:00', code: 'PER' },
    { country: 'Venezuela', time: '18:00', code: 'VEN' },
];

export default function EventInfo() {
    return (
        <section className={styles.container}>
            <motion.div
                className={styles.container__content}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <motion.h2
                    className={styles.container__title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    Revive el evento anterior
                </motion.h2>

                <motion.div
                    className={styles.container__video}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <iframe
                        src="https://www.youtube.com/embed/75LI44q0nsg?si=x34ktcx0I3RHYv1W"
                        title="Parense de Manos 2 - Evento Anterior"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        className={styles.container__video__iframe}
                        allowFullScreen>
                    </iframe>
                </motion.div>

                <motion.div
                    className={styles.container__timezones}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <h3 className={styles.container__timezones__title}>
                        Horarios por país - 20 de Diciembre
                    </h3>

                    <div className={styles.container__timezones__grid}>
                        {timeZones.map((zone, index) => (
                            <motion.div
                                key={zone.code}
                                className={styles.container__timezones__item}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.8 + (index * 0.05) }}
                            >
                                <span className={styles.container__timezones__time}>
                                    {zone.time}
                                </span>
                                <span className={styles.container__timezones__country}>
                                    {zone.country}
                                </span>
                                <span className={styles.container__timezones__code}>
                                    {zone.code}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}