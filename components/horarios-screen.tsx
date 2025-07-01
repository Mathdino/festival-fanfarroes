import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Users } from "lucide-react"

export default function HorariosScreen() {
  const jogos = [
    { id: 1, horario: "07:00 - 08:00", equipes: "Equipe A vs Equipe B" },
    { id: 2, horario: "08:00 - 09:00", equipes: "Equipe C vs Equipe D" },
    { id: 3, horario: "09:00 - 10:00", equipes: "Equipe E vs Equipe F" },
    { id: 4, horario: "10:00 - 11:00", equipes: "Equipe G vs Equipe H" },
    { id: 5, horario: "11:00 - 12:00", equipes: "Equipe I vs Equipe J" },
    { id: 6, horario: "12:00 - 13:00", equipes: "Equipe K vs Equipe L" },
  ]

  return (
    <div className="p-4 space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-green-800 mb-2">Horários dos Jogos</h2>
        <p className="text-green-600">01 de Agosto de 2025</p>
      </div>

      <div className="space-y-3">
        {jogos.map((jogo) => (
          <Card key={jogo.id} className="bg-white/90 backdrop-blur-sm shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Clock className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-green-800">Jogo {jogo.id}</p>
                    <p className="text-sm text-gray-600">{jogo.horario}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-green-600" />
                    <p className="text-sm font-medium text-green-700">{jogo.equipes}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-green-800 text-lg">Formato dos Jogos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-green-700">
          <p>• 1º Tempo: 20 minutos</p>
          <p>• Intervalo: 10 minutos</p>
          <p>• 2º Tempo: 20 minutos</p>
          <p>• Troca de equipes: 10 minutos</p>
          <p>• Em caso de empate: Pênaltis (5 de cada lado)</p>
        </CardContent>
      </Card>
    </div>
  )
}
