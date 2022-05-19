let content= document.querySelector('.content');
let inputFile= document.querySelector('.inputFile');
let wrapper= document.querySelector('.wrapper');
let form= document.querySelector('.form');
let detail= document.querySelector('.detail');
let infoText=document.getElementsByTagName('p');
let textArea= document.getElementsByTagName('textarea');
let copy = document.querySelector('.copy');
let close= document.querySelector('.close');

function fetchRequest(formData,file){
    infoText[0].innerText='Scanning QR code...'
    fetch('http://api.qrserver.com/v1/read-qr-code/',{
        method: "POST", body: formData
    }).then(res=>res.json()).then(result=>{
        result= result[0].symbol[0].data;
        textArea[0].innerText=result;
        infoText[0].innerText=result ? "Upload QR code to scan " : "Couldn't read image";

        if (!result) return;


        form.querySelector('img').src=URL.createObjectURL(file);
        console.log(result);
        wrapper.classList.add('wrapper-active');
        form.classList.remove('d-none');


    })

}

copy.addEventListener('click',()=>{
    let text=textArea[0].textContent;
    navigator.clipboard.writeText(text);
})

close.addEventListener('click',()=>{
    form.classList.add('d-none');
    wrapper.classList.remove('wrapper-active');


})

inputFile.addEventListener('change',function (e){
    let file= e.target.files[0];
    let formData= new FormData();
    formData.append("file",file);
    fetchRequest(formData,file);
})

content.addEventListener('click',()=>{
   inputFile.click();
})