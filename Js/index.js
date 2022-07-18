let getForm = document.forms[0];
let editPost = document.forms[1];


let getPostDiv = document.getElementById("post_div");
let getAppendDiv = document.getElementById("appenddiv");

let getImageFile = document.getElementById("input_file");


//POST Method Data from Frontend
getForm.addEventListener('submit',(event)=>{
  event.preventDefault();

  let convertFormData = new FormData(getForm);
  let jsonData = JSON.stringify(Object.fromEntries(convertFormData));

  fetch("http://localhost:3000/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: jsonData,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });  
}) 

// let getImageFile = document.getElementById("input_file");
// let uploadImage = "";
// getImageFile.addEventListener('change',()=>{
//   let reader = new FileReader();
//   reader.addEventListener('load',()=>{
//     uploadImage = reader.result;
//   })
//   reader.readAsDataURL(this.files[0]);
// })
// console.log(getImageFile);



  


let outputData = '';

//Get API Data and Show in Frontend (GET Method)
fetch("http://localhost:3000/post")
  .then((res) => res.json())
  .then((data) => {
    let getStoreData = data;
    for (const getArrayData of getStoreData) {
      outputData += ` <div class="col-lg-4">
    <div class="post_box mt-3" id="post_div">
        <div class="id">
            <span>${getArrayData.id}</span>
        </div>
        <div class="title">
            <h4>${getArrayData.title}</h4>
        </div>
        <div class="post_img mt-3">
            <img src="${getArrayData.image}" alt="">
        </div>
        <div class="post_desc mt-3">
            <p class="post_para">${getArrayData.desc}</p>
        </div>
        <div class="foot_sec d-flex align-items-center">
          <div>
              <div class="time"><i class="bi bi-clock me-1"></i>12:20PM</div>
          </div>
          <div class="d-flex ms-auto">
              <div class="edit me-3">
                  <a href="" data-bs-toggle="modal" data-bs-target="#editpost" id="edit_btn"><i class="bi bi-pencil-square edit_icon"></i></a>
              </div>
              <div class="delete">
                  <a href="" id="delete_btn" data-bs-toggle="modal" data-bs-target="#deletepost"><i class="bi bi-trash-fill"></i></a>
              </div>
          </div>
      </div>
    </div>
</div>`;
    }
    getAppendDiv.innerHTML = outputData;

  });

  //Track Data
  getAppendDiv.addEventListener('click',(e)=>{
    e.preventDefault();
    let getTargeted = e.target
    let getParentEl = getTargeted.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;

    let passTitle = getParentEl.querySelector("h4").innerText;
    let passImg = getParentEl.querySelector("img").getAttribute("src");
    let passPara = getParentEl.querySelector("p").innerText;
    let passId = getParentEl.querySelector("span").innerText;
    document.getElementById("edittitle").value = passTitle;
    document.getElementById("editimage").value = passImg;
    document.getElementById("editdesc").value = passPara;
    document.getElementById("editid").value = passId;


    //Edit Button Target
    editPost.addEventListener('submit',(event)=>{
      event.preventDefault();

      let editedData = new FormData(editPost);
      let editedJson = JSON.stringify(Object.fromEntries(editedData));
    
    //UPDATE Method
      fetch(`http://localhost:3000/post/${passId}`,{
        method:"PATCH",
        headers:{
          "Content-Type": "application/json",
        },
        body:editedJson
           
      })
      .then((res)=>res.json())
      .then((data)=>console.log(data))
      
    })

    //DELETE Method
    let getDelBtn = document.getElementById("del_post_btn");
    getDelBtn.addEventListener('click',()=>{
      fetch(`http://localhost:3000/post/${passId}`,{
        method:"DELETE",
      })
      .then((res)=>res.json())
      .then((data)=>console.log(data))
    })

    
    
  })


