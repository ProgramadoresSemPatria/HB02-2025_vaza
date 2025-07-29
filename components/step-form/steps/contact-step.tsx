import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ContactStepProps {
  name: string;
  email: string;
  phone: string;
  onUpdate: (field: string, value: string) => void;
}

export const ContactStep = ({
  name,
  email,
  phone,
  onUpdate,
}: ContactStepProps) => (
  <div className="space-y-6">
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-2">Seus dados de contato</h2>
      <p className="text-gray-600">Para criarmos seu plano personalizado</p>
    </div>
    <div className="space-y-4">
      <div>
        <Label htmlFor="name">Nome completo *</Label>
        <Input
          id="name"
          placeholder="Seu nome"
          value={name}
          onChange={(e) => onUpdate("name", e.target.value)}
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => onUpdate("email", e.target.value)}
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="phone">Telefone *</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="(11) 99999-9999"
          value={phone}
          onChange={(e) => onUpdate("phone", e.target.value)}
          className="mt-1"
        />
      </div>
    </div>
  </div>
);
