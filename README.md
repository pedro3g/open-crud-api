# OPEN CRUD API

<!---Esses são exemplos. Veja https://shields.io para outras pessoas ou para personalizar este conjunto de escudos. Você pode querer incluir dependências, status do projeto e informações de licença aqui--->

![GitHub repo size](https://img.shields.io/github/repo-size/pedro3g/open-crud-api?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/pedro3g/open-crud-api?style=for-the-badge)


> API pública para cadastro de usuários para ser usada em testes.

### Ajustes e melhorias

O projeto ainda está em desenvolvimento e as próximas atualizações serão voltadas nas seguintes tarefas:

- [ ] Rota para autenticação
- [ ] Rota para "Esqueci minha senha"

## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:
* Você instalou a versão mais recente de `Node.js`
* Você instalou a versão mais recente de `Mongodb`
* Você tem uma máquina `<Windows / Linux / Mac>`.

## 🚀 Instalando open-crud-api

Para instalar as dependências:

```
npm install
```

Configure as variáveis de ambiente:
> Para isso, crie um arquivo na raiz chamado `.env`

```
DATABASE_URL="mongodb+srv://localhost:27017/crud-api?retryWrites=true&w=majority"
JWT_KEY=chave_para_criptografia_do_token
```

## ☕ Usando open-crud-api

Para usar open-crud-api em modo de desenvolvimanto, execute o comando:

```
npm run start:dev
```

Para usar open-crud-api em modo de pré-produção, execute o comando:

```
npm run start
```

Adicione comandos de execução e exemplos que você acha que os usuários acharão úteis. Fornece uma referência de opções para pontos de bônus!

## 📫 Contribuindo para open-crud-api

1. Faça o fork desse repositório.
2. Crie um branch: `git checkout -b <nome_branch>`.
3. Faça suas alterações e confirme-as: `git commit -m '<mensagem_commit>'`
4. Envie para o branch original: `git push origin <nome_do_projeto> / <local>`
5. Crie a solicitação de pull.

Como alternativa, consulte a documentação do GitHub em [como criar uma solicitação pull](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

## 🤝 Colaboradores

Agradecemos às seguintes pessoas que contribuíram para este projeto:

<table>
  <tr>
    <td align="center">
      <a href="#">
        <img src="https://avatars.githubusercontent.com/u/30221184" width="100px;" alt="Foto de Pedro Henrique no GitHub"/><br>
        <sub>
          <b>Pedro Henrique</b>
        </sub>
      </a>
    </td>
</table>