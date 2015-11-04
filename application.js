$(function() {
  
  function callScore(score)
  {
    if ($("input:radio[name='sounds']:checked").val() == 'on')
    {
      var srcWav;
    
      if (score == -1)
        srcWav = "sounds/1st.wav"
      else
        srcWav = "sounds/" + score + ".wav"
  
      var sound = document.getElementById("gameon"); 
      sound.src = srcWav;
      sound.play();
    }
  }

  function isValidScore(score)
  {
    var validBigScores = [180, 177, 174, 171, 170, 168, 167, 165, 164];
    if ((validBigScores.indexOf(score) > -1) || (score < 163))
      return true;
    else
      return false;
  }

  function onAFinish(score)
  {
    var highFinishes  = [170, 167, 164, 161, 160];
    if ((highFinishes.indexOf(score) > -1) || (score < 159))
      return true;
    else
      return false;
  }

  $('.playerInfo').show();
  $('.scoreInput').hide();
  $('.scores').hide();
  $('.newGame').hide();

  $('.listItemInput').focus();
  var $listItems;

  $('.btnPlayer2').hide();
  $('#listItemInput2').hide();

  function isBust(score, player_score)
  {
    if ((parseInt(score) > parseInt(player_score)) || ((parseInt(player_score) - parseInt(score)) == 1))
    {
      callScore(0);
      alert("BUST!");
      return true;
    }
    else
    {
      return false;
    }
  }

  function weHaveAWinner(score, playerId)
  {
    if (score == 0)
    {
      callScore(-1);
      var player = '#lblPlayer' + playerId + 'Name';
      var playerName = $(player).text();
      alert(playerName + " wins the leg!");
      return true;
    }
    return false;
  }

  function newGame()
  {
    $('.newGame').show();
  }

  function addDefaultItemToEmptyList() {
    if ($listItems.children().length == 0) {
      $listItems.append('<li class="defaultItem">Game Shot!</li>');
    }
  }

  function startNewGame()
  {
    var startScore = $("input:radio[name='startScore']:checked").val();
    
    $('.btnPlayer2').hide();
    $('.btnPlayer1').show();
    $('#listItemInput2').hide();
    $('#listItemInput2').val('');
    $('#listItemInput1').show();
    $('#listItemInput1').val('').focus();
    $('#lblStartScore').text(startScore);
    $('#player1Score').val(startScore);
    $('#player2Score').val(startScore);
    $('.listItemInput1').val('')
    $('.listItemInput1').attr('placeholder','Enter Score');
    $('.listItemInput2').val('')
    $('.listItemInput2').attr('placeholder','Enter Score');

    var player1Name = $('#player1Name').val() != 0 ? $('#player1Name').val() : "Player 1";
    var player2Name = $('#player2Name').val() != 0 ? $('#player2Name').val() : "Player 2";
    $('#lblPlayer1Name').text(player1Name);
    $('#lblPlayer2Name').text(player2Name);

    $('.playerInfo').hide();
    $('.scoreInput').show();
    $('.scores').show();
    alert("GAME ON!");
    var sound = document.getElementById("gameon"); 
    sound.play();
  }

  $('.btnStartGame').click(function(e) {
    /*var startScore = $("input:radio[name='startScore']:checked").val();
    
    $('#lblStartScore').text(startScore);
    $('#player1Score').val(startScore);
    $('#player2Score').val(startScore);

    var player1Name = $('#player1Name').val() != 0 ? $('#player1Name').val() : "Player 1";
    var player2Name = $('#player2Name').val() != 0 ? $('#player2Name').val() : "Player 2";
    $('#lblPlayer1Name').text(player1Name);
    $('#lblPlayer2Name').text(player2Name);

    $('.playerInfo').hide();
    $('.scoreInput').show();
    $('.scores').show();
    alert("GAME ON!");
    var sound = document.getElementById("gameon"); 
    sound.play();*/
    $('.playerInfo').hide();
    $('.scoreInput').show();
    $('.scores').show();
    startNewGame();
  })

  $('.btnNewGame').click(function(e) {
    $('.newGame').hide();
    if ($("input:radio[name='newGamePlayers']:checked").val() == 'same') {
      $('ul').empty();
      startNewGame();
    }
    else {
      location.reload();
    }
  })

  // Add to list
  $('.addToList').click(function(e) { 
    var playerId = ($(this).data('player-id'));
    var playerScore = "#player" + playerId + "Score";
    var input = "#listItemInput" + playerId;
    console.log($(this));

    if ($(input).val() == '')
    {
      alert ("Please enter a valid score");
      return; 
    }

    var score = parseInt($(input).val().trim());
    if (!isValidScore(score))
    {
      alert ("Please enter a valid score");
      $(input).val('');
      return; 
    }
    
    $listItems = $('#pl'+ playerId + 'scores');
    var currentScore = parseInt($(playerScore).val());
    e.preventDefault();
    var score = parseInt($(input).val().trim());
    var newScore = parseInt(currentScore) - parseInt(score);
    if (!isBust(score,currentScore))
    {
      var newScore = currentScore - score;
      $(playerScore).val(newScore);
      var itemToAdd = newScore;
      if (weHaveAWinner(newScore,playerId))
      {
        itemToAdd = "Game Shot!";
        newGame();
      }
      if (itemToAdd) {
        $listItems.children('li:last-child').addClass("strikeThrough");
        $('.defaultItem').remove();
        var id = Math.random();
        $listItems.append('<li><input id="' + id + '"  class="scoreboardItem doneItem"   value="' + itemToAdd + '" /> ' + itemToAdd + '</li>');
      }
      if (newScore != 0) {
        callScore(score);
      }
    }
  
    if (newScore != 0)
    {
      if (parseInt(playerId) == 1)
      {
        $('.btnPlayer1').hide();
        $('.btnPlayer2').show();
        $('#listItemInput1').hide();
        $('#listItemInput1').val('');
        $('#listItemInput2').show();
        $('#listItemInput2').val('').focus();
        var currentScore = parseInt($('#player2Score').val());
        if (onAFinish(currentScore))
          alert($('#lblPlayer2Name').text() + ', you require ' + currentScore );
      }
      else
      {
        $('.btnPlayer2').hide();
        $('.btnPlayer1').show();
        $('#listItemInput2').hide();
        $('#listItemInput2').val('');
        $('#listItemInput1').show();
        $('#listItemInput1').val('').focus();
        var currentScore = parseInt($('#player1Score').val());
        if (onAFinish(currentScore))
          alert($('#lblPlayer1Name').text() + ', you require ' + currentScore );
      }
    }
  })
});