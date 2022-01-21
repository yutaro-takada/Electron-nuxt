<template>
  <div>
    <!-- 入力欄 -->
    <form class="container">
      <h5>USER情報の登録</h5>
      <label for="">Name</label><br />
      <input id="input_name" v-model="input_name" type="text" /><br />
      <label for="">Mail</label><br />
      <input id="inp_email" v-model="input_email" type="email" /><br />
      <label for="">Pass Word</label><br />
      <input id="input-password" v-model="input_password" type="password"/><br />
      <!-- {{this.input}} -->
      <div style="padding-top:5px;">
        <b-button variant="danger" @click="clear()">Clear</b-button>
      </div>
    </form>
    <div style="margin:10px;text-align:center;">
      <b-button variant="primary" @click="onAlertEntry()" title="あああ">登録</b-button>
    </div>
    <!-- DB登録内容を表示 -->
    <table>
      <thead>
        <tr>
          <th v-for="(header, index) in headers" v-bind:key="index" class="fixed01">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" v-bind:key="item.id">
          <th>{{ index + 1 }}</th>
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.pass }}</td>
          <td><b-button variant="success">編集</b-button></td>
          <td>
            <b-button variant="danger" @click="onAlterDelete(item)">削除</b-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
const headers = ["NO", "ID", "名前", "Mail", "Pass", "Edit", "Delete"];
export default {
  name: "Usuarios",
  components: {},
  data() {
    return {
      user: this.user,
      errors: [],
      input_name: "",
      input_email: "",
      input_password: "",
      items: [],
      input: [],
      edit_input: "",
      headers
    };
  },
  async asyncData({ $axios }) {
    const items = await $axios.$get("http://localhost:5000");
    return { items};
  },
  methods: {
    //「登録」ボタンのクリックイベント処理
    onAlertEntry() {
      this.input.push(this.input_name);
      this.input.push(this.input_email);
      this.input.push(this.input_password);
      const result = window.confirm(this.input_name + "を登録しますか？");
      if (result) {
        alert("登録が完了しました");
        this.entry();
      } else {
        alert("登録を中止しました");
        console.log("NO!");
      }
    },
    //DBにデータを登録する
    async entry() {
      const items = await this.$axios.$post("http://localhost:5000/", {
        name: this.input_name,
        email: this.input_email,
        pass: this.input_password
      });
      this.clear();
      location.reload();
    },
    //DBからデータ(単体)を削除する
    async deleteData(id) {
      let uri = "http://localhost:5000/delete/" + id;
      await this.$axios.$post(uri);
      location.reload();
    },
    //「削除」ボタンのクリックイベント処理
    onAlterDelete(item) {
      const result = window.confirm(item.name + "を削除します");
      if (result) {
        alert("削除が完了しました");
        this.deleteData(item.id);
      } else {
        alert("削除を中止しました");
        console.log("NO!");
      }
    },
    // 入力欄をクリアする
    clear() {
      this.input_name = "";
      this.input_email = "";
      this.input_password = "";
    }
  }
};
</script>

<style>
form {
  background-color: aqua;
  text-align: center;
  padding: 10px;
  /* margin-bottom:10px; */
}
table {
  border: solid 1px #ccc;
  border-collapse: collapse;
  margin: auto;
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
</style>
