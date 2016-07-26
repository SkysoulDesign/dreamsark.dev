@if($errors->any())

    <div class="message --color-danger --fixed">
        <div class="message__header">
            Ooooops
        </div>
        <ul>
            @foreach($errors->all() as $error)
                <li>{{$error}}</li>
            @endforeach
        </ul>
    </div>

@endif

@if(session()->has('success'))

    <div class="message --color-success --fixed">
        <div class="message__header">
            Success
        </div>
        <p>{{ session()->get('success') }}</p>
    </div>

@endif

@if(session()->has('warning'))
    <div class="message --color-warning --fixed">
        <div class="message__header">
            &nbsp;
        </div>
        <p>{{ session()->get('warning') }}</p>
    </div>
@endif
