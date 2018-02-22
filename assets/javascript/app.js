$(document).ready(function (){
    // GLOBAL VARIABLES
    // *********************************************************************
    // Arrays and Variables for holding data
    var startScreen;
    var gameHTML;
    var counter = 30;
    var d = new Date();
    var questionArray = ["Who are the Godfathers of Hip-Hop?",
                    "What group signed a deal with a record label that would still allow each member to record solo albums with other labels?", 
                    "Who won the first ever Grammy awarded for rap music in 1992?", 
                    "What Hip Hop artist won the first Academy Award for Best Original Song?", 
                    "Who was the first Hip Hop group to perform at the Oscars?", 
                    "Who entered the Guinness Book of World Records back in 1992 for being the fastest rapper in history?", 
                    "Who is the longest-running group in hip hop?", 
                    "Regarded as the first hip hop motion picture, this film included seminal figures from the four pillars of hip hop?"];

    var answerArray = [["Kool Herc, Afrika Bambaataa, and Grandmaster Flash", "Biggie, Jay-Z, Nas", "Run-DMC, Beastie Boys, UTFO", "Dr. Dre, Snoop Dogg, Too $hort"], 
                    ["The LOX", "Goodie Mob", "Wu-Tang Clan", "Digital Underground"], 
                    ["Public Enemy", "DJ Jazzy Jeff & The Fresh Prince", "Salt n Pepa", "MC Hammer"], 
                    ["Three 6 Mafia", "Nas", "2pac", "Eminem"], 
                    ["De La Soul", "Run-DMC", "Three 6 Mafia", "A Tribe Called Quest"], 
                    ["Bizzy Bone", "Twista", "Busta Rhymes", "Eminem"], 
                    ["Cypress Hill", "Wu-Tang Clan", "OutKast", "De La Soul"], 
                    ["Krush Groove", "Wild Style", "Breakin'", "Beat Street"]];

    var imageArray = ["<img class='center-block img-fluid' src='assets/images/hiphop-godfathers.jpg'>", 
                    "<img class='center-block img-fluid' src='assets/images/wu-tang-clan.jpg'>", 
                    "<img class='center-block img-fluid' src='assets/images/jazzy-jeff-fresh-prince.jpg'>", 
                    "<img class='center-block img-fluid' src='assets/images/eminem.jpg'>", 
                    "<img class='center-block img-fluid' src='assets/images/three6mafia.jpg'>", 
                    "<img class='center-block img-fluid' src='assets/images/twista.jpg'>", 
                    "<img class='center-block img-fluid' src='assets/images/de-la-soul.jpg'>", 
                    "<img class='center-block img-fluid' src='assets/images/wildstyle.jpg'>"];

    var captionArray = ["These three DJs invented the techniques used by many DJs that followed them.",
                        "Method Man, Ol' Dirty Bastard, GZA, RZA, Raekwon, U-God, and Ghostface Killah all negotiated solo contracts.",
                        "Will and Jeff won for thier song &quot;Parents Just Don't Understand&quot;, but didn't attend the Grammys due to the category not being aired on television. This picture is from their 1991 Grammy for &quot;Summertime&quot;.",
                        "&quot;Lose Yourself&quot;  is a song from the soundtrack to the 2002 motion picture 8 Mile.",
                        "The group won the Academy Award for Best Original Song in 2006 for &quot;It's Hard out Here for a Pimp&quot; from the movie Hustle & Flow.",
                        "Twista was clocked spitting bars at a rate of 11 . 2 syllables per second.",
                        "This trio formed in 1987 on Long Island, New York. They have been together for " + (d.getFullYear() - 1987) + " years!",
                        "The film included figures such as Fab Five Freddy (Graffiti), Lee Quiñones (Graffiti), The Rock Steady Crew (Breakdancers), The Cold Crush Brothers (MCs), and Grandmaster Flash (DJ)."];

    var correctAnswers = ["A. Kool Herc, Afrika Bambaataa, and Grandmaster Flash", 
                         "C. Wu-Tang Clan", 
                         "B. DJ Jazzy Jeff & The Fresh Prince", 
                         "D. Eminem", 
                         "C. Three 6 Mafia", 
                         "B. Twista", 
                         "D. De La Soul", 
                         "B. Wild Style"];

    var questionCounter = 0;
    var selecterAnswer;
    var theClock;
    var correctTally = 0;
    var incorrectTally = 0;
    var unansweredTally = 0;
    var clickSound = new Audio("assets/audio/scratch-04.wav");
    var correctSound = new Audio("assets/audio/flava-flav-yeah-boy.mp3")
    var wrongSound = new Audio("assets/audio/wrong_trump.mp3")
    var timeoutSound = new Audio("assets/audio/booing.mp3")

    // FUNCTIONS (Reusable blocks of code that I will call upon when needed)
    // *********************************************************************

    // Creates the start button and initial screen
    function initialScreen() {
        startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
        $(".mainArea").html(startScreen);
    }

    function generateLossDueToTimeOut() {
        unansweredTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/red-x.jpg'>";
        $(".mainArea").html(gameHTML);
        timeoutSound.play();
        setTimeout(wait, 10000);  //  change to 4000 or other amount
    }

    function generateWin() {
        correctTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter] + "<p class='text-center'>" + captionArray[questionCounter] + "</p>";
        $(".mainArea").html(gameHTML);
        correctSound.play();
        setTimeout(wait, 10000);  //  change to 4000 or other amount
        console.log(captionArray[questionCounter]);
    }

    function generateLoss() {
        incorrectTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/red-x.jpg'>";
        $(".mainArea").html(gameHTML);
        wrongSound.play();
        setTimeout(wait, 4000); //  change to 4000 or other amount
    }

    function generateHTML() {
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. " + answerArray[questionCounter][1] + "</p><p class='answer'>C. " + answerArray[questionCounter][2] + "</p><p class='answer'>D. " + answerArray[questionCounter][3] + "</p>";
        $(".mainArea").html(gameHTML);
    }

    function wait() {
        if (questionCounter < 7) {
            questionCounter++;
            generateHTML();
            counter = 30;
            timerWrapper();
        }
        else {
            finalScreen();
        }
    }

    function timerWrapper() {
        theClock = setInterval(thirtySeconds, 1000);
        function thirtySeconds() {
            if (counter === 0) {
                clearInterval(theClock);
                generateLossDueToTimeOut();
            }
            if (counter > 0) {
                counter--;
            }
            $(".timer").html(counter);
        }
    }

    function finalScreen() {
        // "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + 
        gameHTML = "<p class='final-title text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct text-center'>Correct Answers: " + correctTally + "</p>" + "<p class='text-center'>Wrong Answers: " + incorrectTally + "</p>" + "<p class='text-center'>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
        $(".mainArea").html(gameHTML);
    }

    function resetGame() {
        questionCounter = 0;
        correctTally = 0;
        incorrectTally = 0;
        unansweredTally = 0;
        counter = 30;
        generateHTML();
        timerWrapper();
    }

    // MAIN PROCESS
    // *********************************************************************
    initialScreen();

    //Create a function, generateHTML(), that is triggered by the start button, and generates the HTML seen on the project video...
    $("body").on("click", ".start-button", function (event) {
        event.preventDefault();
        clickSound.play();
        generateHTML();
        timerWrapper();
    });

    $("body").on("click", ".answer", function (event) {
        //answeredQuestion = true;
        clickSound.play();
        selectedAnswer = $(this).text();
        if (selectedAnswer === correctAnswers[questionCounter]) {
            clearInterval(theClock);
            generateWin();
        }
        else {
            clearInterval(theClock);
            generateLoss();
        }
    }); // Close .answer click

    $("body").on("click", ".reset-button", function (event) {
        clickSound.play();
        resetGame();
    }); // Closes reset-button click

});