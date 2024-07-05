# Sistema de Gerenciamento de Produtos com Firebase, Express e Handlebars

Este projeto é um sistema básico de gerenciamento de produtos utilizando Firebase para armazenamento de dados, Express.js como framework web, e Handlebars como engine de template para renderização das páginas.

## Requisitos

Antes de executar este projeto, você precisa ter o seguinte instalado:

- **Node.js:** Certifique-se de ter o Node.js instalado na sua máquina. Você pode baixá-lo [aqui](https://nodejs.org/).

## Instalação

Siga os passos abaixo para configurar e executar o projeto localmente:

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/seu-usuario/seu-projeto.git
   cd seu-projeto
   ```

2. **Instale as dependências:**

   Use o npm para instalar as dependências necessárias:

   ```bash
   npm install express express-handlebars body-parser firebase-admin
   ```

   Certifique-se de incluir todas as dependências listadas no arquivo `package.json` do projeto.

3. **Configuração do Firebase**

   - Crie um projeto no [Firebase Console](https://console.firebase.google.com/).
   - No painel do projeto, vá para **Project Settings > Service accounts**.
   - Clique em **Generate new private key** para baixar o arquivo JSON de configuração do serviço. Renomeie este arquivo para `firebase-config.json` e coloque-o na raiz do seu projeto.

4. **Executar o Projeto**

   Execute o seguinte comando para iniciar o servidor:

   ```bash
   node app.js
   ```

   O servidor estará acessível em `http://localhost:8081`.

## Funcionalidades

Este sistema oferece as seguintes funcionalidades:

- **Cadastro de Produtos:** Permite adicionar novos produtos com tipo, nome, validade e observações.
- **Consulta de Produtos:** Lista todos os produtos cadastrados, mostrando seu tipo traduzido, nome, validade e observações.
- **Edição de Produtos:** Permite editar informações de produtos existentes, atualizando tipo, nome, validade e observações.
- **Exclusão de Produtos:** Permite excluir produtos existentes da base de dados.

## Estrutura do Projeto

A estrutura de arquivos do projeto é organizada da seguinte maneira:

```
/seu-projeto
|-- /node_modules    # Dependências do projeto
|-- /views           # Arquivos de visualização Handlebars
|   |-- /layouts     # Layouts do Handlebars
|       |-- main.handlebars  # Layout principal
|   |-- CadProduto.handlebars
|   |-- ConsProduto.handlebars
|   |-- EditProduto.handlebars
|-- app.js           # Arquivo principal do Express
|-- firebase-config.json  # Arquivo de configuração do Firebase Admin
|-- package.json     # Metadados do projeto e dependências
|-- README.md        # Este arquivo, documentação do projeto
```
