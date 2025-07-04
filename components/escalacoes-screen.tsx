"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Edit, Save, Users, Trash2, DollarSign } from "lucide-react";

interface Jogador {
  id: number;
  nome: string;
  numero: number;
  posicao: "titular" | "reserva";
  posicaoTitular?: number;
}

interface Time {
  id: number;
  nome: string;
  equipe: string;
  jogadores: Jogador[];
  statusPagamento?: string;
}

export default function EscalacoesScreen() {
  const [times] = useState<string[]>([
    "Equipe A",
    "Equipe B",
    "Equipe C",
    "Equipe D",
    "Equipe E",
    "Equipe F",
    "Equipe G",
    "Equipe H",
    "Equipe I",
    "Equipe J",
    "Equipe K",
    "Equipe L",
  ]);

  const [timeSelecionado, setTimeSelecionado] = useState<string>("");
  const [nomeTime, setNomeTime] = useState<string>("");
  const [jogadores, setJogadores] = useState<Jogador[]>([]);
  const [editandoJogador, setEditandoJogador] = useState<number | null>(null);
  const [novoJogador, setNovoJogador] = useState<{
    nome: string;
    numero: string;
    posicaoTitular?: number;
  }>({ nome: "", numero: "" });
  const [dialogAberto, setDialogAberto] = useState(false);
  const [timeId, setTimeId] = useState<number | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [timesCompletos, setTimesCompletos] = useState<Time[]>([]);

  const posicoesTitulares = [
    { id: 1, nome: "Goleiro", x: 50, y: 85 },
    { id: 2, nome: "Zagueiro", x: 30, y: 65 },
    { id: 3, nome: "Zagueiro", x: 70, y: 65 },
    { id: 4, nome: "Meio-Campo", x: 30, y: 40 },
    { id: 5, nome: "Meio-Campo", x: 70, y: 40 },
    { id: 6, nome: "Atacante", x: 50, y: 20 },
  ];

  // Carregar time existente ao selecionar equipe
  useEffect(() => {
    if (!timeSelecionado) {
      setNomeTime("");
      setJogadores([]);
      setTimeId(null);
      return;
    }
    setCarregando(true);
    fetch(`/api/times?equipe=${encodeURIComponent(timeSelecionado)}`)
      .then(async (res) => {
        if (!res.ok) throw new Error();
        const data = await res.json();
        if (data && data.id) {
          setNomeTime(data.nome);
          setJogadores(data.jogadores);
          setTimeId(data.id);
        } else {
          setNomeTime("");
          setJogadores([]);
          setTimeId(null);
        }
      })
      .catch(() => {
        setNomeTime("");
        setJogadores([]);
        setTimeId(null);
      })
      .finally(() => setCarregando(false));
  }, [timeSelecionado]);

  // Buscar times completos ao carregar tela ou ao salvar
  useEffect(() => {
    const fetchTimesCompletos = async () => {
      const res = await fetch("/api/times");
      if (res.ok) {
        const data = await res.json();
        setTimesCompletos(data);
      }
    };
    fetchTimesCompletos();
  }, [carregando]);

  const adicionarJogador = () => {
    if (!novoJogador.nome || !novoJogador.numero) return;

    const numero = Number.parseInt(novoJogador.numero);
    if (jogadores.some((j) => j.numero === numero)) {
      alert("Número de camisa já está em uso!");
      return;
    }

    const titulares = jogadores.filter((j) => j.posicao === "titular");
    const novoId = Math.max(0, ...jogadores.map((j) => j.id)) + 1;

    const novoJogadorObj: Jogador = {
      id: novoId,
      nome: novoJogador.nome,
      numero: numero,
      posicao: titulares.length < 6 ? "titular" : "reserva",
      posicaoTitular: titulares.length < 6 ? titulares.length + 1 : undefined,
    };

    setJogadores([...jogadores, novoJogadorObj]);
    setNovoJogador({ nome: "", numero: "" });
    setDialogAberto(false);
  };

  const editarJogador = (id: number, nome: string, numero: number) => {
    if (jogadores.some((j) => j.numero === numero && j.id !== id)) {
      alert("Número de camisa já está em uso!");
      return;
    }

    setJogadores(
      jogadores.map((j) => (j.id === id ? { ...j, nome, numero } : j))
    );
    setEditandoJogador(null);
  };

  const removerJogador = (id: number) => {
    const jogadoresAtualizados = jogadores.filter((j) => j.id !== id);

    // Reorganizar posições dos titulares
    const titulares = jogadoresAtualizados.filter(
      (j) => j.posicao === "titular"
    );
    const reservas = jogadoresAtualizados.filter(
      (j) => j.posicao === "reserva"
    );

    const jogadoresReorganizados = [
      ...titulares.map((j, index) => ({ ...j, posicaoTitular: index + 1 })),
      ...reservas.map((j) => ({ ...j, posicaoTitular: undefined })),
    ];

    setJogadores(jogadoresReorganizados);
  };

  const salvarEscalacao = async () => {
    if (!timeSelecionado || !nomeTime || jogadores.length === 0) {
      alert("Preencha todos os campos e adicione jogadores!");
      return;
    }
    setCarregando(true);
    try {
      const method = timeId ? "PUT" : "POST";
      const res = await fetch("/api/times", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: timeId,
          nome: nomeTime,
          equipe: timeSelecionado,
          jogadores: jogadores.map(
            ({ nome, numero, posicao, posicaoTitular }) => ({
              nome,
              numero,
              posicao,
              posicaoTitular: posicaoTitular ?? null,
            })
          ),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Erro ao salvar escalação!");
        return;
      }
      alert("Escalação salva com sucesso!");
      setNomeTime(data.nome);
      setJogadores(data.jogadores);
      setTimeId(data.id);
      setTimeSelecionado("");
    } catch (e) {
      alert("Erro ao salvar escalação!");
    } finally {
      setCarregando(false);
    }
  };

  const excluirTime = async (id: number, statusPagamento?: string) => {
    if (statusPagamento === "parcial") {
      alert(
        "Não é possível excluir um time parcialmente pago. Apenas alterar jogadores."
      );
      return;
    }
    if (!window.confirm("Tem certeza que deseja excluir este time?")) return;
    setCarregando(true);
    try {
      const res = await fetch("/api/times", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "Erro ao excluir time!");
      }
      setTimesCompletos((prev) => prev.filter((t) => t.id !== id));
      if (timeId === id) {
        setTimeSelecionado("");
        setNomeTime("");
        setJogadores([]);
        setTimeId(null);
      }
    } finally {
      setCarregando(false);
    }
  };

  // Função para abrir modal ao clicar na bolinha
  const abrirModalJogador = (jogador?: Jogador, posicaoTitularId?: number) => {
    if (jogador) {
      setEditandoJogador(jogador.id);
      setNovoJogador({ nome: jogador.nome, numero: jogador.numero.toString() });
    } else {
      setEditandoJogador(null);
      setNovoJogador({ nome: "", numero: "" });
      // Se for titular, já define a posição
      if (typeof posicaoTitularId === "number") {
        // Adiciona jogador já como titular na posição correta
        setNovoJogador((prev) => ({
          ...prev,
          posicaoTitular: posicaoTitularId,
        }));
      }
    }
    setDialogAberto(true);
  };

  // Função para salvar edição ou adição de jogador
  const salvarJogadorModal = () => {
    if (!novoJogador.nome || !novoJogador.numero) return;
    const numero = Number.parseInt(novoJogador.numero);
    // Verifica se o número já está em uso por outro jogador
    if (
      jogadores.some((j) => j.numero === numero && j.id !== editandoJogador)
    ) {
      alert("Número de camisa já está em uso!");
      return;
    }
    if (editandoJogador) {
      // Editar jogador existente
      setJogadores(
        jogadores.map((j) =>
          j.id === editandoJogador
            ? { ...j, nome: novoJogador.nome, numero }
            : j
        )
      );
    } else {
      // Adicionar novo jogador
      const titulares = jogadores.filter((j) => j.posicao === "titular");
      const novoId = Math.max(0, ...jogadores.map((j) => j.id)) + 1;
      const posicaoTitular =
        novoJogador.posicaoTitular ??
        (titulares.length < 6 ? titulares.length + 1 : undefined);
      const novoJogadorObj: Jogador = {
        id: novoId,
        nome: novoJogador.nome,
        numero,
        posicao: posicaoTitular ? "titular" : "reserva",
        posicaoTitular: posicaoTitular,
      };
      setJogadores([...jogadores, novoJogadorObj]);
    }
    setDialogAberto(false);
    setEditandoJogador(null);
    setNovoJogador({ nome: "", numero: "" });
  };

  return (
    <div className="p-4 space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-green-800 mb-2">Escalações</h2>
        <p className="text-green-600">Configure sua equipe</p>
      </div>

      {/* Times Completos */}
      {timesCompletos.length > 0 && (
        <Card className="mb-4 bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center gap-2">
              <Users className="w-5 h-5" /> Times Completos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {timesCompletos.map((time) => (
                <div
                  key={time.id}
                  className={`border rounded-lg p-3 min-w-[180px] bg-white shadow cursor-pointer hover:bg-green-100 transition relative`}
                  onClick={() => {
                    setTimeSelecionado(time.equipe);
                  }}
                >
                  <button
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 z-10"
                    title="Excluir time"
                    onClick={(e) => {
                      e.stopPropagation();
                      excluirTime(time.id, time.statusPagamento);
                    }}
                    disabled={carregando || time.statusPagamento === "pago"}
                    style={
                      time.statusPagamento === "pago" ? { display: "none" } : {}
                    }
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <div className="font-bold text-green-700 text-lg mb-1 flex items-center gap-2">
                    {time.nome}
                  </div>
                  <div className="text-xs text-green-600 mb-2">
                    Equipe: {time.equipe}
                  </div>
                  <div className="text-xs text-gray-700 mb-2">
                    Jogadores: {time.jogadores.length}
                  </div>
                  <div className="mt-1">
                    {time.statusPagamento === "pago" && (
                      <span className="flex items-center gap-1 text-green-700 font-semibold text-xs">
                        <DollarSign className="w-4 h-4" /> Pago
                      </span>
                    )}
                    {time.statusPagamento === "parcial" && (
                      <span className="flex items-center gap-1 text-yellow-600 font-semibold text-xs">
                        <DollarSign className="w-4 h-4" /> Pago metade
                      </span>
                    )}
                    {(!time.statusPagamento ||
                      time.statusPagamento === "nao_pago") && (
                      <span className="flex items-center gap-1 text-red-600 font-semibold text-xs">
                        <DollarSign className="w-4 h-4" /> Pendente
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Seleção de Time */}
      <Card className="bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-green-800">Selecionar Time</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="time">Escolha seu time:</Label>
            <Select value={timeSelecionado} onValueChange={setTimeSelecionado}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um time" />
              </SelectTrigger>
              <SelectContent>
                {times.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {timeSelecionado && (
            <div>
              <Label htmlFor="nomeTime">Nome do Time:</Label>
              <Input
                id="nomeTime"
                value={nomeTime}
                onChange={(e) => setNomeTime(e.target.value)}
                placeholder="Digite o nome do seu time"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {timeSelecionado && (
        <>
          {/* Campo de Futebol */}
          <Card className="bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center justify-between">
                <span>{nomeTime || timeSelecionado}</span>
                {(() => {
                  const time = timesCompletos.find((t) => t.id === timeId);
                  if (time?.statusPagamento === "parcial") {
                    return (
                      <span className="flex items-center gap-1 text-yellow-600 font-semibold text-sm">
                        <DollarSign className="w-5 h-5" /> Pago metade
                      </span>
                    );
                  }
                  if (time?.statusPagamento === "pago") {
                    return (
                      <span className="flex items-center gap-1 text-green-600 font-semibold text-sm">
                        <DollarSign className="w-5 h-5" /> Pago
                      </span>
                    );
                  }
                  return null;
                })()}
                <Dialog open={dialogAberto} onOpenChange={setDialogAberto}>
                  <DialogTrigger asChild>
                    <Button size="sm" disabled={jogadores.length >= 10}>
                      <Plus className="w-4 h-4 mr-1" />
                      Adicionar Jogador
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Adicionar Jogador</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="nome">Nome Completo:</Label>
                        <Input
                          id="nome"
                          value={novoJogador.nome}
                          onChange={(e) =>
                            setNovoJogador({
                              ...novoJogador,
                              nome: e.target.value,
                            })
                          }
                          placeholder="Nome do jogador"
                        />
                      </div>
                      <div>
                        <Label htmlFor="numero">Número da Camisa:</Label>
                        <Input
                          id="numero"
                          type="number"
                          value={novoJogador.numero}
                          onChange={(e) =>
                            setNovoJogador({
                              ...novoJogador,
                              numero: e.target.value,
                            })
                          }
                          placeholder="Número"
                          min="1"
                          max="99"
                        />
                      </div>
                      <Button onClick={salvarJogadorModal} className="w-full">
                        {editandoJogador ? "Salvar Alterações" : "Adicionar"}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Campo de Futebol */}
              <div className="relative bg-green-400 rounded-lg p-4 min-h-[400px] border-2 border-white">
                {/* Linhas do campo */}
                <div className="absolute inset-4 border-2 border-white rounded">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-16 border-2 border-white border-t-0"></div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-16 border-2 border-white border-b-0"></div>
                  <div className="absolute top-1/2 left-0 right-0 h-0 border-t-2 border-white"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-2 border-white rounded-full"></div>
                </div>

                {/* Jogadores Titulares */}
                {posicoesTitulares.map((posicao) => {
                  const jogador = jogadores.find(
                    (j) => j.posicaoTitular === posicao.id
                  );
                  return (
                    <div
                      key={posicao.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                      style={{ left: `${posicao.x}%`, top: `${posicao.y}%` }}
                      onClick={() => abrirModalJogador(jogador, posicao.id)}
                    >
                      <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex flex-col items-center justify-center text-xs shadow-lg hover:bg-blue-700 transition-colors">
                        {jogador ? (
                          <>
                            <span className="font-bold">{jogador.numero}</span>
                            <span className="text-[8px] truncate w-10 text-center">
                              {jogador.nome.split(" ")[0]}
                            </span>
                          </>
                        ) : (
                          <Plus className="w-4 h-4" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Banco de Reservas */}
              <div className="mt-4">
                <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Banco de Reservas
                </h4>
                <div className="flex gap-2 flex-wrap">
                  {jogadores
                    .filter((j) => j.posicao === "reserva")
                    .map((jogador) => (
                      <div
                        key={jogador.id}
                        className="bg-gray-600 text-white rounded-lg p-2 text-xs flex flex-col items-center min-w-[60px] cursor-pointer"
                        onClick={() => abrirModalJogador(jogador)}
                      >
                        <span className="font-bold">{jogador.numero}</span>
                        <span className="truncate w-full text-center">
                          {jogador.nome.split(" ")[0]}
                        </span>
                      </div>
                    ))}
                  {Array.from({
                    length:
                      4 -
                      jogadores.filter((j) => j.posicao === "reserva").length,
                  }).map((_, index) => (
                    <div
                      key={`empty-${index}`}
                      className="bg-gray-300 text-gray-500 rounded-lg p-2 text-xs flex items-center justify-center min-w-[60px] h-12 cursor-pointer"
                      onClick={() => abrirModalJogador(undefined)}
                    >
                      <Plus className="w-4 h-4" />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Lista de Jogadores */}
          {jogadores.length > 0 && (
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-green-800">
                  Lista de Jogadores
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {jogadores.map((jogador) => (
                    <div
                      key={jogador.id}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded"
                    >
                      {editandoJogador === jogador.id ? (
                        <EditarJogadorForm
                          jogador={jogador}
                          onSave={(nome, numero) =>
                            editarJogador(jogador.id, nome, numero)
                          }
                          onCancel={() => setEditandoJogador(null)}
                        />
                      ) : (
                        <>
                          <div className="flex items-center gap-3">
                            <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                              {jogador.numero}
                            </div>
                            <div>
                              <p className="font-medium">{jogador.nome}</p>
                              <p className="text-xs text-gray-500">
                                {jogador.posicao === "titular"
                                  ? `Titular - ${
                                      posicoesTitulares.find(
                                        (p) => p.id === jogador.posicaoTitular
                                      )?.nome
                                    }`
                                  : "Reserva"}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setEditandoJogador(jogador.id)}
                            >
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => removerJogador(jogador.id)}
                            >
                              ×
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Botão Salvar */}
          {jogadores.length > 0 && (
            <Button
              onClick={salvarEscalacao}
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={carregando}
            >
              <Save className="w-4 h-4 mr-2" />
              Salvar Escalação
            </Button>
          )}
        </>
      )}
    </div>
  );
}

function EditarJogadorForm({
  jogador,
  onSave,
  onCancel,
}: {
  jogador: Jogador;
  onSave: (nome: string, numero: number) => void;
  onCancel: () => void;
}) {
  const [nome, setNome] = useState(jogador.nome);
  const [numero, setNumero] = useState(jogador.numero.toString());

  return (
    <div className="flex items-center gap-2 flex-1">
      <Input
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Nome"
        className="flex-1"
      />
      <Input
        type="number"
        value={numero}
        onChange={(e) => setNumero(e.target.value)}
        placeholder="Nº"
        className="w-16"
        min="1"
        max="99"
      />
      <Button size="sm" onClick={() => onSave(nome, Number.parseInt(numero))}>
        <Save className="w-3 h-3" />
      </Button>
      <Button size="sm" variant="outline" onClick={onCancel}>
        ×
      </Button>
    </div>
  );
}
