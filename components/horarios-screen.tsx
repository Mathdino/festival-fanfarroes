import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Users } from "lucide-react"

export default function HorariosScreen() {
  const jogos = [
    { id: 1, horario: "08:00 - 09:00", equipes: "FANFARRÕES B x JNG FC" },
    { id: 2, horario: "09:00 - 10:00", equipes: "FANFARRÕES C x RESSACA FC" },
    { id: 3, horario: "10:00 - 11:00", equipes: "FANFARRÕES D x SÓ GELADA A" },
    { id: 4, horario: "11:00 - 12:00", equipes: "FANFARRÕES A x SÓ GELADA B" },
    { id: 5, horario: "12:00 - 13:00", equipes: "FANFARRÕES E x SÓ GELADA C" },
  ]

  return (
    <div className="p-4 space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-primary mb-2">Horários dos Jogos</h2>
        <p className="text-primary/70">03 de Agosto de 2025</p>
      </div>

      <div className="space-y-3">
        {jogos.map((jogo) => (
          <Card key={jogo.id} className="bg-white/90 backdrop-blur-sm shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div>
                    <p className="font-semibold text-primary">Jogo {jogo.id}</p>
                    <p className="text-sm text-gray-600">{jogo.horario}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-primary/80">{jogo.equipes}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="text-primary text-lg">Formato dos Jogos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-primary/80">
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
