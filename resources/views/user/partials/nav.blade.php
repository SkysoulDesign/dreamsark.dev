<ark-nav>
    <ark-item url="{{ route('user.profile.index') }}" {{ active('user.profile.index') }}>Profiles</ark-item>
    <ark-item url="{{ route('user.project.index') }}" {{ active('user.project.index') }}>Projects</ark-item>
    <ark-item>Activities</ark-item>
    <ark-item url="{{ route('user.account') }}" {{ active('user.account') }}>Account</ark-item>
    <ark-item url="{{ route('user.settings') }}" {{ active('user.settings') }}>Settings</ark-item>
</ark-nav>
