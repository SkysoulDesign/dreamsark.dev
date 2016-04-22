@extends('layouts.master-user')


@section('content')
    <div class="ui two column stackable grid">

        <div class="row">

            <section class="medium-6 column">

                {{-- Segment Start --}}
                <div class="segment">

                    <div class="title">General Information</div>

                    <div class="menu">
                        <button class="outlined small">edit</button>
                    </div>

                    <div class="body">
                        <div class="head">
                            <h1>{{ auth()->user()->username }}</h1>
                        </div>
                        <div class="description">
                            <i class="fa fa-map-marker"></i> Sao Paulo, Brasil
                        </div>
                    </div>

                    <hr>

                    <div class="title">
                        Backed projects
                    </div>

                    <div class="body">

                        <div class="description">
                            There is nothing here at the moment
                        </div>
                    </div>
                </div>
                {{-- Segment End --}}

            </section>

            <section class="medium-6 column">

                <div class="segment" style="min-height: 250px;">

                    <div class="title modern">Profiles</div>
                    <div class="ui two column grid">
                        <div class="column title">@lang('profile.type')</div>
                        <div class="column title">@lang('profile.page-views')</div>
                        <div class="column">Actor</div>
                        <div class="column">17</div>
                        <div class="column">Director</div>
                        <div class="column">20</div>
                        <div class="column">&nbsp;</div>
                        <div class="column"><a class="ui primary button"
                                               href="{{ route('user.profile.index') }}">@lang('profile.view-all')</a>
                        </div>
                    </div>

                    <br/>
                </div>

            </section>

        </div>
    </div>

@endsection

