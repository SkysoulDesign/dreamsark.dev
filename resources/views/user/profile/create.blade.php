@extends('layouts.master-user')

@section('content')
    <div class="column">

        <form class="ui form @if($errors->any()) warning error @endif" action="{{ route('user.profile.store') }}"
              method="POST" enctype="multipart/form-data">

            {{ csrf_field() }}
            <input type="hidden" name="profile_id" value="{{ $profile->id }}"/>

            <div class="ui tabular menu create-profile">
                {{--*/ $active=true /*--}}
                {{--@foreach($categories as $category)
                    <div class="@if($active){!! 'active ' !!}--}}{{--*/ $active=false /*--}}{{--@endif{!! 'item' !!}"
                         data-tab="{{ $category }}">@lang('forms.'.$category)</div>
                @endforeach--}}
                <div class="active  item" data-tab="general">@lang('forms.general')</div>
            </div>
            @php
            $category=''; $active=true;
            $valueArr = old('questions', '');
            $formValidateArr = [];
            @endphp

            <div class="ui active tab segment" data-tab="general" style="min-height: 350px;">
            @foreach($profile->questions as $question)
                @if($question->category!=$category)
                    @if($category!='')
                        {{--*/ $active=false /*--}}
                        {!! '</div>' !!}
                    @endif
                    {!! '<div class="ui'.($active?' active':'').' tab segment" data-tab="'. $question->category .'" style="min-height: 350px;">' !!}
                    {{--*/ $category = $question->category /*--}}
                @endif
                @php
                $type = $question->type->name or '';
                $required = $question->is_primary or false;

                $questionIndex = $required ? 'required' : 'general';
                @endphp

                @php
                $name = 'questions['.$questionIndex.']['.$type.']['.$question->id.']'.($type=='checkbox'?'[]':'');
                $label = $question->question;
                $value = @$valueArr[$questionIndex][$type][$question->id];
                if($required && !in_array($type, ['radio', 'checkbox']))
                $formValidateArr[$name]='empty';
                @endphp

                @if($type=='select')
                    @include( 'partials.select', ['default' => $value, 'collection' => $question->options] )
                @elseif(in_array($type, ['radio', 'checkbox']))
                    @include('partials.checkbox', ['parent_class' => 'grouped', 'options' => $question->options])
                @elseif($type=='textarea')
                    @include('partials.textarea', [])
                @elseif(in_array($type, ['file', 'image', 'video']))
                    @php $attributes = ($type!='file' ? 'accept="'.$type.'/*"' : ''); @endphp
                    @include('partials.field-multiple', ['label' => $label, 'fields' => [
                                ['name' => $name, 'type' => 'file'],
                            ], 'class' => 'two'])
                @else
                    @include('partials.field', [])
                @endif
            @endforeach
            </div>

            <div class="ui actions">
                <button class="ui submit button primary" type="submit">@lang('forms.create')</button>

                <a href="{{ route('user.profile.index') }}" class="ui button ui-icon-cancel">
                    @lang('forms.cancel')
                </a>
            </div>
        </form>
    </div>
@endsection

@include('user.profile.scripts')