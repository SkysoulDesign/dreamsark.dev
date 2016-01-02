<div class="container-fluid top-bar">
    <div class="row">

        <section class="medium-3 column logo">
            <img src="{{ asset('dreamsark-assets/logo.png') }}" alt="">
        </section>

        <section class="medium-5 column menu">
            <ul>
                <li><a href="{{ route('home') }}">首页</a></li>

                <li id="extra-trigger">
                    <a href="#">更多</a>
                </li>

                <li><a href="#">发现</a></li>
                {{--<li><a href="{{ route('intro') }}">Intro</a></li>--}}
                <li><a href="#">启动项目</a></li>
            </ul>
        </section>

        @if(auth()->check())

            <section class="medium-4 column settings">
                <ul>
                    <li>
                        <div class="avatar">
                            <img src="{{ asset('dreamsark-assets/avatar.png') }}" alt="Avatar">
                            <nav class="menu">
                                <ul>
                                    <li class="title">我的东西</li>
                                    <li><a href="{{ route('profile') }}">轮廓</a></li>
                                    <li><a href="#">消息</a></li>
                                    <li><a href="#">活动</a></li>
                                    <li class="title">支持的项目</li>
                                    <li><a href="#">设置</a></li>
                                    <li><a href="#">帐户</a></li>
                                    <li><a href="#">通知</a></li>
                                </ul>

                                <div class="side-menu">
                                    <ul>
                                        <li><a href="{{ route('profile') }}">简介</a></li>
                                        <li><a href="#">设置</a></li>
                                        <li><a href="#">帐户</a></li>
                                        <li><a href="#">通知</a></li>
                                    </ul>
                                </div>

                                <div class="footer">
                                    <div class="left">
                                        你登录为
                                        <a href="{{ route('profile') }}">
                                            <b>{{ auth()->user()->username }}</b>
                                        </a>
                                    </div>
                                    <div class="right">
                                        <a href="{{ route('logout') }}">登出</a>
                                    </div>
                                </div>

                            </nav>
                        </div>
                    </li>
                </ul>
            </section>

        @else

            {{--If the user is not Logged in --}}
            <section class="medium-4 column menu">

                <ul class="right">
                    <li><a href="{{ route('register') }}">唱了起来</a></li>
                    <li><a href="{{ route('login') }}"><b>登录</b></a></li>
                </ul>

            </section>

        @endif

        <section class="medium-12 column extra-container">

            <div class="extra">

                <nav class="medium-3 column">
                    <ul id="tabs">
                        <li class="title">主菜单</li>
                        <li data-tab="one" class="active">乘客</li>
                        <li data-tab="two">任务</li>
                        <li data-tab="three">小说</li>
                        <li>剧本</li>
                        <li>设备</li>
                        <li>影视基地</li>
                        <li>追梦学院</li>
                        <li>微博</li>
                        <li>素材库</li>
                        <li>积分商城</li>
                        <li>投资委员会</li>
                    </ul>
                </nav>

                <div id="tabs-content" class="medium-9 column body">

                    <section data-tab="one" class="active">

                        <div class="medium-10 column">
                            <div class="row">

                                <div class="medium-12 column title">
                                    活跃用户
                                </div>

                                <div class="medium-3 column">
                                    <div class="thumbnail">

                                        <img src="{{ asset('img/avatar/holder.png') }}" alt="">

                                        <div class="name">
                                            Pedro Hudson
                                        </div>

                                        <div class="badges">
                                            <img src="{{ asset('dreamsark-assets/coin.png') }}" alt="">
                                        </div>

                                    </div>
                                </div>
                                <div class="medium-3 column">
                                    <div class="thumbnail">

                                        <img src="{{ asset('img/avatar/holder.png') }}" alt="">

                                        <div class="name">
                                            Kelly Medina
                                        </div>

                                        <div class="badges">
                                            <img src="{{ asset('dreamsark-assets/coin.png') }}" alt="">
                                        </div>

                                    </div>
                                </div>
                                <div class="medium-3 column">
                                    <div class="thumbnail">

                                        <img src="{{ asset('img/avatar/holder.png') }}" alt="">

                                        <div class="name">
                                            Steven Wells
                                        </div>

                                        <div class="badges">
                                            <img src="{{ asset('dreamsark-assets/coin.png') }}" alt="">
                                        </div>

                                    </div>
                                </div>
                                <div class="medium-3 column">
                                    <div class="thumbnail">

                                        <img src="{{ asset('img/avatar/holder.png') }}" alt="">

                                        <div class="name">
                                            Marian Gonzalez
                                        </div>

                                        <div class="badges">
                                            <img src="{{ asset('dreamsark-assets/coin.png') }}" alt="">
                                        </div>

                                    </div>
                                </div>

                                <div class="medium-12 column title">
                                    其他用户
                                </div>

                                <div class="medium-12 column">
                                    <div class="medium-2 column thumbnail">
                                        <img src="{{ asset('img/avatar/holder.png') }}" alt="">
                                    </div>
                                    <div class="medium-2 column thumbnail">
                                        <img src="{{ asset('img/avatar/holder.png') }}" alt="">
                                    </div>
                                    <div class="medium-2 column thumbnail">
                                        <img src="{{ asset('img/avatar/holder.png') }}" alt="">
                                    </div>
                                    <div class="medium-2 column thumbnail">
                                        <img src="{{ asset('img/avatar/holder.png') }}" alt="">
                                    </div>
                                    <div class="medium-2 column thumbnail">
                                        <img src="{{ asset('img/avatar/holder.png') }}" alt="">
                                    </div>
                                    <div class="medium-2 column thumbnail">
                                        <img src="{{ asset('img/avatar/holder.png') }}" alt="">
                                    </div>
                                </div>


                            </div>
                        </div>

                        <aside class="medium-2 column">
                            <ul>
                                <li class="title">类别</li>
                                <li>子分类</li>
                                <li>子分类</li>
                                <li>子分类</li>
                                <li>子分类</li>
                            </ul>
                        </aside>

                    </section>

                    <section data-tab="two">
                        <div class="medium-8 column"></div>
                        <aside class="medium-4 column">
                            <ul>
                                <li class="title">类别</li>
                                <li>子分类</li>
                                <li>子分类</li>
                                <li>子分类</li>
                                <li>子分类</li>
                            </ul>
                        </aside>
                    </section>

                    <section data-tab="three">
                        <div class="medium-8 column"></div>
                    </section>

                </div>

            </div>

        </section>

    </div>
</div>