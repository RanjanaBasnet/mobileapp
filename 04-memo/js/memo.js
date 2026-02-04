"use strict";

window.addEventListener(
    "DOMContentLoaded",
    function () {
        if (typeof localStorage === "undefined") {
            window.alert("このブラウザはlocalStorage機能が実装されていません");
            return;
        } else {
            viewStorage();
            saveLocalStorage();
            delLocalStorage();
            allclearLocalstorage();
            selectTable();
        }
    },
    false
);

function saveLocalStorage() {
    const save = document.getElementById("save");
    save.addEventListener(
        "click",
        function (e) {
            e.preventDefault();
            const key = document.getElementById("textkey").value;
            const value = document.getElementById("textMemo").value;

            if (key === "" || value === "") {
                window.alert("key, Memoはいずれも必須です。");
                return;
            } else {
                let w_confirm = window.confirm("LocalStorageに\n 「" + key + " " + value + "」 \nを保存(save) しますか？");
                if (w_confirm === true) {
                    localStorage.setItem(key, value);
                    viewStorage();
                    window.alert("localStorageに " + key + " " + value + " を保存しました。");
                    document.getElementById("textkey").value = "";
                    document.getElementById("textMemo").value = "";
                }
            }
        },
        false
    );
}

function delLocalStorage() {
    const del = document.getElementById("del");
    del.addEventListener(
        "click",
        function (e) {
            e.preventDefault();
            const chkbox1 = document.getElementsByName("chkbox1");
            const table1 = document.getElementById("table1");
            let w_cnt = 0;
            w_cnt = selectCheckBox("del");

            if (w_cnt >= 1) {
                //const key = document.getElementById("textkey").value;
                //const value = document.getElementById("textMemo").value;
                let w_confirm = window.confirm("LocalStorageにから選択されている"+ w_cnt + " 件を削除(delete) しますか？");
                if (w_confirm === true) {
                    for(let i = 0; i < chkbox1.length; i++){
                       localStorage.removeItem(table1.rows[i+1].cells[1].firstChild.data);
                    }
                    viewStorage();
                    let w_msg = "localStorageから " + w_cnt + " 件を削除(delete) しました。";
                    window.alert(w_msg);
                    document.getElementById("textkey").value = "";
                    document.getElementById("textMemo").value = "";
                }
            }
        },
        false
    );
}

function allclearLocalstorage() {
    const allclear = document.getElementById("allclear");
    allclear.addEventListener(
        "click",
        function (e) {
            e.preventDefault();
            let w_confirm = window.confirm(
                "LocalStorageのデータをすべて削除します。\nよろしいですか？"
            );

            if (w_confirm === true) {
                localStorage.clear();
                viewStorage();
                window.alert("localStorageのデータをすべて削除しました。");
                document.getElementById("textkey").value = "";
                document.getElementById("textMemo").value = "";
            }
        },
        false
    );
}

function selectTable() {
    const select = document.getElementById("select");
    select.addEventListener(
        "click",
        function (e) {
            e.preventDefault();
            selectCheckBox("select");
        }, false
    );
};
function selectCheckBox(mode) {
    let w_sel = "0";
    let w_cnt = 0;
    const chkbox1 = document.getElementsByName("chkbox1");
    const table1 = document.getElementById("table1");
    let w_textkey = "";
    let w_textMemo = "";

    for (let i = 0; i < chkbox1.length; i++) {
        if (chkbox1[i].checked) {
            if (w_cnt === 0) {
                w_textkey = table1.rows[i + 1].cells[1].firstChild.data;
                w_textMemo = table1.rows[i + 1].cells[2].firstChild.data;
            }
            w_cnt++;
        }
    }
    document.getElementById("textkey").value = w_textkey;
    document.getElementById("textMemo").value = w_textMemo;
    if (w_cnt === 1) {
        return w_sel = "1";
    }
    else {
        window.alert("1つ選択(select)してください。");
    }
}

// LocalStorageからテーブルを取得して表示
function viewStorage() {
    const list = document.getElementById("list");

    // テーブル初期化
    while (list.rows.length > 0) {
        list.deleteRow(0);
    }

    for (let i = 0; i < localStorage.length; i++) {
        let w_key = localStorage.key(i);

        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");

        td1.innerHTML = "<input name='chkbox1' type='checkbox'>";
        td2.textContent = w_key;
        td3.textContent = localStorage.getItem(w_key);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        list.appendChild(tr);
    }

    $("#table1").tablesorter({
        sortList: [[1, 0]]
    });
    $("#table1").trigger("update");
}
