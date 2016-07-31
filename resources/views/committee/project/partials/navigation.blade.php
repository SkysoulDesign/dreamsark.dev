<ark-nav color="white">
    <ark-item url="{{ route('committee.project.review.index') }}" {{ activeRoute('user.profile.index') }}>
        @lang('committee.project-review')
    </ark-item>
    <ark-item url="{{ route('committee.project.fund.index') }}" {{ activeRoute('user.profile.index') }}>
        @lang('committee.project-fund')
    </ark-item>
    <ark-item url="{{ route('committee.project.distribution.index') }}" {{ activeRoute('user.profile.index') }}>
        @lang('committee.project-distribution')
    </ark-item>
</ark-nav>
