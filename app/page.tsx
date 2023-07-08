import Image from "next/image";
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
    <a
      href={href}
      target="_blank"
      className={`flex items-center justify-center p-3 mb-2 rounded-md bg-white hover:scale-105 transition-all w-[350px] md:w-[550px] ${inter.className}`}
    >
      <h2 className="font-bold text-base text-gray-800">{title}</h2>
    </a>
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
      <h1 className="font-black mt-3 mb-8 text-2xl text-white tracking-wide">
        {data.name}
      </h1>
      {data.links.map((link) => (
        <LinkCard key={link.href} {...link} />
      ))}
      <div className="flex items-center my-12 gap-3">
        {data.socials.map((social) => (
          <a
            aria-label={`${social.title} link`}
            key={social.href}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-all"
          >
            {social.href.includes("twitter") ? (
              <img
                src={"/twitter.svg"}
                alt={"twitter"}
                height="40px"
                width="40px"
              />
            ) : social.href.includes("github") ? (
              <img
                src={"/github.svg"}
                alt={"github"}
                height="35px"
                width="35px"
              />
            ) : social.href.includes("linkedin") ? (
              <img
                src={"/linkedin.svg"}
                alt={"linkedin"}
                height="35px"
                width="35px"
              />
            ) : null}
          </a>
        ))}
      </div>
    </div>
  );
}
