


$(document).ready(function(){    
    
    // 設定一個全域變數接取正確答案
    var answer = randomNumber();
    var ga;
    var tip;
    var guessArray = [];
    
    // 將陣列轉成字串
    var showAnswer = answer.join("");
    
    
    // 按確定以後開始判斷
    $("body").on("click","#decide button",function(){
        
        // 將玩家輸入的四位數存成一個變數
        ga = $("#guessAnswer input").val();
        
        // 判斷玩家輸入的值是否為數字並且是否滿足四位
        if(isNaN(ga) == false && ga.length == 4){

            // 把玩家輸入的四位數存成陣列
            guessArray = [];
            var ga_string = ga.toString();
            for(var i = 0; i < 4; i++){
                guessArray[i] = parseInt(ga_string[i]);
            }
            
            if((guessArray[0] != guessArray[1]) && (guessArray[0] != guessArray[2]) && (guessArray[0] != guessArray[3]) && (guessArray[1] != guessArray[2]) && (guessArray[1] != guessArray[3]) && (guessArray[2] != guessArray[3])){
                var c_n = checkNumber();

                // 判斷是否答對
                if (!!c_n.match("4A0B")){
                    alert("恭喜你答對了");
                    $("#correctAnswer > input").val(showAnswer);
                    $("#show").addClass("disabled");
                    $("#decide button").addClass("disabled");
                }

                // 將玩家輸入的四位數和提示顯示在下方div裡
                else{
                    $("#guessAnswer input").val("");
                    $(".notUsed").eq(0).find("div").eq(0).text(ga);
                    $(".notUsed").eq(0).find("div").eq(1).text(c_n);
                    $(".notUsed").eq(0).removeClass("notUsed");
                    if($(".notUsed").length == 0){
                        alert("GameOver");
                        $("#decide button").addClass("disabled");
                        $("#correctAnswer > input").val(showAnswer);
                    }
                }
            }
            else{
                $("#guessAnswer input").val("");    
            }
        }
        else{
            $("#guessAnswer input").val("");
        }
    });
    
    // 按公布答案立即顯示正確答案
    $("body").on("click","#show",function(){
        $("#correctAnswer > input").val(showAnswer);
        $("#decide button").addClass("disabled");
        $("#show").addClass("disabled");
    });
    
    // 按新的一局立即刷新頁面
    $("body").on("click","#new",function(){
        alert("開始新的一局囉!! 加油~");
        location.reload();
    });
    
    
    // 隨機從0~9選4個不同的數
    function randomNumber(){
        var uniqueRandoms = [];
        var numRandoms = 10;
        var t_number = [];
        var makeUniqueRandom = function () {
            // refill the array if needed
            if (!uniqueRandoms.length) {
                for (var i = 0; i < numRandoms; i++) {
                    uniqueRandoms.push(i);
                }
            }
            var index = Math.floor(Math.random() * uniqueRandoms.length);
            var val = uniqueRandoms[index];

            // 刪除已選出的數字
            uniqueRandoms.splice(index, 1);

            return val;
        };

        for (var i = 0; i < 4; i++){
            var rand = makeUniqueRandom();
            t_number.push(rand);   
        };
        // 回傳隨機產生出的四個數
        return t_number;
    };
    
    // 檢查玩家輸入的四位數，並且給予提示
    function checkNumber(){
        var a_count = 0;
        var b_count = 0;
        
        // 比對玩家輸入的數字跟正確數字，先比值再比位置
        $.each(guessArray,function(g_i,g_e){
            $.each(answer,function(a_i,a_e){
                
                // 先判斷值是否相同
                if(g_e == a_e){
                    
                    //再判斷位置是否相同
                    if(g_i == a_i){
                        a_count = a_count + 1;
                        return false;
                    }
                    else{
                        b_count = b_count + 1;
                        return false;
                    }
                }   
            });
        });
        
        // 回傳比較過後的提示
        return a_count + "A" + b_count + "B";
    };
});

