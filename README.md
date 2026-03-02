📘 Pokédex Interactiva

Aplicación web desarrollada con Vue 3 + Vite que consume la API pública de Pokémon para mostrar una Pokédex dinámica e interactiva.

🚀 Características

Consumo de API REST desde PokeAPI

Visualización dinámica de 20 Pokémon

Buscador en tiempo real con v-model

Filtrado reactivo usando computed

Diseño responsive con CSS Grid

Navegación entre vistas con Vue Router

Renderizado dinámico de listas con v-for

Enrutamiento dinámico por nombre de Pokémon

🛠 Tecnologías

📂 Estructura del proyecto

src/
│
├── components/
│   └── PokemonList.vue       # Lista de Pokémon
│
├── views/
│   └── PokemonDetail.vue     # Detalle de cada Pokémon
│
├── router/
│   └── index.js              # Configuración de rutas
│
├── App.vue                   # Componente raíz
└── main.js                   # Entrada principal


▶️ Instalación y ejecución

Clonar el repositorio:

git clone https://github.com/Diexx23/pokedex-vue.git

Entrar a la carpeta:

cd pokedex-vue

Instalar dependencias:

npm install

Ejecutar en modo desarrollo:

npm run dev

Abrir en el navegador:

http://localhost:5173

🌐 Demo en vivo

La aplicación está desplegada y accesible online en Vercel:

https://pokedex-vue-vercel.vercel.app