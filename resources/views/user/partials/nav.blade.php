<ark-nav>
    <ark-nav-item url="{{ route('user.profile.index') }}" {{ active('user.profile.index') }}>Profiles</ark-nav-item>
    <ark-nav-item url="{{ route('user.project.index') }}" {{ active('user.project.index') }}>Projects</ark-nav-item>
    <ark-nav-item>Activities</ark-nav-item>
    <ark-nav-item url="{{ route('user.account') }}" {{ active('user.account') }}>Account</ark-nav-item>
    <ark-nav-item url="{{ route('user.settings') }}" {{ active('user.settings') }}>Settings</ark-nav-item>
</ark-nav>