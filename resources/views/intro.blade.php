@extends('layouts.master', ['class' => 'intro-page', 'container' => false, 'footer' => false])

@section('content')

<div id="overlay">

    <div class="content">

        <img id="poster" alt="">

        <div class="meta">

            <div id="name" class="title">
                Loopers
            </div>

            <div class="author">
               <a href="#">Project Author</a>
            </div>

            <div id="description" class="description">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos commodi minima est fugiat blanditiis vitae velit voluptas perferendis assumenda. Id ullam natus labore cupiditate dignissimos neque excepturi ex obcaecati sunt.
            </div>

            <div class="actions">
                <a class="button" href="#">View Project</a>
            </div>

        </div>

        <a class="close" href="#">x</a>

    </div>

</div>

<div id="tutorial">

<div>

    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 308.84 192.86">

    <g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path d="M203.43,95.07a4.32,4.32,0,0,0-2.38,8.31c19.73,5.64,32,13.83,32,21.36,0,5.51-6.71,11.57-18.4,16.6-12.86,5.54-31.11,9.6-51.4,11.43l-17.71-.24h-.06a4.32,4.32,0,0,0-.06,8.65l17.93.24h.06l.38,0c21.27-1.9,40.55-6.2,54.28-12.12,19.52-8.41,23.62-18,23.62-24.55C241.7,112.67,228.11,102.13,203.43,95.07Z"/><path d="M76.05,90.14a4.32,4.32,0,1,0,0,8.65H93.83v17.87H76.05a4.32,4.32,0,1,0,0,8.65h22.1a4.32,4.32,0,0,0,4.32-4.32V68a4.32,4.32,0,0,0-4.32-4.32H76.05a4.32,4.32,0,0,0,0,8.65H93.83V90.14H76.05Z"/><path d="M115.83,125.31h26.52a4.32,4.32,0,0,0,4.32-4.32V94.47a4.32,4.32,0,0,0-4.32-4.32H120.15V72.27h17.78a4.32,4.32,0,0,0,0-8.65h-22.1A4.32,4.32,0,0,0,111.51,68v53A4.32,4.32,0,0,0,115.83,125.31Zm4.32-26.52H138v17.87H120.15Z"/><path d="M160,125.31h26.52a4.32,4.32,0,0,0,4.32-4.32V68a4.32,4.32,0,0,0-4.32-4.32H160A4.32,4.32,0,0,0,155.71,68v53A4.32,4.32,0,0,0,160,125.31Zm4.32-53h17.87v44.39H164.36V72.27Z"/><path d="M113.23,136.06a4.32,4.32,0,0,0-6.6,5.58l9.67,11.43c-20.41-1.56-38.89-5.3-52.48-10.66-13.35-5.27-21-11.71-21-17.67,0-6.93,10.26-14.39,27.45-20a4.32,4.32,0,0,0-2.67-8.23C57.6,99.8,49.67,103.66,44,108c-6.54,5.07-9.86,10.69-9.86,16.72,0,10,9.16,18.88,26.48,25.72,14.08,5.56,33,9.46,53.71,11.14l-8.62,9.56a4.32,4.32,0,1,0,6.42,5.79l15.73-17.43a4.32,4.32,0,0,0,1.11-2.9v-.33a4.32,4.32,0,0,0-1-2.79Z"/><path d="M199.07,63.4h17.67a4.32,4.32,0,0,0,4.32-4.32V41.4a4.32,4.32,0,0,0-4.32-4.32H199.07a4.32,4.32,0,0,0-4.32,4.32V59.08A4.32,4.32,0,0,0,199.07,63.4Zm4.32-17.68h9v9h-9Z"/><path d="M49.72,0a6.11,6.11,0,0,0-5.34,9l-10,10a8.09,8.09,0,0,0-10,0L16.6,11.33a4,4,0,0,0,.57-2.06,4.07,4.07,0,1,0-4.06,4.09,4,4,0,0,0,2.05-.58L23,20.56a8.09,8.09,0,0,0,0,10L10.19,43.47a6,6,0,1,0,1.28,1.6L24.49,32a8.1,8.1,0,0,0,4,1.63l0,10.34a6.11,6.11,0,1,0,2,0l0-10.34a8.1,8.1,0,0,0,4-1.66l7.84,7.78a4,4,0,0,0-.57,2.06,4.07,4.07,0,1,0,4.06-4.09,4,4,0,0,0-2.05.58l-7.84-7.78a8.09,8.09,0,0,0,0-10l9.81-9.87A6.1,6.1,0,1,0,49.72,0ZM11.07,9.3a2,2,0,1,1,2,2A2,2,0,0,1,11.07,9.3ZM6.12,52.08A4.07,4.07,0,1,1,10.18,48,4.08,4.08,0,0,1,6.12,52.08Zm27.48-2.13a4.07,4.07,0,1,1-4.09-4.06A4.08,4.08,0,0,1,33.61,49.95ZM29.47,31.63a6.11,6.11,0,1,1,6.09-6.13A6.12,6.12,0,0,1,29.47,31.63ZM47.83,41.75a2,2,0,1,1-2-2A2,2,0,0,1,47.83,41.75Zm1.93-31.57a4.07,4.07,0,1,1,4.06-4.09A4.08,4.08,0,0,1,49.76,10.18Z"/><path d="M288.68,191.33a5.24,5.24,0,0,0-2.21-8.73V170.47a6.94,6.94,0,0,0,6-6H302a3.45,3.45,0,0,0,.9,1.6,3.49,3.49,0,1,0,0-4.94,3.45,3.45,0,0,0-.9,1.6h-9.47a6.94,6.94,0,0,0-6-6V141a5.19,5.19,0,1,0-1.75-.2v15.84a6.94,6.94,0,0,0-3.41,1.41L275,151.76a5.24,5.24,0,1,0-1.23,1.23l6.27,6.27a6.94,6.94,0,0,0-1.41,3.41H269.2a3.44,3.44,0,0,0-.9-1.6,3.49,3.49,0,1,0,0,4.94,3.45,3.45,0,0,0,.9-1.6h9.47a6.94,6.94,0,0,0,6,6V182.4a5.24,5.24,0,1,0,4,8.93Zm17.9-29a1.75,1.75,0,1,1-2.47,0A1.75,1.75,0,0,1,306.58,162.31Zm-22.84-29a3.49,3.49,0,1,1,0,4.94A3.5,3.5,0,0,1,283.74,133.29Zm-15.43,17.9a3.49,3.49,0,1,1,4.94,0A3.5,3.5,0,0,1,268.31,151.2Zm13.58,8.64a5.24,5.24,0,1,1,0,7.41A5.24,5.24,0,0,1,281.89,159.84Zm-17.29,4.94a1.75,1.75,0,1,1,2.47,0A1.75,1.75,0,0,1,264.6,164.78Zm17.9,20.37a3.49,3.49,0,1,1,0,4.94A3.5,3.5,0,0,1,282.51,185.15Z"/></g></g></svg>

    <span><b>hold click</b> to navigate</span>
    <span><b>double click</b> to view a project</span>
    <span>use the <b>mouse wheel</b> to zoom in/out</span>

    <button>
    click here when you ready
    </button>

