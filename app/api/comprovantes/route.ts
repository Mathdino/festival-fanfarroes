import { NextRequest, NextResponse } from 'next/server'
import { mkdirSync, writeFileSync } from 'fs'
import { join } from 'path'
import { PrismaClient } from '@prisma/client'

export const runtime = 'nodejs'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get('file') as File | null
  const timeId = formData.get('timeId') as string | null
  const pagador = formData.get('pagador') as string | null

  if (!file || !timeId) {
    return NextResponse.json({ error: 'Arquivo ou timeId não enviado' }, { status: 400 })
  }

  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  const ext = file.name.split('.').pop()
  const fileName = `comprovante_${timeId}_${Date.now()}.${ext}`
  const dir = join(process.cwd(), 'public', 'comprovantes')
  try {
    mkdirSync(dir, { recursive: true })
    writeFileSync(join(dir, fileName), buffer)
    await prisma.time.update({
      where: { id: Number(timeId) },
      data: {
        comprovanteUrl: `/comprovantes/${fileName}`,
        pagador: pagador || undefined,
      },
    })
    return NextResponse.json({ success: true, file: `/comprovantes/${fileName}` })
  } catch (e) {
    return NextResponse.json({ error: 'Erro ao salvar arquivo' }, { status: 500 })
  }
} 