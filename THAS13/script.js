const inp = document.querySelector('input');
const btn = document.querySelector('button');
const art = document.querySelector('article');

btn.addEventListener('click', fetchInfo);

function fetchInfo() {
  let query = inp.value;
  art.innerHTML = '';
  fetch(`https://dog.ceo/api/breed/${query}/images/random/10`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data.message);
      getResponce(data);
    });
}

function getResponce(data){
    
    if(data.status == 'success'){
        data.message.forEach((dog) => {
            let dDiv=document.createElement('div');
            dDiv.className ='dogImg';
            dDiv.innerHTML = `<img src=${dog}>` ;
            art.append(dDiv);
        });
    }
    else{
        const notFound=document.createElement("div");
        notFound.className='notFound';
        notFound.innerText='no dog found';
        art.innerHTML='';
        art.append(notFound);
    }
}

fetchInfo();

try{

}
catch(error){
    console.log(error);
}