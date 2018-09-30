$(document).ready(function() {

  const orgList = $('li');

  $('#btnCloseControl').on('click', function(){
    $('.control-inner').toggle();
    $('#toEleForm').toggle();
  });

  $('#btnDublicate').on("click", function() {
    var num = $('#dublicateSens').val() | 0;

    if (num <= 0) return;

    $.each($('.original'), function() {
      let i = num;
      let self = $(this);
      let newHTML = $('<p data-dublicate>' + self.html() + '</p>');
      while (i > 0) {
        newHTML.clone().insertAfter(self);
        i--;
      }
    });
  });

  $('#btnReset').on('click', function() {
    $('[data-dublicate]').remove();
  });

  $('#toEleForm').on('submit', function(e) {
    e.preventDefault();
    let num = $('#goToEl').val();
    let el = $('ul')[num - 1];
    if (el) {
      $('html,body').animate({
        scrollTop: $(el).offset().top - 30
      }, 5);
    } else {
      $('html,body').animate({
        scrollTop: $('.controls').offset().top - 30
      }, 5);
    }
  });

  $('#hideDef').on("change", function() {
    if ($(this).is(':checked')) {
      $.each($('li'), function() {
        let defEl = $(this).find('[data-def]');

        defEl.data('def', defEl.text());
        defEl.text('');
      });
    } else {
      $.each($('li'), function() {
        let defEl = $(this).find('[data-def]');

        if (defEl.data('def')) {
          defEl.text(defEl.data('def'));
        }
      });
    }
  });


});