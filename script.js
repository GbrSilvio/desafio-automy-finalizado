const messageInput = document.getElementById('messageInput');
const chatMessages = document.getElementById('chatMessages');

function getToken(callback) {
    const xhr = new XMLHttpRequest();
    const url = 'https://appsaccess.automy.com.br/login';

    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            try {
            const response = JSON.parse(xhr.responseText);
            if (response.token) {
                callback(null, response.token);
            } else {
                callback(new Error('Token não encontrado na resposta.'));
            }
            } catch (e) {
            callback(new Error('Erro ao parsear JSON: ' + e.message));
            }
        } else {
            callback(new Error('Erro na requisição: ' + xhr.status));
        }
        }
    };

    const data = JSON.stringify({
        username: 'fldoaogopdege',
        password: 'ygalepsm'
    });

    xhr.send(data);
}
  

function buscarDadosPorEmail(email) {
    getToken(function (err, token) {
      if (err) {
        inserirMensagemRecebida('Erro ao obter token: ' + err.message);
        return;
      }
  
      const xhr = new XMLHttpRequest();
      const url = 'https://appsaccess.automy.com.br/api/api/desafio/custom/do/query';
  
      xhr.open('POST', url, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.setRequestHeader('Authorization', 'Bearer ' + token);
  
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            try {
              const response = JSON.parse(xhr.responseText);
              if (!Array.isArray(response) || response.length === 0) {
                inserirMensagemRecebida(`Nenhum agendamento encontrado para ${email}.`);
                return;
              }
  
              const hoje = new Date();
              const agendadas = [];
              const passadas = [];
  
              response.forEach(item => {
                const [dia, mes, ano] = item.data_agendamento.split('/');
                const dataAgendamento = new Date(`${ano}-${mes}-${dia}T00:00:00`);
  
                if (dataAgendamento >= hoje) {
                  agendadas.push(item);
                } else {
                  passadas.push(item);
                }
              });
  
              if (agendadas.length === 0) {
                inserirMensagemRecebida(`Nenhuma bateria agendada futura encontrada para ${email}.`);
              } else {
                const textoAgendadas = formatarBaterias(agendadas, `Agendamentos futuros para ${email}`);
                inserirMensagemRecebida(textoAgendadas, true, passadas);
              }
            } catch (e) {
              inserirMensagemRecebida('Erro ao processar resposta: ' + e.message);
            }
          } else {
            inserirMensagemRecebida('Erro ao buscar dados: ' + xhr.status);
          }
        }
      };
  
      const body = JSON.stringify({
        query: `SELECT * FROM desafio.cadastro_baterias_desafio WHERE email = '${email}'`,
        db: 'desafio'
      });
  
      xhr.send(body);
    });
  }
  
  // Insere uma nova mensagem recebida no chat
  function inserirMensagemRecebida(texto, mostrarBotao = false, bateriasPassadas = []) {
    const chatMessages = document.getElementById('chatMessages');
  
    const msgDiv = document.createElement('div');
    msgDiv.className = 'message received';
    msgDiv.innerText = texto;
    chatMessages.appendChild(msgDiv);
  
    // Botão "Ver baterias passadas"
    if (mostrarBotao && bateriasPassadas.length > 0) {
      const botao = document.createElement('button');
      botao.innerText = 'Ver baterias passadas';
      botao.style.marginTop = '5px';
      botao.style.padding = '8px';
      botao.style.backgroundColor = '#ccc';
      botao.style.border = 'none';
      botao.style.borderRadius = '6px';
      botao.style.cursor = 'pointer';
  
      botao.onclick = function () {
        const textoPassadas = formatarBaterias(bateriasPassadas, `Baterias passadas para ${bateriasPassadas[0]?.email}`);
        inserirMensagemRecebida(textoPassadas);
        botao.remove(); // remove o botão depois de clicar
      };
  
      chatMessages.appendChild(botao);
    }
  
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
  
  // Formata as baterias em texto
  function formatarBaterias(lista, titulo) {
    let msg = `${titulo}:\n\n`;
    lista.forEach((item, i) => {
      msg += `#${i + 1}\n`;
      msg += `Nome: ${item.nome}\n`;
      msg += `Data: ${item.data_agendamento}\n`;
      msg += `Horário: ${item.horario_agendamento}\n`;
      msg += `Qtd. Pessoas: ${item.qtde_pessoas}\n`;
      msg += `Telefone: ${item.telefone}\n`;
      msg += `Preenchido em: ${item.datetime_formulario}\n\n`;
    });
    return msg.trim();
  }
  
  


function sendMessage() {
  const text = messageInput.value.trim();
  if (text !== '') {
    const msg = document.createElement('div');
    msg.className = 'message sent';
    msg.innerText = text;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    messageTemp = document.getElementById('messageInput').value
    messageInput.value = '';



    buscarDadosPorEmail(messageTemp);

  }
}

// Enviar com Enter
messageInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    sendMessage();
  }
});