<template>
  <div>
    <!-- 入力欄 -->
    <form class="container">
      <h5>USER情報の登録</h5>
      <label for>Name</label>
      <br />
      <input id="input_name" v-model="input_name" type="text" />
      <br />
      <label for>Mail</label>
      <br />
      <input id="inp_email" v-model="input_email" type="email" />
      <br />
      <label for>Pass Word</label>
      <br />
      <input id="input-password" v-model="input_password" type="password" />
      <br />
      <div style="margin: 10px; text-align: center">
        <b-button variant="primary" @click="onAlertEntry()" title="あああ">登録</b-button>
      </div>
    </form>
    <!-- 検索欄 -->
    <form class="container">
      <h5>検索(ID)</h5>
      <input
        id="search_id"
        style="width: 80px; margin: 5px"
        v-model="search_id"
        type="text"
        placeholder="ID入力欄"
        @blur="blur(search_id)"
      />
      <br />
      <!-- <input id="search_name" style="width: 80px;" v-model="search_name" type="text" placeholder="NAME" @blur="blur(search_name)"><br> -->
      <div style="margin: 10px; text-align: center">
        <b-button variant="success" @click="searchButtonClick()">検索</b-button>
        <b-button variant="secondary" @click="showModal()">Showtest</b-button>
        
      </div>
    </form>
    <!-- Clrearボタン -->
    <div style="margin: 10px; text-align: center">
      <b-button variant="danger" @click="clear()">Clear</b-button>
    </div>
    <!-- <div v-if="show" id="modal3" class="overlays"> -->
    <div v-if="show">
      <a class="cancel" href="#"></a>
      <div class="modals">
        <h2>モーダルウィンドウ3</h2>
        <div class="cont">
          {{ edit_id }}
          <input type="text" v-model="edit_name" />
          <br />
          <input type="text" v-model="edit_email" />
          <br />
          <input type="text" v-model="edit_pass" />
          <br />
          <b-button variant="secondary" @click="onAlertEdit()">更新登録</b-button>
          <b-button variant="secondary" @click="hideModal()">閉じる</b-button>
          <p class="close">
          </p>
        </div>
      </div>
    </div>
    <!-- DB登録内容を表示 -->
    <table class="st-tbl1">
      <thead>
        <tr class="red">
          <th
            v-for="(header, index) in headers"
            v-bind:key="index"
            style="text-align: center"
          >{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" v-bind:key="item.id">
          <th style="text-align: center; width: 30px">{{ index + 1 }}</th>
          <td style="text-align: center; width: 60px">{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.pass }}</td>
          <td style="text-align: center; width: 80px">
            <!-- <b-button variant="success" @click="edit(item.id)">編集</b-button> -->
            <a class="button" @click="openModal(item)">編集</a>
            <!-- <a href="#modal3" class="button">編集</a> -->
          </td>
          <td style="text-align: center; width: 80px">
            <b-button variant="danger" @click="onAlterDelete(item)">削除</b-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      show: false,
      errors: [],
      input_name: "",
      edit_name: "",
      input_email: "",
      input_password: "",
      items: [],
      input: [],
      search: [],
      edit_id: "",
      edit_name: "",
      edit_email: "",
      edit_pass: "",
      edit_input: [],
      search_id: "",
      search_name: "",
      headers: ["NO", "ID", "名前", "Mail", "Pass", "Edit", "Delete"]
    };
  },
  // DBからデータを取得する
  async asyncData({ $axios }) {
    const items = await $axios.$get("http://localhost:5000");
    console.log(items);
    return { items };
  },
  methods: {
    showModal() {
      this.show = true;
    },
    hideModal() {
      this.show = false;
      this.modalClear();
    },
    //モーダルを表示した際のデータ連携
    openModal(item) {
      this.show = true;
      this.edit_id = item.id;
      this.edit_name = item.name;
      this.edit_email = item.email;
      this.edit_pass = item.pass;
    },
    //「編集」ボタンのクリックイベント
    onAlertEdit() {
      const result = window.confirm(this.edit_id + "内容を更新しますか？");
      this.hideModal();
      if (!result) {
        alert("更新を中止しました");
      } else {
        this.edit(this.edit_id);
        alert("更新が完了しました");
        location.reload();
      }
    },
    //データを編集する
    async edit(id) {
      let uri = "http://localhost:5000/edit/" + id;
      const items = await this.$axios.$post(uri, {
        name: this.edit_name,
        mail: this.edit_email,
        pass: this.edit_pass
      });
    },
    //(仮)フォーカスが外れたら配列に格納
    blur(obj) {
      this.search.push(obj);
    },
    //検索ボタンの検索イベント
    searchButtonClick() {
      //(無条件)全件を表示する
      if (this.search_id == "") {
        this.show = true;
      } else {
        this.selectId();
        this.show = true;
      }
    },
    //(ID専用)検索条件に一致するデータを取得する
    async selectId() {
      const items = await this.$axios.$post("http://localhost:5000/select_id", {
        id: this.search_id,
        name: this.search_name
      });
      console.log(items);
      this.items = items;
      return { items };
    },
    //「登録」ボタンのクリックイベント処理
    onAlertEntry() {
      this.input.push(this.input_name);
      this.input.push(this.input_email);
      this.input.push(this.input_password);
      const result = window.confirm(this.input_name + "を登録しますか？");
      if (result) {
        this.entry();
        alert("登録が完了しました");
      } else {
        alert("登録を中止しました");
        console.log("登録中止");
      }
    },
    //データを登録する
    async entry() {
      const items = await this.$axios.$post("http://localhost:5000/", {
        name: this.input_name,
        email: this.input_email,
        pass: this.input_password
      });
      this.clear();
      location.reload();
    },
    //データ(単体)を削除する
    async deleteData(id) {
      let uri = "http://localhost:5000/delete/" + id;
      await this.$axios.$post(uri);
    },
    //「削除」ボタンのクリックイベント処理
    onAlterDelete(item) {
      const result = window.confirm(item.name + "を削除します");
      if (result) {
        alert("削除が完了しました");
        this.deleteData(item.id);
        location.reload();
      } else {
        alert("削除を中止しました");
        console.log("NO!");
      }
    },
    // 入力欄・検索欄をクリアする
    clear() {
      this.input_name = "";
      this.input_email = "";
      this.input_password = "";
      this.search_id = "";
      location.reload();
    },
    modalClear(){
      this.edit_id ='',
      this.edit_name='',
      this.edit_email='',
      this.edit_pass=''
    }
  }
};
</script>

