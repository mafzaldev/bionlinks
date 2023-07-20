import Image from "next/image";
import Link from "next/link";
import { Inter } from "@next/font/google";

import data from "../data.json";

export const dynamic = "force-dynamic",
  runtime = "edge";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

function LinkCard({ href, title }: { href: string; title: string }) {
  return (
    <Link
      href={href}
      target="_blank"
      className={`flex items-center justify-center p-3 mb-2 rounded-md bg-white hover:scale-105 transition-all w-[350px] md:w-[550px] ${inter.className}`}
    >
      <h2 className="font-bold text-base text-gray-800">{title}</h2>
    </Link>
  );
}

export default async function HomePage() {
  return (
    <div
      className={`flex flex-col items-center mt-10 w-full ${inter.className}`}
    >
      <Image
        className="rounded-full"
        src={data.avatar}
        alt={data.name}
        width={100}
        height={100}
      />
      <h1 className="font-black mt-3 text-xl text-white tracking-wide">
        {data.name}
      </h1>

      <div className="flex items-center my-6 gap-3">
        {data.socials.map((social) => (
          <Link
            aria-label={`${social.title} link`}
            key={social.href}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className=" bg-white px-3 py-1 rounded-lg font-mono font-bold text-gray-800"
          >
            {social.title}
          </Link>
        ))}
      </div>

      {data.links.map((link) => (
        <LinkCard key={link.href} {...link} />
      ))}

      <img src="/white_cat.gif" className="cat-gif" alt="Moving Cat" />
    </div>
  );
}
