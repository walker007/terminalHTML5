var titleTerminal = document.getElementById("appTitle");
titleTerminal.innerHTML = "webuser@serv~:$";

window.onkeydown = function (event) {
   var text = document.getElementById("console_string_text"),
   consoleOutput = document.getElementById("console_output")
   consoleUserString = document.getElementById("console_string");

   //Variáveis de customização da string de usuario
   var user = document.getElementById("console_string_user"),
       at = document.getElementById("console_string_at"),
       server = document.getElementById("console_string_server"),
       path = document.getElementById("console_string_path"),
       signal = document.getElementById("console_string_signal");
       console.log(event.which);
   switch (event.which) {
     case 9:
       event.preventDefault();
       text.insertAdjacentHTML('beforeend', "&nbsp;&nbsp;&nbsp;");
     break;
     case 8:
     case 46:
       event.preventDefault();
       var newText = text.textContent.substring(0, text.textContent.length - 1);
       text.innerHTML = newText;
       break;
       //F1 a F12
       case 112:
       case 113:
       case 114:
       case 115:
       case 116:
       case 117:
       case 118:
       case 119:
       case 120:
       case 121:
       case 122:
       case 123:
       
       //Ignora Shift Alt Ctrl
       case 16:
       case 17:
       case 18:
       case 20:
       case 225:
         event.preventDefault();
       break;
       case 13:
       var consoleOutputString = createOutputElement();
         consoleOutput.insertBefore(consoleOutputString,consoleUserString);
         processaComando();
         text.innerHTML = "";
       break;
     default:
         text.append(event.key);

   }



   function createOutputElement()
   {
     //cria os elementos para a string de output que vai permanecer o que o usuário digitou
     var consoleOutputString = document.createElement('section'),
         userOutput = document.createElement("span"),
         createOutput = document.createElement("span"),
         serverOutput = document.createElement("span"),
         pathOutput = document.createElement("span"),
         signalOutput = document.createElement("span"),
         textOutput = document.createElement("span");

         //Adiciona as classes em cada elemento
     consoleOutputString.classList.add("console_string");
     userOutput.classList.add("console_string_user");
     createOutput.classList.add("console_string_at");
     serverOutput.classList.add("console_string_server");
     pathOutput.classList.add("console_string_path");
     signalOutput.classList.add("console_string_signal");
     textOutput.classList.add("console_string_text");

     //Coloca o texto atual da string do usuário
     userOutput.appendChild(document.createTextNode(user.textContent));
     createOutput.appendChild(document.createTextNode(at.textContent));
     serverOutput.appendChild(document.createTextNode(server.textContent));
     pathOutput.appendChild(document.createTextNode(path.textContent));
     signalOutput.appendChild(document.createTextNode(signal.textContent));
     textOutput.appendChild(document.createTextNode(text.textContent));

     //inclui os elementos criados na tag Section
     consoleOutputString.appendChild(userOutput);
     consoleOutputString.appendChild(createOutput);
     consoleOutputString.appendChild(serverOutput);
     consoleOutputString.appendChild(pathOutput);
     consoleOutputString.appendChild(signalOutput);
     consoleOutputString.appendChild(textOutput);

     //retorna a section já criada para ser colocada dentro da main
     return consoleOutputString;
   }

   function processaComando()
   {
     //Cria a section que vai receber o output do comando
      var consoleSystemOutput = document.createElement('section');
      consoleSystemOutput.classList.add("console_string_systemOutput");

      var comando = text.textContent.split(" ");

     switch (comando[0]) {
       case 'echo':
            delete comando[0];
            consoleSystemOutput.innerHTML = comando.join(" ");
         break;
       case 'clear':
       case 'source':
          window.location.reload();
        break;
        case 'sudo':
            user.innerHTML = comando[1];
            titleTerminal.innerHTML = comando[1]+"@serv~:#";
            signal.innerHTML = "#";
          break;
        case 'exit':
            user.innerHTML = "webuser";
            titleTerminal.innerHTML = "webuser@serv~:$";
            signal.innerHTML = "$";
          break;
        case 'cd':
            path.innerHTML = "~/"+comando[1]+":";
          break;
        case 'version':
            consoleSystemOutput.innerHTML = "Terminal HTML5 1.0.0<br/>Copyright (c) The Walker007 <br/>Este programa foi desenvolvido para fins exclusivamente ditáticos<br/>não tendo nenhuma funcionalidade real<br/>este programa não fará a substituição de seu terminal<br/>";
          break;
       default:
       //Output padrão caso o comando não exista
       consoleSystemOutput.innerHTML = 'Este comando Não existe, ou você não possui permissão para executá-lo';
     }

     //Coloca a Section na tagMain antes da string do usuário que está ativa, e rola a página para baixo
     consoleOutput.insertBefore(consoleSystemOutput,consoleUserString);
     window.scrollTo(0,document.body.scrollHeight);
   }

  };
