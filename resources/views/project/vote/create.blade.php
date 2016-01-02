<div class="column">
    <div class="ui segment">

        <div class="ui header">{{ $model->project->name }}</div>

        <div class="ui segment">
            {{ $model->content }}
        </div>

        <div class="ui  segment">
            @lang('vote.reward'): {{ $model->reward }}
        </div>

        <div class="ui center aligned segment">
            <div id="flipclock" data-time="{{ $model->vote->close_date->diffInSeconds(\Carbon\Carbon::now()) }}"
                 style="margin:2em;"></div>
        </div>

        <table class="ui celled table">
            <thead>
            <tr>
                <th>@lang('vote.user')</th>
                <th>@lang('vote.content')</th>
                <th class="collapsing">@lang('vote.votes')</th>
                <th class="collapsing">@lang('vote.action')</th>
            </tr>
            </thead>
            <tbody>

            @foreach($submissions as $submission)
                <tr>
                    <td class="collapsing">
                        <h4 class="ui image header">
                            <img src="{{ $submission->user->present()->avatar }}"
                                 class="ui mini rounded image">

                            <div class="content">
                                {{ $submission->user->present()->name }}
                            </div>
                        </h4>
                    </td>
                    <td>
                        {{ $submission->content }}
                    </td>
                    <td>
                        {{ $submission->votes->sum('pivot.amount') }}
                    </td>
                    <td class="collapsing">
                        <form class="ui form" method="post"
                              action="{{ route('project.idea.submission.vote.store', $submission->id) }}">
                            {{ csrf_field() }}
                            <div class="inline fields">
                                @include('partials.field', ['name' => 'amount', 'label' => trans('forms.amount')])
                                <button class="olive circular ui icon button">
                                    <i class="icon thumbs up"></i>
                                </button>
                            </div>
                        </form>
                    </td>
                </tr>
            @endforeach


            </tbody>
        </table>

    </div>
</div>