@echo off
title Imperio do Strogonofe - Plataforma Oficial de Pedidos
chcp 65001 > nul
echo ========================================================
echo   👑 IMPÉRIO DO STROGONOFFE — WEBSITE OFICIAL & API
echo ========================================================
echo.
echo Iniciando Servidor de Integracao (Porta 3001)...
start "Imperio API Backend" /min node server/index.js
echo.
echo Abrindo o site no seu navegador padrao em http://localhost:5173 ...
timeout /t 2 /nobreak > nul
start http://localhost:5173
echo.
echo Plataforma ativa! Pressione CTRL+C ou feche esta janela para encerrar.
echo.
npm run dev -- --port 5173 --host
