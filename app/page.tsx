"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Calendar, Clock, Users, FileText, DollarSign, Trophy } from "lucide-react"
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
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-primary/10 pb-20">
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
    <div className="flex flex-col min-h-screen bg-white items-center justify-center">
      {/* Imagem do topo com escudo e nome */}
      <div className="w-full flex justify-center items-center">
        <Image
          src="/Parte1.png"
          alt="Topo Família Fanfarrões"
          width={600}
          height={300}
          className="object-contain"
          priority
        />
      </div>
      {/* Imagem inferior com informações do festival */}
      <div className="w-full flex justify-center items-center relative">
        <Image
          src="/Parte2.png"
          alt="Informações Festival Família Fanfarrões"
          width={600}
          height={600}
          className="object-contain"
        />
        {/* Informações sobrepostas */}
        <div className="absolute left-0 w-full h-full flex flex-col items-center justify-center pointer-events-none" style={{ top: '30%' }}>
          <div className="space-y-3 rounded-xl px-6 py-5">
            <div className="flex items-center gap-2 justify-center">
              <Calendar className="w-6 h-6 text-white" />
              <span className="text-lg md:text-xl font-bold text-white">03 de Agosto de 2025</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <Clock className="w-6 h-6 text-white" />
              <span className="text-lg md:text-xl font-bold text-white">7 h às 13 h</span>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <Trophy className="w-6 h-6 text-white" />
              <span className="text-lg md:text-xl font-bold text-white">12 Equipes <span className="mx-1">•</span> 6 Jogos</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
