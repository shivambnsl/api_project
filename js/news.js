function searchURL1() {
         $.getJSON("https://newsapi.org/v2/top-headlines?sources=google-news&apiKey=cffe8e1deae442bfb30980bfa16cb59e",function(newsget)
         {              

              for(var i=0;i<newsget.articles.length;i++)
              { 
                   
                   var newsUrl=JSON.stringify(newsget.articles[i].title);
                   
                   var urlofnews=(newsget.articles[i].url);
                              
                   var divnew=document.getElementById("new1");
          
                   divnew.innerHTML +="<h3  id='h" + i + "'><a id='abc" + i +"'></a></h3>"; //<h3 id="h1"></h1>
                   
          
                   document.getElementById('h' + i).style.color = randomColors();
                   document.getElementById("abc" + i).innerHTML +=newsUrl;
                   document.getElementById("abc" + i).setAttribute("href",urlofnews);

                   console.log("after abc id");
                   console.log(urlofnews);
         }

         });      
      
            function randomColors() {
              return '#' + Math.floor(Math.random() * 16777215).toString(16);
            }

          
  
}
