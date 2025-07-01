import { useEffect, useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Copy, Check, DollarSign, Users, Send } from "lucide-react"

const PIX_KEY = "msilva24624@gmail.com"
const WHATSAPP_NUMBER = "5511947897643"

export default function PagamentosScreen() {
  const [times, setTimes] = useState<any[]>([])
  const [copied, setCopied] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [nomePagador, setNomePagador] = useState("")
  const [nomeTime, setNomeTime] = useState("")
  const [selectedTimeId, setSelectedTimeId] = useState<number | null>(null)
  const [comprovante, setComprovante] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetch("/api/times")
      .then((res) => res.json())
      .then(setTimes)
  }, [])

  const handleCopyPix = () => {
    navigator.clipboard.writeText(PIX_KEY)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const openModal = (time: any) => {
    setNomeTime(time.nome)
    setSelectedTimeId(time.id)
    setModalOpen(true)
  }

  const handleSendWhatsapp = () => {
    const msg = `Comprovante de pagamento do Festival Fanfarrões|\nNome do pagador: ${nomePagador}| \nTime: ${nomeTime}`
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
    window.open(url, "_blank")
    setModalOpen(false)
    // Atualiza status para "parcial"
    fetch("/api/times", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: selectedTimeId, statusPagamento: "parcial" })
    })
    // Enviar comprovante para backend (opcional)
    if (comprovante) {
      const formData = new FormData()
      formData.append("file", comprovante)
      formData.append("timeId", String(selectedTimeId))
      fetch("/api/comprovantes", {
        method: "POST",
        body: formData
      })
    }
    setComprovante(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  return (
    <div className="p-4 space-y-4">
      <Card className="bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-green-800">Pagamentos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 p-3 bg-green-50 border-l-4 border-green-400 rounded">
            <p className="mb-1 font-semibold">Pagamento em 2 etapas:</p>
            <ul className="list-disc ml-6 text-sm mb-2">
              <li>50% (R$ 100) na inscrição do time</li>
              <li>50% (R$ 100) na última semana antes do festival</li>
            </ul>
            <p className="mb-1 text-sm">Caso o time desista após a inscrição, perde os 50% já pagos.</p>
          </div>
          <p className="mb-4">Confira o nome do time e jogadores cadastrados. Para pagar, copie o pix abaixo e envie o comprovante pelo WhatsApp.</p>
          <div className="mb-4 flex flex-col sm:flex-row gap-2 items-stretch">
            <Input value={PIX_KEY} readOnly className="w-full sm:w-auto flex-1" />
            <Button onClick={handleCopyPix} variant="outline" className="w-full sm:w-auto whitespace-nowrap">
              {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />} Copiar Pix
            </Button>
          </div>
          <div className="space-y-4">
            {times.map((time) => (
              <Card key={time.id} className="bg-green-50 border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-800 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    {time.nome}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-2">
                    <span className="font-semibold">Jogadores:</span>
                    <ul className="list-disc ml-6">
                      {time.jogadores.map((j: any) => (
                        <li key={j.id}>{j.nome} (Nº {j.numero})</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Button onClick={() => openModal(time)}>
                      <Send className="w-4 h-4 mr-1" /> Enviar comprovante (WhatsApp)
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enviar comprovante</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Nome completo do pagador"
              value={nomePagador}
              onChange={e => setNomePagador(e.target.value)}
            />
            <Input
              placeholder="Nome do time"
              value={nomeTime}
              onChange={e => setNomeTime(e.target.value)}
            />
            <input
              type="file"
              accept="image/*,application/pdf"
              ref={fileInputRef}
              onChange={e => setComprovante(e.target.files?.[0] || null)}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
            />
            <Button className="w-full" onClick={handleSendWhatsapp}>
              Enviar e atualizar status
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 