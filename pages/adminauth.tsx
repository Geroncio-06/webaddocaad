import { database } from 'firebase-admin';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import { firebaseClient } from '../firebaseClient';
import styles from '../styles/Home.module.css';
import SearchRounded from "@material-ui/icons/SearchRounded";







export default (_props: any) => {

  const [log, setLog] = useState("true");
  const [filter, setFilter] = useState("");

  

  function paginaInicial(){
    window.location.href="/login";
  }

  useEffect(()=> {

    var logIn = localStorage.getItem("logina");

    if(logIn == "false"){setLog("false");};
    if(logIn == "true"){setLog("true");};

  })
    
  useEffect(()=>{
    
    

      fetchAllData();

    function fetchAllData(){
      firebaseClient.database().ref('Usuário').once("value", function(snapshot){
        snapshot.forEach(
          function (childsnapshot){
            let name = childsnapshot.val().fullname;
            let lastname = childsnapshot.val().lastName;
            let nascimento = childsnapshot.val().nascimento;
            let telefone = childsnapshot.val().telefone;
            let endereco = childsnapshot.val().endereco;
            let bairro = childsnapshot.val().bairro;
            let ba = childsnapshot.val().batizadonasaguas;
            let be = childsnapshot.val().batizadonoespirito;
            let funcao = childsnapshot.val().funcao;
            let email = childsnapshot.val().email;
            let imagem = childsnapshot.val().imagem;
            let senhaR = childsnapshot.val().password;

            var senha = senhaR;


            if(senha != null){

              var decrypt = ((senha:any) => {
                const crypto = require('crypto');
                const ENC_KEY = "bf3c199c2470cb477d907b1e0917c17b";
                const parts = senha.split(':');
                var decipher = crypto.createDecipheriv('aes-256-cbc', ENC_KEY, new Buffer(parts[0], 'base64'));
                var decrypted = decipher.update(parts[1], 'base64', 'utf8');
                return (decrypted + decipher.final('utf8'));
              });

              var newSenha = decrypt(senha);
            }
    

            
              
              
            addItemsToList(name,lastname, nascimento, telefone, endereco, bairro, ba, be, funcao, email,imagem,newSenha);
            
          }
        )
      });
    };

    
    function addItemsToList(name: string, lastname: string, nascimento: string, telefone: string, 
      endereco: string, bairro: string, ba: string, be: string, funcao: string, email: string,
      imagem: string, newSenha: string){
      var ul = document.getElementById('list');


      
      
      
      var _userName = document.createElement('li');
      

        _userName.innerHTML = "<img src="+imagem+"width= 100px height= 100px border= 2px>"
        + ' <br>'+name+' '+lastname 
        + ' <br> Telefone: '+telefone
        + ' <br> Nascimento: '+nascimento
        + ' <br>'+endereco
        + ' <br> Bairro: '+bairro
        + ' <br> batizado nas águas: '+ba
        + ' <br> batizado no Espirito: '+be
        + ' <br> Função: '+funcao
        + ' <br>'+email+'<br> '
        +'  Senha: '+newSenha;
      
      ul?.appendChild(_userName);

      
    };

    
    

   




    

  });

  


  async function logOut() {
    await firebaseClient
            .auth()
            .signOut()
            .then(() => {
              localStorage.setItem('logina','false');
              setTimeout(function(){window.location.href="/admin";},1000);
              
            });
    
  }

  




  

    

      
if(log == 'true'){


  return (
    <Layout>

      

      <div className={styles.overview_content_ac}>

        <div className={styles.overview_panel_start_auth}>

          <div className={styles.photo}>
            <img src="/userimage.png"
                width="120"
                height="120"
                className={styles.userPhoto}
                id="img"
                ></img>
          </div>

          <div>
            <h1 className={styles.text_input_auth} id = "name" >Name Surname</h1>
            <h3 className={styles.text_input_auth2} id = "cargo" >Cargo</h3>


            

            <header className={styles.header_admin}>


              <svg 
                className={styles.logout_auth}
                version="1.0" xmlns="http://www.w3.org/2000/svg"
                width="20" 
                height="20" 
                viewBox="0 0 512.000000 512.000000"
                preserveAspectRatio="xMidYMid meet"
                onClick={async () => logOut()}>

                <g 
                  transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                  fill="#ffffff" 
                  stroke="none">
                
                <path 
                  d="M433 5105 c-200 -43 -376 -221 -418 -422 -22 -102 -22 -4144 0 -4246
                  43 -203 219 -379 422 -422 105 -22 2598 -22 2692 0 203 48 364 207 416 410 13
                  50 15 169 15 783 l0 724 -34 34 c-28 28 -42 34 -76 34 -34 0 -48 -6 -76 -34
                  l-34 -34 0 -701 c0 -466 -4 -717 -11 -751 -14 -67 -76 -157 -136 -197 -99 -66
                  -36 -64 -1439 -61 -1458 3 -1319 -7 -1430 103 -110 108 -99 -137 -99 2235 0
                  2372 -11 2127 99 2235 111 110 -28 100 1430 103 1122 2 1276 1 1330 -13 104
                  -27 178 -88 225 -185 l26 -55 5 -733 5 -734 33 -29 c47 -43 102 -41 148 5 l34
                  34 0 724 c0 797 1 779 -63 908 -43 88 -151 195 -238 237 -133 66 -63 63 -1479
                  62 -1041 0 -1297 -3 -1347 -14z"/>
                <path 
                  d="M4288 3324 c-34 -18 -58 -62 -58 -106 0 -29 26 -59 257 -290 l257
                  -258 -1668 0 -1668 0 -34 -34 c-28 -28 -34 -42 -34 -76 0 -34 6 -48 34 -76
                  l34 -34 1668 0 1668 0 -257 -258 c-231 -231 -257 -261 -257 -290 0 -45 24 -89
                  60 -107 36 -19 63 -19 98 -1 15 8 186 174 380 368 l352 354 0 44 0 44 -352
                  354 c-194 194 -365 360 -380 368 -34 18 -65 17 -100 -2z"/>
                </g>
                </svg>
              </header>
              <h3 className={styles.text_input_auth3}>Logout</h3>

            <h2 className={styles.text_input_adminfooter}>AD DOCA</h2>
      
          </div>

    
        </div>

        <div className={styles.overview_panel_ac} >


        <header className={styles.header_login3}>
            <svg 
                version="1.0" xmlns="http://www.w3.org/2000/svg"
                width="155" 
                height="120" 
                viewBox="0 0 400 150"
                fill="none"
                preserveAspectRatio="xMidYMid meet"
                onClick={()=> paginaInicial()}>

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

  
  


        <button
              
              className={styles.heading_entraradmin}
            
            >
              USUÁRIOS REGISTRADOS
              
        </button>

        <link rel="stylesheet" 
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" 
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" 
          >
  
        </link>

        <div className={styles.wrapper}>

        <div className={styles.scroll_list} >

            <div className={styles.links}>
                  <ul id='list' className={styles.list}>
                  
                    
                    
                  </ul>
            </div>

            </div>
        </div>       

        

         

         

         


         


         

        </div>



      </div>

      

    </Layout>
  );


};

return (
  <Layout>

      

<h1 className={styles.text_erro}> ERRO:</h1>
<h2 className={styles.text_erro}> Acesso inválido. Faça o login denovo!</h2>

      

    </Layout>
);


  
};



