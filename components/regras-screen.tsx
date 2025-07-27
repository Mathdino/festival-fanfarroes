import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Trophy, DollarSign, Clock, Users, Shield } from "lucide-react"

export default function RegrasScreen() {
  const regras = [
    {
      icon: <Users className="w-5 h-5" />,
      titulo: "Composição das Equipes",
      descricao:
        "Todos os times devem ter no mínimo 6 jogadores ou mais para reservas, pois os mesmos não poderão jogar em outros times.",
    },
    {
      icon: <Trophy className="w-5 h-5" />,
      titulo: "Número de Jogos",
      descricao: "Serão realizados 5 jogos, equivalendo a 10 equipes participantes.",
    },
    {
      icon: <Clock className="w-5 h-5" />,
      titulo: "Horário dos Jogos",
      descricao: "Os jogos começarão às 8:00 horas da manhã (ajustado conforme cronograma).",
    },
    {
      icon: <AlertCircle className="w-5 h-5" />,
      titulo: "Duração das Partidas",
      descricao: "Todos os jogos terão duração de 20x20 minutos com intervalo de 10 minutos entre cada tempo.",
    },
    {
      icon: <Trophy className="w-5 h-5" />,
      titulo: "Premiação",
      descricao:
        "Um troféu para o ganhador da partida. Se a partida terminar em empate, serão feitas cobranças de pênaltis (5 de cada lado).",
    },
    {
      icon: <DollarSign className="w-5 h-5" />,
      titulo: "Taxa de Participação",
      descricao: "Valor de R$ 200,00 para cada time participante.",
    },
    {
      icon: <Users className="w-5 h-5" />,
      titulo: "Idade Mínima",
      descricao: "Não há idade mínima para participação.",
    },
    {
      icon: <Shield className="w-5 h-5" />,
      titulo: "Arbitragem",
      descricao: "Haverá juiz em todos os jogos.",
    },
    {
      icon: <DollarSign className="w-5 h-5" />,
      titulo: "Pagamento em 2 etapas",
      descricao:
        "O pagamento da inscrição é feito em duas etapas: 50% na inscrição e 50% na última semana do festival.",
    },
    {
      icon: <DollarSign className="w-5 h-5" />,
      titulo: "Desistência do time",
      descricao:
        "Caso o time desista após a inscrição, perde os 50% já pagos.",
    },
    {
      icon: <Users className="w-5 h-5" />,
      titulo: "Substituição por lesão",
      descricao:
        "Se um jogador se machucar e não houver reserva, poderá ser substituído por outro atleta.",
    },
  ]

  return (
    <div className="p-4 space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-primary mb-2">Regras do Festival</h2>
        <p className="text-primary/70">Festival Família Fanfarrões 2025</p>
      </div>

      <div className="space-y-3">
        {regras.map((regra, index) => (
          <Card key={index} className="bg-white/90 backdrop-blur-sm shadow-md">
            <CardContent className="p-4">
              <div className="flex gap-3 items-center">
                <div className="flex-shrink-0 flex items-center justify-center bg-primary/10 rounded-full w-12 h-12">
                  <div className="text-primary flex items-center justify-center w-7 h-7">
                    {regra.icon}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-1">{regra.titulo}</h3>
                  <p className="text-sm text-gray-700">{regra.descricao}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-yellow-50 border-yellow-200">
        <CardHeader>
          <CardTitle className="text-yellow-800 text-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Observações Importantes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-yellow-800">
          <p>• Todos devem estar cientes dos horários estabelecidos durante o dia.</p>
          <p>• Manter coerência e respeito uns com os outros, principalmente com o juiz.</p>
          <p>• Cuidado com a saúde de cada participante.</p>
          <p>• A Família Fanfarrões agradece a participação de todos!</p>
        </CardContent>
      </Card>
    </div>
  )
}
