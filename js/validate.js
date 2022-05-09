//验证用户名
function checkName(proName) {
    var regName = /^[\u4E00-\u9FA5]+$/;
    if (proName == "" || proName.trim() == "") {
        document.getElementById("proNameSpan").innerHTML = "请输入用户名".fontcolor("red");
        return false;
    } else if (!regName.test(proName)) {
        document.getElementById("proNameSpan").innerHTML = "请输入汉字".fontcolor("red");
        return false;
    } else {
        return true;
    }
}