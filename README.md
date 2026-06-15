# AppContaJusta

Aplicativo mobile desenvolvido em **React Native com Expo** para controle de gastos em estabelecimentos como bares e restaurantes.

O projeto foi construído com foco na implementação de **regras reais de negócio**, incluindo controle de consumo, rastreabilidade de alterações, persistência local de dados e geração de relatórios em PDF.

---

# Funcionalidades

- Registro do nome do estabelecimento
- Adição de itens consumidos
- Suporte a valores com **vírgula ou ponto** (ex: 10,50 ou 10.50)
- Controle de **quantidade por item**
- Incremento e decremento de unidades em tempo real
- Histórico detalhado por item com registro de alterações e horários
- Cálculo automático do total da conta
- Aplicação opcional de **taxa de serviço**
- Fechamento e reabertura de conta
- Persistência local utilizando **AsyncStorage**
- Controle de integridade dos dados com IDs únicos
- Visualização de histórico de contas
- Geração de PDF por conta com detalhamento completo:
  - Item
  - Quantidade
  - Valor unitário
  - Total por item

---

# Tecnologias Utilizadas

- React Native
- Expo
- TypeScript
- React Hooks
- AsyncStorage
- Expo Print
- Expo Sharing

---

# Estrutura do Projeto

```
src
├── components
│ ├── ItemCard.tsx
│ ├── FecharContaModal.tsx
│ └── HistoricoItemModal.tsx
│
├── screens
│ ├── HomeScreen.tsx
│ ├── LancarGastosScreen.tsx
│ └── HistoricoScreen.tsx
│
├── services
│ ├── storage.ts
│ └── pdfGenerator.ts
│
├── types
│ └── Conta.ts
└── app.tsx
```

---

# Como Rodar o Projeto

### 1 Clonar o repositório

```bash
git clone https://github.com/seu-usuario/ControlaGastos.git
```

---

### 2 Entrar na pasta do projeto

```bash
cd ControlaGastos
```

---

### 3 Instalar dependências

```bash
npm install
```

ou

```bash
yarn install
```

---

### 4 Rodar o projeto com Expo

```bash
npx expo start
```

Após iniciar o projeto você poderá:

- Abrir no **emulador Android**
- Rodar no **simulador iOS**
- Ou escanear o QR Code utilizando o **Expo Go**

---

# Funcionalidades Técnicas Implementadas

Durante o desenvolvimento deste projeto foram aplicados conceitos importantes de desenvolvimento mobile:

- Organização de componentes reutilizáveis
- Separação de responsabilidades (screens, components, services, types)
- Manipulação de estado com React Hooks
- Tipagem forte com TypeScript
- Persistência de dados no dispositivo com AsyncStorage
- Controle de integridade com IDs únicos para evitar inconsistência
- Rastreamento completo de alterações em itens
- Cálculo dinâmico de valores com taxa de serviço
- Controle de estados da conta (aberta, fechada, reaberta)
- Geração de relatórios em PDF com dados estruturados
---

# Possíveis Melhorias Futuras

Algumas evoluções que podem ser implementadas no projeto:

- Edição de itens já lançados
- Exclusão de itens
- Divisão da conta por pessoas
- Sincronização com backend (API REST)
- Estatísticas e gráficos de gastos
- Autenticação de usuário
- Tema escuro (Dark Mode)
- Exportação de relatórios mais avançados

---

# Autor

**Yago Lima**

Projeto desenvolvido com foco em prática de desenvolvimento mobile, aplicando conceitos de estado, persistência, integridade de dados e geração de relatórios.
