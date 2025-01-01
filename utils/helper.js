const fs = require('fs');

function replaceJSON(nameFile, variabel, valueVariabel) {
    function replacer(key, value) {
        if (key == variabel) {
            return valueVariabel;
        }
        return value;
    }

    try {
        let fileName = `../fixtures/${nameFile}.json`;
        let file = require(fileName);
        let fileChange = JSON.stringify(file, replacer)
        // console.log(file);
        // console.log(fileChange);
        fileChange = JSON.parse(fileChange)
        // console.log(fileChange);

        fs.writeFileSync(`../../fixtures/${nameFile}.json`, JSON.stringify(fileChange, null, 4), "utf-8");
        console.log(`Berhasil Replace ${nameFile}`)
        return fileChange

    } catch (e) {
        throw Error(e);
        console.log(`Gagal Replace ${nameFile}`)
    }

}

//Tgl Hari Ini
function tgl_hari_ini() {
    let date = new Date();
    let tgl = date.getDate();
    let tgl_digit = "";
    if (tgl == 1 || tgl == 2 || tgl == 3 || tgl == 4 || tgl == 5 || tgl == 6 || tgl == 7 || tgl == 8 || tgl == 9) {
        tgl_digit = "0" + tgl;
    } else {
        tgl_digit = tgl;
    }
    
    let bulan = (date.getMonth()) + 1;
    let bln_digit = "";
    if (bulan == 1 || bulan == 2 || bulan == 3 || bulan == 4 || bulan == 5 || bulan == 6 || bulan == 7 || bulan == 8 || bulan == 9) {
        bln_digit = "0" + bulan;
    } else {
        bln_digit = bulan;
    }

    let tahun = date.getFullYear();
    let x = `${tahun}-${bln_digit}-${tgl_digit}`;
    return x
}


//Next Checkup
function tgl_1_bulan() {
    let date = new Date();
    date.setDate(date.getDate() + 30);
    let tgl = date.getDate();
    let tgl_digit = "";
    if (tgl == 1 || tgl == 2 || tgl == 3 || tgl == 4 || tgl == 5 || tgl == 6 || tgl == 7 || tgl == 8 || tgl == 9) {
        tgl_digit = "0" + tgl;
    } else {
        tgl_digit = tgl;
    }
    
    let bulan = (date.getMonth()) + 1;
    let bln_digit = "";
    if (bulan == 1 || bulan == 2 || bulan == 3 || bulan == 4 || bulan == 5 || bulan == 6 || bulan == 7 || bulan == 8 || bulan == 9) {
        bln_digit = "0" + bulan;
    } else {
        bln_digit = bulan;
    }

    let tahun = date.getFullYear();
    let x = `${tahun}-${bln_digit}-${tgl_digit}`;
    return x
}

//Expiration Date

function tgl_3_bulan() {
    let date = new Date();
    date.setDate(date.getDate() + 60);
    let tgl = date.getDate();
    let tgl_digit = "";
    if (tgl == 1 || tgl == 2 || tgl == 3 || tgl == 4 || tgl == 5 || tgl == 6 || tgl == 7 || tgl == 8 || tgl == 9) {
        tgl_digit = "0" + tgl;
    } else {
        tgl_digit = tgl;
    }
    
    let bulan = (date.getMonth()) + 1;
    let bln_digit = "";
    if (bulan == 1 || bulan == 2 || bulan == 3 || bulan == 4 || bulan == 5 || bulan == 6 || bulan == 7 || bulan == 8 || bulan == 9) {
        bln_digit = "0" + bulan;
    } else {
        bln_digit = bulan;
    }

    let tahun = date.getFullYear();
    let x = `${tahun}-${bln_digit}-${tgl_digit}`;
    return x
}



module.exports = {
    replaceJSON,
    tgl_hari_ini,
    tgl_1_bulan,
    tgl_3_bulan
}