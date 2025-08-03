import { Gallery4 } from "@/components/blocks/gallery4";

const demoData = {
  title: "Featured Destinations",
  description:
    "Our AI analyzes your profile and helps you find the ideal destination. Discover the most sought-after countries and how our platform can assist you in the process.",
  items: [
    {
      id: "australia",
      title: "Australia: Working Holiday Visa",
      description:
        "Ideal for young people aged 18 to 30 who want to combine work and tourism. Our AI evaluates your documents and guides you through specific requirements.",
      href: "/dashboard/plan",
      image:
        "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxMjN8fHx8fHwyfHwxNzIzODA2OTM5fA&ixlib=rb-4.0.3&q=80&w=1080&auto=format&fit=crop&w=1080&q=80&sat=-50&brightness=-20",
    },
    {
      id: "germany",
      title: "Germany: Blue Card EU",
      description:
        "For qualified professionals seeking stability in Europe. Our AI analyzes your education and experience to optimize your application.",
      href: "/dashboard/plan",
      image:
        "https://images.unsplash.com/photo-1560969184-10fe8719e047?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxMjR8fHx8fHwyfHwxNzIzODA2OTM5fA&ixlib=rb-4.0.3&q=80&w=1080&auto=format&fit=crop&w=1080&q=80&sat=-50&brightness=-30",
    },
    {
      id: "canada",
      title: "Canada: Express Entry",
      description:
        "Complex scoring system that our AI masters perfectly. We analyze your profile and show you how to maximize your approval chances.",
      href: "/dashboard/plan",
      image:
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxNzd8fHx8fHwyfHwxNzIzNjM0NDc0fA&ixlib=rb-4.0.3&q=80&w=1080&auto=format&fit=crop&w=1080&q=80&sat=-50&brightness=-25",
    },
    {
      id: "new-zealand",
      title: "New Zealand: Skilled Migrant",
      description:
        "Destination with exceptional quality of life. Our AI identifies the best opportunities based on your professional profile and goals.",
      href: "/dashboard/plan",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxMzF8fHx8fHwyfHwxNzIzNDM1MzA1fA&ixlib=rb-4.0.3&q=80&w=1080&auto=format&fit=crop&w=1080&q=80&sat=-50&brightness=-20",
    },
    {
      id: "ireland",
      title: "Ireland: Critical Skills",
      description:
        "Fast track to permanent residence. Our AI evaluates if your field is in high demand and guides you through the next steps.",
      href: "/dashboard/plan",
      image:
        "https://images.unsplash.com/photo-1550070881-a5d71eda5800?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxMjV8fHx8fHwyfHwxNzIzNDM1Mjk4fA&ixlib=rb-4.0.3&q=80&w=1080&auto=format&fit=crop&w=1080&q=80&sat=-50&brightness=-30",
    },
    {
      id: "netherlands",
      title: "Netherlands: Highly Skilled Migrant",
      description:
        "Tax benefits and excellent quality of life. Our AI analyzes your profile and shows you how to qualify for this program.",
      href: "/dashboard/plan",
      image:
        "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxMjV8fHx8fHwyfHwxNzIzNDM1Mjk4fA&ixlib=rb-4.0.3&q=80&w=1080&auto=format&fit=crop&w=1080&q=80&sat=-50&brightness=-25",
    },
  ],
};

function Gallery4Demo() {
  return <Gallery4 {...demoData} />;
}

export { Gallery4Demo };
