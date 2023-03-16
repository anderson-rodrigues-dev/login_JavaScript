class Cxmsg{
    static cor = '#888';
    static destino = null;
    static divmsg = null;
    static tipo = null;
    static comando= null;
    static textos = null

    static mostrar(config){
        this.cor = config.cor;
        this.titulo = config.titulo;
        this.texto = config.texto;
        this.tipo = config.tipo;
        this.comando = ()=>{config.comando()};
        this.textos = config.textos;
        this.destino = document.body;
        const divmsg = document.createElement('div');
        this.divmsg = divmsg;
        const estilo_divmsg = 
            `display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            font: 16px calibri;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100vh;
            background-color: rgba(0, 0, 0, 0.7);
            z-index: 99999999999;`;
        divmsg.setAttribute('id','csmsg');
        divmsg.setAttribute('style',estilo_divmsg);
        this.destino.prepend(divmsg);

        const areaCxMsg = document.createElement('div');
        const estilo_areaCxMsg = 
            `display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            flex-direction: column;
            width: 300px;`;
        areaCxMsg.setAttribute('style',estilo_areaCxMsg);
        areaCxMsg.setAttribute('class','child');
        divmsg.appendChild(areaCxMsg);

        const tituloCxMsg = document.createElement('div');
        const estilo_tituloCxMsg = 
            `display: flex;
            justify-content: flex-start;
            align-items: center;
            font-weight: bold;
            font: 25px garamond !important;
            width: 100%;
            background-color: ${this.cor};
            color: #fff;
            padding: 5px;
            border-radius: 5px 5px 0px 0px;`;
        tituloCxMsg.setAttribute('style',estilo_tituloCxMsg);
        tituloCxMsg.setAttribute('class','child');
        tituloCxMsg.innerHTML = this.titulo;
        areaCxMsg.appendChild(tituloCxMsg);

        const corpoCxMsg = document.createElement('div');
        const estilo_corpoCxMsg = 
            `display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            background-color: #eee;
            color: #000;
            padding: 30px 5px;
            text-align: center;`;
        corpoCxMsg.setAttribute('style',estilo_corpoCxMsg);
        corpoCxMsg.setAttribute('class','child');
        corpoCxMsg.innerHTML = this.texto;
        areaCxMsg.appendChild(corpoCxMsg);

        const rodapeCxMsg = document.createElement('div');
        const estilo_rodapeCxMsg = 
            `display: flex;
            justify-content: space-around;
            align-items: center;
            width: 100%;
            background-color: #ccc;
            color: #000;
            padding: 5px;
            border-radius: 0px 0px 5px 5px;`;
        rodapeCxMsg.setAttribute('style',estilo_rodapeCxMsg);
        rodapeCxMsg.setAttribute('class','child');
        areaCxMsg.appendChild(rodapeCxMsg);

        if(this.tipo.toLowerCase() == 'ok'){
            const btnOk = document.createElement('button');
            const estilo_btnOk = 
                `background-color: ${this.cor};
                color: #fff;
                padding: 10px 50px;
                border-radius: 5px;
                cursor: pointer;
                text-transform: uppercase;`;
            btnOk.setAttribute('style',estilo_btnOk);
            btnOk.innerHTML = 'Ok'
            btnOk.setAttribute('id','btnOk');
            rodapeCxMsg.appendChild(btnOk);

            btnOk.addEventListener('click',(evt)=>{
                this.ocultar();
                this.comando();
            })
            btnOk.addEventListener('mouseenter',(evt)=>{
                //btnOk.style.backgroundColor = '#0f0';
                btnOk.style.opacity = 0.7;
            })
            btnOk.addEventListener('mouseout',(evt)=>{
                //btnOk.style = estilo_btnOk;
                btnOk.style.opacity = 1;
            })
        } else if(this.tipo.toLowerCase() == 'sn'){
            const btn1 = document.createElement('button');
            const estilo_btn1 = 
                `background-color: ${this.cor};
                color: #fff;
                padding: 10px 50px;
                border-radius: 5px;
                cursor: pointer;
                text-transform: uppercase;`;
            btn1.setAttribute('style',estilo_btn1);
            btn1.innerHTML = this.textos[0];
            btn1.setAttribute('id','btn1');
            rodapeCxMsg.appendChild(btn1);

            btn1.addEventListener('click',(evt)=>{
                this.comando();
                this.ocultar();
            })
            btn1.addEventListener('mouseenter',(evt)=>{
                btn1.style.backgroundColor = '#0f0';
            })
            btn1.addEventListener('mouseout',(evt)=>{
                btn1.style = estilo_btn1;
            })

            const btn2 = document.createElement('button');
            const estilo_btn2 = 
                `background-color: ${this.cor};
                color: #fff;
                padding: 10px 50px;
                border-radius: 5px;
                cursor: pointer;
                text-transform: uppercase;`;
            btn2.setAttribute('style',estilo_btn2);
            btn2.innerHTML = this.textos[1];
            btn2.setAttribute('id','btn2');
            rodapeCxMsg.appendChild(btn2);

            btn2.addEventListener('click',(evt)=>{
                this.ocultar();
            })
            btn2.addEventListener('mouseenter',(evt)=>{
                btn2.style.backgroundColor = "#f00";
            })
            btn2.addEventListener('mouseout',(evt)=>{
                btn2.style = estilo_btn2;
            })
        }
    }
    static ocultar(){
        this.divmsg.remove();
    }
}

export {Cxmsg};