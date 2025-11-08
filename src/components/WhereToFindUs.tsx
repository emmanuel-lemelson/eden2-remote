import Image from "next/image";
import Link from "next/link";

interface Platform {
  name: string;
  href: string;
  logo: string;
  alt: string;
  bgColor: string;
  hoverBgColor?: string;
  borderColor?: string;
  hoverBorderColor?: string;
  logoWidth: number;
  logoHeight: number;
  logoClassName?: string;
}

const platforms: Platform[] = [
  {
    name: "Airbnb",
    href: "https://www.airbnb.com/rooms/42793723?guests=1&adults=1&s=67&unique_share_id=ba8163d3-af1e-4825-ba7d-15abbe902ec4",
    logo: "/Airbnb_Logo_0.svg",
    alt: "Airbnb",
    bgColor: "bg-[#FF385C]",
    hoverBgColor: "hover:bg-[#FF4C6E]",
    logoWidth: 60,
    logoHeight: 20,
    logoClassName: "h-5 w-auto sm:h-6",
  },
  {
    name: "Vrbo",
    href: "https://www.vrbo.com/1958794?referrerId=HOT.HIS.Share.Landed.Copy_Link",
    logo: "/Vrbo_idJM8XKT4-_1.svg",
    alt: "Vrbo",
    bgColor: "bg-white",
    hoverBgColor: "hover:bg-stone-100",
    logoWidth: 60,
    logoHeight: 20,
    logoClassName: "h-6 w-auto sm:h-7",
  },
  {
    name: "Expedia",
    href: "https://www.expedia.com/Stowe-Hotels-Private-Luxury-Estate.h51018966.Hotel-Information?referrerId=HOT.HIS.Share.Landed.Copy_Link",
    logo: "/Expedia_Logo_1.png",
    alt: "Expedia",
    bgColor: "bg-[#141D38]",
    hoverBgColor: "hover:bg-[#1D2A52]",
    logoWidth: 112,
    logoHeight: 25,
    logoClassName: "h-auto w-auto",
  },
  {
    name: "The Knot",
    href: "https://www.theknot.com/marketplace/edenthe-lemelson-estate-stowe-vt-2087322",
    logo: "/idzSo3ACCf_logos.jpeg",
    alt: "The Knot",
    bgColor: "bg-[#FF44CB]",
    logoWidth: 40,
    logoHeight: 40,
    logoClassName: "h-6 w-6 rounded-md object-cover sm:h-7 sm:w-7",
  },
  {
    name: "Zola",
    href: "https://www.zola.com/wedding-vendors/wedding-venues/eden-the-lemelson-estate",
    logo: "/id56oBQafI_1758992156050.png",
    alt: "Zola",
    bgColor: "bg-white",
    borderColor: "border-white",
    hoverBorderColor: "hover:border-white/80",
    logoWidth: 88,
    logoHeight: 24,
    logoClassName: "h-5 w-auto sm:h-7",
  },
  {
    name: "WeddingWire",
    href: "https://www.weddingwire.com/biz/eden-the-lemelson-estate/393d590ddd940149.html",
    logo: "/WeddingWire_idGDCwR69F_1.svg",
    alt: "WeddingWire",
    bgColor: "bg-white",
    borderColor: "border-white",
    hoverBgColor: "hover:bg-[#F3FBFB]",
    logoWidth: 112,
    logoHeight: 28,
    logoClassName: "h-5 w-auto sm:h-6 max-w-full object-contain",
  },
];

interface WhereToFindUsProps {
  title?: string;
  className?: string;
  containerClassName?: string;
}

export function WhereToFindUs({ 
  title = "Where to Find Us",
  className = "",
  containerClassName = ""
}: WhereToFindUsProps) {
  return (
    <div className={`flex flex-col items-center gap-6 text-center text-stone-900 md:gap-8 ${className}`}>
      <p className="text-sm font-semibold uppercase tracking-[0.35em] text-stone-800 sm:text-base md:text-lg">
        {title}
      </p>
      <div className={`grid w-full max-w-4xl grid-cols-3 justify-items-center gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 sm:gap-5 ${containerClassName}`}>
        {platforms.map((platform) => (
          <Link
            key={platform.name}
            href={platform.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex w-full max-w-[120px] items-center justify-center rounded-full px-3 py-2.5 shadow-lg shadow-black/10 transition-colors transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-xl sm:max-w-none sm:px-6 sm:py-3 ${platform.bgColor} ${platform.hoverBgColor || ""} ${platform.borderColor ? `border ${platform.borderColor}` : ""} ${platform.hoverBorderColor || ""}`}
            aria-label={`View Eden on ${platform.name}`}
          >
            <Image
              src={platform.logo}
              alt={platform.alt}
              className={platform.logoClassName}
              width={platform.logoWidth}
              height={platform.logoHeight}
              loading="lazy"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
