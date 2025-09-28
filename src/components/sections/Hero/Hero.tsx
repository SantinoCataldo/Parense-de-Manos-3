"use client";

import Button from "@/components/ui/Button/Button";
import styles from "./Hero.module.scss";
import LogoAnimation from "@/components/ui/LogoAnimation/LogoAnimation";
import { IconMapPin, IconCalendar, IconBrandKickFilled, IconBrandYoutube, IconTicket, IconCaretDownFilled } from "@tabler/icons-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className={styles.container}>
      <div className={styles.container__group}></div>
      <motion.div 
        className={styles.container__content}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.8, 
          ease: "easeOut",
          staggerChildren: 0.1
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <LogoAnimation size="lg" />
        </motion.div>
        
        <motion.div 
          className={styles.container__content__time}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
           <p>Diciembre 20</p>
          <div className={styles.container__content__time__zone}>
            <p>18HS</p>
            <p className={styles.container__content__time__zone__arg}>ARG</p>
          </div>

        </motion.div>
        
        <motion.a 
          href="https://maps.app.goo.gl/ZGELzkMrjuNoD9Qy5"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.container__content__link}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <IconMapPin size={18} /> <p>Estadio Tomás Adolfo Ducó</p>
        </motion.a>
        
        <motion.a 
          href="https://kick.com/luquitarodriguez"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.container__content__link}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <IconBrandKickFilled size={18} /> <p>kick.com/luquitarodriguez</p>
        </motion.a>


        <motion.div 
          className={styles.container__content__buttons}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <a
            href="https://grandes-eventos.tuentrada.com/parense-de-manos"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button>
              <IconTicket size={16} /> Comprar Entradas
            </Button>
          </a>
          <a
            href="https://www.youtube.com/@ParensedeManos"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="secondary">
              <IconBrandYoutube size={16} /> Ver canal de youtube
            </Button>
          </a>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            y: [0, -8, 0] 
          }}
          transition={{ 
            opacity: { duration: 0.6, delay: 0.6 },
            y: { 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }
          }}
          style={{ 
            marginTop: "2rem",
            cursor: "pointer" 
          }}
        >
          <IconCaretDownFilled size={34} />
        </motion.div>
      </motion.div>
    </section>
  );
}