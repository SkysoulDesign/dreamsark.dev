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
        /*factory(Profile::class, 3)->create()->each(function(){
            $this->dispatch();
        });*/

        $profileArr = ['actor', 'director'];
        foreach ($profileArr as $profile) {
            $request = ['name' => $profile, 'display_name' => ucwords($profile), 'description' => $profile];
            $this->dispatch(new CreateProfileJob($request));
        }
    }
}
