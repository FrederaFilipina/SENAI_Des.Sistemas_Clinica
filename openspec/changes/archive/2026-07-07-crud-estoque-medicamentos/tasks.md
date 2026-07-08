## 1. Banco de Dados e Prisma

- [x] 1.1 Adicionar o model `Medicamento` no arquivo schema.prisma
- [x] 1.2 Rodar a migração do Prisma para atualizar a estrutura no banco de dados e gerar o Prisma Client

## 2. API Backend (Express/TS)

- [x] 2.1 Criar o arquivo de repositório `MedicamentoRepository.ts` em `Backend/src/repository`
- [x] 2.2 Criar o arquivo de serviço `MedicamentoService.ts` em `Backend/src/services`
- [x] 2.3 Criar o arquivo de controller `MedicamentoController.ts` em `Backend/src/controllers`
- [x] 2.4 Criar a rota de API `medicamentoRoute.ts` em `Backend/src/routes` contendo GET, POST, PUT, DELETE
- [x] 2.5 Registrar e montar a rota de medicamentos no arquivo principal do backend `Backend/src/index.ts`

## 3. Interface Frontend (React)

- [x] 3.1 Criar o componente de visualização e controle em `Frontend/minhaClinica/src/components/Medicamentos/Medicamentos.jsx`
- [x] 3.2 Implementar listagem de medicamentos em uma tabela com filtros/pesquisa e ações
- [x] 3.3 Implementar o formulário de cadastro e edição de medicamentos integrado com a API
- [x] 3.4 Implementar a exclusão de medicamento com diálogo de confirmação
- [x] 3.5 Atualizar o componente SideMenu.jsx para incluir a opção de estoque de medicamentos
- [x] 3.6 Registrar a nova rota `/medicamentos` no arquivo de roteamento main.jsx