</div>

</div>

<div id="counter">0</div>
<div id="fader"></div>

    <div class="intro-page__assets --background"></div>
    <ark-animation composition="intro" :payload="[]" style="height: 100%; width: 100%; background: #18142b"></ark-animation>

<div id="vignette"></div>

@endsection

@push('scripts')
<script src="{{ asset('js/plugins/intro.js') }}"></script>
@endpush

@push('styles')
<style>

#fader {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    background:radial-gradient(ellipse at center, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 12%, rgba(255,255,255,0.02) 500%);
    transition: all 2s;
    opacity:0;
     pointer-events:none;
}

#counter {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    pointer-events:none;
    text-align: center;
    margin-top: 10%;
    font-size: 5em;
    // display:none;
    opacity:0;
    transition: all 1s;
    color:white;
    text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 1px #fff, 0 0 2px #228DFF, 0 0 3px #228DFF, 0 0 4px #228DFF, 0 0 50px #228DFF, 0 0 7px #228DFF;
}

#vignette {
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    z-index: 1;
    opacity:0;
    pointer-events:none;
    background: radial-gradient(ellipse, transparent 65%, #88341b 100%);
    // display:none;
    transition: all 2s
}

#overlay{
    position:absolute;
    flex-direction: column;
    height:100%;
    width:100%;
    background: rgba(0,0,0,.8);
    justify-content: center;
    align-items: center;
    color: white;
    display: none;
    z-index:3;
    transition: all .5s;
    opacity: 0
}

#overlay .content{
    width: auto;
    background: rgba(0,0,0,.8);
    border-radius: .5em;
    padding: 2em;
    display: flex;
    border: solid 1px white;
    transform: scale(0.1);
    transition: all .5s;
}

.close{
    text-transform: uppercase;
    color: white;
    border: solid 1px white;
    
    height: 30px;
    width: 30px;
    line-height: 28px;
    text-align: center;
    border-radius: 3px;
    opacity: 0.1

}

.close:hover{
    color: red;
    border-color: red !important;
    opacity: 1
}

#overlay .content img{
    height:400px;
    width: 600px;
    object-fit: cover;
    border-radius: .3em;
    margin-right: 3em;
}

.meta{
    width:400px
}

.title{
    font-size: 2em;
    line-height:1em
}

.description{
    margin-top:1em;
}

.actions{
    margin-top:2em
}


#tutorial{
    position:absolute;
    flex-direction: column;
    height:100%;
    width:100%;
    // background: rgba(0,0,0,.8);
    justify-content: center;
    align-items: center;
    color: black;
    display:none;
    opacity:0;
    transition: all 1s;
    z-index:1
}

#tutorial div{
    text-align: center;
    text-transform: uppercase;
    font-size: 1.5em;
    width: auto;
    // background: rgba(0,0,0,.5);
    border-radius: .5em;
    padding: 2em 5em;
    border: solid 1px black;
}

span {
    display:block;
    line-height: 1.5em;
}

svg{
    fill: black;
    width: 40%
}

button, .button{
    height: auto !important;
    margin-top:1em !important;
    background: transparent !important;
    text-transform: uppercase !important;
    cursor: pointer !important;
}

button:hover, .button:hover{
    color: green !important;
    border-color: green !important;
}

button:focus, .button:focus{
    border-color: green !important;
    color: white !important;
    background: green !important;
}

</style>
@endpush
