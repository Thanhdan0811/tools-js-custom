function convertStr(str) {
    // a => z : 97 => 122
    // space => 32 
    // 0 => 9 : 48 => 57
    let lowStr = str.toLowerCase(str);
    let rel = "";
    let checkSpecial = 0;
    for(let i = 0; i < lowStr.length ; i++) {
        let code = lowStr.charCodeAt(i);
        if((code >= 97 && code <= 122 ) || (code >= 48 && code <=57)) {
            rel += lowStr[i];
            checkSpecial = 0;
            continue;
        }
        if(checkSpecial == 0) {
            checkSpecial++;
            rel += "-";
        }
    }
    return rel;
}

document.querySelector("#btn-convert").onclick = function(e) {
    document.querySelector("#str-out").value =  convertStr(document.querySelector("#str-in").value);
    document.querySelector("#str-in").value = "";
}