## Why

Para garantir um controle eficiente e seguro dos medicamentos de uma clínica, é essencial ter um sistema que gerencie o estoque, alertando sobre validades e evitando desperdícios ou falta de insumos. Este CRUD permitirá que os usuários da clínica administrem o estoque de forma centralizada e intuitiva.

## What Changes

- Criação de uma interface de CRUD de medicamentos no Frontend (Cadastro, Edição, Visualização/Listagem, e Exclusão).
- Integração de uma nova rota/tabela no banco de dados (Backend) para persistência dos dados dos medicamentos.
- Adição de um novo link de navegação no menu lateral (`SideMenu`) para acessar a tela de controle do estoque de medicamentos.

## Capabilities

### New Capabilities

- `estoque-medicamentos`: Controle de estoque de medicamentos contendo nome, marca, fabricante e data de vencimento, com operações completas de CRUD.

### Modified Capabilities

<!-- None -->

## Impact

- **Frontend**: Componente `SideMenu` será modificado para incluir o link do estoque. Nova página/componente criada para gerenciar os medicamentos.
- **Backend**: Criação de um novo Model no Prisma (ex: `Medicamento`), endpoints de API correspondentes no Express/Node, e validações de dados.
- **Database**: Nova tabela `Medicamento` ou similar criada no banco de dados.
