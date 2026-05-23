# 🔧 Guia de Conectividade - App Horus

## 📱 Problema: "Não consegue conectar ao servidor"

### ✅ **Solução Rápida:**

1. **Descubra o IP da sua máquina:**
   - **Windows:** Abra o CMD/PowerShell e execute: `ipconfig`
   - **Linux/Mac:** Abra o terminal e execute: `ifconfig` ou `ip addr`

2. **Procure por:** `Endereço IPv4` ou `inet` (exemplo: `192.168.101.5`)

3. **Atualize o arquivo:** `constants/api.ts`
   ```typescript
   const SERVER_IP = 'SEU_IP_AQUI'; // ← Substitua pelo IP encontrado
   ```

4. **Reinicie o app:** Feche e reabra o Expo Go

---

## 🔍 **Verificação de Conectividade:**

### Backend rodando?
```bash
# Verificar se porta 5001 está ocupada
netstat -ano | findstr :5001
```

### API respondendo?
```bash
# Testar endpoint
curl http://localhost:5001/api/posts
```

### Firewall bloqueando?
- **Windows:** Verifique o Firewall do Windows Defender
- **Certifique-se de que:** Porta 5001 está liberada para conexões TCP

---

## 📋 **Checklist de Troubleshooting:**

- [ ] Backend está rodando (`node server.js`)
- [ ] Porta 5001 não está bloqueada
- [ ] IP no `constants/api.ts` está correto
- [ ] Mesmo Wi-Fi para PC e dispositivo móvel
- [ ] Firewall permite conexões na porta 5001
- [ ] Expo Go está na mesma rede

---

## 🚀 **IP Atual:** `192.168.101.5`

**Última atualização:** Maio 2026

*Nota: O IP pode mudar se você mudar de rede ou reinicializar o modem.*