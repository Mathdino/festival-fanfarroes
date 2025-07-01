"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Calendar, Clock, Users, FileText, DollarSign } from "lucide-react"
import HorariosScreen from "@/components/horarios-screen"
import RegrasScreen from "@/components/regras-screen"
import EscalacoesScreen from "@/components/escalacoes-screen"
import PagamentosScreen from "@/components/pagamentos-screen"

export default function FestivalApp() {
  const [activeScreen, setActiveScreen] = useState("home")

  const renderScreen = () => {
    switch (activeScreen) {
      case "home":
        return <HomeScreen />
      case "horarios":
        return <HorariosScreen />
      case "regras":
        return <RegrasScreen />
      case "escalacoes":
        return <EscalacoesScreen />
      case "pagamentos":
        return <PagamentosScreen />
      default:
        return <HomeScreen />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 pb-20">
      {renderScreen()}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="flex justify-around py-2">
          <Button
            variant={activeScreen === "home" ? "default" : "ghost"}
            className="flex flex-col items-center gap-1 h-auto py-2 px-3"
            onClick={() => setActiveScreen("home")}
          >
            <Users className="w-5 h-5" />
            <span className="text-xs">Início</span>
          </Button>
          <Button
            variant={activeScreen === "horarios" ? "default" : "ghost"}
            className="flex flex-col items-center gap-1 h-auto py-2 px-3"
            onClick={() => setActiveScreen("horarios")}
          >
            <Clock className="w-5 h-5" />
            <span className="text-xs">Horários</span>
          </Button>
          <Button
            variant={activeScreen === "regras" ? "default" : "ghost"}
            className="flex flex-col items-center gap-1 h-auto py-2 px-3"
            onClick={() => setActiveScreen("regras")}
          >
            <FileText className="w-5 h-5" />
            <span className="text-xs">Regras</span>
          </Button>
          <Button
            variant={activeScreen === "escalacoes" ? "default" : "ghost"}
            className="flex flex-col items-center gap-1 h-auto py-2 px-3"
            onClick={() => setActiveScreen("escalacoes")}
          >
            <Calendar className="w-5 h-5" />
            <span className="text-xs">Escalações</span>
          </Button>
          <Button
            variant={activeScreen === "pagamentos" ? "default" : "ghost"}
            className="flex flex-col items-center gap-1 h-auto py-2 px-3"
            onClick={() => setActiveScreen("pagamentos")}
          >
            <DollarSign className="w-5 h-5" />
            <span className="text-xs">Pagamentos</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

function HomeScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <Card className="w-full max-w-md p-8 text-center bg-white/90 backdrop-blur-sm shadow-xl">
        <div className="mb-6">
          <Image
            src="/escudo-fanfarroes.png"
            alt="Escudo Família Fanfarrões"
            width={150}
            height={150}
            className="mx-auto mb-4"
          />
        </div>
        <h1 className="text-2xl font-bold text-green-800 mb-2">FESTIVAL FAMÍLIA FANFARRÕES</h1>
        <p className="text-green-600 mb-4">Futebol Society</p>
        <div className="bg-green-100 p-4 rounded-lg">
          <p className="text-green-800 font-semibold">📅 01 de Agosto de 2025</p>
          <p className="text-green-700">🕖 7h às 13h</p>
          <p className="text-green-700">⚽ 12 Equipes - 6 Jogos</p>
        </div>
      </Card>
    </div>
  )
}
