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
      fontFamily:{
        titleFont : "Roboto",
        bodyFont : "Poppins",
        
        text:'Inter'
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
      },
      backgroundColor:{
        background:'#0071BD',
        homeBg:'#F8F8F8'
      }
    },
  },
  plugins: [],
}