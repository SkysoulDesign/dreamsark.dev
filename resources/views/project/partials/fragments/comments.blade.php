<div class="row comment">

    <div class="small-1 columns">
        <img class="comment__avatar" src="{{ asset('img/svg/person-flat.svg') }}">
    </div>

    <div class="small-11 columns segment comment__content">
        <div class="comment__content__author">

            <ul class="ul --inline --right">
                <li class="li --start">
                    <a href="#">{{ $comment->user->present()->name }}</a>
                </li>

                <li>{{ $comment->created_at }}</li>

                @if(auth()->check() && $comment->user->id === auth()->user()->id)
                    <li><a href="#">@lang('forms.edit')</a></li>
                    <li><a href="#">@lang('forms.delete')</a></li>
                @endif

                <li><a href="#">@lang('forms.report')</a></li>
            </ul>

        </div>
        <p>{{ $comment->content }}</p>
    </div>
</div>
