<ark-form class="align-center --overlapped" action="{{ $action }}"
          method="{{ $method ?? 'post' }}" {!! isset($bind) ? ":bind='$bind'" : ''  !!}>

    <ark-form-header>
        {{ $headerText }}
    </ark-form-header>

    <div slot="content">

        @if($nameInput ?? true)

            <ark-form-step>
                @lang('project.name')
            </ark-form-step>

            <ark-input model name="name" placeholder="@lang('project.name')"></ark-input>

        @endif

        <ark-form-step>
            @lang('project.content')
        </ark-form-step>

        <ark-textarea rich-text
                      name="content"
                      :rows="5" class="editable"
                      placeholder="@lang('forms.content')"
                      caption="@lang('project.form-description')">
        </ark-textarea>

        <ark-form-step>
            @lang('project.reward')
        </ark-form-step>

        <ark-fields>

            <ark-input name="reward"
                       required
                       type="number"
                       :min="0"
                       :max="{{ auth()->user()->bag->coins }}"
                       placeholder="@lang('project.amount')"
                       label="@lang('project.reward')">
            </ark-input>

            <ark-input name="voting_date"
                       type="datetime-local"
                       placeholder="@lang('project.name')"
                       caption="@lang('project.creation-voting-description')"
                       label="@lang('forms.due-date')">
            </ark-input>

        </ark-fields>

        <div class="small-12 columns divider --simple"></div>

        <ark-button color="success" class="--medium" class="+center-on-mobile">
            @lang('forms.create-project')
        </ark-button>

        <div class="small-12 columns form__description +center-on-mobile">
            {{ $submitText }}
        </div>

    </div>

</ark-form>

@push('styles')
<link rel="stylesheet" media="all" href="{{ asset('css/plugins/medium/medium.css') }}">
@endpush

@push('scripts')
<script src="{{ asset('js/plugins/Medium.js') }}"></script>
@endpush
