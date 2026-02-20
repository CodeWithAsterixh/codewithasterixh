import React from "react";
import { ContactInfo } from "./ContactInfo/ContactInfo";
import { ContactForm } from "./ContactForm/ContactForm";

export const Contact: React.FC = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 md:px-8 pb-12 pt-12 md:pt-24">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-24">
         {/* Left Column: Contact Info */}
         <div className="col-span-1">
            <ContactInfo />
         </div>

         {/* Right Column: Form */}
         <div className="col-span-1 lg:col-span-2">
            <ContactForm titleAs="h1" />
         </div>
      </div>
    </main>
  );
};
