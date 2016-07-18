@push('tabs')
<ark-nav>
    <ark-tab content="tab-project" active icon="star">
        @lang('project.project')
        @push('tab-item')
        <div id="tab-project" class="row project-page +margin-top">

            <div class="small-12 medium-8 small-order-2 medium-order-1 columns">

                <div class="ui horizontal segments">
                    <div class="ui segment">
                        <div class="ui embed" data-source="youtube" data-id="HcgJRQWxKnw"></div>
                    </div>
                    <div class="ui segment">

                        <h1 class="ui header">{{ $project->name }}</h1>

                        <p class="ui sub header ">

                        <p>
                            @if($project->script) {{ substr($project->script->submission->content, 0, 100).'...' }} @endif
                        </p>

                        <div class="ui segments">
                            <div class="ui segment">
                                <div class="ui horizontal list">
                                    <div class="item">
                                        <img class="ui mini circular image"
                                             src="{{ $project->creator->present()->avatar }}">

                                        <div class="content">
                                            <h4 class="ui  header"><b>{{ $project->creator->present()->name }}</b>
                                            </h4>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div class="ui segment">
                                <div class="ui horizontal list">
                                    <div class="item">
                                        <i class="circular large olive inverted trophy icon"></i>

                                        <div class="content">
                                            <h2 class="value">
                                                <b>
                                                    <i class="yen icon"></i>{{ $project->expenditures->pluck('expenditurable')->sum('cost') }}
                                                </b>
                                            </h2>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div class="ui segment">
                                <div class="ui three item menu">
                                    <a id="project-idea-show" class="item @if(!$project->idea) disabled @endif">
                                        <i class="icon mail"></i> @lang('project.idea')
                                    </a>
                                    <a id="project-synapse-show"
                                       class="item @if(!$project->synapse) disabled @endif">
                                        <i class="icon users"></i> @lang('project.synapse')
                                    </a>
                                    <a id="project-script-show" class="item @if(!$project->script) disabled @endif">
                                        <i class="icon users"></i> @lang('project.script')
                                    </a>
                                </div>

                            </div>
                        </div>
                        @if(!$project->stage->active)
                            @if(isset($isIFrameCall) && $isIFrameCall)
                            @elseif(auth()->check() && auth()->user()->id == $project->user_id)
                                <div class="ui one inverted blue item menu">
                                    <a onClick="if(confirm('{{ trans('project.confirm-to-complete') }}')) return true;"
                                       href="{{ route('project.set.complete', $project->id) }}"
                                       class="item">@lang('project.set-complete')</a>
                                </div>
                            @endif
                        @else
                            <div class="ui one inverted green item menu">
                                <div class="item">@lang('project.project-complete')</div>
                            </div>
                        @endif
                    </div>
                </div>
                @if($project->idea) @include('modals.project-idea-show-modal') @endif
                @if($project->synapse) @include('modals.project-synapse-show-modal') @endif
                @if($project->script) @include('modals.project-script-show-modal') @endif

                <div class="ui stacked segments">
                    <div class="ui segment" style="min-height: 100px;">

                        <div class="ui three wide column statistics">
                            <div class="olive statistic">
                                <div class="value">
                                    <i class="yen icon"></i> {{ $project->totalCollected() }}
                                </div>
                                <div class="label">
                                    {{ trans('project.collected') }}
                                </div>
                            </div>
                            <div class="statistic">
                                <div class="value">
                                    {{ $project->backers->unique()->count() }}
                                </div>
                                <div class="label">
                                    {{ trans('project.backers') }}
                                </div>
                            </div>
                            <div class="statistic">
                                <div class="value">
                                    <img src="{{ asset('img/avatar/male.png') }}" class="ui circular inline image">
                                    {{ $project->enrollable()->count() }}
                                </div>
                                <div class="label">
                                    {{ trans('project.staff') }}
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
            <div class="small-12 medium-8 small-order-2 medium-order-1 columns">
                <h2>@lang('project.plan-data')</h2>
                @include('project.distribution.partials.crew-list', ['enrollable' => $project->enrollable])
                @if(auth()->check() && auth()->user()->id == $project->user_id)
                    @include('project.distribution.partials.expenditure-list', ['expenditures' => $project->expensable])
                @endif
                <h4>@lang('project.settlement-instruction')</h4>
                <ul class="ui list">
                    <li value="*">@lang('project.crew-salary-formula')
                        : {{ str_replace('COMMISSION_CREW', config('payment.salary.commission.crew'), config('payment.salary.formula.crew')) }}</li>
                    <li value="*">@lang('project.investor-return-formula')
                        : {{ str_replace('COMMISSION_INVESTOR', config('payment.salary.commission.investor'), config('payment.salary.formula.investor')) }}</li>
                    <li value="*">@lang('project.crew-assessed-formula')
                        : {{ str_replace('COMMISSION_CREW_ASSES', config('payment.salary.commission.crew_asses'), config('payment.salary.formula.crew_asses')) }}</li>
                </ul>
            </div>
            <p>&nbsp;</p>
            <style>
                .segment div.menu, .attached div.menu {

                }
            </style>
        </div>
        @endpush
    </ark-tab>
    <ark-tab content="tab-crew" icon="users">
        @lang('project.crew')
        @push('tab-item')
        <div id="tab-crew" class="row project-page +margin-top">

            <div class="small-12 columns">
                <section>

                    <ark-animation composition="project"
                                   :payload="{{ json_encode($project->enrollable->pluck('expenditurable.profile.name')) }}">
                    </ark-animation>

                </section>
            </div>

        </div>
        @endpush
    </ark-tab>
    <ark-tab content="tab-comments" icon="comments">
        Comments
        @push('tab-item')
        <div id="tab-comments" class="row align-center project-page +margin-top">

            @foreach(range(1,15) as $index)
                <section class="small-12 columns">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam cumque ex laudantium molestiae
                    pariatur, placeat ratione sequi. Cum, ex, similique! Architecto aspernatur magnam quasi totam.
                    Assumenda
                    earum eos illum quis?
                </section>
            @endforeach

            <form method="post" action="#">

                {{ csrf_field() }}

                <div class="small-12 medium-12 columns form__content --rounded">

                    <div class="row">

                        <h3 class="small-12 columns form__step">
                            Comments
                        </h3>

                        <div class="small-12 columns form__field">
                            <textarea name="comment" id="" cols="30" rows="10"></textarea>
                        </div>

                        <div class="small-12 columns divider --simple"></div>

                        <div class="small-12 columns form__field +center-on-mobile">
                            <button class="button --success --fit">Leave a Comment</button>
                        </div>

                        <div class="small-12 columns form__description +center-on-mobile">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam animi architecto
                            consequuntur
                            deserunt dicta doloremque enim illum ipsam itaque iusto molestiae mollitia nihil quaerat,
                            quas
                            sapiente similique, tempora! Aperiam, tempore!
                        </div>

                    </div>

                </div>

            </form>
        </div>
        @endpush
    </ark-tab>
