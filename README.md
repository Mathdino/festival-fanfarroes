# 🏆 Festival Fanfarrões

Sistema de gerenciamento para o Festival Fanfarrões - uma aplicação web moderna para administrar times, jogadores, horários, regras e pagamentos do festival.

## 🚀 Tecnologias Utilizadas

### **Frontend**

#### **Framework Principal**
- **Next.js 15.2.4** - Framework React para desenvolvimento web com renderização híbrida (SSR/SSG)
- **React 19** - Biblioteca JavaScript para construção de interfaces de usuário
- **TypeScript 5** - Superset do JavaScript com tipagem estática

#### **Estilização e UI**
- **Tailwind CSS 3.4.17** - Framework CSS utility-first para design responsivo
- **Tailwind CSS Animate** - Animações suaves para componentes
- **Tailwind Merge** - Utilitário para mesclar classes do Tailwind
- **Class Variance Authority** - Sistema de variantes para componentes
- **CLSX** - Utilitário para composição condicional de classes CSS

#### **Componentes UI**
- **Radix UI** - Biblioteca de componentes primitivos acessíveis:
  - Accordion, Alert Dialog, Avatar, Checkbox, Collapsible
  - Context Menu, Dialog, Dropdown Menu, Hover Card
  - Label, Menubar, Navigation Menu, Popover, Progress
  - Radio Group, Scroll Area, Select, Separator, Slider
  - Switch, Tabs, Toast, Toggle, Tooltip
- **Lucide React** - Ícones modernos e consistentes
- **Sonner** - Sistema de notificações toast elegante

#### **Formulários e Validação**
- **React Hook Form 7.54.1** - Biblioteca para gerenciamento de formulários
- **Hookform Resolvers 3.9.1** - Integração com validadores
- **Zod 3.24.1** - Biblioteca de validação de esquemas TypeScript-first

#### **Componentes Específicos**
- **Embla Carousel React** - Carrossel responsivo
- **React Day Picker** - Seletor de datas
- **Input OTP** - Componente para códigos OTP
- **React Resizable Panels** - Painéis redimensionáveis
- **Vaul** - Componente drawer/sidebar
- **CMDK** - Interface de comando (Command+K)

#### **Gráficos e Visualização**
- **Recharts 2.15.0** - Biblioteca de gráficos para React

#### **Tema e Modo Escuro**
- **Next Themes** - Gerenciamento de tema claro/escuro

### **Backend e Banco de Dados**

#### **ORM e Banco de Dados**
- **Prisma 6.10.1** - ORM moderno para TypeScript e Node.js
- **PostgreSQL** - Banco de dados relacional robusto
- **Prisma Client** - Cliente gerado automaticamente para consultas

#### **API Routes**
- **Next.js API Routes** - Endpoints RESTful integrados ao Next.js
- **TypeScript** - Tipagem completa para APIs

### **Ferramentas de Desenvolvimento**

#### **Build e Deploy**
- **PostCSS 8.5** - Processador CSS
- **Autoprefixer** - Adiciona prefixos de vendor automaticamente

#### **Linting e Formatação**
- **ESLint** - Linter para JavaScript/TypeScript
- **TypeScript** - Verificação de tipos em tempo de compilação

#### **Gerenciamento de Pacotes**
- **pnpm** - Gerenciador de pacotes rápido e eficiente

## 📁 Estrutura do Projeto

```
festival-fanfarroes/
├── app/                    # App Router do Next.js 13+
│   ├── api/               # API Routes
│   ├── administrador/     # Página administrativa
│   └── globals.css        # Estilos globais
├── components/            # Componentes React
│   ├── ui/               # Componentes UI reutilizáveis
│   └── screens/          # Telas da aplicação
├── lib/                  # Utilitários e configurações
├── prisma/               # Schema e migrações do banco
├── public/               # Arquivos estáticos
└── hooks/                # Custom hooks React
```

## 🗄️ Modelo de Dados

### **Entidades Principais**
- **Time**: Equipes participantes com informações de pagamento
- **Jogador**: Atletas vinculados aos times com posições e escalações

### **Funcionalidades**
- ✅ Gerenciamento de times e jogadores
- ✅ Sistema de pagamentos com comprovantes
- ✅ Visualização de horários e escalações
- ✅ Interface responsiva para mobile
- ✅ Tema claro/escuro
- ✅ Validação de formulários
- ✅ Notificações em tempo real

## 🛠️ Como Executar

### **Pré-requisitos**
- Node.js 18+
- PostgreSQL
- pnpm

### **Instalação**
```bash
# Clone o repositório
git clone [url-do-repositorio]

# Instale as dependências
pnpm install

# Configure as variáveis de ambiente
cp .env.example .env

# Execute as migrações do banco
pnpm prisma migrate dev

# Gere o cliente Prisma
pnpm prisma generate

# Inicie o servidor de desenvolvimento
pnpm dev
```

### **Scripts Disponíveis**
- `pnpm dev` - Servidor de desenvolvimento
- `pnpm build` - Build de produção
- `pnpm start` - Servidor de produção
- `pnpm lint` - Verificação de código

## 🌟 Características Técnicas

### **Performance**
- Renderização híbrida (SSR/SSG)
- Otimização de imagens automática
- Code splitting automático
- Lazy loading de componentes

### **Acessibilidade**
- Componentes Radix UI acessíveis
- Navegação por teclado
- Suporte a leitores de tela
- Contraste adequado

### **Responsividade**
- Design mobile-first
- Breakpoints otimizados
- Componentes adaptativos

### **Segurança**
- Validação de entrada com Zod
- Sanitização de dados
- Proteção contra XSS
- Headers de segurança

## 📱 Funcionalidades Mobile

- Interface otimizada para dispositivos móveis
- Navegação por tabs na parte inferior
- Gestos touch-friendly
- Performance otimizada para mobile

## 🎨 Design System

- Sistema de cores consistente
- Tipografia hierárquica
- Espaçamentos padronizados
- Componentes reutilizáveis
- Animações suaves

## 🔧 Configurações

### **Next.js**
- App Router (versão 13+)
- TypeScript estrito
- Otimizações de imagem
- Configurações de build otimizadas

### **Tailwind CSS**
- Sistema de cores customizado
- Animações personalizadas
- Plugins específicos
- Configuração para modo escuro

### **Prisma**
- PostgreSQL como banco principal
- Migrações automáticas
- Relacionamentos otimizados
- Índices para performance

## 📊 Monitoramento e Analytics

- Logs estruturados
- Métricas de performance
- Error tracking
- User analytics

## 🚀 Deploy

O projeto está configurado para deploy em:
- Vercel (recomendado)
- Netlify
- Railway
- Heroku

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

**Desenvolvido com ❤️ para o Festival Fanfarrões** 