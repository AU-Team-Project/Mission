function checkData() {
    var id = document.getElementById("id").value;
    var password1 = document.getElementById("password1").value;
    var password2 = document.getElementById("password2").value;
    var name1 = document.getElementById("name1").value;
    var name2 = document.getElementById("name2").value;
    var birth = document.getElementById("birth").value;
    var email = document.getElementsByName("e-mail")[0].value;
    var mobile2 = document.getElementById("mobile2").value;
    var mobile3 = document.getElementById("mobile3").value;

    if (id.length < 4) {
        alert("아이디는 4자리 이상으로 입력하세요.");
        return false;
    }

    if (password1 !== password2) {
        alert("비밀번호가 일치하지 않습니다.");
        return false;
    }

    if (name1 === "" || name2 === "") {
        alert("이름을 입력하세요.");
        return false;
    }

    if (email === "" || email.indexOf("@") === -1) {
        alert("이메일 주소를 확인하세요.");
        return false;
    }

    if (mobile2 === "" || mobile2.length !== 4 || isNaN(mobile2)) {
        alert("휴대폰 번호를 확인하세요.");
        return false;
    }

    if (mobile3 === "" || mobile3.length !== 4 || isNaN(mobile3)) {
        alert("휴대폰 번호를 확인하세요.");
        return false;
    }

    alert("가입이 완료되었습니다.");
    return true;
}
