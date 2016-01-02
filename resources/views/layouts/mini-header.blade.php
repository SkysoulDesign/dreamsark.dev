<div class="container-fluid mini-header">

    <section class="medium-12 medium-centered column bar">

        <div class="row">

            <div class="medium-2 column avatar">
                <img src="{{ asset('dreamsark-assets/avatar-huge.png') }}">
            </div>

            <div class="medium-10 column">

                <div class="cash">
                    <img src="{{ asset('dreamsark-assets/coin.png') }}">
                    {{ auth()->user()->bag->coins }}
                </div>

                <ul>
                    <li><a href="#">Profile</a></li>
                    <li><a href="#">Account</a></li>
                    <li><a href="#">Settings</a></li>
                </ul>
            </div>

        </div>
    </section>

</div>

