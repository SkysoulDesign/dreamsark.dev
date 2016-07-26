@forelse($project->stage->comments as $comment)

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

@empty

    <div class="row align-center message --color-warning">
        @lang('project.no-comments')
    </div>

@endforelse

<div class="small-12 divider --spaced --simple"></div>

<ark-form class="align-center segment"
          action="{{ route('project.comment.store', [$project, $project->stage->getStageName()]) }}">

    <div slot="body">

        <ark-textarea name="content" :rows="5" label="@lang('forms.comments')"></ark-textarea>

        <div class="small-12 divider --simple"></div>

        <ark-button color="primary">
            @lang('forms.leave-a-comment')
        </ark-button>

        <div class="small-12 columns form__description +center-on-mobile">
            @lang('forms.comments-note')
        </div>

    </div>

</ark-form>


{{--<div class="comments">--}}

{{--@foreach($project->stage->comments as $comment)--}}

{{--<div class="small-12 columns comments__item">--}}
{{--<div class="row">--}}
{{--<div class="small-1 columns comments__item__author">--}}
{{--<img src="{{ asset('img/temp/avatar.png') }}" alt="">--}}
{{--</div>--}}
{{--<div class="small-11 columns comments__item__content">--}}
{{--<ul class="ul --inline --divided">--}}
{{--<li><a href="#">{{ $comment->user->present()->name }}</a></li>--}}
{{--</ul>--}}
{{--<p>{{ $comment->content }}</p>--}}
{{--</div>--}}
{{--<div class="small-11 small-offset-1 columns comments__item__meta">--}}

{{--<ul class="ul --inline --divided --right">--}}
{{--<li>{{ $comment->created_at }}</li>--}}

{{--@if($comment->user->id === auth()->user()->id)--}}
{{--<li><a href="#">@lang('forms.edit')</a></li>--}}
{{--<li><a href="#">@lang('forms.delete')</a></li>--}}
{{--@endif--}}

{{--<li><a href="#">@lang('forms.report')</a></li>--}}
{{--</ul>--}}
{{--</div>--}}
{{--</div>--}}
{{--</div>--}}

{{--@endforeach--}}
{{--</div>--}}
{{--<div class="small-12 columns divider">@lang('general.comments')</div>--}}
{{--<div class="small-12 columns">--}}
{{--<div class="row">--}}

{{--</div>--}}
{{--</div>--}}
