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
            'password' => "123456",
            'email' => 'rafael.milewski@gmail.com',
        ];

        $this->dispatch(new CreateUserJob($rafael, 'admin'));

        $dreamsark = [
            'username' => 'DreamsArk',
            'password' => "123456",
            'email' => 'dreamsark@dreamsark.com'
        ];

        $this->dispatch(new CreateUserJob($dreamsark, 'committee'));

        $justin = [
            'username' => 'Justin',
            'password' => "123456",
            'email' => 'skysoul@skysoul.com.au'
        ];

        $this->dispatch(new CreateUserJob($justin, 'admin'));

        $cloud = [
            'username' => 'cloud',
            'password' => "123456",
            'email' => 'cloud@skysoul.com.au'
        ];

        $this->dispatch(new CreateUserJob($cloud, 'admin'));

        foreach (['user1', 'user2', 'user3'] as $user) {
            $this->dispatch(new CreateUserJob([
                'username' => $user,
                'email' => "$user@skysoul.com",
                'password' => 123456
            ]));
        }

    }

}
