<?php

use DreamsArk\Jobs\Session\CreateUserJob;
use Illuminate\Database\Seeder;
use Illuminate\Foundation\Bus\DispatchesJobs;

/**
 * Class UserTableSeeder
 */
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

        $this->dispatch(new CreateUserJob($rafael, 'admin'));

        $dreamsark = [
            'username' => 'DreamsArk',
            'password' => "dreamsark",
            'email'    => 'dreamsark@dreamsark.com'
        ];

        $this->dispatch(new CreateUserJob($dreamsark, 'committee'));

        $justin = [
            'username' => 'Justin',
            'password' => "skysoul",
            'email'    => 'skysoul@skysoul.com.au'
        ];

        $this->dispatch(new CreateUserJob($justin, 'admin'));

    }

}
