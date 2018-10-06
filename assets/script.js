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

  $('#btnToggleAllUnit').on('click', function(){
    let val = $(this).data('val');

    if (val == 'hide') {
      $('.unit-inner').show();
      $(this).data('val', '');
    } else {
      $('.unit-inner').hide();
      $(this).data('val', 'hide');
    }
  });

  $('#btnToggleAllExplain').on('click', function(){
    let val = $(this).data('val');

    if (val == 'hide') {
      $('.explaination').show();
      $(this).data('val', '');
    } else {
      $('.explaination').hide();
      $(this).data('val', 'hide');
    }
  });

  $('.toggle-explain').on('click', function(e) {
    $(this).next().toggle();
  });

  $('h6').on('click', function(e) {
    $(this).next().toggle();
  });

  $('#btnReset').on('click', function() {
    $('[data-dublicate]').remove();
  });

  $('#toEleForm').on('submit', function(e) {
    e.preventDefault();
    let num = $('#goToEl').val();
    let el = $('li')[num - 1];
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

  let curPlaying = -1;
  let audioState = 0;
  let audioArr = $('audio');

  $.each(audioArr, function(index) {
    $(this).on('play', function() {
      if (curPlaying != -1 && curPlaying != index) {
        audioArr[curPlaying].pause();
      }
      setTimeout(function() {
        $('#playPauseAudio').addClass('playing');
        curPlaying = index;
        audioState = 1;
      }, 10);
    });
    $(this).on('pause', function() {
      $('#playPauseAudio').removeClass('playing');
      audioState = 0;
    });
  });

  $('#playPauseAudio').on('click', function() {
    if (audioState == 0) {
      if (curPlaying == -1) {
        curPlaying = 0;
      }
      audioArr[curPlaying].play();
    } else {
      $.each(audioArr, function() {
        if (!this.paused) {
          this.pause();
        }
      });
    }
  });


});