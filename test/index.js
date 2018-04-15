//cords selection
let notes           = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'],
    info            = getElement('info'),
    noteSelection   = getElement('note_selection'),
    chordSelection  = getElement('chord'),
    button          = getElement('build');

function stages(third, fifth, seventh) {
    //intervals set up
    var first   = notes.indexOf(noteSelection.value),
        third   = first + third <= notes.length - 1 ? first + third : first - notes.length + third,
        fifth   = first + fifth <= notes.length - 1 ? first + fifth : first - notes.length + fifth,
        seventh = first + seventh <= notes.length - 1 ? first + seventh : first - notes.length + seventh;
        
    if (arguments.length < 3) return [notes[first], notes[third], notes[fifth]];
        else return [notes[first], notes[third], notes[fifth], notes[seventh]];
}

function buildChord(third, fifth, seventh) {
    let chord;
    if (!seventh) {
        chord = stages(third, fifth);
    } else {
        chord = stages(third, fifth, seventh);
    }    
    showSelectedNotes(chord, false);
    info.innerText = chord;
}

button.addEventListener('click', function() {
    let td = document.getElementsByTagName('td');
    for (let i = 0; i < td.length; i++) {
        td[i].classList.remove('active');
    }
    switch (chordSelection.value) {
        case 'maj': 
            buildChord(4,7);
            break;
        case 'min':
            buildChord(3,7)
            break;
        case 'maj6':
            buildChord(4,7,9)
            break;
        case 'min7': 
            buildChord(3,7,10)
            break;
        case '7':
            buildChord(4,7,10)
            break;
        case 'maj7':
            buildChord(4,7,11);
            break;
    }
})

//frets 
function getElement(id) {
    return document.getElementById(id);
}
var strHighE    = getElement('strHighE'),
    strB        = getElement('strB'),
    strG        = getElement('strG'),
    strD        = getElement('strD'),
    strA        = getElement('strA'),
    strLowE     = getElement('strLowE'),
    fretNumbers = getElement('fretNumber');

function drawNotes(position, string) {
    //draws notes for each string
    let notes = notesOrder(position);
    for (let i = 0; i < 21; i++) {
        let td = document.createElement('td'),  
            span = document.createElement('span'),   
            counter = i;
        span.setAttribute('class', 'step');
        if (i > 0) {
            td.style.width = 70 - i * 3 + 'px';
        }
        if ( i == 1 || i == 3 || i == 5 || i == 7 || i == 9 || i == 12 || i == 15 || i == 17 || i == 19) {
            td.style.backgroundColor = '#E5E0E4';
        }
        if (counter >= notes.length) {
            counter = counter - notes.length;
        }       
        td.setAttribute('class', notes[counter]);
        td.innerText = notes[counter];
        td.appendChild(span);
        string.appendChild(td);
    }
}
function drawNumbers () {    
    //draw fret numbers
    for(let i = 0; i < 21; i ++) {
        let th = document.createElement('th');
        i == 0 ? th.innerText = '' : th.innerText = i;
        fretNumbers.appendChild(th);
    }
}
function notesOrder (position) {
    //organizes proper notes order for each string
    let newArray = [];
    for (let i = position; i < notes.length; i++) {
        newArray.push(notes[i]);
    }
    for (let i = 0; i < position; i++) {
        newArray.push(notes[i]);
    }
    return newArray;
}
drawNotes(4, strHighE);
drawNotes(11, strB);
drawNotes(7, strG);
drawNotes(2, strD);
drawNotes(9, strA);
drawNotes(4, strLowE);
drawNumbers();

function showSelectedNotes (arr, key) {
    let notes = [];    
    for(let i = 0; i < arr.length; i++) {
        notes.push(document.getElementsByClassName(arr[i]));
    }
    for (let i = 0; i < notes.length; i++) {
        for (let j = 0; j < notes[i].length; j++) {
            notes[i][j].childNodes[1].innerText = '';
            if (key) {
                let step = arr.indexOf(notes[i][j].getAttribute('class')) + 1;
                notes[i][j].classList.add('active');
                notes[i][j].childNodes[1].innerText = step;  
                console.log(step);
            } else {
                notes[i][j].classList.add('active');
            }
            
        }
    }
}

//keys
var majorKey = getElement('major_key'),
    minorKey = getElement('minor_key');

function createMajorKey (key) {
    let p = notes.indexOf(key),
        chromatic = notesOrder(p),
        newKey = [];
    newKey.push(chromatic[0]);
    newKey.push(chromatic[2]);
    newKey.push(chromatic[4])
    newKey.push(chromatic[5]);
    newKey.push(chromatic[7]);
    newKey.push(chromatic[9]);
    newKey.push(chromatic[11]);
    showSelectedNotes(newKey, true);
    return newKey;
}
function createMinorKey (key) {
    let p = notes.indexOf(key),
        chromatic = notesOrder(p),
        newKey = [];
    newKey.push(chromatic[0]);
    newKey.push(chromatic[2]);
    newKey.push(chromatic[3])
    newKey.push(chromatic[5]);
    newKey.push(chromatic[7]);
    newKey.push(chromatic[8]);
    newKey.push(chromatic[10]);
    showSelectedNotes(newKey, true);
    return newKey;
}

majorKey.addEventListener('click', function () {
    let td = document.getElementsByTagName('td');
    for (let i = 0; i < td.length; i++) {
        td[i].classList.remove('active');
    }
    createMajorKey(noteSelection.value);
});
minorKey.addEventListener('click', function() {
    let td = document.getElementsByTagName('td');
    for (let i = 0; i < td.length; i++) {
        td[i].classList.remove('active');
    }
    createMinorKey(noteSelection.value);
})