<ark-tab content="tab-investors" icon="user" {{ (isset($active) && $active) ? 'active' : '' }}>
    @lang('project.invest')
    @push('tab-item')
    <div id="tab-investors" class="row align-center +margin-top">

        <div class="small-12 columns">
            <header class="header --with-divider +uppercase --centered">
                Investors
            </header>
        </div>

        <div class="small-10 --large-padding">
            <div class="row align-center">
                @foreach($project->investors->groupBy('user') as $investor)
                    <div class="small-3 columns">
                        <div class="segment project-page__fund__investor-list">
                            <img src="{{ asset($investor->first()->present()->avatar) }}" alt="">
                            <a href="#">{{ $investor->first()->username }}</a>
                            <p class="+color-primary">{{ $investor->sum('pivot.amount') }}</p>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>

    </div>
    @endpush
</ark-tab>
