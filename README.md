
# Ateliê Starbright - Guia de Lançamento (Domínio .pt)

Este projeto foi desenvolvido com Next.js e está otimizado para o **Firebase App Hosting**. Esta é a forma mais moderna e simples de colocar seu site no ar, sem precisar gerenciar servidores manualmente.

## 1. Como Atualizar o Site (Terminal)
Sempre que fizermos mudanças aqui na conversa, elas são salvas nos seus arquivos. Para enviá-las para a internet (GitHub/Firebase), execute estes comandos no terminal:

```bash
# 1. Adiciona as mudanças
git add .

# 2. Cria um ponto de salvamento (mude a mensagem se quiser)
git commit -m "Novas atualizações do Ateliê"

# 3. Envia para o GitHub (O Firebase App Hosting atualizará o site sozinho)
git push origin main
```

## 2. Resolvendo Erros do Git
Se você vir o erro "remote origin already exists" ou se o `push` falhar:

```bash
# Remove a conexão antiga e refaz
git remote remove origin
git remote add origin https://github.com/gamejose111-max/StarbrightAtelier.git
git push -u origin main
```

## 3. Publicando no Firebase App Hosting
O App Hosting cuida de toda a infraestrutura para você:

1.  **Repositório**: Certifique-se de que seu código está no GitHub seguindo os passos acima.
2.  **Console do Firebase**: Vá em [Console do Firebase](https://console.firebase.google.com/) -> **Build** -> **App Hosting**.
3.  **Conexão**: Selecione o repositório `StarbrightAtelier`.
4.  **Configuração**: O Firebase detectará automaticamente que é um projeto Next.js. Basta clicar em "Finish and Deploy".

## 4. Configurando seu domínio .pt
Após o deploy no Firebase:

1.  No painel do **App Hosting**, vá em **Settings** -> **Custom Domains**.
2.  Adicione `ateliestarbright.pt`.
3.  Copie os registros DNS (A, AAAA e TXT) e cole na gestão de DNS do seu site (`site.pt`).
4.  **Atenção**: A propagação pode levar até 24 horas.
