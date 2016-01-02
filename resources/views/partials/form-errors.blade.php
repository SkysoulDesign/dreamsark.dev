@if($errors->any())
    <div class="form-error-segment">
        <ul>
            @foreach($errors->all() as $error)
                <li><i class="fa fa-chevron-right "></i> {{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif