import { socials } from "d/assets/constant_data/socials.data";
import { HoveredElement } from "d/components/HoveredElement";
import Logo from "d/components/SmallItems/logo";
import Line from "d/components/ui/line";
import {
  ArrowUp,
  Mail,
  PhoneCall
} from "lucide-react";
import { DynamicIcon } from "lucide-react/dynamic";


export default function Footer() {
  return (
    <footer className="w-full isolate bg-base-300 pb-0 pt-14 flex flex-col gap-8">
      <section className="w-full px-4 sm:px-0 sm:max-w-[90dvw] xl:max-w-6xl mx-auto flex flex-col gap-8">
        {/* heading */}
        <div className="w-full flex flex-col gap-5 min-[498px]:gap-4 min-[498px]:flex-row items-center justify-between">
          <h3 className="text-2xl sm:text-3xl md:text-5xl w-fit text-center">
            Let&apos;s <em className="font-bitcount text-primary">Connect</em> there
          </h3>
          <button className="w-fit cursor-pointer isolate p-[2px] bg-accent rounded-full flex items-center justify-center gap-2 h-full">
            <strong className="p-3 bg-base-300 rounded-full h-full flex items-center">
              Contact Us
            </strong>
            <HoveredElement
              as="span"
              hoveredClass={{
                true: "*:animate-bounce",
              }}
              className="bg-secondary border-4 border-base-300 box-border rotate-90 p-2 flex items-center justify-center rounded-full h-full aspect-square"
            >
              <ArrowUp className="size-full duration-300 text-secondary-content" />
            </HoveredElement>
          </button>
        </div>
        <Line />

        {/* content */}

        <section className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4">
          <article className="w-full flex flex-col gap-4">
            <Logo />
            <p className="text-sm text-accent-content">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet
              at assumenda numquam odio qui eius soluta totam atque officia
              ducimus!
            </p>
            <nav className="w-full flex gap-2">
              {socials.map((nav, idx) => (
                <HoveredElement
                  aria-label={nav.name}
                  key={idx}
                  as="a"
                  href={nav.href}
                  target={nav.href.startsWith("#") ? undefined : "_blank"}
                  className="w-fit p-2 text-accent-content flex items-center gap-2 size-10 rounded-full"
                  hoveredClass={{
                    true: "bg-neutral/70",
                    false: "bg-neutral",
                  }}
                >
                  <DynamicIcon className="size-full" name={nav.icon} />
                </HoveredElement>
              ))}
            </nav>
          </article>
          <article>
            <h3 className="font-bold text-secondary text-2xl">Contact</h3>
            <p className="text-sm text-accent-content/80">
              Feel free to reach out to me via email or phone.
            </p>
            <ul className="flex flex-col gap-2 mt-4">
              <li className="w-fit">
                <HoveredElement
                  as="a"
                  href="mailto:peterpaultolulope@gmail.com"
                  hoveredClass={{
                    true: "text-accent-content/80",
                    false: "text-accent-content",
                  }}
                  className="flex items-center gap-2"
                >
                  <Mail className="size-4 !text-accent-content" />
                  <span>peterpaultolulope@gmail.com</span>
                </HoveredElement>
              </li>
              <li className="w-fit">
                <HoveredElement
                  as="a"
                  href="tel:+2348109080838"
                  hoveredClass={{
                    true: "text-accent-content/80",
                    false: "text-accent-content",
                  }}
                  className="flex items-center gap-2"
                >
                  <PhoneCall className="size-4 !text-accent-content" />
                  <span>+234 810 908 0838</span>
                </HoveredElement>
              </li>
            </ul>
          </article>
        </section>
      </section>
      {/* copyright and terms of service and policy */}
      <section className="w-full bg-black pb-28 pt-10 md:pb-7">
        <div className="w-full sm:max-w-[90dvw] xl:max-w-6xl mx-auto flex flex-col-reverse sm:flex-row items-center justify-between gap-8">
          <p className="text-sm text-accent-content">
            © {new Date().getFullYear()} Peter Paul. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <HoveredElement
              as="a"
              href="/terms-of-service"
              className="text-sm text-accent-content hover:text-accent-content/80"
            >
              Terms of Service
            </HoveredElement>
            <span>|</span>
            <HoveredElement
              as="a"
              href="/privacy-policy"
              className="text-sm text-accent-content hover:text-accent-content/80"
            >
              Privacy Policy
            </HoveredElement>
          </div>
        </div>
      </section>
    </footer>
  );
}
