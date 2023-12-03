app.component('app-profile',{
    props : ['result','esFavorito'],
    methods:{
        añadirFavorito(){
            this.$emit('añadir-favorito')
        },
        removerFavorito(){
            this.$emit('remover-favorito')
        }
    },
    template:
    /* html */ `               
    <div class = "result">
        <a v-if="esFavorito" href = "#" class="result__toggle-favorite" @click="removerFavorito">Remover favorito⭐</a>
        <a v-else href = "#" class="result__toggle-favorite" @click="añadirFavorito">Añadir a favoritos⭐</a>
        <h2 class="result__name"> {{result.name}}</h2>
        <img v-bind:src="result.avatar_url" v-bind:alt="result.name" class="result__avatar">
        <p class="result__bio"> {{result.bio}}
            <br>
            <a v-bind:href= "result.html_url" target= "_blank" class="result__blog">Perfil GitHub</a>
        </p>
    </div>
    `
})  

