## Context

A clínica necessita de um controle integrado dos medicamentos de seu estoque. Para isso, criaremos um CRUD (Create, Read, Update, Delete) completo de medicamentos. Os medicamentos deverão possuir nome, marca, fabricante e data de vencimento. Essa funcionalidade estará disponível no painel da clínica, acessível a partir do menu de navegação lateral (`SideMenu`).

## Goals / Non-Goals

**Goals:**
- Criar a tabela `medicamento` no banco de dados através do Prisma.
- Implementar endpoints no backend para gerenciar os medicamentos:
  - `GET /medicamentos` - Listar todos os medicamentos
  - `GET /medicamentos/:id` - Buscar medicamento por ID
  - `POST /medicamentos` - Cadastrar novo medicamento
  - `PUT /medicamentos/:id` - Editar um medicamento existente
  - `DELETE /medicamentos/:id` - Excluir um medicamento
- Desenvolver um componente frontend responsivo de Gerenciamento de Estoque de Medicamentos.
- Incluir a rota no arquivo de roteamento central (`main.jsx`) e um link no `SideMenu.jsx`.

**Non-Goals:**
- Integração com sistemas externos de fornecedores de medicamentos.
- Controle de lote ou leitor de código de barras.

## Decisions

### 1. Modelo de Banco de Dados (Prisma)
Adicionaremos o model `Medicamento` no arquivo `schema.prisma`:
```prisma
model Medicamento {
  id              Int      @id @default(autoincrement())
  nome            String
  marca           String
  fabricante      String
  data_vencimento DateTime

  @@map("medicamento")
}
```

### 2. Estrutura do Backend
Seguiremos o padrão em camadas já estabelecido no projeto:
- **Repository**: `MedicamentoRepository` para abstrair as consultas do Prisma.
- **Service**: `MedicamentoService` para regras de negócio (ex: validação de data de vencimento).
- **Controller**: `MedicamentoController` para gerenciar requisições e respostas HTTP.
- **Router**: `medicamentoRouter` mapeando as rotas HTTP e protegido pelo middleware de autenticação `auth`.

### 3. Estrutura do Frontend
Criaremos um componente dedicado para gerenciar os medicamentos:
- `Frontend/minhaClinica/src/components/Medicamentos/Medicamentos.jsx` que exibirá a tabela com os medicamentos, barra de pesquisa, botão de cadastro e modais para criar/editar medicamentos.
- Adicionar o link correspondente no `SideMenu.jsx` usando um ícone apropriado (como `GiMedicinePills` ou `FaPills` de `react-icons`).

## Risks / Trade-offs

- **Formato de Data**: Diferenças no fuso horário ou formato de data no envio do Frontend podem causar erros na conversão de string para `Date` no Prisma.
  - *Mitigação*: O backend converterá a data explicitamente com `new Date(data_vencimento)` e o frontend utilizará o input do tipo `date` padrão do HTML5 (`YYYY-MM-DD`).
