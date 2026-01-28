"use strict";
// Aguarda o HTML carregar completamente
document.addEventListener('DOMContentLoaded', () => {
    const cepInput = document.getElementById('cepInput');
    const searchBtn = document.getElementById('searchBtn');
    const result = document.getElementById('result');
    // TESTE VISUAL IMEDIATO
    console.log('Script carregado com sucesso ✅');
    searchBtn.addEventListener('click', () => {
        console.log('Botão clicado 🚀');
        buscarCEP();
    });
    function buscarCEP() {
        const cep = cepInput.value.replace(/\D/g, '');
        if (cep.length !== 8) {
            result.innerHTML = '❌ CEP inválido';
            return;
        }
        result.innerHTML = '🔍 Buscando...';
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(res => res.json())
            .then(data => {
            if (data.erro) {
                result.innerHTML = '❌ CEP não encontrado';
                return;
            }
            result.innerHTML = `
          <p><strong>Rua:</strong> ${data.logradouro}</p>
          <p><strong>Bairro:</strong> ${data.bairro}</p>
          <p><strong>Cidade:</strong> ${data.localidade}</p>
          <p><strong>UF:</strong> ${data.uf}</p>
        `;
        })
            .catch(() => {
            result.innerHTML = '⚠️ Erro na consulta';
        });
    }
});
