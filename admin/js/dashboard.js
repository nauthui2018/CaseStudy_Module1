var dashboard = dashboard || { }

dashboard.drawTable = function(){
    $.ajax({
        url: "http://localhost:3000/products",
        method: "GET",
        dataType : "json",
        success : function(data){
            $('#tbProducts tbody').empty();
            let id = 1;
            $.each(data, function(i, v){
                $('#tbProducts tbody').append(
                    "<tr>"+
                        "<td>" + (id++) +"</td>" +
                        "<td>"+ v.name +"</td>" +
                        "<td>"+ v.description +"</td>" +
                        "<td><img src='../"+ v.image +"' width='150px' height='80px'></td>" +
                        "<td>" + v.price +"</td>" +
                        "<td>" + v.inventory + "</td>"+
                        "<td>"+
                            "<a href='javascript:;' onclick='dashboard.productDetail(" + v.id + ");'><i class='fa fa-edit'></i></a> "+
                            "<a href='javascript:;' onclick='dashboard.remove("+ v.id +");'><i class='fa fa-trash'></i></a>"+
                        "</td>"+
                    "</tr>"
                );
            })
        }
    });
}

dashboard.openModal = function(){
    dashboard.resetForm();
    $('#addEditModal').modal('show');
}

dashboard.remove = function(id){
    bootbox.confirm({
        title: "Remove Product?",
        message: "Do you want to remove this product?",
        buttons: {
            cancel: {
                label: '<i class="fa fa-times"></i> No'
            },
            confirm: {
                label: '<i class="fa fa-check"></i> Yes'
            }
        },
        callback: function (result) {
            if(result){
                $.ajax({
                    url : "http://localhost:3000/products/" + id,
                    method : "DELETE", //"POST"
                    dataType:'json',
                    success : function(data){
                        dashboard.drawTable();
                        bootbox.alert("Product has been deleted successfully");
                    }
                });
            }
        }
    });
}

dashboard.save = function(){
    if($('#formAddEditProduct').valid()){
        if($('#productId').val() == 0){ //Add new product
            var addObj = {};
            
            addObj.name = $('#name').val();
            addObj.description = $('#description').val();
            addObj.image = $('#image').val();
            addObj.price = $('#price').val();
            addObj.inventory = $('#inventory').val(),
            
            $.ajax({
                url : "http://localhost:3000/products",
                method : "POST",
                dataType: "json",
                contentType: "application/json",
                data : JSON.stringify(addObj),
                success : function(data){
                    $('#addEditModal').modal('hide');
                    dashboard.drawTable();
                    bootbox.alert("Product has been added successfully");
    
                }
            })
        }
        else{ //update product  
            var updateObj = {};
            
            updateObj.name = $('#name').val();
            updateObj.description = $('#description').val();
            updateObj.image = $('#image').val();
            updateObj.price = $('#price').val();
            updateObj.inventory = $('#inventory').val(),
            updateObj.id = $('#productId').val();
            
            $.ajax({
                url : "http://localhost:3000/products/" + updateObj.id,
                method : "PUT",
                dataType: "json",
                contentType: "application/json",
                data : JSON.stringify(updateObj),
                success : function(data){
                    $('#addEditModal').modal('hide');
                    dashboard.drawTable();
                    bootbox.alert("Product has been updated successfully");
    
                }
            })
        }
    };
}


dashboard.productDetail = function(id){
    $.ajax({
        url : "http://localhost:3000/products/" + id,
        method: "GET",
        dataType: 'json',
        success : function(data){
            
            $('#name').val(data.name);
            $('#description').val(data.description);
            $('#image').val(data.image);
            $('#price').val(data.price);
            $('#inventory').val(data.inventory);
            $('#productId').val(data.id);

            $('#addEditModal').find('.modal-title').text('Update Product');
            $('#btnProduct').text("Update");
            $('#addEditModal').modal('show');
        }
    });

}

dashboard.resetForm = function(){
    var validator = $( "#formAddEditProduct" ).validate();
    validator.resetForm();
    $('#name').val('');
    $('#description').val('');
    $('#image').val('');
    $('#price').val('');
    $('#inventory').val('');
    $('#addEditModal').find('.modal-title').text('Create New Product');
    $('#btnProduct').text("Create");
    $('#productId').val('0');
}

dashboard.init = function(){
    dashboard.drawTable();
}

$(document).ready(function(){
    dashboard.init();
});

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