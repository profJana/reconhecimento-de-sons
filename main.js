// https://amadolucas.github.io/Atividade_Sons/

//https://teachablemachine.withgoogle.com/models/2q9qsXsGI/model.json


function start() {
  navigator.mediaDevices.getUserMedia({ audio: true }); //permissão para acessar ao microfone
  classifier = ml5.soundClassifier('https://teachablemachine.withgoogle.com/models/2q9qsXsGI/model.json', modelReady);
}

function modelReady() {
  classifier.classify(gotResults); //irá comparar a classificação de sons com o som do seu microfone
}

function gotResults(error, results) { //gotResults contém o resultado da comparação
  if (error) {
    console.log(error);
  } else {
    console.log(results);

    document.getElementById("resultadoNome").innerHTML = 'Posso ouvir - ' + results[0].label;
    document.getElementById("resultadoPrecisao").innerHTML = 'Precisão - ' + (results[0].confidence * 100).toFixed(2);

    palmasImg = document.getElementById('palmas')
    plasticoImg = document.getElementById('plastico')
    teclado = document.getElementById('teclado')

    if (results[0].label == "Palma") {
      palmasImg.style.filter = "grayscale(0)";
      plasticoImg.style.filter = "grayscale(1)";
      teclado.style.filter = "grayscale(1)";
    } else if (results[0].label == "Plastico") {
      palmasImg.style.filter = "grayscale(1)";
      plasticoImg.style.filter = "grayscale(0)";
      teclado.style.filter = "grayscale(1)";
    } else if (results[0].label == "Teclado") {
      palmasImg.style.filter = "grayscale(1)";
      plasticoImg.style.filter = "grayscale(1)";
      teclado.style.filter = "grayscale(0)";
    } else{
      palmasImg.style.filter = "grayscale(1)";
      plasticoImg.style.filter = "grayscale(1)";
      teclado.style.filter = "grayscale(1)";
    }
  }
}
