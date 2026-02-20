import React from "react";
import { Card } from "@/components/ui/atoms/Card/Card";
import { Text } from "@/components/ui/atoms/Text/Text";
import { Button } from "@/components/ui/atoms/Button/Button";
import uiData from "@/data/ui.json";

export const CommentForm: React.FC = () => {
  return (
    <Card className="p-8 md:p-12 bg-[#1a1a1a] mt-12">
        <div className="mb-8">
            <Text variant="h3" weight="bold" className="uppercase mb-2 text-white">{uiData.blog.comments.count}</Text>
            <Text variant="h4" weight="medium" className="uppercase text-white">{uiData.blog.comments.title}</Text>
        </div>

        <form className="flex flex-col gap-4">
            <textarea 
                placeholder={uiData.blog.comments.placeholders.message} 
                rows={6}
                className="w-full bg-[#212121] rounded-lg px-6 py-4 text-white placeholder-white/20 focus:outline-none focus:ring-1 focus:ring-white/10 resize-none text-sm"
            />
            <input 
                type="text" 
                placeholder={uiData.blog.comments.placeholders.name} 
                className="w-full bg-[#212121] rounded-lg px-6 py-4 text-white placeholder-white/20 focus:outline-none focus:ring-1 focus:ring-white/10 text-sm"
            />
            <input 
                type="email" 
                placeholder={uiData.blog.comments.placeholders.email} 
                className="w-full bg-[#212121] rounded-lg px-6 py-4 text-white placeholder-white/20 focus:outline-none focus:ring-1 focus:ring-white/10 text-sm"
            />
            
            <div className="mt-4">
                <Button variant="primary" size="lg" className="w-full py-4 text-sm uppercase tracking-wider bg-accent hover:bg-white hover:text-black font-medium">
                    {uiData.blog.comments.button}
                </Button>
            </div>
        </form>
    </Card>
  );
};
