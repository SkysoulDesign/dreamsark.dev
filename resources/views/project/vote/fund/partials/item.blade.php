<ark-tab content="tab-{{ $profile->name }}" icon="comments-o" {{ $active }}>
    @lang("positions.$profile->name")
    @push('tab-item')

    <div id="tab-{{ $profile->name }}">
        <ark-accordion>
            @foreach($expenditure->enrollers as $enroller)
                @include('project.vote.fund.partials.accordion-item')
            @endforeach
        </ark-accordion>
    </div>

    @endpush
</ark-tab>
