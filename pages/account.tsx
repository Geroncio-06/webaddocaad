import CircularProgress from '@material-ui/core/CircularProgress';
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { firebaseClient } from '../firebaseClient';
import styles from '../styles/Home.module.css';

export default (_props: any) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [nascimento, setNascimento] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [bairro, setBairro] = useState('');
  const [bata, setBata] = useState(null);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [passw, setPassw] = useState('');
  
  const [confirmpass, setConfirmpass] = useState('');
  const [cliCk, setClick] = useState (false);
  const [imageload, setImageload] = useState (false);
  const [imageurl, setImageurl]= useState('');
  const [imageurlname, setImageurlname]= useState('');
  const [aval, setAval] = useState(false);
   //variavel false  enquanto não está carregando 
   const [loading, setLoading] = useState(false);
   var passSenha: any;
   var imagemSelecionada: any ;
   
   function criptografar(){
    
    const crypto = require('crypto');
    const ENC_KEY = "bf3c199c2470cb477d907b1e0917c17b"; // set random encryption key
    const IV = crypto.randomBytes(16); // set random initialisation vector
    // ENC_KEY and IV can be generated as crypto.randomBytes(32).toString('hex');
    
    const phrase = pass;
    
    
    var encrypt = ((val:any) => {
      let cipher = crypto.createCipheriv('aes-256-cbc', ENC_KEY, IV);
      let encrypted = cipher.update(val, 'utf8', 'base64');
      encrypted += cipher.final('base64');
      return IV.toString('base64')+':'+encrypted;
      
    });
    var decrypt = ((encrypted: any) => {
      const parts = encrypted.split(':');
      let decipher = crypto.createDecipheriv('aes-256-cbc', ENC_KEY, new Buffer(parts[0], 'base64'));
      let decrypted = decipher.update(parts[1], 'base64', 'utf8');
      return (decrypted + decipher.final('utf8'));
    });

    var encrypted_key = encrypt(phrase);
    passSenha=encrypted_key;
    
    
    var original_phrase = decrypt(encrypted_key);
    

    
   };


function paginaInicial(){
  window.location.href="/login";
}


   

