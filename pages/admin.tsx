import CircularProgress from '@material-ui/core/CircularProgress';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { firebaseClient } from '../firebaseClient';
import styles from '../styles/Home.module.css';

export default (_props: any) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
   //variavel false  enquanto não está carregando 
   const [loading, setLoading] = useState(false);

  
      


  async function loginAdmin() {


    if (email == 'addoca.dev@gmail.com'){


        try{

            const myElement: HTMLElement | null = document.querySelector("#btnEntrar");
            if(myElement != null){
              myElement.style.backgroundColor="transparent";
            };
            
            
            setLoading(true);
            await firebaseClient.auth().signInWithEmailAndPassword(email, pass);

            
      
            
            var iD = firebaseClient.auth().currentUser?.uid;
      
            
            var metaData = await firebaseClient.database().ref('Usuário/'+iD);
                metaData.on('value', (snapshot) => {
                const data = snapshot.val();
                console.log(data);
      
                    
                localStorage.setItem('cargo','');
                localStorage.setItem('phone','');
                localStorage.setItem('calendar','');
                localStorage.setItem('batizadoaguas','');
                localStorage.setItem('batizadonoespirito','');
                localStorage.setItem('endereco','');
                localStorage.setItem('bairro','');
      
                if(data.fullname != null){localStorage.setItem('fullname',data.fullname);} else if(data.fullname == null){localStorage.setItem('fullname','Name');};
                if(data.lastName != null){localStorage.setItem('lastname',data.lastName);} else if(data.lastName == null){localStorage.setItem('lastname','Surname');};
                if(data.email != null){localStorage.setItem('email',data.email);} else if(data.email == null){localStorage.setItem('email','example@gmail.com');};
                if(data.imagem != null){localStorage.setItem('imagem',data.imagem);} else if(data.imagem == null){localStorage.setItem('imagem','null');};
                if(data.imagemName != null){localStorage.setItem('imagemName',data.imagemName);} else if(data.imagemName == null){localStorage.setItem('imagemName','null');};
                
      
                if(data != null){
                  localStorage.setItem('logina', 'true');
                  window.location.href = '/adminauth';
                }
                
          });
      
            
            
      
          }catch(error){
              console.log(error);
              setLoading(false);
              alert("email ou senha inválidos");
              
              const myElement: HTMLElement | null = document.querySelector("#btnEntrar");
              
              if(myElement != null){
                myElement.style.backgroundColor="black";
              };
              
          };
          
          
            
      
            
          
          
        

    }else{
        if(email == ''){alert('Preencha os campos do usuário.')}else{
        alert('Essa página é somente para uso dos admnistradores !')};};

    
    
    
  };

 
  return (
    <Layout>

<div className={styles.overview_content}>

<form className={styles.overview_panel_start_admin}>

  <div>
    <h1 className={styles.text_input_cadastrar}>Página do Administrador</h1>
    <h2 className={styles.text_input_cadastrar2}>Ser integro é fazer aquilo que considera correto. Sem 
    a necessidade </h2>
    <h3 className={styles.text_input_cadastrar2}>de espectadores.</h3>
  </div>

  
</form>

<div className={styles.overview_panel}>

  <header className={styles.header_login}>
            <svg 
                version="1.0" xmlns="http://www.w3.org/2000/svg"
                width="175" 
                height="105" 
                viewBox="0 0 400 150"
                fill="none"
                preserveAspectRatio="xMidYMid meet">

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

  
  <label>
    <input 
        className={styles.input} 
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
        className={styles.input} 
        type="password"
        id="password"
        name="password"
        placeholder="Senha"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        
        />
  </label>


  
            
            <button
              id="btnEntrar"
              className={styles.heading_entrar}
              onClick={async () => loginAdmin() }
              style={{backgroundColor:'black'}}
              disabled={loading}
            >
              {loading?<CircularProgress style={{'color':'black'}} className={styles.progress} />:"ENTRAR"}
              
            </button>

            
      

  

  

  

  
        <footer className={styles.footer}>
          <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
            width="30" height="30" viewBox="0 0 250 280"
            preserveAspectRatio="xMidYMid meet">

            <g transform="translate(0.000000,280.000000) scale(0.100000,-0.100000)"
            fill="#00000000" stroke="none">
            <path d="M885 2690 c-210 -42 -386 -208 -440 -416 -19 -75 -19 -213 0 -289 34
            -128 132 -261 246 -332 55 -34 59 -38 59 -74 0 -37 -2 -39 -42 -49 -141 -36
            -251 -94 -340 -178 -177 -167 -250 -386 -264 -787 -5 -149 -4 -162 15 -192 54
            -86 246 -149 571 -188 120 -14 454 -35 570 -35 l55 0 -37 25 c-28 19 -58 61
            -118 167 -44 78 -80 154 -81 168 -3 75 14 116 66 156 32 24 35 31 35 78 0 46
            -3 54 -35 79 -45 36 -67 79 -67 132 0 47 14 78 108 237 53 88 72 112 104 128
            49 25 100 25 148 1 l37 -18 45 27 c65 38 64 60 -7 104 -59 37 -156 77 -230 96
            -41 10 -43 12 -43 50 0 36 4 41 52 71 120 73 221 214 254 355 33 139 3 311
            -75 433 -42 64 -142 158 -208 194 -104 56 -263 80 -378 57z"/>
            <path d="M1680 1316 l0 -74 -49 -17 c-41 -13 -130 -66 -186 -109 -7 -5 -31 4
            -63 24 -29 18 -58 30 -65 27 -10 -4 -127 -198 -127 -211 0 -3 27 -20 60 -38
            l60 -33 -7 -45 c-10 -57 -10 -132 0 -190 l7 -45 -47 -27 c-27 -15 -54 -32 -62
            -37 -11 -7 -2 -31 50 -119 l64 -110 62 35 63 35 43 -36 c42 -34 160 -96 185
            -96 8 0 12 -22 12 -75 l0 -75 130 0 130 0 0 74 0 73 59 22 c33 12 87 42 120
            67 l60 45 61 -35 60 -35 41 72 c23 40 50 86 60 103 11 17 19 36 19 42 0 6 -26
            26 -57 45 -35 20 -57 40 -54 48 9 39 12 179 3 217 l-10 42 63 38 64 38 -61
            105 c-33 57 -63 106 -65 109 -2 2 -33 -11 -68 -30 l-64 -35 -28 26 c-38 36
            -98 72 -155 94 l-47 17 -3 72 -3 71 -127 3 -128 3 0 -75z m256 -290 c110 -51
            178 -158 179 -281 0 -60 -5 -80 -33 -137 -37 -76 -73 -110 -152 -147 -145 -67
            -321 -3 -398 143 -23 44 -27 63 -27 141 0 74 4 97 23 132 63 119 149 171 282
            172 59 1 86 -4 126 -23z"/>
            </g>
          </svg>
        </footer>
  

  
  

</div>



</div>

      

    </Layout>
  );
};
