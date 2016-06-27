<div class="ui small menu">
    <div class="right menu">
        <a class="item" href="{{ route($route_name, 'all') }}">
            <i class="list icon"></i>
            @lang('payment.all')
        </a>
        <a class="item" href="{{ route($route_name, 'active') }}">
            <i class="list icon"></i>
            @lang('payment.completed')
        </a>
        <a class="item" href="{{ route($route_name, 'pendin') }}g">
            <i class="list icon"></i>
            @lang('payment.pending')
        </a>
        <a class="item" href="{{ route($route_name, 'canceled') }}">
            <i class="list icon"></i>
            @lang('payment.canceled')
        </a>
    </div>

</div>