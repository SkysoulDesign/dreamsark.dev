<div class="comments">

    @foreach($project->stage->comments as $comment)

        <div class="small-12 columns comments__item">
            <div class="row">
                <div class="small-1 columns comments__item__author">
                    <img src="{{ asset('img/temp/avatar.png') }}" alt="">
                </div>
                <div class="small-11 columns comments__item__content">
                    <ul class="ul --inline --divided">
                        <li><a href="#">{{ $comment->user->present()->name }}</a></li>
                    </ul>
                    <p>{{ $comment->content }}</p>
                </div>
                <div class="small-11 small-offset-1 columns comments__item__meta">

                    <ul class="ul --inline --divided --right">
                        <li>{{ $comment->created_at }}</li>

                        @if($comment->user->id === auth()->user()->id)
                            <li><a href="#">@lang('forms.edit')</a></li>
                            <li><a href="#">@lang('forms.delete')</a></li>
                        @endif

                        <li><a href="#">@lang('forms.report')</a></li>
                    </ul>
                </div>
            </div>
        </div>

    @endforeach
</div>
<div class="small-12 columns divider">@lang('general.comments')</div>
<div class="small-12 columns">
    <div class="row">

        <form method="post" action="{{ route('project.comment.store', [$project, $project->stage->getStageName()]) }}">

            {{ csrf_field() }}

            <div class="small-12 medium-12 columns form__content --rounded">

                <div class="row">

                    <h3 class="small-12 columns form__step">
                        @lang('forms.comments')
                    </h3>

                    <div class="small-12 columns form__field">
                        <textarea name="content" cols="30" rows="10"></textarea>
                    </div>

                    <div class="small-12 columns divider --simple"></div>

                    <div class="small-12 columns form__field +center-on-mobile">
                        <button class="button --success --fit">@lang('forms.leave-a-comment')</button>
                    </div>

                    <div class="small-12 columns form__description +center-on-mobile">
                        @lang('forms.comments-note')
                    </div>

                </div>

            </div>

        </form>
    </div>
</div>
