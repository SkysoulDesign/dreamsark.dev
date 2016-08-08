@extends('layouts.master')

@section('content')

    @include('user.partials.header')
    <div id="ABC" style="position: absolute; z-index: -1">
    </div>


    <ark-animation composition="item">
    </ark-animation>

    <div>
        <div class="row align-center align-middle +margin-top">
            <div class="small-3 columns" dropable="true">
                <div class="inventory-page__drop-zone" data-zone="a">
                    <span>a</span>
                </div>
            </div>
            <div class="small-3 columns" dropable="true">
                <div class="inventory-page__drop-zone" data-zone="b">
                    <span>b</span>
                </div>
            </div>
        </div>

        <div class="row align-center +margin-top">
            <div class="small-2 columns">
                <button id="merger-button" class="--button --fluid --color-primary">@lang('inventory.merge')</button>
            </div>
        </div>

        <div class="row align-center segment --large-padding +margin-top">
            @foreach($items as $item)
                <div class="small-1 columns">
                    <img src="{{ asset($item->image) }}" draggable="true" data-id="{{ $item->id }}" data-zone="w">
                </div>
            @endforeach

        </div>
    </div>

@endsection

@push('scripts')
<script src="{{ asset('js/plugins/Profile.js') }}"></script>
@endpush

@push("scripts")
{{--<script type="text/javascript" src="{{ asset('js/three.min.js') }}"></script>--}}
{{--<script type="text/javascript" src="{{ asset('js/plugins/ItemCombineView.js') }}"></script>--}}
{{--<script>--}}
    {{--var l_MyItemCombineView = new MyItemCombineView(window.innerWidth, window.innerHeight, document.querySelector("#ABC"), window);--}}
    {{--console.log("1");--}}
    {{--l_MyItemCombineView.Init();--}}
    {{--var l_ItemImage = ["img/123.png", "img/456.png"];--}}
    {{--l_MyItemCombineView.setMergeItem(l_ItemImage);--}}
    {{--l_MyItemCombineView.animate();--}}
{{--</script>--}}
@endpush
