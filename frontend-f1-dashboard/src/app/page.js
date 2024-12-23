import Image from "next/image";
import styles from "./page.module.css";
import F1NewsCarousel from "../../pages/news";

export default function Home() {
  return (
    <main>
      <F1NewsCarousel />
    </main>
  );
}
