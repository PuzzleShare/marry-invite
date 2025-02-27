import Image from "next/image";
import styles from "../styles/page.module.css";

import Header from "../components/Header"
import Main from "../components/Main"
import CreateButton from "../components/CreateButton"

export default function Home() {
  return (
    <div>
      <Header />
      <Main />
      <CreateButton />
    </div>
  );
}
