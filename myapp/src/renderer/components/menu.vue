<template>
  <header>
    <nav class="exampleflex3">
      <div style="background-color: black;">
        <nuxt-link to="/" exact > トップ </nuxt-link>
      </div>
      <div style="background-color: black;">
        <nuxt-link to="/book" exact style="background-color: black;"> アプリ </nuxt-link>
      </div>
      <div style="background-color: black;">
        <nuxt-link to="/db" exact style="background-color: black;"> 利用者 </nuxt-link>
      </div>
      <div style="background-color: black;">
        <nuxt-link to="/csv" exact style="background-color: black;"> 売上 </nuxt-link>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "MenuComponent",
};
</script>

<style scoped>
.exampleflex3 {
  display: flex;
    flex-direction:column;
    justify-content: center;
    /* height: 100%; */
}
.exampleflex3>div{
  padding: 10px;
    /* margin: 5px; */
    background: #41538e;
    color: #FFF;
    font-weight: bold;
    width: 8em;
    text-align: center;
}

nav {
  width: 100%;
  /* height: 100%; */
  display: flex;
  justify-content: center;
}

nav div {
  /* height: 100%; */
  /* margin: 0 20px; */
  display: flex;
  align-items: center;
}

a {
  font-family: Helvetica, sans-serif;
  color: white;
  font-size: 1rem;
  font-weight: 100;
  text-decoration: underline;
  text-transform: uppercase;
}

a:hover {
  opacity: 0.9;
}

</style>
