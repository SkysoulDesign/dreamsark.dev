<button @foreach($attributes as $key => $attribute){!! "$key=\"$attribute\"" !!} @endforeach>

    {{ $text or "button" }}

    <svg>
        <use width="4" height="4" xlink:href="#dreamsark-polygon" class="js-ripple"></use>
    </svg>

    <div class="ripple" aria-hidden="true">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
             focusable="false">
            <symbol id="dreamsark-polygon" viewBox="0 0 100 100">
                <g>
                    <polygon points="5.6,77.4 0,29 39.1,0 83.8,19.3 89.4,67.7 50.3,96.7"></polygon>
                    <polygon fill="rgba(255,255,255,0.35)" transform="scale(0.5), translate(50, 50)"
                             points="5.6,77.4 0,29 39.1,0 83.8,19.3 89.4,67.7 50.3,96.7"></polygon>
                    <polygon fill="rgba(255,255,255,0.25)"
                             transform="scale(0.25), translate(145, 145)"
                             points="5.6,77.4 0,29 39.1,0 83.8,19.3 89.4,67.7 50.3,96.7"></polygon>
                </g>
            </symbol>
        </svg>
    </div>

    @section('scripts')
        <script>

        </script>
    @endsection

</button>