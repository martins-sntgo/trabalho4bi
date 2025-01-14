
        let usuarioTipo = null;
        let tarifa = 5;
        const tickets = [];
        const convenios = {
            "empresaA": 0.2,
            "empresaB": 0.15
        };

        function login() {
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            if (username === "admin" && password === "admin123") {
                usuarioTipo = 'admin';
            } else if (username === "funcionario" && password === "func123") {
                usuarioTipo = 'funcionario';
            } else {
                alert("Usuário ou senha incorretos.");
                return;
            }

            document.querySelector(".login-container").style.display = 'none'; //retorna o promeiro elemento descendento do elemento em q a funcao foi invocada e q corresponde aos seletores especificados
            document.getElementById("appContainer").style.display = 'block';//retorna a referencia atravez do id

            if (usuarioTipo === 'admin') {
                document.getElementById("tarifaSection").style.display = 'block';
            }
        }

        function alterarTarifa() {
            if (usuarioTipo === 'admin') {
                const novaTarifa = prompt("Digite a nova tarifa:");
                if (novaTarifa && !isNaN(novaTarifa) && parseFloat(novaTarifa) > 0) {
                    tarifa = parseFloat(novaTarifa);
                    document.getElementById("tarifa").value = tarifa;
                } else {
                    alert("Tarifa inválida.");
                }
            } else {
                alert("Apenas o admin pode alterar a tarifa.");
            }
        }

        function calcularValor(entrada, saida, convenio) {
            const tempo = (saida - entrada) / (1000 * 60 * 60);
            let valor = tarifa;

            if (tempo > 1) {
                valor += (tempo - 1) * (tarifa * 0.5);
            }

            if (convenio) {
                valor -= valor * convenios[convenio];
            }

            return { valor: valor.toFixed(2), tempo: tempo.toFixed(1) };
        }

        function registrarEntrada() {
            const placa = document.getElementById("placa").value;
            const modelo = document.getElementById("modelo").value;
            const cor = document.getElementById("cor").value;
            const entrada = new Date(document.getElementById("horaEntrada").value);
            const saida = new Date(document.getElementById("horaSaida").value);

            if (saida <= entrada) {
                alert("Hora de saída deve ser maior que a hora de entrada.");
                return;
            }

            const convenio = prompt("Possui convênio? Informe o nome ou deixe vazio.");//retorna uma string

            if (convenio && !convenios[convenio]) {
                alert("Convênio não encontrado.");
                return;
            }

            const { valor, tempo } = calcularValor(entrada, saida, convenio);

            tickets.push({ placa, modelo, cor, entrada, saida, tempo, valor });//adiciona valor a um array

            atualizarTabela();
            document.getElementById("form").reset();
        }

        function atualizarTabela() {
            const tabela = document.getElementById("tabela");
            tabela.innerHTML = "";//permite vc acessar o valor contido dentro de um elemento DOM

            tickets.forEach(ticket => {//simplifica a interaçao sobre elementos de uma colecao, executano uma ação especifica para cada elemento
                const row = document.createElement("tr");//converte tagName para letras maiusculas antes de criar o elemento
                row.innerHTML = `
                    <td>${ticket.placa}</td>
                    <td>${ticket.modelo}</td>
                    <td>${ticket.cor}</td>
                    <td>${ticket.entrada.toLocaleString()}</td>  
                    <td>${ticket.saida.toLocaleString()}</td>
                    <td>${ticket.tempo} horas</td>
                    <td>R$ ${ticket.valor}</td>
                `;
                tabela.appendChild(row);
            });  //retorna uma cadeia de caracteres (string) representando o obj
        }
    