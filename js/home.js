var rowIndex = -1;

window.onload = function () {
    //读取数据库、其它系统传过来的、手工构造数据
    var data = {
        "address": "杭州", "dept": "金融部",
        "products": [{"pid": "1", "proNum": "lc0001", "proName": "余额宝", "proLimit": "12", "annualized": "5"},
            {"pid": "2", "proNum": "lc0002", "proName": "招财宝", "proLimit": "24", "annualized": "15"},
            {"pid": "3", "proNum": "lc0003", "proName": "金葵花", "proLimit": "48", "annualized": "30"}]
    };
    var tbodyContent = "";

    var productArray = data.products;

    for (var i = 0; i < productArray.length; i++) {
        tbodyContent += "<tr><td><input type='checkbox'>" +
            "</td><td>" + productArray[i].proNum +
            "</td><td>" + productArray[i].proName +
            "</td><td>" + productArray[i].proLimit +
            "</td><td>" + productArray[i].annualized +
            "</td><td> <button class='btn btn-primary' id='updateBtn' onclick='updateBtn(this)'>编辑</button>" +
            "     <button class='btn btn-danger' id='delBtn' onclick='delBtn(this)'>删除</button></td></tr>";
    }

    var tbody = document.getElementsByTagName("tbody")[0];
    tbody.innerHTML = tbodyContent;

    //点击新增按钮，弹出添加员工信息表单
    var addBtn = document.getElementById("addBtn");
    addBtn.onclick = function () {
        document.getElementById("proNum").value = "";
        document.getElementById("proName").value = "";
        document.getElementById("proLimit").value = "";
        document.getElementById("annualized").value = "";
        $('#addWindow').modal('toggle');
    }

    //保存员工信息
    var saveBtn = document.getElementById("saveBtn");
    saveBtn.onclick = function () {
        var proNum = document.getElementById("proNum").value;
        var proName = document.getElementById("proName").value;
        var proLimit = document.getElementById("proLimit").value;
        var annualized = document.getElementById("annualized").value;

        var nameStatus = checkName(proName);//校验产品名称

        if (rowIndex == -1 && nameStatus ) {  //新增操作
            var addContent = "<tr><td><input type='checkbox'></td>" +
                "<td>" + proNum + "</td>" +
                "<td>" + proName + "</td>" +
                "<td>" + proLimit + "</td>" +
                "<td>" + annualized + "</td>" +
                "<td><button class='btn btn-primary' id='updateBtn' onclick='updateBtn(this)'>编辑</button>" +
                "    <button class='btn btn-danger' id='delBtn'  onclick='delBtn(this)'>删除</button></td></tr>";
            tbody.innerHTML += addContent;
        } else { //修改操作
            var table = document.getElementsByTagName("table")[0];
            table.rows[rowIndex].cells[1].innerHTML = proNum;
            table.rows[rowIndex].cells[2].innerHTML = proName;
            table.rows[rowIndex].cells[3].innerHTML = proLimit;
            table.rows[rowIndex].cells[4].innerHTML = annualized;

            rowIndex = -1; //修改完毕后，将行号设置为-1，防止点击新建按钮后rowIndex不为-1
        }

        $('#addWindow').modal('hide');
    }
}

//点击编辑按钮,弹出编辑窗口
function updateBtn(t) {
    $('#addWindow').modal('toggle');

    var tr = t.parentNode.parentNode;
    rowIndex = t.parentNode.parentNode.rowIndex;//获取当前行号（修改有行号，新增没有行号）

    document.getElementById("proNum").value = tr.children[1].innerHTML;
    document.getElementById("proName").value = tr.children[2].innerHTML;
    document.getElementById("proLimit").value = tr.children[3].innerHTML;
    document.getElementById("annualized").value = tr.children[4].innerHTML;
}


//点击删除按钮
function delBtn(t) {
    $('#deleteWindow').modal('toggle');
    var tr = t.parentNode.parentNode;
    var name = tr.children[2].innerHTML;
    document.getElementById("hintContext").innerText = "确认删除\"" + name + "\"吗?"

    var confirmDelBtn = document.getElementById("confirmDelBtn");
    confirmDelBtn.onclick = function () {
        tr.parentNode.removeChild(tr);//删除tr
        $('#deleteWindow').modal('hide');
    }
}
