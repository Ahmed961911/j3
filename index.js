var bookmarkName = document.getElementById("bookmarkName")
var bookmarkUrl = document.getElementById("bookmarkURL")

var bookmarkList = [];
if(localStorage.getItem("bookmarkContainer") !== null)
{
    bookmarkList = JSON.parse( localStorage.getItem("bookmarkContainer"));

    displayData();
}




function addBookmark(){
if (validationName() && validationUrl() && checkName() )
{
    var bookmark = {
        name:bookmarkName.value,
        url:bookmarkUrl.value,
    };
    
    bookmarkList.push(bookmark);
    
    localStorage.setItem("bookmarkContainer" , JSON.stringify(bookmarkList))
    
    displayData();
    clearForm();
    bookmarkName.classList.remove("is-valid")
    bookmarkUrl.classList.remove("is-valid")


}
else if (checkName()==false){           window.alert("bookmark name already taken");
}
else
{
    document.getElementById("r-info").classList.remove("d-none")
}
}

function clearForm(){
    bookmarkName.value="";
    bookmarkUrl.value="";

}

function displayData(){
    var cartona = "";
    for (var i=0 ; i<bookmarkList.length ; i++)
    {
        cartona+=`
        <div class="row  py-2 border-bottom" >
         <div class="col-2 text-center">
                    <span class="fw-bold">
                        ${i+1}
                    </span>
                </div>
                <div class="col-4 text-center">
                    <span class="fw-bold">
                        ${bookmarkList[i].name}
                    </span >
                </div>
                <div class="col-3 text-center">
                     <button class=" px-4 py-2 text-white rounded-2 mb-1 border-0 vst" onclick=" window.open('${bookmarkList[i].url}','_blank')" >       
                        <i class="fa-regular fa-eye mt-1"></i>
                        <span>Visit</span>
                    </button>
                </div>
                <div class="col-3 text-center">
                    <button onclick='deleteItem(${i})' class="dlt border-0 text-white px-3 py-2 rounded d-flex m-auto gap-2">
                        <i class="fa-solid fa-trash-can mt-1"></i>
                        <span>Delete</span>
                    </button>
                    </div>
                    </div>`
                    

    }

    document.getElementById("rowData").innerHTML=cartona;
}

function deleteItem(index){
    bookmarkList.splice(index,1);
    localStorage.setItem("bookmarkContainer" , JSON.stringify(bookmarkList))
    displayData();

}

function validationName(){
    var text = bookmarkName.value;
    var regex = /^([A-Za-z0-9_]+)$/

if(regex.test(text)){
    bookmarkName.classList.remove("is-invalid")
    bookmarkName.classList.add("is-valid")
    return true;}

else{
    bookmarkName.classList.add("is-invalid")
    bookmarkName.classList.remove("is-valid")
    return false;}
}

function validationUrl(){
    var text = bookmarkUrl.value;
    var regex = /(?:https?|ftp?)?(:\/\/)?(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,6}(?:\/[^\s]*)?/



if(regex.test(text)){
    bookmarkUrl.classList.remove("is-invalid")
    bookmarkUrl.classList.add("is-valid")
    return true;}

else{
    bookmarkUrl.classList.add("is-invalid")
    bookmarkUrl.classList.remove("is-valid")

    return false;}
}

function closeMsg()
{
    document.getElementById("r-info").classList.add("d-none")
}

function checkName()
{
    for (var i=0;i<bookmarkList.length;i++){
        if (bookmarkName.value === bookmarkList[i].name)
         {   return false;
    }
    else{
        return true;
    }
}
}