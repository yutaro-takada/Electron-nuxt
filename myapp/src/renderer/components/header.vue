<template>
  <!-- メニューヘッダー部分 -->
  <header class="main-header">
  <nav> 
      <div><nuxt-link to="/login" exact> Login </nuxt-link></div>
      <div><nuxt-link to="/user" exact> User </nuxt-link></div>
      <div><nuxt-link to="/db" exact> DB page </nuxt-link></div>
      <div><nuxt-link to="/book" exact> Book page </nuxt-link></div>
  </nav>
  <input type="checkbox" class="openSidebarMenu" id="openSidebarMenu">
  <label for="openSidebarMenu" class="sidebarIconToggle">
    <div class="spinner diagonal part-1"></div>
    <div class="spinner horizontal"></div>
    <div class="spinner diagonal part-2"></div>
  </label>
  <!-- サイドメニュー部分 -->
  <div id="sidebarMenu">
    <ul class="sidebarMenuInner">
      <li>Jelena Jovanovic <span>Web Developer</span></li>
      <li><a href="https://instagram.com/plavookac" target="_blank">Instagram</a></li>
      <li><nuxt-link to="/user" exact> USER page </nuxt-link></li>
      <li><nuxt-link to="/book" exact> Book page </nuxt-link></li>
      <li><nuxt-link to="/login" exact> Login </nuxt-link></li>
    </ul>
  </div>
  </header>
</template>

<script>
export default {
  name: "HeaderComponent",
};
</script>

<style scoped>
nav {
  width: 100%;
  display: flex;
  justify-content: center;
}

nav div {
  height: 100%;
  margin: 0 20px;
  display: flex;
  align-items: center;
}

nav div:hover{
    opacity:0.9;
}

.main-header {
  height: 50px;
  display: flex;
  background: linear-gradient(90deg, #FC466B 0%, #3F5EFB 100%);
  color: #fff;
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
  opacity: 0.5;
}

html, body {
    overflow-x: hidden;
    height: 100%;
}

body {
    background: #fff;
    padding: 0;
    margin: 0;
    font-family: 'Varela Round', sans-serif;
}

#sidebarMenu {
    height: 100%;
    position: fixed;
    left: 0;
    width: 250px;
    margin-top: 50px;
    transform: translateX(-250px);
    transition: transform 250ms ease-in-out;
    background: linear-gradient(180deg, #FC466B 0%, #3F5EFB 100%);
}
.sidebarMenuInner{
    margin:0;
    padding:0;
    border-top: 1px solid rgba(255, 255, 255, 0.10);
}
.sidebarMenuInner li{
    list-style: none;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    padding: 20px;
    cursor: pointer;
    border-bottom: 1px solid rgba(255, 255, 255, 0.10);
}
.sidebarMenuInner li span{
    display: block;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.50);
}
.sidebarMenuInner li a{
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    cursor: pointer;
    text-decoration: none;
}

input[type="checkbox"]:checked ~ #sidebarMenu {
    transform: translateX(0);
}

input[type=checkbox] {
    transition: all 0.3s;
    box-sizing: border-box;
    display: none;
}
.sidebarIconToggle {
    transition: all 0.3s;
    box-sizing: border-box;
    cursor: pointer;
    position: absolute;
    z-index: 99;
    height: 100%;
    width: 100%;
    top: 16px;
    left: 15px;
    height:22px;
    width: 22px;
}
.spinner {
    transition: all 0.3s;
    box-sizing: border-box;
    position: absolute;
    height: 3px;
    width: 100%;
    background-color: #fff;
}
.horizontal {
    transition: all 0.3s;
    box-sizing: border-box;
    position: relative;
    float: left;
    margin-top: 3px;
}
.diagonal.part-1 {
    position: relative;
    transition: all 0.3s;
    box-sizing: border-box;
    float: left;
}
.diagonal.part-2 {
    transition: all 0.3s;
    box-sizing: border-box;
    position: relative;
    float: left;
    margin-top: 2px;
}
input[type=checkbox]:checked ~ .sidebarIconToggle > .horizontal {
    transition: all 0.3s;
    box-sizing: border-box;
    opacity: 0;
}
input[type=checkbox]:checked ~ .sidebarIconToggle > .diagonal.part-1 {
    transition: all 0.3s;
    box-sizing: border-box;
    transform: rotate(135deg);
}
input[type=checkbox]:checked ~ .sidebarIconToggle > .diagonal.part-2 {
    transition: all 0.3s;
    box-sizing: border-box;
    transform: rotate(-135deg);
    margin-top: -9px;
}
</style>
