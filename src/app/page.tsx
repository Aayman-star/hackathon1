import Image from "next/image";
import Header from "./components/Header";
import Body from "./components/Body";

export default function Home() {
  return (
    <main className="bg-white flex min-h-screen flex-col items-center justify-between">
      {/* <Header /> */}

      <Body />
    </main>
  );
}
