import { Badge } from 'd/components/ui/badge';

type Props = {
    name:string;
    title:string;
    duration:{
        from:number;
        to:number
    }
}

export default function ExperienceItem({duration,name,title}: Readonly<Props>) {
  return (
    <li className='w-full flex items-center gap-3'>
        {/* info */}
        <div className="w-full flex flex-col gap-2">
            <strong className='text-lg sm:text-xl'>{name}</strong>
            <em className='text-base sm:text-lg not-italic'>{title}</em>
        </div>
        {/* duration */}
        <Badge className='bg-base-content text-base-300 px-4 py-2 h-fit text-sm sm:text-base rounded-full'>{duration.from}-{duration.to}</Badge>
    </li>
  )
}