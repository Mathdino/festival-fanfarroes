import { NextRequest, NextResponse } from 'next/server'
import { mkdirSync, writeFileSync } from 'fs'
import { join } from 'path'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get('file') as File | null
  const timeId = formData.get('timeId') as string | null

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
    return NextResponse.json({ success: true, file: `/comprovantes/${fileName}` })
  } catch (e) {
    return NextResponse.json({ error: 'Erro ao salvar arquivo' }, { status: 500 })
  }
} 