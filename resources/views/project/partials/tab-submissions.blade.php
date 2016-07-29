<ark-tab content="tab-submission" icon="paper-plane">
    @lang('forms.submissions')
    @push('tab-item')
    <div id="tab-submission" class="row +margin-top">

        <div class="small-12 columns">
            <header class="header --with-divider +uppercase --centered">
                @lang('project.user-public-submissions', ['count' => $public_submissions->count()])
            </header>
        </div>

        @if($public_submissions->isEmpty())

            <div class="small-12 columns segment">
                @lang('project.no-submissions')
            </div>

        @else

            <div class="small-12">

                <ark-accordion>
                    @foreach($public_submissions as $submission)
                        <ark-accordion-item>
                            <div slot="header" class="item --attached --hover">

                                <div class="small-1 columns item__image">
                                    <img src="{{ $submission->user->present()->avatar }}" alt="">
                                </div>

                                <div class="small-1 columns">
                                    <a href="#hello">{{ $submission->user->present()->name }}</a>
                                </div>

                                <div class="columns">
                                    {!!  mb_strimwidth(strip_tags($submission->content), 0, 80, "...")   !!}
                                </div>

                                <div class="small-3 columns">
                                    <ul class="ul --inline --right">
                                        <li class="li --subtitle">
                                            <i class="fa fa-calendar fa-fw"></i> {{ $submission->created_at }}
                                        </li>
                                    </ul>
                                </div>

                            </div>

                            <div class="small-12 columns segment --large-padding">
                                {!! $submission->content !!}
                            </div>

                        </ark-accordion-item>
                    @endforeach
                </ark-accordion>

            </div>

        @endif

    </div>
    @endpush
</ark-tab>
