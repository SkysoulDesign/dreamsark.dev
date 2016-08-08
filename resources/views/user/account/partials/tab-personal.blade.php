<ark-tab content="tab-personal" icon="user" {{ (isset($active) && $active) ? 'active' : '' }}>
    @lang('project.personal')
    @push('tab-item')
    <div id="tab-personal" class="row align-center">

        <div class="small-10 columns segment --large-padding --centered">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque dolorum eum explicabo itaque odio quo
            sint tenetur! Aliquid, deleniti exercitationem fugiat itaque, iure nemo nobis non, odio perspiciatis
            quod reiciendis?
        </div>

        <div class="small-10 columns segment --large-padding">
            <ark-form action="#">
                <ark-input read-only label="Username">{{ $user->username }}</ark-input>
                <ark-input name="email" label="Email">{{ $user->email }}</ark-input>

                <ark-fields>
                    <ark-input name="password" label="Password"></ark-input>
                    <ark-input name="password_confirmation" label="Password"></ark-input>
                </ark-fields>

                <ark-button color="primary">@lang('forms.save')</ark-button>

            </ark-form>
        </div>

    </div>
    @endpush
</ark-tab>
