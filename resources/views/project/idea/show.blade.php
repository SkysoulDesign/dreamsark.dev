<div class="column">

    <div class="ui top attached tabular menu">
        <a class="item active" data-tab="request">@lang('idea.request')</a>
        @if($project->stage->active)
            <a class="item" data-tab="submissions">@lang('idea.submissions')</a>
        @endif
    </div>

    <div class="ui bottom attached tab segment active" data-tab="request">
        <div class="ui segments">

            <div class="ui segment">
                {{ $project->name }}
            </div>

            <div class="ui secondary segment">
                {{ $project->stage->content }}
            </div>

            @if(!$project->stage->submission)

                <div class="ui secondary segment">
                    <h3>@lang('idea.reward') ${{ $project->stage->reward }}</h3>
                </div>

                <div class="ui segment">
                    @lang('idea.number-of-ideas') {{ $project->stage->submissions->count() }}
                </div>

                @if($project->stage->active && !$project->stage->vote->active && !$project->stage->submission)

                    <div class="ui center aligned segment">
                        <div id="flipclock" data-time="{{$project->stage->vote->open_date->diffInSeconds(\Carbon\Carbon::now()) }}" style="margin:2em;"></div>
                    </div>

                @endif

            @else

                <div class="ui tall stacked ui yellow inverted segment">
                    <a class="ui red massive ribbon label">Winner</a>
                    <a class="ui massive label basic image ">
                        <img class="ui right spaced avatar image" src="{{ $project->stage->submission->user->present()->avatar() }}">
                        {{ $project->stage->submission->user->present()->name() }}
                    </a>
                    <p><p></p></p>

                    <div class="content">{{ $project->stage->submission->content }}</div>
                </div>

            @endif

        </div>

        @if($project->stage->active && !$project->stage->vote->active && !$project->stage->submission)
            <div class="ui segment">
                <a id="idea-submit-open" href="#" class="ui primary button">
                    @lang('idea.submit-your-idea')
                </a>
            </div>
        @endif

        @include('modals.idea-submit-modal')

    </div>

    <div class="ui bottom attached tab segment" data-tab="submissions">
        <div class="ui segment">

            <table class="ui celled table">
                <thead>
                <tr>
                    <th>User</th>
                    <th>Details</th>
                </tr>
                </thead>
                <tbody>

                @foreach($submissions as $submission)

                    <tr>
                        <td class="collapsing">
                            <h4 class="ui image header">
                                <img src="{{ $submission->user->present()->avatar }}" class="ui mini rounded image">

                                <div class="content">
                                    {{ $submission->user->present()->name }}
                                </div>
                            </h4>
                        </td>
                        <td>
                            {{ $submission->content }}
                        </td>
                    </tr>

                @endforeach

                </tbody>
            </table>

        </div>
    </div>

</div>
