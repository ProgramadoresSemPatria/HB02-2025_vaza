"use client";

import { Card } from "@/components/ui/card";

export const TestimonialSection = () => {
  return (
    <section className="w-full bg-background">
      <div className="container mx-auto w-full max-w-7xl px-12 py-32 md:px-16">
        <Card className="bg-blue-600 text-white flex flex-col w-full rounded-lg md:rounded-xl pt-[7.25rem] pb-16 px-[1.873rem] md:px-[calc((2/21)*100%)] gap-[5.5rem] border-blue-600">
          <blockquote>
            <span className="block text-2xl md:text-4xl font-semibold leading-tight">
              &quot;The Vaza platform has completely revolutionized our travel
              planning process. The ease of finding destinations and organizing
              visa documents has saved us weeks of work.&quot;
            </span>
          </blockquote>

          <figcaption className="w-full flex flex-col-reverse justify-between items-start md:flex-row">
            <div className="flex flex-row md:items-center gap-6">
              <div className="flex flex-col">
                <span className="text-body-1 text-white">Maria Silva</span>
                <span className="text-body-2 text-white/80">
                  Corporate Travel Manager
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center text-center">
              <span className="text-2xl font-bold text-white mb-2">★★★★★</span>
              <span className="text-sm text-white/80">Rating 5.0</span>
            </div>
          </figcaption>
        </Card>
      </div>
    </section>
  );
};

export default TestimonialSection;
