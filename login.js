class Login{
    static mat = null;
    static pas = null;
    static logado = false;
    static matlogado = null;
    static nomelogado = null;
    static acessologado = null;
    static estilocss = null;
    static callback_ok = null;
    static callback_naook = null;
    static config = null;
    
    static login(callback_ok,callback_naook,config){
        this.config = config;
        this.callback_ok = ()=>{callback_ok()};
        this.callback_naook = ()=>{callback_naook()}
        this.estilocss = `
        .fundoLogin{
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            width: 100%;
            position: absolute;
            top: 0px;
            left: 0px;
            background-color: rgba(0, 0, 0, 0.7);
            box-sizing: border-box;
        }
        .baseLogin{
            display: flex;
            justify-content: center;
            align-items: stretch;
            width: 50%;
            box-sizing: inherit;
        }
        .elementosLogin{
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            width: 50%;
            background-color: #eee;
            padding: 10px;
            border-radius: 10px 0px 0px 10px;
            box-sizing: inherit;
        }
        .logoLogin{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 50%;
            background-color: #bbb;
            padding: 10px;
            border-radius: 0px 10px 10px 0px;
            box-sizing: inherit;
        }
        .logoLogin img{
            width: 90%;
            box-sizing: inherit;
        }
        .campoLogin{
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            flex-direction: column;
            box-sizing: inherit;
            margin-bottom: 20px;
        }
        .campoLogin label{
            font-size: 18px;
        }
        .campoLogin input{
            font-size: 18px;
            padding: 5px;
            background-color: #fff;
            border-radius: 5px;
        }
        .botoesLogin{
            display: flex;
            justify-content: space-around;
            align-items: center;
            width: 100%;
            box-sizing: inherit;
            margin-top: 15px;
        }
        .botoesLogin button{
            cursor: pointer;
            background-color: ${this.config.cor};
            color: #fff;
            border-radius: 5px;
            padding: 10px;
            width: 100px;
            box-sizing: inherit;
        }`;

        const linkEstilo = document.createElement('style');
        linkEstilo.setAttribute('id','idEstiloLogin');
        linkEstilo.innerHTML = this.estilocss;
        document.head.appendChild(linkEstilo);
        //<style id="idEstiloLogin"></style>

        const fundoLogin = document.createElement('div');
        fundoLogin.setAttribute('id','fundoLogin');
        fundoLogin.setAttribute('class','fundoLogin');
        document.body.prepend(fundoLogin);
        //<div id="fundoLogin" class="fundoLogin"></div>

        const baseLogin = document.createElement('div');
        baseLogin.setAttribute('id','baseLogin');
        baseLogin.setAttribute('class','baseLogin');
        fundoLogin.prepend(baseLogin);
        //<div id="baseLogin" class="baseLogin"></div>

        const elementosLogin = document.createElement('div');
        elementosLogin.setAttribute('id','elementosLogin');
        elementosLogin.setAttribute('class','elementosLogin');
        baseLogin.prepend(elementosLogin);
        //<div id="elementosLogin" class="elementosLogin"></div>

        const campoLoginUsername = document.createElement('div');
        campoLoginUsername.setAttribute('class','campoLogin');
        elementosLogin.prepend(campoLoginUsername);
        //<div class="campoLogin"></div>

        const labelUsername = document.createElement('label');
        labelUsername.innerHTML = "UserName";
        campoLoginUsername.prepend(labelUsername);
        //<label>Username</label>

        const inputUsername = document.createElement('input');
        inputUsername.setAttribute('type','text');
        inputUsername.setAttribute('name','f_username');
        inputUsername.setAttribute('id','f_username');
        campoLoginUsername.appendChild(inputUsername);
        //<input type="text" name="f_username" id="f_username"></input>

        const campoLoginSenha = document.createElement('div');
        campoLoginSenha.setAttribute('class','campoLogin');
        elementosLogin.appendChild(campoLoginSenha);
        //<div class="campoLogin"></div>
        
        const labelSenha = document.createElement('label');
        labelSenha.innerHTML = "Senha";
        campoLoginSenha.prepend(labelSenha);
        //<label>Senha</label>

        const inputSenha = document.createElement('input');
        inputSenha.setAttribute('type','password');
        inputSenha.setAttribute('name','f_senha');
        inputSenha.setAttribute('id','f_senha');
        campoLoginSenha.appendChild(inputSenha);
        //<input type="password" name="f_senha" id="f_senha"></input>

        const botoesLogin = document.createElement('div');
        botoesLogin.setAttribute('class','botoesLogin');
        elementosLogin.appendChild(botoesLogin);
        //<div class="botoesLogin"></div>

        const btnLogin = document.createElement('button');
        btnLogin.setAttribute('id','btnLogin');
        btnLogin.innerHTML = "Login";
        btnLogin.addEventListener('click',(evt)=>{
             this.verificaLogin();
        })
        botoesLogin.prepend(btnLogin);
        //<button id="btnLogin">Login</button>

        const btnCancelar = document.createElement('button');
        btnCancelar.setAttribute('id','btnCancelar');
        btnCancelar.innerHTML = "Cancelar";
        btnCancelar.addEventListener('click',(evt)=>{
            this.fechar();
        })
        botoesLogin.appendChild(btnCancelar);
        //<button id="btnCancelar">Cancelar</button>

        const logoLogin = document.createElement('div');
        logoLogin.setAttribute('id','logoLogin');
        logoLogin.setAttribute('class','logoLogin');
        baseLogin.appendChild(logoLogin)
        //<div id="logoLogin" class="logoLogin"></div>

        const img = document.createElement('img');
        img.setAttribute('src',`${this.config.img}`)
        logoLogin.appendChild(img);
        //<img src="../../../../TUCAS/logo.png">
    }

    static fechar(){
        const fundoLogin = document.querySelector('#fundoLogin');
        fundoLogin.remove();
        const idEstiloLogin = document.querySelector('#idEstiloLogin');
        idEstiloLogin.remove();
    }

    static verificaLogin(){
        let mat = document.querySelector('#f_username').value;
        let pas = document.querySelector('#f_senha').value;

        this.config.endpoint += `?matricula=${mat}&senha=${pas}`;

        fetch(this.config.endpoint)
        .then(res=>res.json())
        .then(res=>{
            if(res){
                this.logado = true;
                this.matlogado = mat;
                this.nomelogado = res.nome;
                this.acessologado = res.acesso;
                this.fechar();
                this.callback_ok();
            } else{
                this.logado = false;
                this.matlogado = null;
                this.nomelogado = null;
                this.acessologado = null;
                this.callback_naook();
            };
        })
    }
};

export {Login};