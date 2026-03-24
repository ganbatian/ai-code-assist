@echo off
cd /d C:\Users\Administrator\AppData\LocalLow\ai-code-assist
set GIT_SSH_COMMAND=ssh -i C:/Users/Administrator/AppData/LocalLow/dev-nav/id_ed25519 -o StrictHostKeyChecking=no
git init
git config user.name ganbatian
git config user.email 402351969@qq.com
git add .
git commit -m "feat: AI Code Assist v1.0"
git remote add origin git@github.com:ganbatian/ai-code-assist.git
git branch -M main
git push -u origin main
