
# Ateliê Starbright - Guia de Lançamento (Domínio .pt)

Este projeto foi desenvolvido com Next.js e está otimizado para o **Firebase App Hosting**. Sempre que você faz mudanças na conversa com a IA, os arquivos são atualizados automaticamente aqui no editor.

## 🚀 Como Atualizar o Site Oficial

Se você vir a mensagem "nothing to commit, working tree clean", significa que as mudanças já foram salvas localmente. Agora você só precisa **enviá-las** para o servidor.

### 1. O Passo a Passo Padrão
Execute estes comandos em ordem no terminal:

```bash
# 1. Prepara as mudanças (se houver novas)
git add .

# 2. Salva as mudanças (Se der erro aqui, pule para o passo 3)
git commit -m "Atualizações do Ateliê"

# 3. Envia para a internet (Este é o passo que faz o site atualizar)
git push origin main
```

---

## 🛠️ Resolução de Problemas Comuns

### Erro: "nothing to commit"
Isso é bom! Significa que o commit já foi feito. Basta rodar:
`git push origin main`

### Erro: "Everything up-to-date" mas o site não mudou
Isso acontece se o Git não percebeu as mudanças. Tente forçar um novo commit:
1. Faça uma pequena alteração em qualquer arquivo (ex: mude um texto).
2. Tente os comandos do "Passo a Passo Padrão" novamente.

### Erro de Permissão / Autenticação (GitHub)
Se o terminal pedir senha ou der erro de "Permission denied":
1. Vá ao seu GitHub.
2. Verifique se o repositório `StarbrightAtelier` está criado.
3. Se precisar reconectar o servidor, use:
```bash
git remote remove origin
git remote add origin https://github.com/gamejose111-max/StarbrightAtelier.git
git push -u origin main
```

---

## 🌍 Configurando seu domínio .pt
Após o `git push` funcionar, o Firebase levará alguns minutos para atualizar.

1. No [Console do Firebase](https://console.firebase.google.com/), vá em **App Hosting**.
2. Clique no seu backend e vá em **Settings** -> **Custom Domains**.
3. Adicione `ateliestarbright.pt`.
4. Configure os DNS no seu provedor de domínio.
