
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
git commit -m "Atualização de imagem e layout"

# 3. Envia para o site (O MAIS IMPORTANTE)
git push origin main
```

---

## 🔑 Resolvendo Erro de Senha no Terminal (Erro 403)

Se o terminal pedir sua senha e der erro ou dizer que a "autenticação por senha foi removida", siga estes passos:

### 1. Criar um Token no GitHub (Substitui a Senha)
1. Vá ao seu GitHub em: **Settings** (Configurações) -> **Developer Settings** -> **Personal Access Tokens** -> **Tokens (classic)**.
2. Clique em **Generate new token (classic)**.
3. Dê um nome (ex: "Site Starbright"), marque a caixa **repo** (toda a primeira seção) e clique em **Generate token** no final da página.
4. **COPIE O TOKEN.** Você só o verá uma vez.

### 2. Usar o Token no Terminal
Quando você rodar `git push origin main` e ele pedir o **Password**, não cole sua senha do site. **Cole o Token que você copiou.**
*(Nota: No terminal, quando você cola a senha, ela fica invisível. Apenas cole e dê ENTER).*

---

## 🛠️ Resolução de Outros Problemas

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
