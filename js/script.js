// Creiamo un calendario dinamico con le festività.
// Il calendario partirà da gennaio 2018 e si concluderà a dicembre 2018 (unici dati disponibili sull’API).
// Milestone 1
// Creiamo il mese di Gennaio, e con la chiamata all'API inseriamo le festività.
// Milestone 2
// Diamo la possibilità di cambiare mese, gestendo il caso in cui l’API non possa ritornare festività.
// Ogni volta che cambio mese dovrò:
// Controllare se il mese è valido (per ovviare al problema che l’API non carichi holiday non del 2018)
// Controllare quanti giorni ha il mese scelto formando così una lista
// Chiedere all’API quali sono le festività per il mese scelto
// Evidenziare le festività nella lista

$(document).ready(function(){

  var attributo = $('h1').data('this_date');
  console.log(attributo);

  var currentDate = moment('2018-01-01')
  insertDays(currentDate);
  insertHolidays(currentDate);
});

function insertHolidays(data){
  $.ajax(
    {
      url: 'https://flynn.boolean.careers/exercises/api/holidays',
      method: 'GET',
      data: {
        year: data.year(),
        month: data.month()
      },
      success: function(risposta){
        for (var i = 0; i < risposta.response.length; i++){
          var listItem = $('li[data-complete_date="'+ risposta.response[i].date + '"]');
          listItem.append(' - ' + risposta.response[i].name);
          listItem.addClass('holiday');
        }
      },
      error: function (){
        alert('errore')
      }
    }
  )
}

function insertDays(data){
  var month = data.format('MMMM');
  var year = data.format('YYYY');
  $('h1.month').html(month + ' ' + year);

  var daysMonth = data.daysInMonth();
  for (var i = 1; i <= daysMonth; i++){
    var source = $('#day-template').html();
    var template = Handlebars.compile(source);
    var context = {
      day: addZero(i),
      month: month,
      completeDate: year + '-' + data.format('MM') + '-' + addZero(i)
    };
    var html = template(context);
    $('.month-list').append(html);
  }
}

function addZero(n){
  if (n < 10){
    return '0' + n;
  }
  return n;
}
