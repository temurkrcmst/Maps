function getItems() {

    var storedObject = {};
    // var itemList = [];

    var c;
    var t;
    var doc = null;
    $("#list").empty();

    for (var i = 0; i < localStorage.length; i++) {

        var key = localStorage.key(i);
        storedObject = JSON.parse(localStorage.getItem(localStorage.key(i)));

        c = document.getElementById("list");

        t = " <label class='TitleList'>Name</label>" + " " + storedObject.NickName + ' <input onclick="deleteItems(this.id)" id=' + key + ' type=button class="btn btn-danger delete"  value="Sil"> <input onclick="edit(this.id)" id="' + key + '" type=button class="btn btn-success edit"data-dismiss="modal" data-toggle="modal" data-target="#UpdateAir" value="Edit">' + "<br>" + " <label class='TitleList'>Camera</label>" + " " + storedObject.Kamera + "<br>" + " <label class='TitleList'>Model</label>" + " " + storedObject.Model + "<hr>";
        doc = c.insertAdjacentHTML('beforeend', "<li>" + t + "</li>");

        // itemList.push(storedObject);

        // document.getElementById(id).addEventListener("click", test);


    }

   


}
function deleteItems(key) {
    localStorage.removeItem(key);

}


$(document).ready(function () {

        $("#kaydet").on("click", function () {

            var nickName, model, kamera;
            nickName = document.getElementById("nickname").value;
            // $("#nickname").val();

            kamera = $("#Camera option:selected").text();
            model = $("#cameraModel option:selected").text();
            // var i = Math.floor((Math.random() * 100) + 1);
            var key = crypto.getRandomValues(new Uint32Array(4)).join('-');

            
            // document.getElementById("name").innerHTML = "<strong>Name</strong>" + " " + nickName + "<p>" + " " + "<strong>Camera</strong>" + " " + kamera + " " + "<strong>Model</strong>" + " " + model + "</p><hr>";
            //var c = document.getElementById("list");
            //var t = " <label class='TitleList'>Name</label>" + " " + nickName + ' <input  type=button class="btn btn-danger delete"  value="Sil"> <input id="a" type=button class="btn btn-success edit"data-dismiss="modal" data-toggle="modal" data-target="#UpdateAir" value="Edit" onClick="edit()">' + "<br>" + " <label class='TitleList'>Camera</label>" + " " + kamera + "<br>" + " <label class='TitleList'>Model</label>" + " " + model + "<hr>";
            //var doc = c.insertAdjacentHTML('beforeend', "<li id=" + key + ">" + t + "</li>");

            var storedObject = {};
            storedObject.NickName = nickName;
            storedObject.Model = model;
            storedObject.Kamera = kamera;

            //localStorage.setItem("NickName", nickName);
            //localStorage.setItem("Camera", kamera);
            //localStorage.setItem("Model", model);
            //for (var i = 0; i < localStorage.length; i++) {
            //    localStorage.getItem(localStorage.key(i));
            //}

            //var keyList = [];

            //if (localStorage.getItem("keys")) {
            //    keyList = JSON.parse(localStorage.getItem("keys"));
            //}

            //keyList.push(key);

            //localStorage.setItem("keys", JSON.stringify(keyList));

            localStorage.setItem(key, JSON.stringify(storedObject));

          
        });


});



document.getElementById('setOnItemLocalStorage').addEventListener('click', getInputVal);


function edit(key) {

    var item = JSON.parse(localStorage.getItem(key));

    document.getElementById("EditName").value = item.NickName;
    document.getElementById("EditCamera").value = item.Kamera;

    ChangeCameraList("edit");
    var modelIndex = CamerasAndModel[item.Kamera].indexOf(item.Model);

    document.getElementById("EditModel").value = modelIndex;


  
    document.getElementById("localKey").value = key;

}

$('#UpdateAir').on('hidden.bs.modal', function (e) {

    document.getElementById("localKey").value = "";

})


function getInputVal() {

    var key1 = document.getElementById("localKey").value;

    var nickName, model, kamera;
    nickName = document.getElementById("EditName").value;

    kamera = $("#EditCamera option:selected").text();
    model = $("#EditModel option:selected").text();

    var key = crypto.getRandomValues(new Uint32Array(4)).join('-');

    var storedObject = {};
    storedObject.NickName = nickName;
    storedObject.Model = model;
    storedObject.Kamera = kamera;


    localStorage.setItem(key1, JSON.stringify(storedObject));

}


function initMap() {
    var options = {
        zoom: 3,
        center: { lat: 41.015137, lng: 28.979530 }
    }

    var map = new google.maps.Map(document.getElementById('map'), options);

}

var CamerasAndModel = {};
CamerasAndModel['GoPro'] = [' ','Karma'];
CamerasAndModel['Hubsan'] = [' ','H501S', 'H501SS', 'X4']






function ChangeCameraList(type) {

    var cameraList = type == "save" ? document.getElementById("Camera") : document.getElementById("EditCamera");
    var modelList = type == "save" ? document.getElementById("cameraModel") : document.getElementById("EditModel");
    var selCamera = cameraList.options[cameraList.selectedIndex];


    while (modelList.options.length) {
        modelList.remove(0);
    }
    var Cameras = CamerasAndModel[selCamera.label];

    if (Cameras) {

        var i;
        for (i = 0; i < Cameras.length; i++) {
            var camera = new Option(Cameras[i], i);
            modelList.options.add(camera);

        }


        //  document.getElementById("name").innerHTML = "<strong>Name</strong>" + " " + document.getElementById("nickname").value + "<strong>Camera</strong>" + " " + document.getElementById("Camera").value + "<strong>Model</strong>" + " ";

        //document.getElementById("cmr").innerHTML = "<strong>Camera</strong>" + " " + document.getElementById("Camera").value;
        //document.getElementById("btnSpan").innerHTML = '<button id="btn" name="btn">Button</button>';

        //document.getElementById("model").innerHTML = "<strong>Model</strong>" + " ";

    }



}


