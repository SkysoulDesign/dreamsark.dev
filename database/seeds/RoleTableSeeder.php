<?php

use DreamsArk\Jobs\User\Role\CreateRoleJob;
use Illuminate\Database\Seeder;
use Illuminate\Foundation\Bus\DispatchesJobs;

class RoleTableSeeder extends Seeder
{

    use DispatchesJobs;

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->dispatch(new CreateRoleJob('admin', 'Administrator'));
        $this->dispatch(new CreateRoleJob('user', 'User'));
        $this->dispatch(new CreateRoleJob('committee', 'DreamsArk Committee'));
    }
}
