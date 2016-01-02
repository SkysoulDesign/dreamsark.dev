

    <div class="ui error message">
        <div class="header">{{ $header or trans('forms.errors') }}</div>
        <ul class="list">
            @foreach($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>

