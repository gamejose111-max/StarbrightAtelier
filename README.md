
# Ateliê Starbright - Guia de Lançamento (Domínio .pt)

Este projeto foi desenvolvido com Next.js e está otimizado para o **Firebase App Hosting**. Sempre que você faz mudanças na conversa com a IA, os arquivos são atualizados automaticamente aqui no editor.

## 🚀 Como Atualizar o Site Oficial

Se você não vê as mudanças no seu site oficial, é porque precisa "empurrar" as atualizações do terminal para a internet.

### 1. O Passo a Passo Definitivo
Execute estes comandos em ordem no terminal:

```bash
# 1. Prepara as mudanças feitas pela IA
git add .

# 2. Salva as mudanças localmente
# Se aparecer "nothing to commit", pule para o passo 3
git commit -m "Atualização de imagem e layout"

# 3. Envia para o site (O MAIS IMPORTANTE)
git push origin main
```

---

## 🛠️ Resolução de Problemas

### Por que o fundo continua branco?
1. **Cache do Navegador:** Tente abrir o site em uma aba anónima ou pressione `CTRL + F5`.
2. **Git Push:** Verifique se o comando `git push origin main` terminou com sucesso. Se der erro, verifique se o site oficial está ligado a este repositório.

### Erro: "nothing to commit"
Isto é normal se a IA já salvou os arquivos. Basta rodar:
`git push origin main` para garantir que o servidor receba as novidades.

---

## 🌍 Configurando seu domínio .pt
Após o `git push` funcionar, o Firebase levará alguns minutos para atualizar.

1. No [Console do Firebase](https://console.firebase.google.com/), vá em **App Hosting**.
2. Clique no seu backend e vá em **Settings** -> **Custom Domains**.
3. Adicione `ateliestarbright.pt`.
