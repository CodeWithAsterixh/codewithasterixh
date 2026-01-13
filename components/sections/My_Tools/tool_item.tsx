import { HoveredElement } from "d/components/HoveredElement";
import { cn } from "d/lib/utils";
import StackIcon, { IconName } from "tech-stack-icons";

type Props = {
  index: number;
  tool?: string;
  percentage?: number;
  icon?: IconName;
};

export default function ToolItem({ index, icon, percentage, tool }: Readonly<Props>) {
  const isEven = index % 2 === 0;
  return (
    <li className="w-full not-last:![--tr:0] last:![--tr:calc(infinity_*_1px)] max-w-50 sm:max-w-30 flex flex-col gap-3 text-accent-content items-center even:[--position:]">
      {/* box */}
      <div
        className={cn(
          "w-full bg-gradient-to-b from-base-300/70 via-80% to-primary/10 border py-7 border-base-100 rounded-full flex flex-col items-center gap-3",
          {
            "!rounded-tl-none": isEven,
            "!rounded-tr-[var(--tr)]": !isEven,
          }
        )}
      >
        {isEven}
        <span className="size-20 rounded-full bg-gradient-to-t from-base-300/10 to-primary/10 box-border flex items-center justify-center">
          {icon && (
            <HoveredElement asChild className="size-[70%] duration-500" hoveredClass={{
                true:"grayscale-0",
                false:"grayscale-100"
            }}>
              <StackIcon name={icon} variant="dark" />
            </HoveredElement>
          )}
        </span>
        <strong className="text-xs">{tool}</strong>
      </div>
      {/* value */}
      <strong>{percentage}%</strong>
    </li>
  );
}
