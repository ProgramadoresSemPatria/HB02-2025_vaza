import { Gallery4 } from "@/components/blocks/gallery4";

const demoData = {
  title: "Destinos em Destaque",
  description:
    "Nossa IA analisa seu perfil e te ajuda a encontrar o destino ideal. Descubra os países mais procurados e como nossa plataforma pode te auxiliar no processo.",
  items: [
    {
      id: "australia",
      title: "Austrália: Working Holiday Visa",
      description:
        "Ideal para jovens de 18 a 30 anos que querem combinar trabalho e turismo. Nossa IA avalia seus documentos e te orienta sobre os requisitos específicos.",
      href: "/dashboard/plan",
      image:
        "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxMjN8fHx8fHwyfHwxNzIzODA2OTM5fA&ixlib=rb-4.0.3&q=80&w=1080",
    },
    {
      id: "germany",
      title: "Alemanha: Blue Card EU",
      description:
        "Para profissionais qualificados que buscam estabilidade na Europa. Nossa IA analisa sua formação e experiência para otimizar sua candidatura.",
      href: "/dashboard/plan",
      image:
        "https://images.unsplash.com/photo-1560969184-10fe8719e047?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxMjR8fHx8fHwyfHwxNzIzODA2OTM5fA&ixlib=rb-4.0.3&q=80&w=1080",
    },
    {
      id: "canada",
      title: "Canadá: Express Entry",
      description:
        "Sistema de pontuação complexo que nossa IA domina perfeitamente. Analisamos seu perfil e te mostramos como maximizar suas chances de aprovação.",
      href: "/dashboard/plan",
      image:
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxNzd8fHx8fHwyfHwxNzIzNjM0NDc0fA&ixlib=rb-4.0.3&q=80&w=1080",
    },
    {
      id: "new-zealand",
      title: "Nova Zelândia: Skilled Migrant",
      description:
        "Destino com qualidade de vida excepcional. Nossa IA identifica as melhores oportunidades baseadas no seu perfil profissional e objetivos.",
      href: "/dashboard/plan",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxMzF8fHx8fHwyfHwxNzIzNDM1MzA1fA&ixlib=rb-4.0.3&q=80&w=1080",
    },
    {
      id: "ireland",
      title: "Irlanda: Critical Skills",
      description:
        "Rota rápida para residência permanente. Nossa IA avalia se sua área está em alta demanda e te orienta sobre os próximos passos.",
      href: "/dashboard/plan",
      image:
        "https://images.unsplash.com/photo-1550070881-a5d71eda5800?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxMjV8fHx8fHwyfHwxNzIzNDM1Mjk4fA&ixlib=rb-4.0.3&q=80&w=1080",
    },
    {
      id: "netherlands",
      title: "Holanda: Highly Skilled Migrant",
      description:
        "Benefícios fiscais e excelente qualidade de vida. Nossa IA analisa seu perfil e te mostra como se qualificar para este programa.",
      href: "/dashboard/plan",
      image:
        "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxMjV8fHx8fHwyfHwxNzIzNDM1Mjk4fA&ixlib=rb-4.0.3&q=80&w=1080",
    },
  ],
};

function Gallery4Demo() {
  return <Gallery4 {...demoData} />;
}

export { Gallery4Demo };
