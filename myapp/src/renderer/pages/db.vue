<template>
    <div>
        <h1>DB ページ</h1>
        <p>DBへのCRUD操作を行う</p>
        <!-- 入力欄 -->
        <form>
            <input id="input-url" v-model="input" type="text" />
            <b-button variant="primary" @click="onAlertEntry(input)">登録</b-button>
            <b-button variant="danger" @click="clear(input)">Clear</b-button>
            <b-button variant="success">編集</b-button>
        </form>
        <!-- DB登録内容を表示 -->
        <div class="container" style="background-color: pink;">
            <ul>
                <li v-for="item in items" :key="item.id" style="list-style: none;">
                    {{ item.name }}
                    <div v-show="isOpen" name="mdl" :draggable="true" :resizable="true">
                        <!-- <modal-header>{{ item.id }}</modal-header> -->
                        <div>
                            <p>{{ item.id }}</p>
                            <input type="text" v-model="editinput" />
                        </div>
                    </div>
                    <b-button v-show="isOpen" variant="success" @click="edit(item.id)">更新</b-button>
                    <b-button variant="danger" :v-bind="item.id" @click="onAlterDelete(item)">削除</b-button>
                </li>
            </ul>
        </div>
        <b-button variant="success" @click="openModal()">開く</b-button>
        <b-button @click="closeModal()">閉じる</b-button>
    </div>
</template>

<script>
export default {
    components: {
        
    },
    data() {
        return {
            input: '',
            items: [],
            isOpen: false,
            editinput:''
        };
    },
    async asyncData({ $axios }) {
        const items = await $axios.$get("http://localhost:5000");
        console.log(items);
        return { items };
    },
    methods: {
        async edit(id){
            alert(this.editinput);    
            let uri = "http://localhost:5000/edit/" + id;
            await this.$axios.$post(uri, { name: this.editinput });
            location.reload();
        },
        openModal(){
            this.isOpen= true;
        },
        closeModal(){
            this.isOpen = false;
        },
        //DBにデータを登録する
        async entry() {
            const items = await this.$axios.$post('http://localhost:5000/', { name: this.input });
            this.input = '';
            location.reload();
        },
        //「登録」ボタンのクリックイベント処理
        onAlertEntry(input) {
            const result = window.confirm(input + 'を登録します');
            if (result) {
                alert('登録が完了しました');
                this.entry();
            }
            else {
                alert('登録を中止しました');
                console.log('NO!');
            }
        },
        // //DBからデータ(単体)を削除する
        async deleteData(id) {
            let uri = "http://localhost:5000/delete/" + id;
            await this.$axios.$post(uri);
            location.reload();
        },
        //「削除」ボタンのクリックイベント処理
        onAlterDelete(item) {
            const result = window.confirm(item.name + 'を削除します');
            if (result) {
                alert('削除が完了しました');
                this.deleteData(item.id);
            }
            else {
                alert('削除を中止しました');
                console.log('NO!');
            }
        },
        // 入力欄をクリアする
        clear() {
            this.input = '';
        },
    }
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

.modal-header,
.modal-body {
    padding: 5px 25px;
}

.modal-header {
    border-bottom: 1px solid #ddd;
}

#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
