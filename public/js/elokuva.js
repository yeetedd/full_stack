haeArvosteludata();

async function haeArvosteludata(){
  const response = await fetch('/api/arvostelut')
  const data = await response.json();
  console.log(data);
  console.log(data[0]);
  taytaArvostelutaulukko(data);
}

function taytaArvostelutaulukko(data){
  var table = document.getElementById("arvostelutaulukko");
  for (var i = 0; i < data.length; i++) {
    var row = table.insertRow(i + 1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = data[i].leffa;
    cell2.innerHTML = data[i].arvostelu;
    cell3.innerHTML = data[i].arvostelija;
  }
}

function haeElokuva(){

  haeElokuvaData();
}

async function haeElokuvaData(){

  var leffan_nimi = document.getElementById("elokuva").value;
  var leffan_vuosi = document.getElementById("vuosi").value;

  const hakurimpsu = 'http://www.omdbapi.com/?t=' + leffan_nimi + '&y=' + leffan_vuosi + '&apikey=a95f3723';

  console.log(hakurimpsu);

  const vastaus = await fetch(hakurimpsu);
  const data = await vastaus.json();
  document.getElementById("elokuvan_nimi").innerHTML = data.Title;

  var poster = document.getElementById("elokuvan_juliste");
  poster.src = data.Poster;

}


function arvosteleElokuva(){
  var leffa = document.getElementById("elokuva").value;
  var arvostelut = document.getElementById("arvostelu").value;
  var arvostelija = document.getElementById("arvostelija").value;

  const data = {leffa, arvostelu, arvostelija};
  const options = {
    method: "POST",
    headers: {
      "Content-Type":"application/json"
    },
    body: JSON.stringify(data)
  };

  fetch('/api/arvostelut', options).then(function(response){
    console.log(response)
    if(response.status == 201){
      console.log("PUSH OK!")
    }
  }, function(error){
    console.log(error.message);
  });
}

//haeArvosteludata();
