import { database } from 'firebase-admin';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import { firebaseClient } from '../firebaseClient';
import styles from '../styles/Home.module.css';





export default (_props: any) => {

  const [log, setLog] = useState("");

  function paginaInicial(){
    window.location.href="/login";
  }
    
  useEffect(()=>{

    
    
  

    var fullname = localStorage.getItem("fullname");
    var lastname = localStorage.getItem("lastname");
    var cargo = localStorage.getItem("cargo");
    var phone = localStorage.getItem("phone");
    var email = localStorage.getItem("email");
    var calendar = localStorage.getItem("calendar");
    var batizadoaguas = localStorage.getItem("batizadoaguas");
    var batizadonoespirito = localStorage.getItem("batizadonoespirito");
    var endereco = localStorage.getItem("endereco");
    var bairro = localStorage.getItem("bairro");
    var imagem = localStorage.getItem("imagem");
    var logIn = localStorage.getItem("login");
    
   

    if(logIn !=null){setLog(logIn);};
    

    
    if(imagem != "null"){
      const imagE = document.querySelector('#img');
      const imagE2 = document.querySelector('#img2');
      if(imagE != null){
        if (imagE instanceof HTMLImageElement){
            imagE.src=""+imagem;
        };
      };

      if(imagE2 != null){
        if (imagE2 instanceof HTMLImageElement){
            imagE2.src=""+imagem;
        };
      };

      
    };

      if(fullname != "Name" && lastname != "Surname"){
        const name = document.querySelector('#name');
        const name2 = document.querySelector('#name2');
        if(name != null){
          name.innerHTML=fullname+ ' '+lastname;
        };

        if(name2 != null){
          name2.innerHTML=fullname+ ' '+lastname;
        };
      };

      if(cargo != "Cargo"){
        const funcao = document.querySelector('#cargo');
        const funcao2 = document.querySelector('#cargo2');
        if(funcao != null){
          funcao.innerHTML=""+cargo;
        };
        if(funcao2 != null){
          funcao2.innerHTML=""+cargo;
        };
      };

      if(phone != "(xx) 9 xxxx-xxxx"){
        const telefone = document.querySelector('#cell');
        if(telefone != null){
          telefone.innerHTML=""+phone;
        };
      };

      if(email != "example@gmail.com"){
        const nameEmail = document.querySelector('#eMail');
        if(nameEmail != null){
          nameEmail.innerHTML=""+email;
        };
      };

      if(calendar != "dd/mm/aaaa"){
        const nascimento = document.querySelector('#nascimento');
        if(nascimento != null){
          nascimento.innerHTML=""+calendar;
        };
      };

      if(batizadoaguas != ""){
        const batizadoA = document.querySelector('#ba');
        if(batizadoA != null){
          batizadoA.innerHTML=""+batizadoaguas;
        };
      };

      if(batizadonoespirito != ""){
        const batizadoE = document.querySelector('#be');
        if(batizadoE != null){
          batizadoE.innerHTML=""+batizadonoespirito;
        };
      };

      if(endereco != "Endereco"){
        const ender = document.querySelector('#eNdereco');
        if(ender != null){
          ender.innerHTML=""+endereco;
        };
      };

      if(bairro != "Bairro"){
        const bair = document.querySelector('#bAirro');
        if(bair != null){
          bair.innerHTML=""+bairro;
        };
      };

  });


  async function logOut() {
    await firebaseClient
            .auth()
            .signOut()
            .then(() => {
              localStorage.setItem('login','false');
              setTimeout(function(){window.location.href="/login";},1000);
              
            });
    
  }

  async function deleteAccount() {

    window.confirm('Você quer excluir essa conta?');

    if( window.confirm('Você quer excluir essa conta?')){

      var user = firebaseClient.auth().currentUser;
      var id = firebaseClient.auth().currentUser?.uid;
      var imagemdelete = localStorage.getItem("imagem");
      var storageRef = firebaseClient.storage();
  
      if(user!=null && id!=null){


        var pictureRef = storageRef.refFromURL(""+imagemdelete);
        pictureRef.delete().then(()=>{
          console.log("imagem deletada");
        }).catch((err) => {
          console.log(err);
        });
  
        var mPostReference = firebaseClient.database().ref('Usuário/'+id); 
              
                  mPostReference.remove().then(function() {
                    console.log("Dados removido com sucesso.")
  
                    if(user!=null){
                      user.delete().then(function() {
                        console.log('conta excluida');
                        window.location.href="/login";
                          }).catch(function(error) {
                            console.log(error);
                          });
                    }
                    
  
                  })
                  .catch(function(error) {
                    console.log("Dados não foram removidos: " + error.message)
                  });
  
        
      }else{
        alert('user null');
      }

    }
    
    
    
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


            <header className={styles.header_auth}>
              <svg 
                version="1.0" xmlns="http://www.w3.org/2000/svg"
                width="38" 
                height="38" 
                viewBox="0 0 512.000000 512.000000"
                preserveAspectRatio="xMidYMid meet"
                onClick={async () => deleteAccount()}>

                <g 
                  transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                  fill="#ffffff" 
                  stroke="none">
                <path 
                    d="M1911 4114 c-198 -53 -369 -228 -416 -425 -48 -205 8 -402 158 -553
                    43 -43 77 -79 75 -81 -2 -1 -26 -10 -55 -19 -178 -58 -384 -204 -509 -360
                    -160 -201 -246 -417 -261 -657 -9 -158 -27 -149 298 -149 243 0 260 -1 255
                    -17 -15 -50 -29 -128 -37 -213 -10 -107 -2 -141 37 -159 18 -8 203 -11 637
                    -11 l612 0 33 -63 c100 -194 297 -345 517 -398 133 -32 294 -24 424 20 213 72
                    367 207 462 406 59 123 74 190 74 340 0 154 -15 219 -79 350 -98 199 -260 335
                    -481 405 -99 31 -275 39 -378 16 l-76 -17 -73 40 c-40 21 -108 52 -151 67
                    l-79 27 34 26 c85 65 162 171 198 274 31 86 38 240 16 327 -27 108 -73 187
                    -157 272 -88 90 -177 138 -299 164 -41 8 -75 16 -75 17 0 1 -16 34 -34 72 -70
                    141 -219 260 -376 300 -74 19 -222 18 -294 -1z m340 -166 c77 -38 157 -111
                    198 -179 l21 -36 -72 -24 c-145 -46 -278 -163 -346 -302 -32 -66 -62 -189 -62
                    -257 0 -22 -4 -40 -8 -40 -24 0 -113 37 -157 65 -164 105 -241 303 -190 491
                    33 124 124 231 240 284 78 36 92 39 206 36 89 -1 102 -4 170 -38z m410 -358
                    c134 -25 252 -118 316 -248 32 -64 37 -85 41 -162 6 -118 -20 -205 -86 -292
                    -82 -107 -192 -167 -328 -175 -138 -9 -255 38 -349 139 -132 143 -158 326 -70
                    505 86 175 280 270 476 233z m-601 -703 c25 -53 54 -92 111 -148 l77 -77 -61
                    -22 c-277 -100 -520 -316 -651 -577 l-26 -53 -235 0 c-194 0 -235 2 -235 14 0
                    32 33 185 52 241 27 78 81 185 131 260 52 77 175 199 256 254 149 102 355 175
                    506 179 l40 1 35 -72z m763 -351 c53 -14 124 -37 157 -52 l60 -27 -69 -47
                    c-128 -91 -226 -224 -285 -388 -30 -84 -31 -93 -31 -249 l0 -163 -549 0 -549
                    0 5 58 c36 390 349 755 742 862 168 46 351 48 519 6z m771 -136 c228 -58 408
                    -237 466 -466 74 -290 -67 -603 -330 -732 -110 -54 -184 -72 -295 -72 -188 0
                    -322 56 -455 190 -94 93 -144 180 -175 300 -25 97 -17 271 18 368 70 200 248
                    362 457 416 81 22 222 20 314 -4z"/>
                <path 
                  d="M3090 2120 c-12 -12 -20 -33 -20 -52 0 -27 19 -50 132 -165 l133
                  -134 -133 -131 c-142 -140 -155 -165 -112 -208 42 -42 65 -29 207 112 l132
                  132 135 -132 c146 -144 170 -156 214 -109 41 43 31 61 -108 202 -71 72 -130
                  135 -130 140 0 5 59 68 130 140 140 142 151 162 107 203 -44 42 -63 32 -202
                  -108 -71 -71 -134 -130 -140 -130 -6 0 -69 59 -140 130 -139 139 -163 152
                  -205 110z"/>
                </g>
              </svg>

              
  </header>
            <h3 className={styles.text_input_auth3}>Excluir Conta</h3>

            <header className={styles.header_auth}>


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

            <h2 className={styles.text_input_authfooter}>AD DOCA</h2>
      
          </div>

    
        </div>

        <div className={styles.overview_panel_ac} >


        <header className={styles.header_logauth2}>
            <svg 
                version="1.0" xmlns="http://www.w3.org/2000/svg"
                width="85" 
                height="50" 
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

        <div>
            <img src="/userimage.png"
                width="120"
                height="120"
                className={styles.userPhoto_ac2}
                id="img2"
                ></img>
          </div>

          <div >
            <h1 className={styles.text_input_auth7} id = "name2" >Name Surname</h1>
            <h3 className={styles.text_input_auth8} id = "cargo2" >Cargo</h3>
          
          </div>


        <button
              
              className={styles.heading_entrarauth}
            
            >
              INFORMAÇÕES
              
        </button>

        <div className={styles.block_auth2}>

          <img src="/envelope.png"
                width="25"
                height="25"></img>

          <h1 className={styles.text_input_auth5} id = "eMail">example@gmail.com</h1>

        </div>

        <div className={styles.block_auth}>

          <img src="/phone.png"
                width="25"
                height="25"></img>

          <h1 className={styles.text_input_auth5} id = "cell">(xx) 9 xxxx-xxxx</h1>

        </div>

         <div className={styles.block_auth}>

          <img src="/calendar.png"
                width="25"
                height="25"></img>

          <h1 className={styles.text_input_auth5} id = "nascimento">dd/mm/aaaa</h1>

         </div>

         <div className={styles.block_auth}>

          <img src="/wave.png"
                width="25"
                height="25"></img>

          <h1 className={styles.text_input_auth5}>Batizado nas águas: </h1>
          <h2 className={styles.text_input_auth5} id="ba"></h2>

         </div>

         <div className={styles.block_auth}>

          <img src="/fire.png"
                width="25"
                height="25"></img>

                

          <h1 className={styles.text_input_auth5}>Batizado no Espirito Santo: </h1>
          <h2 className={styles.text_input_auth5} id="be"></h2>

         </div>


         <div className={styles.block_auth}>

          <img src="/point.png"
                width="25"
                height="25"></img>

          <h1 className={styles.text_input_auth5} id = "eNdereco">Rua xxxxxxxxxxx xx xxxxxxxxxx, Nº xxx</h1>

         </div>


         <div className={styles.block_auth}>

          

          <h1 className={styles.text_input_auth6} id = "bAirro">xxxxxxxxxxxx</h1>

        </div>

        <div className={styles.logVersioncell}>


         <header className={styles.header_auth2}>
              <svg 
                className={styles.logout_auth4}
                version="1.0" xmlns="http://www.w3.org/2000/svg"
                width="38" 
                height="38" 
                viewBox="0 0 512.000000 512.000000"
                preserveAspectRatio="xMidYMid meet"
                onClick={async () => deleteAccount()}>

                <g 
                  transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                  fill="#000000" 
                  stroke="none">
                <path 
                    d="M1911 4114 c-198 -53 -369 -228 -416 -425 -48 -205 8 -402 158 -553
                    43 -43 77 -79 75 -81 -2 -1 -26 -10 -55 -19 -178 -58 -384 -204 -509 -360
                    -160 -201 -246 -417 -261 -657 -9 -158 -27 -149 298 -149 243 0 260 -1 255
                    -17 -15 -50 -29 -128 -37 -213 -10 -107 -2 -141 37 -159 18 -8 203 -11 637
                    -11 l612 0 33 -63 c100 -194 297 -345 517 -398 133 -32 294 -24 424 20 213 72
                    367 207 462 406 59 123 74 190 74 340 0 154 -15 219 -79 350 -98 199 -260 335
                    -481 405 -99 31 -275 39 -378 16 l-76 -17 -73 40 c-40 21 -108 52 -151 67
                    l-79 27 34 26 c85 65 162 171 198 274 31 86 38 240 16 327 -27 108 -73 187
                    -157 272 -88 90 -177 138 -299 164 -41 8 -75 16 -75 17 0 1 -16 34 -34 72 -70
                    141 -219 260 -376 300 -74 19 -222 18 -294 -1z m340 -166 c77 -38 157 -111
                    198 -179 l21 -36 -72 -24 c-145 -46 -278 -163 -346 -302 -32 -66 -62 -189 -62
                    -257 0 -22 -4 -40 -8 -40 -24 0 -113 37 -157 65 -164 105 -241 303 -190 491
                    33 124 124 231 240 284 78 36 92 39 206 36 89 -1 102 -4 170 -38z m410 -358
                    c134 -25 252 -118 316 -248 32 -64 37 -85 41 -162 6 -118 -20 -205 -86 -292
                    -82 -107 -192 -167 -328 -175 -138 -9 -255 38 -349 139 -132 143 -158 326 -70
                    505 86 175 280 270 476 233z m-601 -703 c25 -53 54 -92 111 -148 l77 -77 -61
                    -22 c-277 -100 -520 -316 -651 -577 l-26 -53 -235 0 c-194 0 -235 2 -235 14 0
                    32 33 185 52 241 27 78 81 185 131 260 52 77 175 199 256 254 149 102 355 175
                    506 179 l40 1 35 -72z m763 -351 c53 -14 124 -37 157 -52 l60 -27 -69 -47
                    c-128 -91 -226 -224 -285 -388 -30 -84 -31 -93 -31 -249 l0 -163 -549 0 -549
                    0 5 58 c36 390 349 755 742 862 168 46 351 48 519 6z m771 -136 c228 -58 408
                    -237 466 -466 74 -290 -67 -603 -330 -732 -110 -54 -184 -72 -295 -72 -188 0
                    -322 56 -455 190 -94 93 -144 180 -175 300 -25 97 -17 271 18 368 70 200 248
                    362 457 416 81 22 222 20 314 -4z"/>
                <path 
                  d="M3090 2120 c-12 -12 -20 -33 -20 -52 0 -27 19 -50 132 -165 l133
                  -134 -133 -131 c-142 -140 -155 -165 -112 -208 42 -42 65 -29 207 112 l132
                  132 135 -132 c146 -144 170 -156 214 -109 41 43 31 61 -108 202 -71 72 -130
                  135 -130 140 0 5 59 68 130 140 140 142 151 162 107 203 -44 42 -63 32 -202
                  -108 -71 -71 -134 -130 -140 -130 -6 0 -69 59 -140 130 -139 139 -163 152
                  -205 110z"/>
                </g>
              </svg>

              
          </header>
          

          <header className={styles.header_auth3}>


              <svg 
                className={styles.logout_auth3}
                version="1.0" xmlns="http://www.w3.org/2000/svg"
                width="20" 
                height="20" 
                viewBox="0 0 512.000000 512.000000"
                preserveAspectRatio="xMidYMid meet"
                onClick={async () => logOut()}>

                <g 
                  transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                  fill="#000000" 
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



