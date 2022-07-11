$(function() {
    var snake = new Snake($('#gameview')[0].getContext('2d'), 20);
    snake.startHandler = () => {
        $(".gamecover").css("visibility", "hidden");
    }
    snake.stopHandler = () => {
        $(".gamemenu > h1").text("GAMEOVER");
        $(".gamemenu > span").text("Score: " + snake.score);
        $(".gamemenu > button").text("Retry");
        $(".gamecover").css("background-color", "#050a12A0")
        $(".gamecover").css("visibility", "visible");
    }
    $(document).on("keydown", (e) => snake.keyInput(e));
    $(".gamemenu > button").on("click", snake.start);
});