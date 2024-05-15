import Image from "next/image";
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button";
import { Github } from 'lucide-react';
import Link from "next/link";
export default function Home() {
  return (
    <>
    <section className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20 text-center">
      <Badge className="mb-3">Lunaar v4 is out! Check it out!</Badge>
<h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Meet Parcoil.</h1>
<span className=" text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Simplify. Secure. Streamline. Parcoil - Maximizing Digital Efficiency! Providing top-notch online tools like password generators, desktop apps, and more to enhance your online experience while ensuring security and efficiency.</span>
<Button asChild>
  <Link href="https://github.com/parcoil"><Github size={16} className="mr-1"/>  View Github</Link>
  </Button>
    </section>
    </>
  );
}
