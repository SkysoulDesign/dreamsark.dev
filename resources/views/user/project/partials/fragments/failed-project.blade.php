<ark-accordion-item>
    <div slot="header">
        <div class="item --attached --hover">

            <div class="small-1 columns item__image">
                <img src="{{ asset('img/svg/person-flat.svg') }}" alt="">
            </div>

            <div class="small-3 columns">

                <ul class="--tight">
                    <li>
                        <h4>
                            <a href="#">{{ $project->name }}</a>
                        </h4>
                    </li>
                    <li class="li --sub-tittle">
                        {{--@lang('project.current-stage')--}}
                        {{--<b>{{ $project->stage->getStageName() }}</b>--}}

                        @set($trans, trans("project.{$project->stage->getStageName()}"))
                        @lang('project.current-stage', ['stage' => "<b>$trans</b>"])
                    </li>
                </ul>

            </div>

            <div class="columns">
                <ark-statistics>
                    {{--<statistic-item data="{{ $project->stage->submissions->count() }}"--}}
                    {{--icon="star">Submissions--}}
                    {{--</statistic-item>--}}
                    {{--<statistic-item data="{{ $project->stage->comments->count() }}"--}}
                    {{--icon="comments">Comments--}}
                    {{--</statistic-item>--}}
                </ark-statistics>
            </div>

            @if($project->stage->submission)
                <div class="small-2 columns +center">
                    <ark-button
                            href="{{ route('project.next.create', $project) }}"
                            color="success">
                        @lang('project.start-next-stage')
                    </ark-button>
                </div>
            @else
                <div class="small-2 align-center columns +center">
                    <ark-button color="primary" href="{{ route('user.project.edit', $project) }}" >@lang('project.reactive') </ark-button>
                </div>
            @endif

        </div>
    </div>
    @include("user.project.fail-messages.{$project->stage->fail_reason}")
</ark-accordion-item>
