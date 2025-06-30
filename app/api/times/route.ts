import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const { nome, equipe, jogadores } = data

    if (!nome || !equipe || !Array.isArray(jogadores)) {
      return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 })
    }

    // Cria o time e os jogadores em uma transação
    const time = await prisma.time.create({
      data: {
        nome,
        equipe,
        jogadores: {
          create: jogadores.map((j: any) => ({
            nome: j.nome,
            numero: j.numero,
            posicao: j.posicao,
            posicaoTitular: j.posicaoTitular ?? null,
          })),
        },
      },
      include: { jogadores: true },
    })

    return NextResponse.json(time, { status: 201 })
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Já existe um time com essa equipe ou número de jogador duplicado.' }, { status: 409 })
    }
    return NextResponse.json({ error: error.message || 'Erro ao salvar time' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json()
    const { id, nome, equipe, jogadores } = data

    if (!id || !nome || !equipe || !Array.isArray(jogadores)) {
      return NextResponse.json({ error: 'Dados inválidos' }, { status: 400 })
    }

    // Atualiza o time e substitui todos os jogadores
    const time = await prisma.time.update({
      where: { id },
      data: {
        nome,
        equipe,
        jogadores: {
          deleteMany: {}, // Remove todos os jogadores antigos
          create: jogadores.map((j: any) => ({
            nome: j.nome,
            numero: j.numero,
            posicao: j.posicao,
            posicaoTitular: j.posicaoTitular ?? null,
          })),
        },
      },
      include: { jogadores: true },
    })

    return NextResponse.json(time, { status: 200 })
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Já existe um time com essa equipe ou número de jogador duplicado.' }, { status: 409 })
    }
    return NextResponse.json({ error: error.message || 'Erro ao atualizar time' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const equipe = searchParams.get('equipe')
  try {
    if (equipe) {
      const time = await prisma.time.findUnique({
        where: { equipe },
        include: { jogadores: true },
      })
      if (!time) return NextResponse.json({}, { status: 200 })
      return NextResponse.json(time, { status: 200 })
    } else {
      // Listar todos os times com pelo menos 1 jogador
      const times = await prisma.time.findMany({
        where: { jogadores: { some: {} } },
        include: { jogadores: true },
        orderBy: { nome: 'asc' },
      })
      return NextResponse.json(times, { status: 200 })
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Erro ao buscar times' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const data = await req.json()
    const { id } = data
    if (!id) {
      return NextResponse.json({ error: 'ID não informado' }, { status: 400 })
    }
    await prisma.time.delete({ where: { id } })
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Erro ao excluir time' }, { status: 500 })
  }
} 