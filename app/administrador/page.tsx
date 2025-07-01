"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, DollarSign, CheckCircle, Eye } from "lucide-react"

interface Time {
  id: number
  nome: string
  statusPagamento?: string
  pagador?: string
  comprovanteUrl?: string
}

export default function AdminPage() {
  const [times, setTimes] = useState<Time[]>([])

  useEffect(() => {
    fetch("/api/times")
      .then((res) => res.json())
      .then(setTimes)
  }, [])

  // Buscar comprovantes e pagador (mock, ideal seria vir do backend)
  // Aqui, para cada time, buscar o comprovante e pagador se existir
  // (No backend real, esses dados viriam juntos do GET /api/times)

  const updateStatus = (id: number, status: string) => {
    fetch("/api/times", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, statusPagamento: status })
    }).then(() => {
      setTimes(times => times.map(t => t.id === id ? { ...t, statusPagamento: status } : t))
    })
  }

  return (
    <div className="p-4 space-y-4">
      <Card className="bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-green-800">Administrador</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {times.map((time) => (
              <Card key={time.id} className="bg-green-50 border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-800 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    {time.nome}
                    {time.statusPagamento === "parcial" && <DollarSign className="w-5 h-5 text-yellow-500" />}
                    {time.statusPagamento === "pago" && <CheckCircle className="w-5 h-5 text-green-600" />}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-2">
                    <span className="font-semibold">Status: </span>
                    {time.statusPagamento === "pago" && <span className="text-green-700">Pago</span>}
                    {time.statusPagamento === "parcial" && <span className="text-yellow-700">Parcial</span>}
                    {!time.statusPagamento || time.statusPagamento === "nao_pago" ? <span className="text-red-700">Pendente</span> : null}
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold">Pagador: </span>
                    {time.pagador || <span className="text-gray-500">Não informado</span>}
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold">Comprovante: </span>
                    {time.comprovanteUrl ? (
                      <a href={time.comprovanteUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline flex items-center gap-1"><Eye className="w-4 h-4" />Visualizar</a>
                    ) : (
                      <span className="text-gray-500">Não enviado</span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Button onClick={() => updateStatus(time.id, "parcial")} variant={time.statusPagamento === "parcial" ? "default" : "outline"}>
                      Parcialmente Pago
                    </Button>
                    <Button onClick={() => updateStatus(time.id, "pago")} variant={time.statusPagamento === "pago" ? "default" : "outline"}>
                      Pago
                    </Button>
                    <Button onClick={() => updateStatus(time.id, "nao_pago")} variant={!time.statusPagamento || time.statusPagamento === "nao_pago" ? "default" : "outline"}>
                      Falta Pagamento
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 