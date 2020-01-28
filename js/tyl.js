//for read more and read less  functionality 
function myFunction() {
  var dots = document.getElementById("dots");
  var moreText = document.getElementById("more");
  var btnText = document.getElementById("myBtn");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Read more";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Read less";
    moreText.style.display = "inline";
  }
}

function dowiki(place, flag) {
 
  var wikiplace=place.toLowerCase();
  var URL = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts|images&exintro=&explaintext=';
  
  URL += "&titles=" + wikiplace;
  
  URL += "&rvprop=content";
  URL += "&callback=?";
  $.getJSON(URL, function (data) {
 
    var obj = data.query.pages; 
    var ob = Object.keys(obj)[0];
    var res = obj[ob]["extract"] + "";
 
    var res1 = res.substring(0, 700) + '<span id="dots">...</span><span id="more"></span><button onclick="myFunction()" id="myBtn">Read more</button>';
    var res2 = res.substring(700);

    document.getElementById('res').style.display = 'initial';
    document.getElementById('res').innerHTML = res1;
    document.getElementById('more').innerHTML = res2;
    document.getElementById('map_canvas').style.display = 'initial';
    document.getElementById('weather-con').style.display = 'initial';
    document.getElementById('images').style.display = 'initial';
    document.getElementById('news-block').style.display = 'initial';
    document.getElementById('news-tittle').style.display = 'initial';
    



  });
}
//it is calling all the three function of home page
function GetMapData(location, flag) {

  var URL = 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBVckXipCpyGacLRxZMirJ6YRrAuLqJ854';
  URL += "&address=" + location;
  $.getJSON(URL, function (data) {

   // console.log(data);
    if (flag == 0) {
      dowiki(location, flag);
      DrawMap(data.results[0].geometry.location.lat, data.results[0].geometry.location.lng);
      getWeather(data.results[0].geometry.location.lat, data.results[0].geometry.location.lng);
      searchURL(location);
    } else
      console.log('error');
  });
}

function DrawMap(lat, lng) {
  var myLatlng = new google.maps.LatLng(lat, lng);
  var myOptions = {
    zoom: 8,
    center: myLatlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  //for loading the map
  var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
  var markerPos = {
    lat: lat,
    lng: lng
  };
  var marker = new google.maps.Marker({
    position: markerPos,
    map: map,
    title: 'Marker Name'
  });
}

window.onload= function() {
  let params = (new URL(document.location)).searchParams;
  let nameUser = params.get("username");
  console.log("Name is " + nameUser)
  document.getElementById("userName").innerHTML = nameUser
}

  var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
  (function(){
  var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
  s1.async=true;
  s1.src='https://embed.tawk.to/5dfdce077e39ea1242a11b51/default';
  s1.charset='UTF-8';
  s1.setAttribute('crossorigin','*');
  s0.parentNode.insertBefore(s1,s0);
  })();
  function searchURL(input) {
        console.log(input);
    var url = $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?address=" + input + "&key=AIzaSyBVckXipCpyGacLRxZMirJ6YRrAuLqJ854", function (json) {
         var lat = JSON.stringify(json.results[0].geometry.location.lat);
         var lon = JSON.stringify(json.results[0].geometry.location.lng);
         console.log(lat, lon);

         var get=$.getJSON("https://api.unsplash.com/search/photos?client_id=1424074b20f17701ec8c0601fd15ca686c70e2cb0e645f8137533d8063e664bc&query=" + input,function (gets)
          {
              var divImages = document.getElementById("images");
              var len;
              var Upper=input.toUpperCase();
              document.getElementById("image_title").innerHTML=Upper+" "+"IMAGES";
              var imgURLs = new Array();
              var i;
              console.log(gets.results.length);
              for(i=0; i<gets.results.length; i++)
              {
                   imgURLs.push(gets.results[i].urls.raw)
              }
              if(gets.results.length < 10) {
                   len = gets.results.length;
              }
              else {
                   len = 10;
              }
               
              console.log(gets.results.length);
              for(i = 0; i<len; i++) {
                   divImages.innerHTML += "<img id='img" + i + "'>";
                   var sa=document.getElementById("img" + i);
                   var imgURLIndex = Math.floor(Math.random() * imgURLs.length);
                   var newImgUrl = imgURLs[imgURLIndex];
                   imgURLs.splice(imgURLIndex, 1)
                   sa.setAttribute("src", newImgUrl);
                   sa.setAttribute("width", 200 );
                   sa.setAttribute("height", 200 );
                   document.getElementById("img"+i).style.margin='10px';
                   document.getElementById("img"+i).style.alignItems='center';
             }
              
              
              console.log(gets.results[0].urls.raw);
               
          });

         //  $.getJSON("https://newsapi.org/v2/top-headlines?sources=google-news&apiKey=cffe8e1deae442bfb30980bfa16cb59e",function(newsget)
         //  {              

         //       for(var i=0;i<newsget.articles.length;i++)
         //       { 
                   
         //            var newsUrl=JSON.stringify(newsget.articles[i].title);
                   
         //            var urlofnews=(newsget.articles[i].url);
                              
         //            var divnew=document.getElementById("news");
          
         //            divnew.innerHTML +="<h3  id='h" + i + "'><a id='abc" + i +"'></a></h3>"; //<h3 id="h1"></h1>
                   
          
         //            document.getElementById('h' + i).style.color = randomColors();
         //            document.getElementById("abc" + i).innerHTML +=newsUrl;
         //            document.getElementById("abc" + i).setAttribute("href",urlofnews);

         //            console.log("after abc id");
         //            console.log(urlofnews);
         //  }

         //  });      
      
         //     function randomColors() {
         //       return '#' + Math.floor(Math.random() * 16777215).toString(16);
         //     }

         //     $(document).ready(function() {
         //       $("#Locationtxt").keyup(function (event) {
         //         if (event.keyCode == 13) {
         //             $("#BtnSubmit").click();
         //         }
         //       });
        //     });
    

    });

  
}


      