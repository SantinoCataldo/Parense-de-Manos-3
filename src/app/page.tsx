import Image from "next/image";
import styles from "./page.module.scss";
import Hero from "@/components/sections/Hero/Hero";

export default function Home() {
  return (
    <main className={styles.main}>
      <Hero />
    </main>
  );
}