$(document).ready(function () {
    let index = 0;
    let yes = 0;
    let no = 0;

    const words = {
        easy: [
            { word: "cat", translation: "кіт" },
            { word: "flower", translation: "квітка" },
            { word: "daughter", translation: "дочка" },
            { word: "country", translation: "країна" },
            { word: "fire", translation: "вогонь" },
            { word: "time", translation: "час" },
            { word: "sea", translation: "море" },
            { word: "night", translation: "ніч" },
        ],
        medium: [
            { word: "air", translation: "повітря" },
            { word: "theatre", translation: "театр" },
            { word: "road", translation: "дорога" },
            { word: "wallet", translation: "гаманець" },
            { word: "freedom", translation: "свобода" },
            { word: "childhood", translation: "дитинство" },
            { word: "flour", translation: "борошно" },
            { word: "gentleman", translation: "джентльмен" },
        ],
        hard: [
            { word: "achievement", translation: "досягнення" },
            { word: "complaint", translation: "скарга" },
            { word: "attitude", translation: "ставлення" },
            { word: "permission", translation: "дозвіл" },
            { word: "guard", translation: "охоронець" },
            { word: "influence", translation: "вплив" },
            { word: "impression", translation: "враження" },
            { word: "murder", translation: "вбивство" },
        ],
    };

    let selectedWords = [];

    function loadWords(level) {
        selectedWords = [...words[level]].sort(() => Math.random() - 0.5);
        index = 0;
        yes = 0;
        no = 0;
        updateBackground(level);
        next();
    }

    function updateBackground(level) {
        $(".zovni, .vseredyni").removeClass("easy-bg medium-bg hard-bg");
        $(".zovni, .vseredyni").addClass(`${level}-bg`);
    }

    $("input[name='levels']").change(function () {
        const level = $("input[name='levels']:checked").val();
        loadWords(level);
    });

    function next() {
        if (index < selectedWords.length) {
            $(".game").removeClass("flipped");
            $("#word").text(selectedWords[index].word);
            $("#translation").val("").focus();
            $(".vseredyni").removeClass("correct incorrect").text("");
        } else {
            end();
        }
    }

    function control() {
        const inputik = $("#translation").val();
        const beauty = inputik.trim().toLowerCase();
        const correct = selectedWords[index].translation.toLowerCase();

        if (inputik === "") {
            alert("Не бійся! Спроба не катування 🥸");
            return;
        }
        if (beauty === "") {
            alert("Пробіл — це не відповідь 😐");
            return;
        }
        if (beauty === correct) {
            yes++;
            $(".vseredyni").addClass("correct").removeClass("incorrect").text("Молодець");
        } else {
            no++;
            $(".vseredyni").addClass("incorrect").removeClass("correct").text(correct);
        }

        $(".bloc").html(`
            <p>Номер слова: ${index + 1} / ${selectedWords.length}</p>
            <p>Правильно: ${yes}</p>
            <p>Неправильно: ${no}</p>
        `);
        $(".game").addClass("flipped");
        index++;
        setTimeout(next, 1500);
    }

    function end() {
        alert(`Гра завершена! Правильно: ${yes}, неправильно: ${no}`);
        location.reload();
    }

    $("#win").click(function () {
        control();
    });

    $("#translation").keydown(function (e) {
        if (e.key === "Enter") {
            control();
        }
    });

    loadWords("easy");
});
