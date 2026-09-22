# 📁 Pasta de Arquivos, Certificados, Diplomas e Fotos

Esta pasta foi criada para você armazenar e organizar todos os seus documentos oficiais, certificados, diplomas e fotos do currículo.

Como está dentro da pasta `public/`, **todos os arquivos colocados aqui ficam automaticamente disponíveis na web e no currículo**, sem precisar compilar ou reiniciar o projeto!

---

## 📂 Estrutura de Pastas

- **`diplomas/`**  
  Coloque aqui seus diplomas de graduação, pós-graduação e MBA (PDF, JPG ou PNG).  
  *Exemplo de uso:* `/documentos/diplomas/mba-uninove.pdf`

- **`certificados/`**  
  Coloque aqui certificados de cursos, certificações internacionais (ITIL, Microsoft, HDI, etc.).  
  *Exemplo de uso:* `/documentos/certificados/itil-v4.pdf`

- **`fotos/`**  
  Coloque fotos de perfil executivas ou imagens de apresentação.  
  *Exemplo de uso:* `/documentos/fotos/perfil.jpg`

---

## 💡 Como os arquivos funcionam no projeto:

1. **Formatos recomendados:**
   - Documentos e Certificados: **PDF**, **JPG**, **PNG**, **WEBP**
   - Fotos: **JPG**, **PNG**, **WEBP**

2. **Como acessar qualquer arquivo no currículo:**
   - Se você colocar um arquivo chamado `meu-certificado.pdf` dentro de `public/documentos/certificados/`:
   - O endereço dele no navegador e no código será:
     ```
     /documentos/certificados/meu-certificado.pdf
     ```

3. **Arquivos padrão já incluídos:**
   Os arquivos atuais já usados pelo currículo também estão em `public/assets/img/`:
   - `cert-mba.jpeg`
   - `cert-redes.jpeg`
   - `ITIL4.png`
   - `MS-900.png`
   - `foto-fabio.jpg`
