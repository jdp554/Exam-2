function MenuChoice()
{
    if (document.getElementById("menu").value=="Display category list table")
    {
        document.getElementById("categorytable").style.visibility="visible";
        document.getElementById("add").style.visibility="hidden";
        document.getElementById("change").style.visibility="hidden";
        document.getElementById("delete").style.visibility="hidden";
        document.getElementById("me").style.visibility="hidden";
    }
    else if (document.getElementById("menu").value=="Add a product category to the category table")
    {
        document.getElementById("categorytable").style.visibility="hidden";
        document.getElementById("add").style.visibility="visible";
        document.getElementById("change").style.visibility="hidden";
        document.getElementById("delete").style.visibility="hidden";
        document.getElementById("me").style.visibility="hidden";
    }
    else if (document.getElementById("menu").value=="Change the description for a category")
    {
        document.getElementById("categorytable").style.visibility="hidden";
        document.getElementById("add").style.visibility="hidden";
        document.getElementById("change").style.visibility="visible";
        document.getElementById("delete").style.visibility="hidden";
        document.getElementById("me").style.visibility="hidden";

    }
    else if (document.getElementById("menu").value=="Delete a category from the database")
    {
        document.getElementById("categorytable").style.visibility="hidden";
        document.getElementById("add").style.visibility="hidden";
        document.getElementById("change").style.visibility="hidden";
        document.getElementById("delete").style.visibility="visible";
        document.getElementById("me").style.visibility="hidden";
    }
    else if (document.getElementById("menu").value=="About Me")
    {
        document.getElementById("categorytable").style.visibility="hidden";
        document.getElementById("add").style.visibility="hidden";
        document.getElementById("change").style.visibility="hidden";
        document.getElementById("delete").style.visibility="hidden";
        document.getElementById("me").style.visibility="visible";
    }
    else
    {
        document.getElementById("categorytable").style.visibility="hidden";
        document.getElementById("add").style.visibility="hidden";
        document.getElementById("change").style.visibility="hidden";
        document.getElementById("delete").style.visibility="hidden";
        document.getElementById("me").style.visibility="hidden";
    }
}

function CategoryTable()
{
   var count = 0;
   var displaytext = "";
   
   //Loop to extract data from the response object
   for (count = 0; count < result.GetOrdersForCustomerResult.length; count++)
   {
     displaytext += result.GetOrdersForCustomerResult[count].OrderDate + ", " + result.GetOrdersForCustomerResult[count].OrderID + "<br>";
   }
    
    document.getElementById("orderdisplay").innerHTML = displaytext;

}



function AddCategory()
{
    var objRequest = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/CreateCategory";
    
    //Collect data from web page
    var catname = document.getElementById("category_name").value;
    var catdescription = document.getElementById("category_description").value;
    
    //Create the parameter string
    var newcategory = '{"CategoryName":"'+catname+'","CategoryDescription":"'+catdescription+'"}';
    
    //Checking for AJAX operation return
    objRequest.onreadystatechange = function ()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var addresult = JSON.parse(objRequest.responseText);
            OperationResult(addresult);
        }
    }
    
    //Start AJAX request
    objRequest.open("POST", url, true);
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest.send(newcategory);
}

function OperationResult(output)
{
    if (output.WasSuccessful == 1)
    {
        document.getElementById("addresult").innerHTML = "The operation was successful!"
    }
    else
    {
        document.getElementById("addresult").innerHTML = "The operation was not successful!" + "<br>" + output.Exception;
    }
}

function ChangeDescription()
{
    var objRequest = new XMLHttpRequest ();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/updateCatDescription";
    
    //Collect data from web page
    var currentdescription = document.getElementById("description_to_change").value;
    var newdescription = document.getElementById("change_description").value;
    
    //Create the new parameter string
    var changecat = '{"CategoryDescription": "'+currentdescription+'", "NewDescription": "'+newdescription+'"}';
    
    //Checking AJAX operation return
    objRequest.onreadystatechange = function ()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var changeresult = JSON.parse(objRequest.responseText);
            OperationResult(changeresult);
        }
    }
    
    //Start AJAX request
    objRequest.open("POST",url,true);
    objRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    objRequest.send(changecat);
}

function OperationResult2(output2)
{
    if (output.WasSuccessful == 1)
    {
        document.getElementById("changeresult").innerHTML = "The operation was successful!"
    }
    else
    {
        document.getElementById("changeresult").innerHTML = "The operation result was not successful!" + "<br>" + output2.Exception;
    }
}

function DeleteCategory()
{
    var objRequest = new XMLHttpRequest();   //Create AJAX request object
    
    //Create URL and Query String
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/deleteCategory";
    url += document.getElementById("delete_category").value;
    
    //Checks that the object has returned data
    objRequest.onreadystatechange = function ()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var deleteresult = JSON.parse(objRequest.responseText);
            OperationResult3 (deleteresult);
        }
    }
    
    //Initiate the server request
    objRequest.open("GET", url, true);
    objRequest.send();
}

function OperationResult3(output3)
{
    if (output3.WasSuccessful == 1)
    {
        document.getElementById("deleteresult").innerHTML = "The operation was successful!"
    }
    else
    {
        document.getElementById("deleteresult").innerHTML = "The operation was not successful!" + "<br>" + output3.Exception;
    }
}

