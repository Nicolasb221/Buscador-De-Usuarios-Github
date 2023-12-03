app.component("app-favoritos", {
  props: ["totalFavoritos", "mostrarFavorito", "validarFavorito"],
  template: /* html */ `
    <transition-group name="list">
        <div 
            class="favorite" 
            :class="{'favorite--selected': validarFavorito(favorito.login)}"
            v-for="favorito in totalFavoritos" :key="favorito.id">
            <a @click.prevent="mostrarFavorito(favorito)" href="#" target="_blank">
                <img :src="favorito.avatar_url" :alt="favorito.name" class="favorite__avatar">
            </a>
        </div>
    </transition-group>
    `,
});
