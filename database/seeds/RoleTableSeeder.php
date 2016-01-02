<?php

use DreamsArk\Commands\User\Role\CreateRoleCommand;
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
        $this->dispatch(new CreateRoleCommand('admin', 'Administrator'));
        $this->dispatch(new CreateRoleCommand('user', 'User'));
        $this->dispatch(new CreateRoleCommand('committee', 'DreamsArk Committee'));
    }
}
