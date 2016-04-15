<div class="ui small menu">
    <div class="right menu">
        <a class="item" href="{{ route('admin.user.index') }}">
            <i class="list icon"></i>
            @lang('user.all-users')
        </a>
        <a class="item" href="{{ route('admin.user.create') }}">
            <i class="add icon"></i>
            @lang('user.add-user')
        </a>
    </div>

</div>