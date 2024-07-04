/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxWidth:{
        container: "1440px"
      },
      screens:{
        xs : "320px",
        sm : "375",
        sml : "500px",
        md : "667px",
        mdl : "768px",
        lg : "960px",
        lgl : "1024px ",
        xl : "1200px "
      },
      color:{
        customRed:'#FF3838',
      },
      fontFamily:{
        titleFont : "Roboto",
        bodyFont : "Poppins",
        
        text:'Inter',
        sizeText:'Inria Sans',
        'inria-sans': ['Inria Sans', 'sans-serif'],
        'kotta-one': ['"Kotta One"', 'serif'],
      },
      boxShadow:{
        testShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        InputShadow: "0 0 3px 2px rgb(228 121 17 / 50%)",
        
      },
      border:{
        borderColor:'#ABA2A2',
      },
      text:{
        colortext:'#ABA2A2',
        logintext:'#0F7AC1',
        mainColor:'#0071BD',
        Green:'#24FF01'
      },
      backgroundColor:{
        background:'#0071BD',
        homeBg:'#F8F8F8',
        bgSize:'#D9D9D9',
        customRed:'#FF3838',
        mainColor:'#0071BD',
        Red:'#FF0B0B',
        Green:'#0BB726',
        Yellow:'#eed202',
        Blue:'#4692DD'
      }
    },
  },
  plugins: [],
}