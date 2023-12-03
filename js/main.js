const API = "https://api.github.com/users/";
const peticionMaximaMs = 3000;
let inicioFav = false;

const app = Vue.createApp({
  data() {
    return {
      search: null,
      result: null,
      error: null,
      favoritos: new Map()
    };
  },
  created() {
    const favoritosGuardados = JSON.parse(window.localStorage.getItem("favoritos"))
    if (favoritosGuardados?.length){
      const favoritos = new Map(favoritosGuardados.map(favorito => [favorito.login, favorito]))
      this.favoritos = favoritos
    }
  },
  computed:{
    esFavorito(){
      return this.favoritos.has(this.result.login)
    },
    totalFavoritos(){
      return Array.from(this.favoritos.values())
    }
  },
  methods:{
    async busqueda() {
      this.result = this.error = null

      const estaEnFavoritos = this.favoritos.get(this.search)
      
      const deberiaActualizarInformacion = (() =>{
        if(!!estaEnFavoritos){
          const { ultimaPeticion }= estaEnFavoritos
          inicioFav = true;
          const now = Date.now()
          return (now - ultimaPeticion) > peticionMaximaMs
        }
        return false
      })() // IIFE


      if (!!estaEnFavoritos && !deberiaActualizarInformacion){
        console.log("cached")
        return this.result = estaEnFavoritos
      }
      try{
        console.log("not found")

        const respuesta = await fetch(API + this.search)

        if(!respuesta.ok) throw new Error ("USUARIO NO ENCONTRADO")
        const data = await respuesta.json()
        console.log(data)
        this.result = data
        if(inicioFav === true && !!estaEnFavoritos)estaEnFavoritos.ultimaPeticion = Date.now()
      } catch(error){
        this.error = error
      } finally{
        this.search = null
      }
    },
    añadirFavorito() {
      this.result.ultimaPeticion = Date.now()
      this.favoritos.set(this.result.login, this.result)
      this.cargarAlmacenamiento()
      // console.log(this.favoritos)
    },
    removerFavorito() {
      this.favoritos.delete(this.result.login)
      // console.log(this.favoritos)
      this.cargarAlmacenamiento()

    },
    mostrarFavorito(favorito){
      this.result = favorito
    },

    validarFavorito(id){
      return this.result?.login === id
    },


    cargarAlmacenamiento() {
      window.localStorage.setItem('favoritos', JSON.stringify(this.totalFavoritos))
      
    }
  }
});
 