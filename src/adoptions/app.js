
function setFile(){
    var file = fileInput.files[0];// use the Blob or File API.
    //var blob = new Blob(file, {type: 'image/jpge'});
    var storageUrl = 'prueba/';
    var ref = firebase.storage().ref(storageUrl + file.name);

    ref.put(file).then(function(snapshot) {
        //location.reload()
    }).catch(function(e){
        //location.reload()
        console.log(e);
    });
}

function setFileWalk(key, fileName, fileItem, descripcion){//Ok
    var file = fileItem.files[0];;
    var storageUrl = 'walk/';
    var ref;

    if (key!=null) {
        if (file != null) {
            $("#modalUpload").modal("show");
            ref = firebase.storage().ref(storageUrl + fileName);
            ref.put(file).then(function(snapshot) {
                var name = file.name
                var type = name.split('.').pop()
                firebase.database().ref(storageUrl+key).update({
                    type : type.toLowerCase(),
                    descripcionWalk: descripcion
                }).then((res) => {
                    readWalkData();
                    $("#modalUpload").modal("hide");
                    $("#modalWalkEdit").modal("hide");
                });
            }).catch(function(e){
                $("#modalWalkEdit").modal("hide");
                alert("Ha ocurrido un error inesperado intente más tarde");
                console.log(e);
            });
        }else{
            var type = name.split('.').pop()
            firebase.database().ref(storageUrl+key).update({
                //type : type.toLowerCase(),
                descripcionWalk: descripcion
            }).then((res) => {
                readWalkData();
                $("#modalUpload").modal("hide");
                $("#modalWalkEdit").modal("hide");
            });
        }
    }else{
        
        ref = firebase.storage().ref(storageUrl + file.name);
        ref.put(file).then(function(snapshot) {
            var name = file.name
            var type = name.split('.').pop()
            firebase.database().ref(storageUrl).push({
                fileName : name,
                type : type.toLowerCase(),
                descripcionWalk: descripcion
            }).then((res) => {
                readWalkData();
                $("#modalUpload").modal("hide");
                $("#modalWalk").modal("hide");
            });
        }).catch(function(e){
            $("#modalUpload").modal("hide");
            alert("Ha ocurrido un error inesperado intente más tarde");
            console.log(e);
        });
    }
}

function setFileNews(key, fileName, fileItem, descripcion, isPrincipal){//Ok
    var file = fileItem.files[0];
    var storageUrl = 'news/';
    var ref;
    if (key != null) {
        if (file != null) {
            $("#modalUpload").modal("show");
            ref = firebase.storage().ref(storageUrl + fileName);
            ref.put(file).then(function(snapshot) {
                firebase.database().ref(storageUrl+key).update({
                    descripcionNews: descripcion,
                    isPrincipal: isPrincipal
                }).then((res) => {
                    readNewsData();
                    $("#modalUpload").modal("hide");
                    $("#modalNewsEdit").modal("hide");
                });
            }).catch(function(e){
                $("#modalUpload").modal("hide");
                alert("Ha ocurrido un error inesperado intente más tarde");
                console.log(e);
            });
        }else{
            firebase.database().ref(storageUrl+key).update({
                descripcionNews: descripcion,
                isPrincipal: isPrincipal
            }).then((res) => {
                readNewsData();
                $("#modalUpload").modal("hide");
                $("#modalNewsEdit").modal("hide");
            });
        }
        
    }else{
        ref = firebase.storage().ref(storageUrl + file.name);
        ref.put(file).then(function(snapshot) {
            firebase.database().ref(storageUrl).push({
                descripcionNews: descripcion,
                fileName : file.name,
                isPrincipal: isPrincipal
            }).then((res) => {
                readNewsData();
                $("#modalUpload").modal("hide");
                $("#modalNews").modal("hide");
            });
        }).catch(function(e){
            $("#modalUpload").modal("hide");
            alert("Ha ocurrido un error inesperado intente más tarde");
            console.log(e);
        });
    }
    
}

function setFileAbout(key, fileName, fileItem, descripcion){
    var file = fileItem.files[0];
    var storageUrl = 'about/';
    var ref;

    if (key!=null) {
        if(file != null){
            $("#modalUpload").modal("show");
            ref = firebase.storage().ref(storageUrl + fileName);
            ref.put(file).then(function(snapshot) {
                firebase.database().ref(storageUrl+key).update({
                    descripcionAbout: descripcion
                }).then((res) => {
                    readAboutData();
                    $("#modalUpload").modal("hide")
                });
            }).catch(function(e){
                alert("Ha ocurrido un error inesperado intente más tarde");
                $("#modalUpload").modal("hide");
                console.log(e);
            })
        }else{
            firebase.database().ref(storageUrl+key).update({
                descripcionAbout: descripcion
            }).then((res) => {
                readAboutData();
                $("#modalUpload").modal("hide")
            });
        }
    }else{
        console.log(storageUrl);
        console.log(file.name);
        $("#modalUpload").modal("show");
        ref = firebase.storage().ref(storageUrl + file.name);
        ref.put(file).then(function(snapshot) {
            firebase.database().ref(storageUrl).push({
                descripcionAbout: descripcion,
                fileName : file.name
            }).then((res) => {
                readAboutData();
                $("#modalUpload").modal("hide")
            });
        }).catch(function(e){
            alert("Ha ocurrido un error inesperado intente más tarde");
            $("#modalUpload").modal("hide");
            console.log(e);
        })
    }
    $("#file-input-about").val("")
    $("#keyAbout").val("")
    $("#imageNameAbout").val("")
    $("#descripcionAbout").val("")
    $("#acceptAbout").removeClass("d-none")
    $("#acceptAboutE").addClass("d-none")
    
}