<style>
.search {
  text-align: center;
  background-color: red;
  padding: 10px;
  margin: auto;
}
table {
  margin: auto;
  width: 90%;
}
form {
  background-color: aqua;
  text-align: center;
  padding: 10px;
}
th {
  padding: 5px;
  border: solid 1px #ccc;
  background-color: #eee;
}
td {
  padding: 5px;
  border: solid 1px #ccc;
}
.overlays {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  transition: opacity 200ms;
  visibility: hidden;
  opacity: 0;
}
.overlays .cancel {
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: default;
}
.overlays:target {
  visibility: visible;
  opacity: 1;
}
.modals {
  margin: 0px auto;
  padding: 20px;
  background: #fff;
  border: 1px solid #666;
  width: 80%;
  border-radius: 6px;
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
  position: relative;
}
.modals h2 {
  margin-top: 0;
}
.modals .close {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 20px;
  right: 20px;
  opacity: 0.8;
  transition: all 200ms;
  font-size: 24px;
  font-weight: bold;
  text-decoration: none;
  color: #777;
}
.modals .close:hover {
  opacity: 1;
}
.modals .cont {
  max-width: 400px;
  overflow: auto;
}
.modals p {
  margin: 0 0 1em;
  text-align: center;
}
.modals p:last-child {
  margin: 0;
}
a.button {
  background-color: rgb(8, 114, 17);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  cursor: pointer;
  display: block;
  font-weight: 100;
  height: 38px;
  padding: 10px;
  text-align: center;
  line-height: 18px;
  border-radius: 6px;
  margin: 0px auto;
  max-width: 200px;
  opacity: 1;
  color: rgb(252, 249, 249);
  text-decoration: none;
  transition: 0.3s box-shadow ease;
  -webkit-transition: 0.3s box-shadow ease;
  transform: translateY(0px);
  text-shadow: 0 0 0;
}
a.button:hover {
  box-shadow: 0 12px 23px rgba(0, 0, 0, 0.23), 0 10px 10px rgba(0, 0, 0, 0.19);
}
</style>
