<template>
  <div>
    <h1>BOOK ページ</h1>
    <p>LocalStrageにURL情報を記録する</p>
    <div class="e-nuxt-links">
      <input id="input-url" v-model="url" type="text" />
      <b-button variant="primary" @click="saveBookmark(url)">登録する</b-button>
      <div class="e-nuxt-button" @click="openURL(url)">接続する</div>
    </div>
    <ul>
      <li v-for="list in lists" :key="list.title">
        <a :href="list.url">{{ list.title }}</a>
      </li>
    </ul>
    <!-- <b-button variant="danger" @click="clearBookmarks()">Clear</b-button>
    <div class="container" style="background-color: pink;">
      <ul>
        <li v-for="item in items" :key="item.id" style="list-style: none;">{{ item.id }}{{ item.name }}</li>
      </ul>
    </div> -->
  </div>
</template>

<script>
const { shell } = require('electron');
export default {
  components: {},
  created() {
    localStorage.setItem('bookmarks', '[]');
    this.loadBookmarks();
  },
  data() {
    return {
      url: 'https://www.yahoo.co.jp',
      lists: [],
      items: []
    };
  },
  // async asyncData({ $axios }) {
  //   const items = await $axios.$get("http://localhost:5000");
  //   console.log(items);
  //   return { items };
  // },

  methods: {
    //URLを別ブラウザで開く
    openURL(url) {
      shell.openExternal(url);
    },
    //LocalStrageを全件クリアする
    clearBookmarks() {
      localStorage.setItem('bookmarks', '[]');
      this.loadBookmarks();
    },
    //LocalStrageを読み込む
    loadBookmarks() {
      this.lists = JSON.parse(localStorage.getItem('bookmarks'));
    },
    //LocalStrageに保存する
    saveBookmark() {
      //URLをfetchして、titie情報を取得する
      const self = this;
      fetch(this.url).then(function (response) {
        return response.text();
      })
        .then(function (text) {
          const parser = new DOMParser();
          return parser.parseFromString(text, 'text/html');
        })
        .then(function (nodes) {
          return nodes.querySelector('title').innerHTML;
        })
        .then(function (title) {
          const bookmark = {
            title: title,
            url: self.url
          }
          self.lists.push(bookmark);
          localStorage.setItem('bookmarks', JSON.stringify(self.lists));
          self.loadBookmarks();
        })
    }
  },
};
</script>

<style>
h1 {
  margin: 0 10px;
}

#input-url {
  width: 200px;
  margin: 0 10px;
}

.e-nuxt-button {
  color: #364758;
  padding: 5px 20px;
  border: 1px solid #397c6d;
  margin: 0 20px;
  border-radius: 15px;
  font-size: 1rem;
}

.e-nuxt-button:hover {
  cursor: pointer;
  color: white;
  background-color: #397c6d;
}
</style>
