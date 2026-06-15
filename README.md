# AppContaJusta

Aplicativo mobile desenvolvido em **React Native com Expo** para controle de gastos em estabelecimentos como bares e restaurantes.

O projeto foi construído com foco na implementação de **regras reais de negócio**, incluindo controle de consumo, rastreabilidade de alterações, persistência local de dados e geração de relatórios em PDF com discriminação de taxas.

---

# Funcionalidades

- Registro do nome do estabelecimento
- Adição de itens consumidos
- Suporte a valores com **vírgula ou ponto** (ex: 10,50 ou 10.50)
- Controle de **quantidade por item**
- Incremento e decremento de unidades em tempo real
- Histórico detalhado por item com registro de alterações e horários
- Cálculo automático do total da conta
- Aplicação opcional e dinâmica de **taxa de serviço** (com exibição no histórico)
- Fechamento e reabertura de conta em tempo real
- Persistência local utilizando **AsyncStorage**
- Controle de integridade dos dados com IDs únicos (`react-native-uuid`)
- Gerenciamento do histórico de contas (Visualização e **Exclusão com confirmação**)
- Geração de PDF por conta com detalhamento completo enviado via WhatsApp/Compartilhamento:
  - Item, Quantidade e Valor unitário
  - Subtotal dos itens
  - Valor exato cobrado pela taxa de serviço aplicado
  - Total geral calculado

---

# Tecnologias Utilizadas

- React Native
- Expo
- TypeScript
- React Hooks
- AsyncStorage
- Expo Print
- Expo Sharing
- React Native UUID

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

- Durante o desenvolvimento deste projeto foram aplicados conceitos importantes de desenvolvimento mobile:
- Organização de componentes reutilizáveis e desacoplados.
- Separação clara de responsabilidades (screens, components, services, types).
- Manipulação de estados complexos e contorno de assincronismo com React Hooks.
- Tipagem forte com TypeScript mitigando erros em tempo de desenvolvimento.
- Persistência de dados segura no dispositivo com AsyncStorage.
- Controle de integridade com IDs únicos para evitar inconsistência de registros.
- Rastreamento completo de mutações e ações em itens.
- Validação física e remoção segura de dados do banco local com confirmação em tela (Alert).
- Geração estruturada de documentos utilizando templates HTML dinâmicos convertidos em PDF.
---

# Possíveis Melhorias Futuras

Algumas evoluções planejadas para o ecossistema do app:

- Edição de itens já lançados na lista.
- Divisão inteligente da conta por quantidade de pessoas na mesa.
- Integração e sincronização com banco de dados em nuvem (API REST).
- Dashboard com estatísticas e gráficos de gastos mensais.
- Autenticação de usuário (Login/Signup).
- Suporte a Tema Escuro (Dark Mode).

---

# Autor

**Yago Lima**

Projeto desenvolvido com foco em prática profunda de desenvolvimento mobile, aplicando conceitos de estado, persistência, tratamento de dados, regras de negócio reais e geração de relatórios funcionais.