function imageClick(){

  
  let photo: HTMLInputElement = document.getElementById('imagemUploadAdicionar') as HTMLInputElement;
  var storage = firebaseClient.storage().ref();
  let file: HTMLInputElement| null = document.getElementById('flImage') as HTMLInputElement;
  

  
    

  if(photo!=null && file != null){
    photo.addEventListener('click', () => {

      if(file instanceof HTMLElement){
        file.click();

        file.addEventListener('change', (evt) => {


          if(file?.files!=null){

            


            if (file.files.length <= 0) {
              return;
          }
      
          let reader = new FileReader();
      
          reader.onload = () => {
              if(photo!=null ){photo.src = reader.result as string;}
              imagemSelecionada = reader.result;

             
              
          }
      
          reader.readAsDataURL(file.files[0]);

      

          if(evt.target !=null){

            let firstFile: any = (evt.target! as HTMLInputElement).files![0];

            
            
            setImageurlname(firstFile.name);
            

              var upload = storage.child("FotoUsuario/").child(firstFile.name).put(firstFile);

            
  
              upload.on('state_changed', function(snapshot){
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                if(progress == 100){
                  setImageload(true);
                }
              },function(error){
                console.log(error.message);
              }, function(){
                upload.snapshot.ref.getDownloadURL().then(function(downloadURL){
                  setImageurl(downloadURL);
                  
                });
              });
              
            

          };

          

          
          
            

            
          

          }

          
      });
      }
      
    });
  }


};
  
  



  async function account() {

    
    
    if(imageload == true){
      setTimeout(function(){setAval(true)},1000);

      if(aval==true){

        if(confirmpass == pass){
          
          criptografar();
         

          if(name != '' 
                && surname != '' 
                && nascimento != '' 
                && telefone != '' 
                && endereco != '' 
                && bairro != ''){

                  
                  
                          var radio = document.querySelector('input[name="batizadoA1"]:checked') as HTMLInputElement;
                          var radio2 = document.querySelector('input[name="batizadoE"]:checked') as HTMLInputElement;
                          var radio3 = document.querySelector('input[name="funcao"]:checked')as HTMLInputElement;
                          var result=null;
                          var batizadoe = null;
                          var funcao = null;
          
                          if(radio != null){
                            result = radio.value;
                          }else{
                            result = "null";
                          };
                          if(radio2 != null){
                            batizadoe = radio2.value;
                          }else {
                            batizadoe = "null";
                          }
                          if(radio3 != null){
                            funcao = radio3.value;
                          }else {
                            funcao = "null";
                          }

                          if(result != "null" && batizadoe != "null" && funcao != "null"){

                            try{

                              const myElement: HTMLElement | null = document.querySelector("#btnRegistrar");
                              if(myElement != null){
                                myElement.style.backgroundColor="transparent";
                              };
                              
                              
                              setLoading(true);
                              await firebaseClient
                                    .auth()
                                    .createUserWithEmailAndPassword(email, pass);

                        
                                    var IdData = firebaseClient.auth().currentUser?.uid;
                    
                                    
                    
                                    
                                    
                                    
                                    
                                    
                        
                        
                              await firebaseClient.database().ref('Usuário/'+IdData).set({
                                      fullname:name,
                                      lastName:surname,
                                      nascimento:nascimento,
                                      telefone:telefone,
                                      endereco:endereco,
                                      bairro:bairro,
                                      batizadonasaguas:result,
                                      batizadonoespirito:batizadoe,
                                      funcao:funcao,
                                      email:email,
                                      password:passSenha,
                                      imagem:imageurl,
                                      imagemName:imageurlname
                                    }).then(() => {
                                      console.log("contatos adicionados ao Firebase");
                                      setClick(true);
                                      
                                    }).catch(error2 => {
                                        console.log(error2);
                                      
                                    });
                        
                                    window.location.href = '/login';
                                  
                        
                            }catch(error){
                                console.log(error);
                                setLoading(false);
                                alert("Cadastro falhou");
                                
                                const myElement: HTMLElement | null = document.querySelector("#btnRegistrar");
                                
                                if(myElement != null){
                                  myElement.style.backgroundColor="black";
                                };
                                
                            };

                          }else{alert("Responda a todos os questionamentos !");};

                  

                } else{alert('Preencha todos os campos !');};

          
  
        };
        }else if(confirmpass != pass){
            alert("Senhas diferentes");
        }

        
      
    } else {
      if(aval==false){
        alert('Selecione uma imagem de usuário');
      };
      
      console.log('IMAGEM NÃO FOI ENVIADA');
    }
    
    
      

      
    
    
  };


 
  return (
    <Layout>

<div className={styles.overview_content}>

<div className={styles.overview_panel_start_ac}>

    <div>
        <h1 className={styles.text_input_cadastrar_ac}>Vamos Começar</h1>
        <h2 className={styles.text_input_cadastrar2_ac}>Preencha todos os campos com as suas informações pessoais 
        para realizar o seu cadastro. 
        </h2>
    
    </div>

  
</div>

<div className={styles.overview_panel}>

<header className={styles.header_logauth}>
            <svg 
                version="1.0" xmlns="http://www.w3.org/2000/svg"
                width="85" 
                height="50" 
                viewBox="0 0 400 150"
                fill="none"
                preserveAspectRatio="xMidYMid meet"
                onClick={()=>paginaInicial()}>

                <g 
                    transform="translate(0.000000,230.000000) scale(0.100000,-0.100000)"
                    fill="#000000" stroke="none">

                    <path 
                        d="M1798 1763 c-24 -21 -69 -58 -98 -83 -30 -25 -90 -77 -135 -115 -44
                        -39 -106 -92 -137 -118 l-58 -49 0 -334 0 -334 183 0 c182 0 182 0 234 29 l52
                        29 53 -29 c53 -28 54 -28 236 -29 l182 0 0 334 0 335 -57 48 c-31 26 -95 82
                        -142 123 -47 42 -127 110 -178 153 l-92 77 -43 -37z m102 -114 c25 -22 109
                        -95 187 -162 l143 -122 0 -277 0 -278 -138 0 c-99 0 -143 4 -156 13 -17 13
                        -15 16 30 53 113 91 153 154 154 235 0 76 -34 135 -97 168 -32 16 -107 13
                        -147 -6 -33 -15 -38 -15 -75 2 -51 23 -127 17 -169 -13 -47 -34 -76 -103 -69
                        -164 8 -68 44 -125 126 -199 91 -83 85 -88 -101 -89 l-138 0 0 278 0 277 67
                        55 c36 30 122 103 191 163 69 59 130 107 136 107 6 0 31 -19 56 -41z m-136
                        -443 c18 -7 43 -28 55 -45 l23 -32 21 28 c33 43 49 52 90 53 74 0 112 -83 73
                        -158 -16 -31 -118 -130 -158 -155 -25 -16 -28 -15 -65 9 -95 64 -162 152 -163
                        215 0 39 44 89 88 98 1 1 18 -5 36 -13z"
                    />
                    <path 
                        d="M2537 1348 c-13 -24 -45 -82 -71 -130 l-46 -88 55 0 c49 0 57 3 67
                        25 10 23 17 25 75 25 59 0 64 -2 73 -25 9 -23 15 -25 65 -25 l56 0 -68 130
                        -68 130 -57 0 c-57 0 -57 0 -81 -42z m101 -78 c11 -30 10 -30 -23 -30 l-35 0
                        17 35 c18 39 27 38 41 -5z"
                    />
                    <path 
                        d="M2820 1261 l0 -131 129 0 c117 0 131 2 162 23 22 15 39 38 49 65 13
                        37 13 47 0 84 -26 72 -51 83 -206 86 l-134 4 0 -131z m234 33 c19 -18 20 -38
                        6 -65 -9 -16 -22 -19 -75 -19 l-65 0 0 50 0 50 59 0 c41 0 65 -5 75 -16z"
                    />
                    <path 
                        d="M2420 851 l0 -131 129 0 c117 0 131 2 162 23 22 15 39 38 49 65 13
                        37 13 47 0 84 -26 72 -51 83 -206 86 l-134 4 0 -131z m234 33 c19 -18 20 -38
                        6 -65 -9 -16 -22 -19 -75 -19 l-65 0 0 50 0 50 59 0 c41 0 65 -5 75 -16z"
                    />
                    <path 
                        d="M2903 971 c-77 -20 -108 -64 -100 -139 6 -54 35 -87 92 -101 86 -22
                        173 -9 221 32 55 47 39 158 -26 192 -36 19 -142 28 -187 16z m125 -87 c46 -32
                        16 -84 -49 -84 -56 0 -79 15 -79 51 0 21 6 32 23 39 35 14 80 12 105 -6z"
                    />
                    <path 
                        d="M3283 971 c-73 -19 -103 -57 -103 -131 0 -81 86 -129 207 -117 68 7
                        113 33 130 75 l13 32 -51 0 c-31 0 -56 -6 -65 -15 -18 -17 -86 -20 -115 -5
                        -30 16 -26 68 7 80 37 14 77 12 100 -5 11 -8 41 -14 72 -15 l52 0 -13 32 c-7
                        18 -27 41 -44 51 -35 20 -142 30 -190 18z"
                        />
                    <path 
                        d="M3653 968 c-5 -7 -38 -66 -72 -130 l-62 -118 56 0 c49 0 57 3 67 25
                        10 23 17 25 75 25 59 0 64 -2 73 -25 9 -23 15 -25 65 -25 l56 0 -62 118 c-34
                        64 -66 123 -72 130 -5 7 -32 12 -62 12 -30 0 -57 -5 -62 -12z m85 -110 c11
                        -27 11 -28 -23 -28 l-35 0 17 35 c18 37 22 36 41 -7z"
                    />
                </g>
            </svg>
  </header>


  <div >
            <img src="/userimage.png"
                width="100"
                height="100"
                className={styles.userPhoto_ac}
                id="imagemUploadAdicionar"
                onClick={()=> imageClick()}
                
                
                ></img>
          </div>

          <input type="file" id="flImage" name="fImage" accept="image/*" className={styles.input_log}></input>


<div className={styles.scroll_ac} >

<label>
    <input 
        className={styles.input_ac2} 
        type="name"
        id="name"
        name="name"
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        />
  </label>

  <label>
    <input 
        className={styles.input_ac} 
        type="surname"
        id="surname"
        name="surname"
        placeholder="Sobrenome"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
        />
  </label>

  <label>
    <input 
        className={styles.input_ac} 
        type="nascimento"
        id="nascimento"
        name="nascimento"
        placeholder="dd/mm/aaaa"
        value={nascimento}
        onChange={(e) => setNascimento(e.target.value)}
        />
  </label>

  <label>
    <input 
        className={styles.input_ac} 
        type="telefone"
        id="telefone"
        name="telefone"
        placeholder="Telefone"
        value={telefone}
        onChange={(e) => setTelefone(e.target.value)}
        />
  </label>

  <label>
    <input 
        className={styles.input_ac} 
        type="endereco"
        id="endereco"
        name="endereco"
        placeholder="Endereço"
        value={endereco}
        onChange={(e) => setEndereco(e.target.value)}
        />
  </label>

  <label>
    <input 
        className={styles.input_ac} 
        type="bairro"
        id="bairro"
        name="bairro"
        placeholder="Bairro"
        value={bairro}
        onChange={(e) => setBairro(e.target.value)}
        />
  </label>
            <h1 className={styles.text_input_ac2} >Você é batizado nas águas ?</h1>
            <p className={styles.radioGroup_ac2}>
                <input className={styles.radioGroup_input2} type="radio" name="batizadoA1" value = "Sim"  />
                <h2 className={styles.text_input_ac3} >Sim</h2>
                <input className={styles.radioGroup_input2} type="radio" name="batizadoA1" value="Não"  /> 
                <h2 className={styles.text_input_ac3} >Não</h2>
                
            </p>

            <h1 className={styles.text_input_ac2} >Você é batizado no Espirito Santo ?</h1>
            <p className={styles.radioGroup_ac2}>
                <input className={styles.radioGroup_input2} type="radio" name="batizadoE" value="Sim" />
                <h2 className={styles.text_input_ac3} >Sim</h2>
                <input className={styles.radioGroup_input2} type="radio" name="batizadoE" value="Não"/> 
                <h2 className={styles.text_input_ac3} >Não</h2>
                
            </p>

            <h1 className={styles.text_input_ac2} >Qual a sua função na igreja  ?</h1>
            <p className={styles.radioGroup_ac2}>
                <input className={styles.radioGroup_input2} type="radio" name="funcao" value="Pastor(a)" />
                <h2 className={styles.text_input_ac3} >Pastor(a)</h2>
                <input className={styles.radioGroup_input2} type="radio" name="funcao" value="Evangelista"/> 
                <h2 className={styles.text_input_ac3} >Evangelista</h2>
                <input className={styles.radioGroup_input2} type="radio" name="funcao" value="Missionário(a)"/> 
                <h2 className={styles.text_input_ac3} >Missionario(a)</h2>
                <input className={styles.radioGroup_input2} type="radio" name="funcao" value="Diácono(a)"/> 
                <h2 className={styles.text_input_ac3} >Diacono(a)</h2>
                <input className={styles.radioGroup_input2} type="radio" name="funcao" value="Músico"/> 
                <h2 className={styles.text_input_ac3} >Musico</h2>
                <input className={styles.radioGroup_input2} type="radio" name="funcao" value="Membro"/> 
                <h2 className={styles.text_input_ac3} >Membro</h2>
                
            </p>


  <label>
    <input 
        className={styles.input_ac} 
        type="email"
        id="email"
        name="email"
        placeholder="Endereço de Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
  </label>

  
  <label>
    <input 
        className={styles.input_ac} 
        type="password"
        id="password"
        name="password"
        placeholder="Senha"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        
        />
  </label>

  <label>
    <input 
        className={styles.input_ac} 
        type="password"
        id="confirmpass"
        name="confirmpass"
        placeholder="Confirme a sua Senha"
        value={confirmpass}
        onChange={(e) => setConfirmpass(e.target.value)}
        
        />
  </label>

</div>
  
  


  
            
            <button
              id="btnRegistrar"
              className={styles.heading_entrar_ac}
              onClick={async () => account() }
              style={{backgroundColor:'black'}}
              disabled={loading}
            >
              {loading?<CircularProgress style={{'color':'black'}} className={styles.progress} />:"REGISTRAR"}
              
            </button>

            
      

  

  
    

  
  

</div>



</div>

      

    </Layout>
  );
};
