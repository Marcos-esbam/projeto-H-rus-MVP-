# Funcionalidade: Upload de Imagem em Postagens

## ✅ O que foi implementado

### Frontend (React Native)
- **Instalação**: `expo-image-picker` para seleção de imagens da galeria
- **Funcionalidade**:
  - Ícone de imagem na barra de ações (substituindo câmera)
  - Seleção de imagem com permissão de acesso à galeria
  - Preview da imagem selecionada com opção de remover
  - Conversão da imagem para base64 antes do envio
  - Envio automático da imagem junto com o texto da postagem

### Backend (Node.js/Express)
- **Modelo Post.js**: Já suporta campo `image` (string)
- **Rota POST /api/posts**: Aceita `image` no corpo da requisição
- **Armazenamento**: Imagens são armazenadas como base64 no MongoDB

## 📝 Como usar

1. **Na tela de criar postagem**:
   - Escreva o texto da postagem
   - Clique no ícone de imagem para selecionar uma imagem da galeria
   - Ajuste/recorte a imagem se necessário
   - Veja o preview da imagem
   - Clique em "Post" para enviar

2. **Remover imagem selecionada**:
   - Clique no ícone ✕ no canto superior direito do preview

## 🔧 Detalhes técnicos

### Formato de envio
```json
{
  "description": "Texto da postagem",
  "image": "data:image/jpeg;base64,/9j/4AAQSkZJRg..."
}
```

### Limite de tamanho
- Qualidade de imagem: 80% (reduz tamanho do arquivo)
- Aspecto fixo: 4:3
- Máximo recomendado: ~5MB (antes da codificação base64)

## 📱 Componentes atualizados
- `app/(tabs)/create-post.tsx`: Interface de criação com seletor de imagem

## 🚀 Próximos passos (opcional)
- Implementar câmera para tirar fotos ao invés de apenas galeria
- Compressão de imagem antes de envio
- Suporte a múltiplas imagens por postagem
- Armazenamento em serviço externo (AWS S3, Cloudinary, etc)
