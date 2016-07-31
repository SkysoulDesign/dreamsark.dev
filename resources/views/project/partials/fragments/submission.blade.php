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
