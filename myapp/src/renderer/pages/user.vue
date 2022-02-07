<template>
  <div class="container">
    <h5>USER情報の登録</h5>
    <!-- 入力欄 -->
    <form>
      <label for="">お名前</label><br />
      <input
        v-model="input_name"
        id="input1-name"
        name="name"
        type="text"
        placeholder="山田 太郎"
      /><br />
      <span>{{ errors.name }}</span
      ><br />
      <label for="">フリガナ</label><br />
      <input
        v-model="nameKana"
        id="input1-name"
        type="text"
        name="furigana"
        placeholder="ヤマダ タロウ"
      /><br />
      <span>{{ errors.nameKana }}</span
      ><br />
      <label for="">メールアドレス</label><br />
      <input
        v-model="mail"
        id="input-mail"
        type="text"
        name="email"
        placeholder="test@test.com"
      /><br />
      <span>{{ errors.mail }}</span
      ><br />
      <label for="">電話番号[ハイフンなし]</label><br />
      <input
        v-model="phoneNumber"
        id="input-tel"
        type="text"
        name="tel"
        placeholder="080XXXXXXXX"
      /><br />
      <span>{{ errors.phoneNumber }}</span
      ><br />
      <div class="btn">
        <b-button variant="primary" @click="confirm()"
          >入力内容を確認する</b-button
        ><br />
        <b-button variant="danger" @click="clear()">All Clear</b-button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      input_name: "",
      nameKana: "",
      mail: "",
      phoneNumber: "",
      input: [],
      errors: {},
    };
  },
  watch: {
    /** 全角カナ入力チェック */
    nameKana(nameKana) {
      if (!nameKana || !!nameKana.match(/^[ァ-ヶー　]*$/)) {
        this.$delete(this.errors, "nameKana");
      } else {
        this.$set(
          this.errors,
          "nameKana",
          "フリガナは全角カナで入力してください"
        );
      }
    },
    /** 電話番号入力チェック(ハイフンの入力制限未設定) */
    phoneNumber(phoneNumber) {
      if (!phoneNumber || !!phoneNumber.match(/^[0-9\-]+$/)) {
        this.$delete(this.errors, "phoneNumber");
      } else {
        this.$set(
          this.errors,
          "phoneNumber",
          "電話番号は半角数字/ハイフンなしで入力してください。"
        );
      }
    },
  },
  methods: {
    /** 登録処理全体[親] */
    confirm() {
      //既に入力がある場合は一度削除する
      if (this.input.length > 0) {
        this.input.splice(0);
      }
      /** 登録する内容を配列に格納する */
      this.input.push({
        name: this.input_name,
        kana: this.nameKana,
        mail: this.mail,
        tel: this.phoneNumber,
      });
      /** 全入力項目の必須チェック */
      if (
        this.input[0].input_name == "" ||
        this.input[0].kana == "" ||
        this.input[0].mail == "" ||
        this.input[0].tel == ""
      ) {
        alert("全項目を入力してください");
        return;
      }
      /** 登録前最終確認 */
      const result = window.confirm(this.input[0].name + "を登録します");
      if (result) {
        this.entry();
      } else {
        alert("登録を中止しました");
        console.log("NO!");
      }
    },
    /** 登録処理[子] */
    async entry() {
      const items = await this.$axios.$post("/user/register", {
        name: this.input_name,
        kana: this.nameKana,
        mail: this.mail,
        tel: this.phoneNumber,
        is_delete: 0,
      });
      alert(this.input_name + "を登録しました");
      this.clear();
      location.reload();
    },
    /** 入力内容を全てクリアする */
    clear() {
      this.input_name = "";
      this.nameKana = "", 
      this.mail = "",
      this.phoneNumber = "";
    },
  },
};
</script>

<style>
.container {
  /* margin:0;
    padding:0;
    color:white;
    text-align: center;
    background-color:rgb(42, 89, 102);
    width:300px; */
  /* background: url("~@/assets/natural-wine.jpeg"),no-repeat,fixed;
    background-size: cover;
    background-repeat: no-repeat; */
}
h5 {
  padding-top: 5px;
}
form {
  margin-top: 5px;
}
.btn {
  margin: 5px;
}
</style>
