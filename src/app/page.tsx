import Image from "next/image";
import styles from "./page.module.scss";
import Hero from "@/components/sections/Hero/Hero";
import EventInfo from "@/components/sections/EventInfo/EventInfo";
import Fighters from "@/components/sections/Fighters/Fighters";

export default function Home() {
  return (
    <main className={styles.main}>
      <Hero />
      <Fighters />
      <EventInfo />
    </main>
  );
}