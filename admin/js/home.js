var product = product || {};

product.showProduct = function(){
    $.ajax({
        url: "http://localhost:3000/products",
        method: "GET",
        dataType : "json",
        success : function(data){
            $.each(data, function(i, v){
                $('#showProducts').append(
                  "<div class='w3-col l3 s3'>" +
                    "<div class='w3-container'>" +
                      "<div class='w3-display-container'>" +
                        "<div class='w3-image'>" +
                          "<img src='../" + v.image +"' style='width:100%; height: 150px;'>" +
                        "</div>" +
                        "<div class='w3-display-middle w3-display-hover'>" +
                          "<button class='w3-button w3-blue-grey'>Buy now <i class='fa fa-shopping-cart'></i></button>" +
                        "</div>" +
                      "<div>" +
                      "<p>" + v.name + "<br><b>Price: " + v.price + " VNĐ</b></p>" +
                    "</div>" +
                  "</div>"
                );
            })
        }
    });
}

product.init = function(){
    product.showProduct();
}

$(document).ready(function(){
    product.init();
});

// Accordion 
function myAccFunc() {
    var x = document.getElementById("demoAcc");
    if (x.className.indexOf("w3-hide") == -1) {
      x.className += " w3-hide";
    } else {
      x.className = x.className.replace(" w3-hide", "");
    }
  }
  
  // Click on the "Jeans" link on page load to open the accordion for demo purposes
  document.getElementById("myBtn").click();
  
  
  // Open and close sidebar
  function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("myOverlay").style.display = "block";
  }
   
  function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("myOverlay").style.display = "none";
  }

// scroll button

  var mybutton = document.getElementById("scrollBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

//read more or less function
function readMoreReadLess() {
  var dots = document.getElementById("dots");
  var moreText = document.getElementById("more");
  var btnText = document.getElementById("readMoreReadLessBtn");

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