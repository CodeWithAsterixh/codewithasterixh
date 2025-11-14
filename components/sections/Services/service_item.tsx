import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "d/components/ui/accordion";
import { Badge } from "d/components/ui/badge";
import { Button } from "d/components/ui/button";
import { arrayChunk } from "d/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

type Props = {
  item_id: string;
  label?: string;
  index: number;
  content?: {
    tags?: string[];
    description?: string;
    image?: string;
  };
};

export default function ServiceItem({ item_id, index, label, content }: Props) {
  const indexing = index > 10 ? index : "0" + index;
  return (
    <AccordionItem
      value={label || item_id}
      className="text-accent-content data-[state=closed]:bg-base-300/30 data-[state=closed]:backdrop-blur-3xl !border-1 !border-base-300 data-[state=open]:bg-base-300 duration-300 rounded-2xl pt-2 pb-0 px-4 sm:px-16 "
    >
      <AccordionTrigger
        addIcon={false}
        className="flex justify-between data-[state=closed]:[--rotation:90deg] data-[state=open]:[--rotation:-360deg]"
      >
        <strong className="font-bold w-[10%] text-xl sm:text-2xl sm:w-25 shrink-0">
          {indexing}
        </strong>
        <em className="font-normal text-xl sm:text-2xl not-italic w-full">
          {label}
        </em>
        <Button size={"icon"} as="span" className="rounded-full">
          <ArrowUpRight className="text-base-100 scale-110 rotate-[var(--rotation)] duration-300" />
        </Button>
      </AccordionTrigger>
      <AccordionContent className="sm:pl-25 flex flex-col gap-3 pb-0">
        <div className="w-fit flex flex-col gap-2">
          {arrayChunk(content?.tags || [], 2)?.map((tags, idx) => (
            <div key={idx} className="w-fit flex flex-wrap gap-2">
              {tags.map((tag, idx) => (
                <Badge
                  key={idx}
                  variant={"secondary"}
                  className="px-4 py-2 rounded-full"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          ))}
        </div>
        <p className="max-w-md leading-loose pb-3">{content?.description}</p>
        {content?.image && (
          <span className="w-full sm:w-3/4 sm:max-w-2xl border-5 border-double border-background !border-b-0 overflow-hidden rounded-t-lg h-72">
            <Image
              src={content.image}
              alt={`Image for ${label}`}
              width={1024}
              height={1440}
              className="size-full object-cover object-center"
              quality={100}
            />
          </span>
        )}
      </AccordionContent>
    </AccordionItem>
  );
}
