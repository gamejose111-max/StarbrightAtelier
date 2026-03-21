
# Ateliê Starbright - Guia de Lançamento (Domínio .pt)

Este projeto foi desenvolvido com Next.js e está otimizado para o **Firebase App Hosting**. Esta é a forma mais moderna e simples de colocar seu site no ar, sem precisar gerenciar servidores Node.js manualmente.

## 1. Publicando no Firebase App Hosting
O App Hosting cuida de toda a infraestrutura para você:

1.  **Repositório**: Certifique-se de que seu código está em um repositório no GitHub.
2.  **Console do Firebase**: Vá em [Console do Firebase](https://console.firebase.google.com/) -> **Build** -> **App Hosting**.
3.  **Conexão**: Clique em "Get Started", conecte sua conta do GitHub e selecione o repositório deste projeto.
4.  **Configuração**: O Firebase detectará automaticamente que é um projeto Next.js. Basta clicar em "Finish and Deploy".

## 2. Configurando seu domínio .pt (Comprado no site.pt)
Após o primeiro deploy ser concluído com sucesso:

1.  No painel do **App Hosting**, vá na aba **Settings** (Configurações).
2.  Clique em **Custom Domains** e depois em **Add Domain**.
3.  Digite seu domínio (ex: `ateliestarbright.pt`).
4.  O Firebase gerará valores de **DNS** (geralmente registros `A`, `AAAA` e `TXT`).

## 3. No painel do site.pt (Registrador)
1.  Faça login no site onde comprou o domínio (`site.pt`).
2.  Acesse a **Gestão de DNS** do seu domínio.
3.  Insira os registros fornecidos pelo Firebase.
4.  **Aguarde**: A propagação do domínio pode levar de 1 a 24 horas. O certificado SSL (cadeado de segurança) será gerado automaticamente pelo Firebase assim que o domínio estiver validado.

---
*Nota: Embora o site use tecnologias modernas, o Firebase App Hosting abstrai a necessidade de gerenciar o Node.js. Ele funciona como uma hospedagem inteligente para o seu projeto.*
