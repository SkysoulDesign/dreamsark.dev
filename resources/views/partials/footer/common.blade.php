<div class="row --fluid align-center footer">
    <div class="small-12 medium-10 columns">
        <div class="row">
            <div class="small-5 footer__links">
                <ul>
                    <li class="li --title"> @lang('general.about-dreamsark')</li>
                    <li>@lang('general.about-dreamsark-description')</li>
                </ul>
            </div>
            <div class="small-3 small-offset-1 footer__links">
                <ul>
                    <li class="li --title">@lang('footer.dreamsark')</li>
                    <li><a href="#">@lang('footer.our-mission')</a></li>
                    <li><a href="#">@lang('footer.our-team')</a></li>
                    <li><a href="#">@lang('footer.our-history')</a></li>
                    <li><a href="#">@lang('footer.help-center')</a></li>
                </ul>
                <ul>
                    <li class="li --title">@lang('footer.legal')</li>
                    <li><a href="#">@lang('footer.terms')</a></li>
                    <li><a href="#">@lang('footer.privacy-notice')</a></li>
                    <li><a href="#">@lang('footer.careers')</a></li>
                    <li><a href="#">@lang('footer.contact')</a></li>
                    <li><a href="#">@lang('footer.press')</a></li>
                </ul>
            </div>
            <div class="small-3">
                @lang('general.technical-support')
                <h2 class="h2 +profile-color-actor">400-001-1236</h2>
                <p>@lang('general.technical-support-description')</p>
            </div>
            <div class="small-12">
                <div class="divider --hair-line">@lang('general.dreamsark-copyright')</div>
            </div>
            <div class="small-6 footer__logo">
                <img src="{{ asset('img/temp/dreamsark-white.png') }}" alt="">
            </div>
            <div class="small-6 footer__social +align-right">
                @lang('footer.icp')
                <ark-dropdown pop="up" mode="simple">
                    <ark-dropdown-option
                            {{ session('language') == 'en' ? 'selected' : '' }} href="{{ route('language', 'en') }}">
                        @lang('forms.english')
                    </ark-dropdown-option>
                    <ark-dropdown-option
                            {{ session('language') == 'cn' ? 'selected' : '' }} href="{{ route('language', 'cn') }}">
                        @lang('forms.chinese')
                    </ark-dropdown-option>
                </ark-dropdown>
            </div>
        </div>
    </div>
</div>
