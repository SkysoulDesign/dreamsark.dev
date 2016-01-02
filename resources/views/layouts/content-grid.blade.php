<div class="row">

    @foreach(range(1,6) as $n)
        <div class="medium-4 column">
            <div class="card">
                <section class="head">
                    <img src="{{ asset('dreamsark-assets/card.png') }}" alt="">
                </section>

                <section class="body">

                    <div class="title">
                        工程案例
                    </div>

                    <div class="description">
                        存有悲坐阿梅德存有胡萝卜，明尼阿波利斯回扣。我做的。
                    </div>

                    <button class="primary short">查看项目</button>

                </section>

            </div>
        </div>
    @endforeach

    <div class="medium-12 column">
        <section class="segment centered transparent marged padded">
            <button class="primary medium round right-arrow">装载更多</button>
        </section>
    </div>

</div>

