import LightConfigurator from "@/components/LightConfigurator";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen" >
      <div className="pt-24">
        <LightConfigurator />
      </div>
    </main>
  );
}
