import Image from "next/image";
import { Inter } from "@next/font/google";
import { GitHubIcon, TwitterIcon } from "../components/Icons";

import data from "../data.json";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

function LinkCard({ href, title }: { href: string; title: string }) {
  return (
    <a
      href={href}
      className="flex items-center justify-center p-3 mb-2 w-[450px] rounded-md bg-white hover:scale-105 transition-all"
    >
      <h2 className="font-normal text-base text-ellipsis text-black">
        {title}
      </h2>
    </a>
  );
}

export default function Home() {
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
      <h1 className="font-extrabold mt-2 mb-8 text-xl text-white">
        {data.name}
      </h1>
      {data.links.map((link) => (
        <LinkCard key={link.href} {...link} />
      ))}
      <div className="flex mt-12 gap-1">
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
              <TwitterIcon />
            ) : social.href.includes("github") ? (
              <GitHubIcon />
            ) : null}
          </a>
        ))}
      </div>
    </div>
  );
}
