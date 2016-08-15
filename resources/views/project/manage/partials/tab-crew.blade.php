<ark-tab content="tab-crew" icon="circle" {{ (isset($active) && $active) ? 'active' : '' }}>
    @lang('project.crew')
    @push('tab-item')
    <div id="tab-crew" class="row align-center +margin-top">

        <div class="small-10">
            <ark-accordion>
                @foreach($expenditures as $expenditure)

                    <ark-accordion-item>
                        <div slot="header" class="item --attached --hover">

                            <div class="small-1 columns item__image">
                                <img src="{{ $expenditure->expenditurable->enroller->user->present()->avatar }}" alt="">
                            </div>

                            <div class="small-1 columns">
                                <a href="#hello">{{ $expenditure->expenditurable->enroller->user->present()->name }}</a>
                            </div>
                        </div>
                        <div class="small-12 columns segment --large-padding">
                            <b>Some Statistics about his performance</b>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores aspernatur assumenda
                                dicta, dolorum ducimus eius eligendi eos et exercitationem iste natus possimus quaerat
                                repellendus rerum saepe sit soluta suscipit voluptatibus!</p>

                            <div class="divider"></div>

                            <div class="header --small">Payment</div>

                            <table class="table +margin-top-small --color-primary">
                                <thead>
                                <tr>
                                    <th>@lang('forms.type')</th>
                                    <th>@lang('forms.amount')</th>
                                    <th>@lang('forms.description')</th>
                                    <th>@lang('project.status')</th>
                                    <th class="+align-right">@lang('forms.action')</th>
                                </tr>
                                </thead>
                                <tbody>

                                @foreach($expenditure->expenditurable->dispenses as $dispense)
                                    <tr>

                                        <td>
                                            @lang("dispense.$dispense->type")
                                        </td>

                                        <td>
                                            {{ $dispense->amount }}
                                        </td>

                                        <td>
                                            {{ $dispense->description }}
                                        </td>

                                        <td>
                                            {{ $dispense->paid ? trans('dispense.paid') : trans('dispense.pending') }}
                                        </td>

                                        <td class="+align-right">
                                            <ark-form action="{{ route('project.manage.dispense.pay', $dispense) }}">
                                                <ul class="ul --inline --right">
                                                    @if($dispense->paid)
                                                        <li>
                                                            <ark-button color="primary">Details</ark-button>
                                                        </li>
                                                    @else
                                                        <li>
                                                            <ark-input type="number"
                                                                       name="amount">{{ $dispense->amount }}</ark-input>
                                                        </li>
                                                        <li>
                                                            <ark-button color="success">Pay</ark-button>
                                                        </li>
                                                    @endif
                                                </ul>
                                            </ark-form>
                                        </td>

                                    </tr>
                                @endforeach

                                </tbody>
                            </table>

                        </div>
                    </ark-accordion-item>
                @endforeach
            </ark-accordion>
        </div>
        {{--<div class="small-10">--}}
        {{--<table class="table">--}}
        {{--<thead>--}}
        {{--<tr>--}}
        {{--<th>@lang('project.crew')</th>--}}
        {{--<th>@lang('project.description')</th>--}}
        {{--<th>@lang('project.cost')</th>--}}
        {{--<th>@lang('project.selected-user')</th>--}}
        {{--<th>@lang('project.votes')</th>--}}
        {{--<th>@lang('project.cost-expected')</th>--}}
        {{--</tr>--}}
        {{--</thead>--}}
        {{--<tbody>--}}

        {{--@foreach($expenditures as $expenditure)--}}

        {{--@set($crew, $expenditure->expenditurable)--}}

        {{--<tr>--}}
        {{--<td>--}}
        {{--<a href="#">{{ $crew->name }}</a>--}}
        {{--<p>@lang("positions.{$crew->profile->name}")</p>--}}
        {{--</td>--}}

        {{--<td>--}}
        {{--{{ $crew->description }}--}}
        {{--</td>--}}

        {{--<td>--}}
        {{--{{ $crew->cost }}--}}
        {{--</td>--}}

        {{--<td>--}}
        {{--<a href="{{ route('public.profile.show', [$crew->profile->name, $crew->enroller->user->username]) }}">--}}
        {{--{{ $crew->enroller->user->present()->name }}--}}
        {{--</a>--}}
        {{--</td>--}}
        {{--<td>--}}
        {{--{{  $crew->enroller->votes->sum('amount') }}--}}
        {{--</td>--}}
        {{--<td>--}}
        {{--0--}}
        {{--</td>--}}

        {{--</tr>--}}
        {{--@endforeach--}}

        {{--</tbody>--}}
        {{--</table>--}}

        {{--</div>--}}

    </div>
    @endpush
</ark-tab>
