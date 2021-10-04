import React, { useEffect, useCallback, useState } from 'react';
import Layout from '../components/Layout/Layout'
import Link from 'next/link';
import { useAuth } from '../auth';
import styles from '../styles/Home.module.css';
import { firebaseClient } from '../firebaseClient';
import {useRouter} from 'next/router';
import CircularProgress from '@material-ui/core/CircularProgress';
import { colors } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';



export default () => {
  const { user } = useAuth();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  
    useEffect(() => {

      setTimeout(function(){
        const myElement: HTMLElement | null = document.querySelector("#circular");
        
      },1000);

      setTimeout(function(){
        router.push('/login');
      },5000);
      
    });
  

  return (
    <Layout>

      <div className={styles.backgroundIndex}>

      <CircularProgress id="circular" style={{'color':'white'}} className={styles.progressIndex} />

        <header className={styles.headerIndex}>
        <svg 
            version="1.0" xmlns="http://www.w3.org/2000/svg"
            width="200" 
            height="200" 
            viewBox="0 0 514.000000 514.000000"
            enableBackground="true"
            preserveAspectRatio="xMidYMid meet">

          <g 
            transform="translate(0.000000,514.000000) scale(0.100000,-0.100000)"
            fill="#000000" 
            stroke="none">
          <path 
            d="M0 2570 l0 -2570 2570 0 2570 0 0 2570 0 2570 -2570 0 -2570 0 0
            -2570z m1581 840 c62 -52 217 -185 344 -295 127 -110 252 -217 278 -239 l47
            -38 0 -570 0 -569 -312 3 -313 3 -82 48 c-93 55 -70 57 -203 -17 l-65 -36
            -302 0 -303 0 0 568 0 569 242 209 c134 115 299 256 367 314 68 58 136 115
            150 127 14 12 29 21 33 20 4 -1 57 -45 119 -97z m1402 -807 c46 -87 92 -173
            101 -190 l17 -33 -84 0 -83 0 -17 35 -17 35 -93 0 -93 0 -17 -35 -17 -35 -80
            0 c-44 0 -80 3 -80 6 0 7 162 312 187 352 12 20 21 22 102 22 l89 0 85 -157z
            m569 127 c124 -84 103 -282 -35 -335 -34 -13 -76 -15 -222 -13 l-180 3 -3 188
            -2 188 203 -3 c197 -3 205 -4 239 -28z m-86 -585 c80 -25 118 -67 129 -146 8
            -56 -8 -119 -41 -158 -40 -47 -103 -66 -224 -66 -92 0 -111 3 -155 25 -58 29
            -90 72 -99 133 -15 99 35 184 124 212 61 19 204 19 266 0z m563 -2 c60 -19
            121 -79 121 -118 0 -24 -2 -25 -72 -25 -52 0 -76 4 -89 16 -24 22 -135 30
            -169 12 -19 -11 -26 -23 -28 -55 -2 -26 2 -46 12 -56 34 -34 176 -28 190 8 4
            11 23 15 81 15 72 0 75 -1 75 -24 0 -38 -42 -89 -95 -116 -45 -22 -62 -25
            -160 -24 -190 0 -258 52 -259 195 0 95 36 145 124 173 63 20 205 20 269 -1z
            m-1087 -15 c115 -65 123 -236 15 -322 l-39 -31 -201 0 -202 0 -3 188 -2 187
            196 0 c185 0 199 -1 236 -22z m1634 -85 c31 -60 77 -145 101 -190 l45 -83 -84
            0 -84 0 -17 35 -17 35 -93 0 -93 0 -17 -35 -17 -35 -80 0 c-44 0 -80 3 -80 6
            0 4 44 89 98 190 l97 184 92 0 91 0 58 -107z"
            />
          <path 
            d="M1436 3321 c-3 -5 -148 -130 -321 -277 l-315 -268 0 -473 0 -473 215
            0 c201 0 217 1 260 22 25 12 45 27 45 32 0 6 -26 29 -56 51 -87 62 -197 183
            -233 256 -89 182 -44 352 114 430 60 29 70 31 144 27 66 -4 87 -9 123 -33 l42
            -28 54 29 c48 26 63 29 145 29 105 0 134 -12 197 -76 87 -90 104 -240 43 -370
            -36 -77 -123 -174 -230 -255 l-75 -58 22 -18 c39 -31 91 -38 303 -38 l207 0 0
            470 0 471 -23 22 c-72 71 -622 533 -637 535 -10 2 -21 -1 -24 -7z"
            />
          <path 
            d="M1189 2497 c-72 -48 -88 -149 -39 -252 28 -60 139 -172 237 -239 69
            -47 71 -47 99 -33 101 53 252 207 293 297 40 87 20 179 -48 226 -73 50 -174
            22 -237 -66 l-36 -50 -30 45 c-59 89 -166 121 -239 72z"
            />
          <path 
            d="M2782 2595 c-12 -25 -22 -48 -22 -50 0 -3 22 -5 49 -5 l49 0 -21 50
            c-11 28 -24 50 -27 50 -3 0 -16 -20 -28 -45z"
            />
          <path 
            d="M3270 2570 l0 -70 83 0 c102 0 127 13 127 69 0 59 -21 71 -123 71
            l-87 0 0 -70z"
            />
          <path 
            d="M3260 2028 c-19 -11 -26 -23 -28 -55 -4 -51 13 -69 70 -77 45 -6 113
            5 130 22 17 17 13 81 -5 99 -22 22 -132 29 -167 11z"
            />
          <path 
            d="M2670 1960 l0 -70 83 0 c103 0 127 13 127 70 0 60 -17 70 -121 70
            l-89 0 0 -70z"
            />
          <path 
            d="M4400 1984 c-11 -26 -20 -48 -20 -50 0 -2 20 -4 45 -4 25 0 45 3 45
            7 0 15 -35 93 -42 93 -4 0 -16 -21 -28 -46z"
            />
          </g>
          </svg>
        </header>
        <h1 className={styles.footerIndex}>ASSEMBLEIA DE DEUS</h1>  

      </div>

    </Layout>
  );
};
