<?php

use DreamsArk\Jobs\Admin\Profile\CreateProfileJob;
use Illuminate\Database\Seeder;
use Illuminate\Foundation\Bus\DispatchesJobs;

class ProfileTableSeeder extends Seeder
{
    use DispatchesJobs;

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $profiles = ['actor', 'director'];

        foreach ($profiles as $profile) {
            $request = ['name' => $profile, 'display_name' => ucwords($profile), 'description' => $profile];
            $this->dispatch(new CreateProfileJob($request, range(1, 5), range(1, 5)));
        }
        
    }

}