</ark-nav>
@endpush

@section('tab-content')
    <div class="ui two column">

        <div class="ui horizontal segments">
            <div class="ui segment">
                <div class="ui embed" data-source="youtube" data-id="HcgJRQWxKnw" style="width: 2500px"></div>
            </div>
            <div class="ui segment" style="width: 1500px">

                <h1 class="ui header">{{ $project->name }}</h1>

                <p class="ui sub header ">

                <p>
                    @if($project->script) {{ substr($project->script->submission->content, 0, 100).'...' }} @endif
                </p>

                <div class="ui segments">
                    <div class="ui segment">
                        <div class="ui horizontal list">
                            <div class="item">
                                <img class="ui mini circular image" src="{{ $project->creator->present()->avatar }}">

                                <div class="content">
                                    <h4 class="ui  header"><b>{{ $project->creator->present()->name }}</b></h4>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="ui segment">
                        <div class="ui horizontal list">
                            <div class="item">
                                <i class="circular large olive inverted trophy icon"></i>

                                <div class="content">
                                    <h2 class="value">
                                        <b>
                                            <i class="yen icon"></i>{{ $project->expenditures->pluck('expenditurable')->sum('cost') }}
                                        </b>
                                    </h2>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="ui segment">
                        <div class="ui three item menu">
                            <a id="project-idea-show" class="item @if(!$project->idea) disabled @endif">
                                <i class="icon mail"></i> @lang('project.idea')
                            </a>
                            <a id="project-synapse-show" class="item @if(!$project->synapse) disabled @endif">
                                <i class="icon users"></i> @lang('project.synapse')
                            </a>
                            <a id="project-script-show" class="item @if(!$project->script) disabled @endif">
                                <i class="icon users"></i> @lang('project.script')
                            </a>
                        </div>

                    </div>
                </div>
                @if(!$project->stage->active)
                    @if(isset($isIFrameCall) && $isIFrameCall)
                    @elseif(auth()->check() && auth()->user()->id == $project->user_id)
                        <div class="ui one inverted blue item menu">
                            <a onClick="if(confirm('{{ trans('project.confirm-to-complete') }}')) return true;"
                               href="{{ route('project.set.complete', $project->id) }}"
                               class="item">@lang('project.set-complete')</a>
                        </div>
                    @endif
                @else
                    <div class="ui one inverted green item menu">
                        <div class="item">@lang('project.project-complete')</div>
                    </div>
                @endif
            </div>
        </div>
        @if($project->idea) @include('modals.project-idea-show-modal') @endif
        @if($project->synapse) @include('modals.project-synapse-show-modal') @endif
        @if($project->script) @include('modals.project-script-show-modal') @endif

        <div class="ui stacked segments">
            <div class="ui segment" style="min-height: 100px;">

                <div class="ui three wide column statistics">
                    <div class="olive statistic">
                        <div class="value">
                            <i class="yen icon"></i> {{ $project->totalCollected() }}
                        </div>
                        <div class="label">
                            {{ trans('project.collected') }}
                        </div>
                    </div>
                    <div class="statistic">
                        <div class="value">
                            {{ $project->backers->unique()->count() }}
                        </div>
                        <div class="label">
                            {{ trans('project.backers') }}
                        </div>
                    </div>
                    <div class="statistic">
                        <div class="value">
                            <img src="{{ asset('img/avatar/male.png') }}" class="ui circular inline image">
                            {{ $project->enrollable()->count() }}
                        </div>
                        <div class="label">
                            {{ trans('project.staff') }}
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </div>
    <div class="ui column">
        <h2>@lang('project.plan-data')</h2>
        @include('project.distribution.partials.crew-list', ['enrollable' => $project->enrollable])
        @if(auth()->check() && auth()->user()->id == $project->user_id)
            @include('project.distribution.partials.expenditure-list', ['expenditures' => $project->expensable])
        @endif
        <h4>@lang('project.settlement-instruction')</h4>
        <ul class="ui list">
            <li value="*">@lang('project.crew-salary-formula')
                : {{ str_replace('COMMISSION_CREW', config('payment.salary.commission.crew'), config('payment.salary.formula.crew')) }}</li>
            <li value="*">@lang('project.investor-return-formula')
                : {{ str_replace('COMMISSION_INVESTOR', config('payment.salary.commission.investor'), config('payment.salary.formula.investor')) }}</li>
            <li value="*">@lang('project.crew-assessed-formula')
                : {{ str_replace('COMMISSION_CREW_ASSES', config('payment.salary.commission.crew_asses'), config('payment.salary.formula.crew_asses')) }}</li>
        </ul>
    </div>
    <p>&nbsp;</p>
    <style>
        .segment div.menu, .attached div.menu {
            position: static;
        }
    </style>
@endsection

@push('scripts')
<script src="{{ asset('js/plugins/Profile.js') }}"></script>
@endpush

