# Ateliê Starbright - Guia de Lançamento

Este projeto está pronto para ser hospedado no **Firebase App Hosting**. Siga os passos abaixo para colocar o seu site no ar com o seu novo domínio `.pt`.

## 1. Configuração no Firebase
Como o projeto já utiliza Next.js e Firebase, o caminho mais recomendado é o **App Hosting**:

1. Acesse o [Console do Firebase](https://console.firebase.google.com/).
2. Selecione o seu projeto.
3. No menu lateral, vá em **Build** -> **App Hosting**.
4. Clique em **Get Started** e conecte o seu repositório do GitHub onde este código está salvo.
5. O Firebase detectará automaticamente as configurações do Next.js e iniciará o primeiro "Build".

## 2. Conectando seu domínio .pt
Depois que o site estiver funcionando no link temporário do Firebase:

1. No painel do **App Hosting**, vá na aba **Settings** (Configurações) do seu backend.
2. Procure pela seção **Custom Domains**.
3. Clique em **Add Domain** e digite o seu domínio (ex: `seudominio.pt`).
4. O Firebase fornecerá alguns **registros DNS** (valores de TXT e A).

## 3. Configuração no site.pt (Registrador)
1. Faça login no site onde você comprou o domínio.
2. Vá para a **Gestão de DNS** do seu domínio.
3. Adicione os registros que o Firebase te passou.
4. Aguarde a propagação (pode levar de algumas horas até 48h).

## 4. Verificação de Segurança
Certifique-se de que o **Authentication** e o **Firestore** estão ativos no Console do Firebase para que o catálogo e o login de admin funcionem corretamente em produção.

---
*Dica: O SSL (cadeado de segurança) é gerado automaticamente pelo Firebase assim que o domínio é validado.*
