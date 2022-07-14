$(function() {
    var view = $('#game-view');
    view.attr("width", view.innerWidth());
    view.attr("height", view.innerHeight());

    var snake = new Snake(view[0].getContext('2d'), 20);
    snake.startHandler = () => {
        $(".game-ui").css("visibility", "hidden");
    }
    snake.stopHandler = () => {
        $(".game-menu > h1").text("GAMEOVER");
        $(".game-menu > span").text("Score: " + snake.score);
        $(".game-menu > button").text("Retry");
        $(".game-ui").css("background-color", "#050a12A0")
        $(".game-ui").css("visibility", "visible");
    }
    $(document).on("keydown", (e) => snake.keyInput(e));
    $(".game-menu > button").on("click", snake.start);
});