import Image from "next/image";
import { Inter } from "@next/font/google";
import { GitHubIcon, LinkedInIcon, TwitterIcon } from "../components/Icons";
import { get } from "@vercel/edge-config";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic",
  runtime = "edge";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

interface Data {
  name: string;
  avatar: string;
  links: Link[];
  socials: Social[];
}

interface Link {
  href: string;
  title: string;
}

interface Social {
  href: string;
  title: string;
}

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

export default async function HomePage() {
  const data: Data | undefined = await get("bionlinks");
  if (!data) {
    redirect("https://linktr.ee/afx.aep");
  }

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
      <div className="flex mt-12 gap-2">
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
            ) : social.href.includes("linkedin") ? (
              <LinkedInIcon />
            ) : null}
          </a>
        ))}
      </div>
    </div>
  );
}
