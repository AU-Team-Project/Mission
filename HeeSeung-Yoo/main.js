let num1 = '';
let num2 ='';
let ope = '';
let result = '';

function Updateresult() {
    result = num1 + ope + num2;
    document.querySelector('.display').value = result;
}

function Addnum(num) {
    if (ope == '') {
      num1 += num;
    } else {
      num2 += num;
    }
    Updateresult();
}

function Addope(input) {
    if(num1 !== '' && !isNaN(num1.charAt(num1.length-1))) {
        ope = '';
        ope += input;
    }
    Updateresult()
}

function Clear() {
    num1 = '';
    num2 = '';
    ope = '';
    Updateresult()
}

function Equalresult() {
    if(!isNaN(num2.charAt(num2.length-1))) {
        result = (new Function ('return '+result))();
        document.querySelector('.display').value = result;
    }
}
