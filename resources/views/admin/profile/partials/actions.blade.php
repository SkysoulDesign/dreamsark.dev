<div class="small-10 segment columns --transparent">
    <ul class="ul --inline --right">
        <li class="li --start">
            <header class="header --small">
               {{ $title }}
            </header>
        </li>
        <li>
            <a href="{{ route('admin.profile.create') }}">
                <ark-button icon="plus" color="primary">
                    Create Profile
                </ark-button>
            </a>
        </li>
        @if($sortBy ?? true)
            <li>
                <ark-dropdown title="Sort by" icon="sort-amount-desc">
                    <ark-dropdown-option>@lang('forms.name')</ark-dropdown-option>
                    <ark-dropdown-option>@lang('forms.a-to-z')</ark-dropdown-option>
                </ark-dropdown>
            </li>
        @endif
    </ul>
</div>
