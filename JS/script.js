 
let file = document.getElementById('file'); 

file.addEventListener('change', ()=> {
    let fr = new FileReader();
    let content;
    fr.readAsText(file.files[0]);
    fr.onload = function() {
        content = fr.result
        getWinner(content);
    };

});

function getWinner(content) {
    
    var splitContent = content.split("|");
    var usersRoundWon = {'user1':[], 'user2':[]};
    var subs = 0;

    splitContent.splice(0, 1);
    

    for(i=0; i<splitContent.length; i+=2) {
        subs = splitContent[i] - splitContent[i+1];
        if(subs > 0) {
            usersRoundWon['user1'].push(subs);
        }else{
            subs = subs * -1;
            usersRoundWon['user2'].push(subs);
        }
    }

    
    var maxUser1 = Math.max(...usersRoundWon['user1']);
    var maxUser2 = Math.max(...usersRoundWon['user2']);

    if(maxUser1 > maxUser2) {

        document.getElementById("user").innerHTML = "User 1";
        document.getElementById("max").innerHTML = maxUser1;
        createFile("1 "+maxUser1);
    }else {

        document.getElementById("user").innerHTML = "User 2";
        document.getElementById("max").innerHTML = maxUser2;
        createFile("2 "+maxUser2);
    }

}

function createFile (content) {
    var textFile = null,
    makeTextFile = function (text) {
        var data = new Blob([text], {type: 'text/plain'});

        if (textFile !== null) {
            window.URL.revokeObjectURL(textFile);
        }

        textFile = window.URL.createObjectURL(data);

        return textFile;
    };

    document.getElementById('title').style.display = 'block';
    
    var link = document.getElementById('downloadlink');
    link.href = makeTextFile(content);
    link.style.display = 'block';
}
