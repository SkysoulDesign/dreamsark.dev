/**
 * Set Snap SVG
 */
var s = require('snapsvg');

var start = {

    trigger: null,
    container: null,
    notes: null,
    offSet: null,
    size: null,
    winsize: null,
    speed: 4.5,
    completedNotes: [],
    finished: false,
    transitionEvent: null,

    init: function () {

        this.trigger   = document.querySelector('.trigger');
        this.container = document.querySelector('.start');

        this.offSet  = this.container.getBoundingClientRect();
        this.size    = {width: this.container.offsetWidth, height: this.container.offsetHeight};
        this.winsize = {width: window.innerWidth, height: window.innerHeight};

        this.transitionEvent = this.whichTransitionEvent();

        this.events();
        this.createNotes();

    },

    events: function () {

        this.trigger.addEventListener('click', function () {

            this.showNotes();


            //var svg = document.querySelector('.svg-dreamsark');
            //console.log(svg)
            var dreamsark = s.select('.svg-dreamsark path');
            dreamsark.animate({
                d: "M96.4,34.4c-4.1,0-7.4-3.3-7.4-7.4c0-1.4,0.4-2.8,1.1-3.9L53.1,0c-1,1.7-2.9,2.8-5,2.8c-2.1,0-3.9-1.1-5-2.8L6.2,23.1c0.7,1.1,1.1,2.5,1.1,3.9c0,4.1-3.3,7.4-7.4,7.4l0,43.9c3.2,0,5.9,2.6,5.9,5.9c0,1-0.3,2-0.7,2.8l36.5,19.9c1.2-2.3,3.7-3.8,6.5-3.8c2.8,0,5.2,1.6,6.5,3.8l36.7-19.9c-0.5-0.8-0.7-1.8-0.7-2.8c0-3.2,2.6-5.9,5.9-5.9L96.4,34.4C96.4,34.4,96.4,34.4,96.4,34.4z"
            }, 500, mina.linear, function(){

            })



        }.bind(this));

    },

    createNotes: function () {

        var notesEl        = document.createElement('div'),
            notesElContent = '',
            totalNotes     = 50;

        notesEl.className = 'notes';

        for (var i = 0; i < totalNotes; ++i) {
            // we have 6 different types of symbols (icon--note1, icon--note2 ... icon--note6)
            var j = (i + 1) - 4 * Math.floor(i / 4);
            notesElContent += '<div class="note icon icon-' + j + '"></div>';
        }

        notesEl.innerHTML = notesElContent;

        this.container.insertBefore(notesEl, this.container.firstChild)

        // reference to the notes elements
        this.notes = [].slice.call(notesEl.querySelectorAll('.note'));

    },

    showNotes: function () {

        this.notes.forEach(function (note) {

            // first position the notes randomly on the page
            this.positionNote(note);

            // now, animate the notes torwards the button

            this.animateNote(note);

            note.addEventListener(this.transitionEvent, this.reanimateNote.bind(this, note), false);

        }.bind(this));

    },

    animateNote: function (note) {

        setTimeout(function () {

            //if (!isListening) return;
            // the transition speed of each note will be proportional to the its distance to the button
            // speed = this.speed * distance
            var noteSpeed = this.speed * Math.sqrt(Math.pow(note.getAttribute('data-tx'), 2) + Math.pow(note.getAttribute('data-ty'), 2));

            // apply the transition
            note.style.WebkitTransition = '-webkit-transform ' + noteSpeed + 'ms ease, opacity 0.8s';
            note.style.transition       = 'transform ' + noteSpeed + 'ms ease-in, opacity 0.8s';

            // now apply the transform (reset the transform so the note moves to its original position) and fade in the note
            note.style.WebkitTransform = note.style.transform = 'translate3d(0,0,0)';
            note.style.opacity = 1;

        }.bind(this), 60);

    },

    reanimateNote: function (note) {

        var log = function () {
            console.log('event listener removed');
        };

        note.removeEventListener(this.transitionEvent, log, false);

        if (this.finished !== true) {
            this.positionNote(note);
            this.animateNote(note);
        }
    },

    positionNote: function (note) {
        // we want to position the notes randomly (translation and rotation) outside of the viewport
        var x        = this.random(-2 * (this.offSet.left + this.size.width / 2), 2 * (this.winsize.width - (this.offSet.left + this.size.width / 2))),
            y,
            rotation = this.random(-30, 30);

        if (x > -1 * (this.offSet.top + this.size.height / 2) && x < this.offSet.top + this.size.height / 2) {
            y = this.random(0, 1) > 0 ? this.random(-2 * (this.offSet.top + this.size.height / 2), -1 * (this.offSet.top + this.size.height / 2)) : this.random(this.winsize.height - (this.offSet.top + this.size.height / 2), this.winsize.height + this.winsize.height - (this.offSet.top + this.size.height / 2));
        }
        else {
            y = this.random(-2 * (this.offSet.top + this.size.height / 2), this.winsize.height + this.winsize.height - (this.offSet.top + this.size.height / 2));
        }

        //// first reset transition if any
        note.style.WebkitTransition = note.style.transition = 'none';
        //
        //// apply the random transforms
        note.style.WebkitTransform = note.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0) rotate3d(0,0,1,' + rotation + 'deg)';

        // save the translation values for later
        note.setAttribute('data-tx', Math.abs(x));
        note.setAttribute('data-ty', Math.abs(y));
    },

    whichTransitionEvent: function () {

        var el = document.createElement('fakeelement');

        var transitions = {
            'transition': 'transitionend',
            'OTransition': 'oTransitionEnd',
            'MozTransition': 'transitionend',
            'WebkitTransition': 'webkitTransitionEnd'
        };

        for (var t in transitions) {
            if (el.style[t] !== undefined) {
                return transitions[t];
            }
        }
    },

    random: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

};

start.init();