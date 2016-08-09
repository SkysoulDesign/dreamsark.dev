@extends('layouts.master')

@section('content')

    @include('committee.partials.header')

    <div class="row align-center +margin-top">
        <div class="small-12 segment --transparent">
            <ul class="ul --inline">
                <li>
                    <ark-button color="primary" data-modal-trigger="add-crew">@lang('committee.add-crew')</ark-button>
                </li>
                <li>
                    <ark-button color="primary"
                                data-modal-trigger="add-expense">@lang('committee.add-expense')</ark-button>
                </li>
                <li class="li --end">
                    <ark-form action="{{ route('committee.project.publish', $review->id) }}">
                        <ark-fields>
                            <ark-input type="datetime-local" name="voting_date"></ark-input>
                            <ark-button color="success">@lang('project.publish')</ark-button>
                        </ark-fields>
                    </ark-form>
                </li>
            </ul>
        </div>

        <div class="small-12 columns segment --attached --centered --color-primary">
            <ark-statistics class="align-center" size="large">

                @set($groups, $review->project->expenditures->groupBy('expenditurable_type'))

                <statistic-item data="{{ $groups->get('crews', collect())->count() }}">
                    @lang('committee.member')
                </statistic-item>
                <statistic-item data="{{ $groups->get('expenses', collect())->count() }}">
                    @lang('committee.expense')
                </statistic-item>
                <statistic-item data="{{ $review->project->expenditures->sum('expenditurable.cost') }}">
                    @lang('committee.budget')
                </statistic-item>

            </ark-statistics>
        </div>

        @if($review->project->expenditures->isEmpty())
            <div class="small-12 columns message --color-primary +center">
                @lang('committee.no-item')
                <h2>
                    <a href="#" data-modal-trigger="add-crew">
                        @lang('committee.click-to-plan')
                    </a>
                </h2>
            </div>
        @else
            @include('committee.project.partials.planning-table')
        @endif
    </div>

    <ark-modal v-cloak trigger="add-crew" header="@lang('committee.add-crew')">

        <ark-form class="align-center +margin-top-small"
                  action="{{ route('committee.project.crew.store', $review->project) }}">

            <ark-form-step>
                @lang('committee.member-name')
            </ark-form-step>

            <ark-input name="name" placeholder="@lang('committee.member-name')"></ark-input>

            <ark-form-step>
                @lang('committee.require-profile')
            </ark-form-step>

            <select name="profile_id">
                @foreach($profiles as $profile)
                    <option value="{{ $profile->id }}">
                        @lang("positions.$profile->name")
                    </option>
                @endforeach
            </select>

            <ark-textarea name="description" :rows="5" placeholder="@lang('forms.description')"></ark-textarea>

            <ark-form-step>
                @lang('forms.cost')
            </ark-form-step>

            <ark-input name="cost"
                       required
                       type="number"
                       :min="1"
                       placeholder="@lang('forms.cost')"
                       label="@lang('forms.cost')">
            </ark-input>

            <div class="small-12 columns divider --simple"></div>

            <ark-button color="success" class="--fluid --medium" class="+center-on-mobile">
                @lang('forms.add')
            </ark-button>

        </ark-form>

    </ark-modal>

    <ark-modal v-cloak trigger="add-expense" header="@lang('committee.add-expense')">

        <ark-form class="align-center +margin-top-small"
                  action="{{ route('committee.project.expense.store', $review->project) }}">

            <ark-form-step>
                @lang('committee.expense-information')
            </ark-form-step>

            <ark-fields>
                <ark-input name="name"
                           required
                           placeholder="@lang('committee.expense-item-name')"
                           label="@lang('committee.expense-item-name')">
                </ark-input>
                <ark-input name="cost"
                           required
                           type="number"
                           :min="1"
                           placeholder="@lang('forms.cost')"
                           label="@lang('forms.cost')">
                </ark-input>
            </ark-fields>

            <ark-form-step>
                @lang('committee.expense-information')
            </ark-form-step>

            <ark-textarea name="description" :rows="5" placeholder="@lang('forms.description')"></ark-textarea>

            <div class="small-12 columns divider --simple"></div>

            <ark-button color="success" class="--fluid --medium" class="+center-on-mobile">
                @lang('forms.create')
            </ark-button>

        </ark-form>

    </ark-modal>

@endsection
