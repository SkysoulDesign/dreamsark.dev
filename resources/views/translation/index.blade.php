@extends('layouts.master')

@section('content')

    @include('modals.translation-language-modal')
    @include('modals.translation-group-modal')
    @include('modals.translation-translation-modal')

    <div class="column">

        <div class="ui tall stacked segment">

            <div class="ui form">
                <div class="three fields">

                    @include('partials.select', ['name' => 'language', 'translation' => 'translation', 'collection' => $languages->lists('name', 'id'), 'id'=>'translation-language', 'class' => 'no-default'])

                    @include('partials.select', ['name' => 'group', 'translation' => 'translation', 'collection' => $groups->lists('name', 'id'), 'id' => 'translation-group', 'class' => 'no-default'])

                    <div class="nine wide field">
                        <div class="ui right floated basic buttons">

                            <div class="ui icon top left pointing dropdown button">

                                <i class="wrench icon"></i>

                                <div class="menu">
                                    <div class="header">@lang('translation.file-system')</div>
                                    <a class="item" href="{{ route('translation.import') }}"><i
                                                class="level down icon"></i>@lang('translation.import')</a>
                                    <a class="item" href="{{ route('translation.export') }}"><i
                                                class="level up icon"></i>@lang('translation.export')</a>
                                    <a class="item" href="{{ route('translation.sync') }}"><i
                                                class="refresh icon"></i>@lang('translation.sync')</a>

                                    <div class="ui divider"></div>
                                    <div class="item" id="translation-new-language">
                                        <i class="translate icon"></i>@lang('translation.create-language')
                                    </div>
                                    <div class="item" id="translation-new-group">
                                        <i class="tags icon"></i>@lang('translation.create-group')
                                    </div>
                                    <div class="item" id="translation-new-translation">
                                        <i class="tags icon"></i>@lang('translation.create-translation')
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

        </div>

        <div class="ui raised segment">

            <div class="ui fluid icon input loading">
                <input type="text" placeholder="Search...">
                <i class="search icon"></i>
            </div>

        </div>

        <table class="ui celled table">
            <thead>
            <tr>
                <th>@lang('translation.language')</th>
                <th>@lang('translation.group')</th>
                <th>@lang('translation.key')</th>
                <th>@lang('translation.translation')</th>
            </tr>
            </thead>
            <tbody>

            @foreach($translations as $translation)
                <tr>
                    <td>@lang('translation.'.$translation->language->name)</td>
                    <td>@lang('translation.'.$translation->groups->implode('name', ', '))</td>
                    <td>

                        <div class="ui transparent icon input translation-value">
                            <input data-action="{{ route('translation.update', $translation->id) }}"
                                   data-token="{{ csrf_token() }}"
                                   data-name="key"
                                   type="text"
                                   value="{{ $translation->key }}">
                            <i class="none icon"></i>
                        </div>

                    </td>
                    <td @if(!$translation->value) class="error" @endif>
                        <div class="ui transparent icon input translation-value" style="width: 100%">
                            <input data-action="{{ route('translation.update', $translation->id) }}"
                                   data-token="{{ csrf_token() }}"
                                   data-name="value"
                                   type="text"
                                   value="{{ $translation->value }}">
                            <i class="none icon"></i>
                        </div>
                    </td>
                </tr>
            @endforeach

            </tbody>
            <tfoot>
            <tr>
                <th colspan="4">

                </th>
            </tr>
            </tfoot>
        </table>
    </div>


@endsection