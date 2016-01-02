<?php

use DreamsArk\Commands\Session\CreateUserCommand;
use Illuminate\Database\Seeder;
use Illuminate\Foundation\Bus\DispatchesJobs;

class UserTableSeeder extends Seeder
{

    use DispatchesJobs;

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $rafael = [
            'username' => 'milewski',
            'password' => "478135",
            'email'    => 'rafael.milewski@gmail.com',
        ];

        $this->dispatch(new CreateUserCommand($rafael, 'admin'));

        $dreamsark = [
            'username' => 'DreamsArk',
            'password' => "dreamsark",
            'email'    => 'dreamsark@dreamsark.com'
        ];

        $this->dispatch(new CreateUserCommand($dreamsark, 'committee'));

        $justin = [
            'username' => 'Justin',
            'password' => "skysoul",
            'email'    => 'skysoul@skysoul.com.au'
        ];

        $this->dispatch(new CreateUserCommand($justin, 'admin'));

    }

}
