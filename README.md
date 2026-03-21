
# Ateliê Starbright - Guia de Lançamento (Domínio .pt)

Este projeto foi desenvolvido com Next.js e está otimizado para o **Firebase App Hosting**. Esta é a forma mais moderna e simples de colocar seu site no ar, sem precisar gerenciar servidores manualmente.

## 1. Resolvendo Erros do Git
Se você vir o erro "remote origin already exists" ao tentar conectar seu GitHub, execute os seguintes comandos no terminal:

```bash
# Remove a conexão antiga
git remote remove origin

# Adiciona a nova conexão
git remote add origin https://github.com/gamejose111-max/StarbrightAtelier.git

# Envia seu código para o GitHub
git add .
git commit -m "Iniciando projeto Ateliê Starbright"
git branch -M main
git push -u origin main
```

## 2. Publicando no Firebase App Hosting
O App Hosting cuida de toda a infraestrutura para você:

1.  **Repositório**: Certifique-se de que seu código está no GitHub após seguir os passos acima.
2.  **Console do Firebase**: Vá em [Console do Firebase](https://console.firebase.google.com/) -> **Build** -> **App Hosting**.
3.  **Conexão**: Clique em "Get Started", conecte sua conta do GitHub e selecione o repositório `StarbrightAtelier`.
4.  **Configuração**: O Firebase detectará automaticamente que é um projeto Next.js. Basta clicar em "Finish and Deploy".

## 3. Configurando seu domínio .pt (Comprado no site.pt)
Após o primeiro deploy ser concluído:

1.  No painel do **App Hosting**, vá na aba **Settings** (Configurações).
2.  Clique em **Custom Domains** e depois em **Add Domain**.
3.  Digite seu domínio (ex: `ateliestarbright.pt`).
4.  O Firebase gerará valores de **DNS** (registros `A`, `AAAA` e `TXT`).

## 4. No painel do site.pt (Registrador)
1.  Faça login no site onde comprou o domínio (`site.pt`).
2.  Acesse a **Gestão de DNS** do seu domínio.
3.  Insira os registros fornecidos pelo Firebase.
4.  **Aguarde**: A propagação do domínio pode levar de 1 a 24 horas.
