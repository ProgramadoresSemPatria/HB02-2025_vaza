import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  // const supabase = await createClient()

  // const { data: countries } = await supabase.from('countries').select('*')

  // console.log(countries)

  return (
    <main className="relative h-screen">
      <div className="absolute inset-0 z-0">
        <Image
          src="/plane1.png" // Change with your desired background image
          alt="Background"
          layout="fill"
          objectFit="cover"
          className="dark:opacity-5"
          quality={100}
        />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full container mx-auto px-6">
        <div className="flex items-center gap-2">
          <Image
            src="/vaza-logo.webp"
            alt="Logo"
            width={50}
            height={20}
            className="dark:invert"
          />
          <p className="text-2xl font-bold text-white/60 ">VAZA</p>
        </div>
        <h1 className="text-5xl font-bold text-white/60 leading-tight">
          Are you ready to
          <br />
          change your life?
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Turn the dream of leaving your country into a real actionable plan.
        </p>
        <Link href="/get-started">
          <Button className="mt-8 bg-brand-primary text-white">
            Get Started
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </main>
  );
}
