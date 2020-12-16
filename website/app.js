/* Global Variables */
const API_Key = 'f8aa896f7b7406e15c417a450901a810';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather';
const myURL = 'http://localhost:8000';

// Create a new date instance dynamically with JS
const d = new Date(); 
const fullDate =  `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`;

document.getElementById('generate').addEventListener('click',performAction);

function performAction(){
  const zip = document.getElementById('zip').value;
  let feelings = document.getElementById('feelings').value;
  getTemp(baseURL,zip,API_Key)
  .then(data=>{ 
    postData(`${myURL}/add`,{temp:data.main.temp, date:fullDate, feel: feelings })
  }).then(()=>{
    updateUI()
  })
}
function postData(url = '', data = {}) {
  return  fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}

  
const getTemp = async (baseURL, zip ,API_Key)=>{
  const request = await fetch(`${baseURL}?zip=${zip}&appid=${API_Key}`)
  try{
  const retrieved = await request.json();
  //console.log(retrieved); 
  return retrieved }
  catch(error){
    console.log('incorect zip code',error)
  }
}

const updateUI = async()=>{
  const request = await fetch (`${myURL}/all`)
  const data = await request.json();
  console.log(data);
  document.getElementById('date').innerHTML ='Date: '+ data.date;
  document.getElementById('temp').innerHTML = 'Temperature '+data.temp;
  document.getElementById('content').innerHTML ='You are feeling '+ data.feeling;

}

