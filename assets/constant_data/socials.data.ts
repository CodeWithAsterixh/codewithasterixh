import { dynamicIconImports } from "lucide-react/dynamic";

type social = {
  name: string;
  href: string;
  icon: keyof typeof dynamicIconImports;
};

export const socials: social[] = [
  {
    name: "Facebook",
    href: "#",
    icon: "facebook",
  },
  {
    name: "Instagram",
    href: "#",
    icon: "instagram",
  },
  {
    name: "GitHub",
    href: "#",
    icon: "github",
  },
  {
    name: "Twitter",
    href: "#",
    icon: "twitter",
  },
];