function setFileAdoption(key, imageName, nombre, descripcion, genero, edad, tamanio, fileItem, vacunado, desparasitado){
    var file = fileItem.files[0];
    var storageUrl = 'adoption/';
    var ref;
    if(key!=null){
        ref = firebase.storage().ref(storageUrl + imageName);
        if(file != null){
            $("#modalLoading").modal("show");
            ref.put(file).then(function() { 
                firebase.database().ref(storageUrl+key).update({
                    nombre: nombre,
                    descripcion: descripcion,
                    genero: genero,
                    edad: edad,
                    tamanio: tamanio,
                    vacunado: vacunado,
                    desparasitado: desparasitado
                }).then(() => {
                    $("#modalLoading").modal("hide");
                    $("#modalUpload").modal("hide");
                    $("#modalAdoptionDetail").modal("hide");
                    readAdoptionData();
                }).catch(function(e){
                    alert("Ha ocurrido un error inesperado intente más tarde");
                    $("#modalUpload").modal("hide");
                    console.log(e);
                });
             })
        }else{
            firebase.database().ref(storageUrl+key).update({
                nombre: nombre,
                descripcion: descripcion,
                genero: genero,
                edad: edad,
                tamanio: tamanio,
                vacunado: vacunado,
                desparasitado: desparasitado
            }).then(async ()  => {
                $("#modalUpload").modal("hide");
                $("#modalAdoptionDetail").modal("hide");
                readAdoptionData();
            }).catch(function(e){
                alert("Ha ocurrido un error inesperado intente más tarde");
                $("#modalUpload").modal("hide");
                console.log(e);
            });success = true
        }
    }else{
        ref = firebase.storage().ref(storageUrl + file.name);
        ref.put(file).then(function(snapshot) {
            firebase.database().ref(storageUrl).push({
                nombre: nombre,
                descripcion: descripcion,
                genero: genero,
                edad: edad,
                tamanio: tamanio,
                fileName : file.name,
                vacunado : vacunado,
                desparasitado : desparasitado
            }).then((res) => {
                readAdoptionData();
                $("#modalUpload").modal("hide");
                $("#modalAdoption").modal("hide");
            });
        }).catch(function(e){
            alert("Ha ocurrido un error inesperado intente más tarde");
            $("#modalUpload").modal("hide");
            console.log(e);
        });
    }
}

function setFileExperience(fileItem){
    var file = fileItem.files[0];// use the Blob or File API.
    //var blob = new Blob(file, {type: 'image/jpge'});
    var storageUrl = 'experience/';
    var ref = firebase.storage().ref(storageUrl + file.name);

    ref.put(file).then(function(snapshot) {
        location.reload()
    }).error(function(e){
        location.reload()
        console.log(e);
    });
}

function setFileHome(key, fileName, fileItem){
    var file = fileItem.files[0];;
    var storageUrl = 'home/';
    var ref;

    if (key!=null) {
        if (file != null) {
            $("#modalUpload").modal("show");
            ref = firebase.storage().ref(storageUrl + fileName);
            ref.put(file).then(function(snapshot) {
                var name = file.name
                var type = name.split('.').pop()
                firebase.database().ref(storageUrl+key).update({
                    type : type.toLowerCase()
                }).then((res) => {
                    readData();
                    $("#modalUpload").modal("hide");
                    $("#modalEdit").modal("hide");
                });
            }).catch(function(e){
                $("#modalEdit").modal("hide");
                alert("Ha ocurrido un error inesperado intente más tarde");
                console.log(e);
            });
        }
    }else{
        
        ref = firebase.storage().ref(storageUrl + file.name);
        ref.put(file).then(function(snapshot) {
            var name = file.name
            var type = name.split('.').pop()
            firebase.database().ref(storageUrl).push({
                fileName : name,
                type : type.toLowerCase()
            }).then((res) => {
                readData();
                $("#modalUpload").modal("hide");
                $("#modalAdd").modal("hide");
            });
        }).catch(function(e){
            $("#modalUpload").modal("hide");
            alert("Ha ocurrido un error inesperado intente más tarde");
            console.log(e);
        });
    }
}