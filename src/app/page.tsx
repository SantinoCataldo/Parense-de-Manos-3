import Image from "next/image";
import styles from "./page.module.scss";
import LogoAnimation from "@/components/ui/LogoAnimation/LogoAnimation";

export default function Home() {
  return (
    <main className={styles.main}>
      <LogoAnimation />
    </main>
  );
}