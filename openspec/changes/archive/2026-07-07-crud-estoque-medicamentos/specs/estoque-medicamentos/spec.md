## ADDED Requirements

### Requirement: Cadastrar medicamento
O sistema DEVE permitir que os usuários cadastrem um novo medicamento fornecendo os seguintes campos obrigatórios: nome do medicamento, marca, fabricante e data de vencimento.

#### Scenario: Cadastro com sucesso
- **WHEN** o usuário preenche todos os campos obrigatórios e clica em cadastrar/salvar
- **THEN** o sistema DEVE persistir o novo medicamento no banco de dados e exibir uma mensagem de sucesso

#### Scenario: Cadastro com campos obrigatórios ausentes
- **WHEN** o usuário tenta salvar o formulário com algum campo obrigatório em branco
- **THEN** o sistema DEVE mostrar uma mensagem de validação de erro e impedir a persistência no banco de dados

### Requirement: Listar medicamentos
O sistema DEVE exibir uma listagem de todos os medicamentos cadastrados em formato de tabela ou lista, exibindo os campos nome do medicamento, marca, fabricante e data de vencimento, além de ações de edição e exclusão.

#### Scenario: Exibição da listagem de medicamentos
- **WHEN** o usuário acessa a tela de estoque de medicamentos
- **THEN** o sistema DEVE carregar e exibir a tabela com todos os medicamentos cadastrados

### Requirement: Editar medicamento
O sistema DEVE permitir a edição de todas as informações de um medicamento cadastrado previamente (nome, marca, fabricante e data de vencimento).

#### Scenario: Edição de dados com sucesso
- **WHEN** o usuário altera os campos de um medicamento e clica em salvar
- **THEN** o sistema DEVE atualizar os dados no banco de dados e exibir uma mensagem de sucesso

### Requirement: Excluir medicamento
O sistema DEVE permitir que o usuário exclua um medicamento do estoque após uma confirmação de exclusão.

#### Scenario: Exclusão com sucesso após confirmação
- **WHEN** o usuário clica em excluir para um medicamento específico e confirma a ação no modal
- **THEN** o sistema DEVE remover o medicamento do banco de dados e atualizar a listagem na tela

### Requirement: Navegação pelo SideMenu
O menu de navegação lateral (`SideMenu`) DEVE disponibilizar uma opção visível para que o usuário possa acessar a tela de estoque de medicamentos.

#### Scenario: Navegar pelo SideMenu
- **WHEN** o usuário clica na opção "Medicamentos" ou "Estoque de Medicamento" no SideMenu
- **THEN** o sistema DEVE redirecionar o usuário para a página de CRUD de estoque de medicamentos
