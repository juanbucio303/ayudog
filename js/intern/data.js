firebase.initializeApp(getInit());
var userAgent = navigator.userAgent || navigator.vendor || window.opera;
          
          function readHomeData() {
            var ind = 0;
            firebase.database().ref('/home/').once('value').then(async function(snapshot) {
                for(var key in snapshot.val()){
                    var item = snapshot.val()[key];
                    if(ind == 0){
                      cad += '<div class="carousel-item active"><img class="d-block w-100" style="border-radius: 12px; margin-bottom: 30px;" src="'+item.img64+'" alt="First slide"></div>';
                    }else {
                      cad += '<div class="carousel-item"><img class="d-block w-100" style="border-radius: 12px; margin-bottom: 30px;" src="'+item.img64+'" alt="First slide"></div>';
                    }
                    ind++;  
                }
                $("#carruselId").html(cad);
            });
          }

          function readNav() {
            
            firebase.database().ref('/nav/').once('value').then(async function(snapshot) {
              var item;  
              for(var key in snapshot.val()){
                  item = snapshot.val()[key];
              }
              if(item == 0){
                $(".caninNav").removeClass("d-lg-block")
                $(".caninNav").addClass("d-none")
              }
            });
          }
          function readColorData() {
            if(firebase.database().ref('/color/') != null){
              firebase.database().ref('/color/').once('value').then(async function(snapshot) {
                var item;  
                for(var key in snapshot.val()){
                    item = snapshot.val()[key];
                    console.log(item);
                }
                $("#colorPicker").val(item)
                $("#mainBody").css("background", item.color)
              });
            }
          }